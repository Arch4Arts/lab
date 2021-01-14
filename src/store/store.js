import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import mChat from './modules/mobileChat/mChat'
import mChatList from './modules/mobileChat/mChatList'
import mChatMeta from './modules/mobileChat/mChatMeta'
import mChatCharProfiles from './modules/mobileChat/mChatCharProfiles'
import hotkeySettings from './modules/hotkeySettings'
import soundSettings from './modules/soundSettings'
import chars from './modules/chars'

const AES = require("crypto-js/aes");
const UTF8 = require('crypto-js/enc-utf8')
const PBKDF2 = require('crypto-js/pbkdf2')

JSON.serialize = require('serialize-javascript');
JSON.deserialize = function(serializedJavascript){
  return eval(`( ${serializedJavascript} )`);
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

    
    reRender_mChatPlayersVolume: 0, // Используется для перерендера плееров в чате, изменяется в Saves.vue 
    reRender_ColorPickerCanvas: 0, // Для перерисовски окна с выбором цвета (исчезает при изменении размера)
    reRender_SpecialComponents: 0, // Для обновления состояния Premium компонентов, при активации и деактивации

    isFirstGameLaunch: true, // Проверка, первый ли запуск игры (Для определения языка) isShowStartPage
    isShowStartPage: true, // Для отображения StartPage
    isShowAgeWarningDialog: true, // предупреждающее окно 18+

    showQuickMenu: true, // Плавающая иконка с меню для мобильных устройств, при скрытой панели навигации
    // ! нужен рефакторинг
    isQuickMenuHorizontalAlign: true, // True - horizontal, false - vertical

    appHeaderEnable: false, // По умолчанию выкл, во время показа стартовой страницы с информацией об игре.

    isCloseDrawerAfterSaving: false, // Автоматически закрывать панель сохранений, после нового сохранения / перезаписи / загрузки
    showSettingsDrawer: false,
    showSavesDrawer: false,

    patreon_link: 'https://patreon',
    tfgames_link: 'https://tfgames.site',
    f95zone_link: 'https://f95zone.to',
    discord_link: 'https://discordapp.com',

    saveName: '', // Название сохранения
    saveTime: '', // Когда была сохранена игра
    saveID: 0, // Номер сейва, совпадает с названием в localStorage
    saveGameVersion: '', // Версия сохранённой игры
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

    isShowAgeWarningDialog() {
      this.state.isShowAgeWarningDialog = !this.state.isShowAgeWarningDialog;
    },
    isFirstGameLaunch() {
      this.state.isFirstGameLaunch = !this.state.isFirstGameLaunch;
    },
    isShowStartPage() {
      this.state.isShowStartPage = !this.state.isShowStartPage;
      this.state.appHeaderEnable = !this.state.appHeaderEnable;
    },

    isQuickMenuHorizontalAlign() {
      this.state.isQuickMenuHorizontalAlign = !this.state.isQuickMenuHorizontalAlign;
    },

    closeDrawerAfterSaving() {
      this.state.isCloseDrawerAfterSaving = !this.state.isCloseDrawerAfterSaving;
    },
    showSettingsDrawer() {
      this.state.showSettingsDrawer = !this.state.showSettingsDrawer;
    },
    showSavesDrawer() {
      this.state.showSavesDrawer = !this.state.showSavesDrawer;
    },


    // Смена языка
    langChange(state, lang) {
      this.state.gameLang = lang;
    },

    gameHotkeysEnable() {
      this.state.gameHotkeysEnable = !this.state.gameHotkeysEnable;
    }
  },
  modules: {
    mChat,
    mChatList,
    mChatMeta,
    mChatCharProfiles,
    hotkeySettings,
    soundSettings,
    chars,
  }
})

function keyGen(saveName){ // Генерация уникального ключа
  const salt = '3F4428472B4B6250';
  return PBKDF2(saveName, salt, { keySize: 256 / 32 , iterations: 1}).toString();
}

export default store
