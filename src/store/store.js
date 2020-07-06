import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import mChat from './modules/mobileChat/mChat'
import mChatData from './modules/mobileChat/mChatData'
import sound from './modules/sound'
import chars from './modules/chars'

const AES = require("crypto-js/aes");
const UTF8 = require('crypto-js/enc-utf8')
const PBKDF2 = require('crypto-js/pbkdf2')

JSON.serialize = require('serialize-javascript');
JSON.deserialize = function(serializedJavascript){
  return eval('(' + serializedJavascript + ')');
}

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    gameLang: 'ru',
    gameFont: 'Roboto',
    gameFontSize: '14pt',
    gameCurrentTheme: 'NordDark',
    gameThemesList: [
      { themeName: 'NordLight' },
      { themeName: 'NordDark' },
      { themeName: 'CustomDark' },
    ],
    gameHotkeysEnable: true, // Горячие клавиши в игре 
    keyboardShortcutsVersion: '0',   
    settingsHotkeys: {
      settingsOpen: 'o',                    // Открыть журнала
      settingsToggleGlobalSoundEnable: 'p', // Вкл / выкл звук глобально
    },
    journalHotkeys: {
      journalOpen: 'q',            // Открыть журнала
      journalTabCharacters: 'w',   // Открыть вкладку с персонажами 
      journalTabDiary: 'e',        // Открыть вкладку с дневником
      journalTabAchievements: 'r', // Открыть вкладку с достижениями   
    },
    savesHotkeys: {
      savesOpen: 'a',      // Открыть сохранения
      savesQuickSave: '1', // Быстрое сохранение
      savesQuickLoad: '3', // Быстрая загрузка
    },
    mChatHotkeys: {
      mChatOpen: 'd',      // Открыть чат
    },
    
    reRender_mChatPlayersVolume: 0, // Используется для перерендера плееров в чате, изменяется в Saves.vue 
    reRender_ColorPickerCanvas: 0, // Для перерисовски окна с выбором цвета (исчезает при изменении размера)

    gameFirstLoad: true, // Проверка, первый ли запуск игры (Для определения языка) gameDisplayingStartPage
    gameDisplayingStartPage: true, // Для отображения StartPage
    gameAgeWarningDialog: true, // предупреждающее окно 18+

    radialMenuShow: true, // Плавающая иконка с меню для мобильных устройств, при скрытой панели навигации
    appHeaderEnable: false, // По умолчанию выкл, на время показа стартовой страницы с информацией об игре.

    closeDrawerAfterSaving: false, // Автоматически закрывать панель сохранений, после нового сохранения / перезаписи / загрузки
    isOpenSettingsDrawer: false, // Открытие/Закрытия панели настройек
    isOpenSavesDrawer: false,

    patreon_link: 'https://patreon',
    tfgames_link: 'https://tfgames.site',
    f95zone_link: 'https://f95zone.to',
    discord_link: 'https://discordapp.com',

    saveName: '', // Название сохранения
    saveTime: '', // Когда была сохранена игра
    saveID: 0, // Номер сейва, совпадает с названием в localStorage
    saveGameVersion: '', // Версия сохранённой игры
    incompatibleSavesVer: 0,
  },
  plugins: [createPersistedState({ // WebCrypto здесь не подходит, тут однопоток.
    setState(key, state, storage) {
      return storage.setItem(key, AES.encrypt(JSON.serialize(state), keyGen(key)));
    },
    getState(key, storage, value) {
      try {
        return (value = storage.getItem(key).toString()) && typeof value !== 'undefined'
          ? JSON.deserialize(AES.decrypt(value, keyGen(key)).toString(UTF8))
          : undefined;
      } catch (error) {}
  
      return undefined;
    },
    // Функция слияния значений по умолчанию, и пользовательским store.
    // arrayMerger(store, saved){ 
    //   return assign(store, saved)
    // }
  })],
  mutations:{
    updateStore() { // Используется только для закрепления изменений во всех Store's
      this.state.gameName = this.state.gameName; // Пустышка
    },

    gameAgeWarningDialog() {
      this.state.gameAgeWarningDialog = !this.state.gameAgeWarningDialog;
    },
    gameFirstLoad(){
      this.state.gameFirstLoad = !this.state.gameFirstLoad;
    },
    gameDisplayingStartPage(){
      this.state.gameDisplayingStartPage = !this.state.gameDisplayingStartPage;
      this.state.appHeaderEnable = !this.state.appHeaderEnable;
    },

    isOpenSettingsDrawer(){
      this.state.isOpenSettingsDrawer = !this.state.isOpenSettingsDrawer;
    },
    isOpenSavesDrawer(){
      this.state.isOpenSavesDrawer = !this.state.isOpenSavesDrawer;
    },
    closeDrawerAfterSaving(){
      this.state.closeDrawerAfterSaving = !this.state.closeDrawerAfterSaving
    },

    // Смена языка
    langChange(state, lang){
      this.state.gameLang = lang;
    },

    gameHotkeysEnable(){
      this.state.gameHotkeysEnable = !this.state.gameHotkeysEnable;
    }
  },
  modules: {
    mChat,
    mChatData,
    sound,
    chars,
  }
})

function keyGen(saveName){ // Генерация уникального ключа
  const salt = '3F4428472B4B6250';
  return PBKDF2(saveName, salt, { keySize: 256 / 32 , iterations: 1}).toString();
}

export default store
