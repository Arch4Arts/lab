import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import mChat from './modules/mobileChat/mChat'
import mChatHistory from './modules/mobileChat/mChatHistory'
import chars from './modules/chars'

var packageJson = require('../../package.json');

// var CryptoJS = require("crypto-js");

var AES = require("crypto-js/aes");
var utf8 = require('crypto-js/enc-utf8')
var PBKDF2 = require('crypto-js/pbkdf2')

// const persistPlugin = store => {
//   store.subscribe((mutations, state) => {
//     localforage.setItem('vuex', state)
//   })
// }

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    gameName: packageJson.name,
    gameVersion: packageJson.version, 

    gameLang: true, // true: en / false: ru
    gameFont: 'Roboto',
    gameFontSize: '14pt',
    gameCurrentTheme: 'NordDark',
    gameThemesList: [
      { themeName: 'NordLight' },
      { themeName: 'NordDark' },
      { themeName: 'CustomDark' }
    ],
    
    gameFirstLoad: true, // Проверка, первый ли запуск игры (Для определения языка) gameDisplayingStartPage
    gameDisplayingStartPage: true, // Для отображения StartPage
    gameAgeWarningDialog: true, // предупреждающее окно 18+

    radialMenuShow: true, // Плавающая иконка с меню для мобильных устройств, при скрытой панели навигации
    isOpenSettingsDrawer: false, // Открытие/Закрытия панели настройек
    isOpenSavesDrawer: false,
    appHeaderEnable: false, // По умолчанию выкл, на время показа стартовой страницы с информацией об игре.

    notif_AchievementVolume: 0.5, // Громкость уведомления о получении достижения
    notif_DiaryVolume: 0.5, // Громкость уведомления дневника
    notif_smartphoneVolume: 0.5, // Громкость уведомления смартфона

    notif_AchievementSoundEnable: true, // Вкл/Выкл звука
    notif_DiarySoundEnable: true, // Вкл/Выкл звука
    notif_SmartphoneSoundEnable: true, // Вкл/Выкл звука

    patreon_link: 'https://patreon',
    tfgames_link: 'https://tfgames.site',
    f95zone_link: 'https://f95zone.to',
    discord_link: 'https://discordapp.com',

    saveName: '', // Название сохранения
    saveTime: '', // Когда была сохранена игра
    saveID: 0, // Номер сейва, совпадает с названием в localStorage
  },
  plugins: [createPersistedState({ // WebCrypto здесь не подходит, тут однопоток.
    setState(key, state, storage) {
      return storage.setItem(key, AES.encrypt(JSON.stringify(state), keyGen(key)));
    },
    getState(key, storage, value) {
      try {
        return (value = storage.getItem(key).toString()) && typeof value !== 'undefined'
          ? JSON.parse(AES.decrypt(value, keyGen(key)).toString(utf8))
          : undefined;
      } catch (error) {}
  
      return undefined;
    }
    // setState(key, state, storage) {
    //   return ls.set(key, {state})
    // },
    // getState(key, storage, value) {
    //   try {
    //     return (value = ls.get(key)) && typeof value !== 'undefined'
    //       ? value.state
    //       : undefined;
    //   } catch (err) {}
  
    //   return undefined;
    // }
  })],
  mutations:{
    updateStores() { // Используется только для закрепления изменений во всех Store's
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

    // Громкость звука
    notif_AchievementVolume(){
      this.state.notif_AchievementVolume = this.state.notif_AchievementVolume;
    },
    notif_DiaryVolume(){
      this.state.notif_DiaryVolume = this.state.notif_DiaryVolume;
    },
    notif_smartphoneVolume(){
      this.state.notif_smartphoneVolume = this.state.notif_smartphoneVolume;
    },

    // Вкл/Выкл звука
    notif_AchievementSoundEnable(){
      this.state.notif_AchievementSoundEnable = !this.state.notif_AchievementSoundEnable;
    },
    notif_DiarySoundEnable(){
      this.state.notif_DiarySoundEnable = !this.state.notif_DiarySoundEnable;
    },
    notif_SmartphoneSoundEnable(){
      this.state.notif_SmartphoneSoundEnable = !this.state.notif_SmartphoneSoundEnable;
    },

    // Смена языка
    langChange(){
      this.state.gameLang = !this.state.gameLang;
    },

    // Сохранение имен при настройке
    saveColorsChar(Color){
      this.state.mcColor = this.state.mcColor;
      this.state.sisterColor = this.state.sisterColor;
    },
    saveCharNames(state, lang){
      if ( lang == 'ru' ) { // если ru, сохраняем имена с учетом склонения
        this.state.mcIm = this.state.mcIm;
        this.state.mcRod = this.state.mcRod;
        this.state.mcDat = this.state.mcDat;
        this.state.mcVin = this.state.mcVin;
        this.state.mcTvor = this.state.mcTvor;
        this.state.mcPred = this.state.mcPred;

        this.state.sisterIm = this.state.sisterIm;
        this.state.sisterRod = this.state.sisterRod;
        this.state.sisterDat = this.state.sisterDat;
        this.state.sisterVin = this.state.sisterVin;
        this.state.sisterTvor = this.state.sisterTvor;
        this.state.sisterPred = this.state.sisterPred;

        // Обновление имен для чата

        state.mChatHistory[0].name = this.state.mcIm
      } else { // простые английские имена
        this.state.mcName = this.state.mcName;
        this.state.sisterName = this.state.sisterName;

        // Обновление имен для чата
      }
    },
  },
  modules: {
    mChat,
    mChatHistory,
    chars,
  }
})

function keyGen(saveName){ // Генерация уникального ключа
  var salt = '3F4428472B4B6250';
  return PBKDF2(saveName, salt, { keySize: 256 / 32 , iterations: 1}).toString();
}

export default store
// Копия начального состояния игры
const initialStateCopy = JSON.parse(JSON.stringify(store.state))
// функция вызова сброса игры
export function resetState() {
  store.replaceState(JSON.parse(JSON.stringify(initialStateCopy)))
}
