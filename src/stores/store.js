import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import chat from './modules/Chat'
import chatUsers from './modules/chatUsers'

var CryptoJS = require("crypto-js");

// const persistPlugin = store => {
//   store.subscribe((mutations, state) => {
//     localforage.setItem('vuex', state)
//   })
// }

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    saveName: '', // Название сохранения
    saveTime: '', // Когда была сохранена игра
    saveID: 0, // НомерСейва, совпадает с названием в localStorage

    name: 'Lab',
    version: '0.0.4', 
    initialized: false, // Не отрисосывать страницу пока не запустится initializeApp

    DrawerVisible: false, // Для AppHeader
    appHeaderEnable: true, // Вкл/Выкл AppHeader (для свайпа)
    
    firstLoad: true, // Проверка, первый ли запуск игры (Для определения языка)
    firstStart: true, // Для отображения StartPage
    firstDialog: true, // Стартовое окно 18+

    TestPageChat: false, // Тестовая страница чата, по умолчанию отключена

    Header: false, // Вкл/выкл кнопки в шапке

    achievementVolume: 0.5, // Громкость уведомления достижения
    diaryVolume: 0.5, // Громкость уведомления дневника
    phoneVolume: 0.5, // Громкость уведомления телефона

    achievementSound: true, // Вкл/Выкл звука
    diarySound: true, // Вкл/Выкл звука
    phoneSound: true, // Вкл/Выкл звука
    lang: true, // true: en / false: ru

    // ПЕРСОНАЖИ

    mcName: 'Artur', // Для английского варианта
    mcIm:   'Артур',
    mcRod:  'Артура',
    mcDat:  'Артуру',
    mcVin:  'Артура',
    mcTvor: 'Артуром',
    mcPred: 'Артуре',
    mcColor: 'hsl(100, 100%, 50%)', // Цвет диалогов

    sisterName: 'Adelina',
    sisterIm:   'Аделина',
    sisterRod:  'Аделина',
    sisterDat:  'Аделине',
    sisterVin:  'Аделину',
    sisterTvor: 'Аделиной',
    sisterPred: 'Аделине',
    sisterColor: 'hsl(200, 100%, 50%)',

    girlfriendName: '',
    girlfriendColor: 'hsl(100, 100%, 50%)',

    roommateName: '',
    roommateColor: 'hsl(100, 100%, 50%)',

    patreon_link: 'https://patreon',
    tfgames_link: 'https://tfgames.site',
    f95zone_link: 'https://f95zone.to',
    discord_link: 'https://discordapp.com'
  },
  plugins: [createPersistedState({
    setState(key, state, storage) {
      return storage.setItem(key, CryptoJS.AES.encrypt(JSON.stringify(state), keyGen(key)));
    },
    getState(key, storage, value) {
      try {
        return (value = storage.getItem(key).toString()) && typeof value !== 'undefined'
          ? JSON.parse(CryptoJS.AES.decrypt(value, keyGen(key)).toString(CryptoJS.enc.Utf8))
          : undefined;
      } catch (err) {}
  
      return undefined;
    }
  })],
  mutations:{
    firstDialog() {
      this.state.firstDialog = !this.state.firstDialog;
    },
    firstLoad(){
      this.state.firstLoad = !this.state.firstLoad;
    },
    firstStart(){
      this.state.firstStart = !this.state.firstStart;
    },
    Header(){ // Вкл/Выкл кнопок в хедере
      this.state.Header = !this.state.Header;
    },

    // Громкость звука
    achievementVolume(){
      this.state.achievementVolume = this.state.achievementVolume;
    },
    diaryVolume(){
      this.state.diaryVolume = this.state.diaryVolume;
    },
    phoneVolume(){
      this.state.phoneVolume = this.state.phoneVolume;
    },

    // Вкл/Выкл звука
    achievementSound(){
      this.state.achievementSound = !this.state.achievementSound;
    },
    diarySound(){
      this.state.diarySound = !this.state.diarySound;
    },
    phoneSound(){
      this.state.phoneSound = !this.state.phoneSound;
    },

    // Смена языка
    langChange(){
      this.state.lang = !this.state.lang;
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
      } else { // просто английские имена
        this.state.mcName = this.state.mcName;
        this.state.sisterName = this.state.sisterName;
      }
    },
  },
  modules: {
    chat,
    chatUsers,
  }
})

function keyGen(saveName){ // Генерация уникального ключа на основе saveID
  var salt = '3F4428472B4B6250';
  return CryptoJS.PBKDF2(saveName, salt, { keySize: 256 / 32 , iterations: 1}).toString();
}

// async function initializeApp() {
//   store.replaceState(await localforage.getItem('vuex'));
//   store.state.initialized = true
// }

// initializeApp()

// // Генерация уникального ключа на основе имени сохранения
// async function genEncryptionKey(saveName, mode, length) {
//   var algo = {
//   name: 'PBKDF2',
//   hash: 'SHA-512',
//   salt: new TextEncoder().encode('a-unique-salt-for-save'),
//   iterations: 1000
//   };
//   var derived = { name: mode, length: length };
//   var encoded = new TextEncoder().encode(saveName);
//   var key = await crypto.subtle.importKey('raw', encoded, { name: 'PBKDF2' }, false, ['deriveKey']);
  
//   return crypto.subtle.deriveKey(algo, key, derived, false, ['encrypt', 'decrypt']);
// };

// // Шифрование
// async function encrypt (saveName, saveData) {
//   var algo = {
//   name: 'AES-GCM',
//   length: 256,
//   iv: crypto.getRandomValues(new Uint8Array(12))
//   };
//   var key = await genEncryptionKey(saveName, 'AES-GCM', 256);
//   var encoded = new TextEncoder().encode(saveData);
  
//   return {
//   cipherData: await crypto.subtle.encrypt(algo, key, encoded),
//   iv: algo.iv
//   };
// }

// // Дешифрование
// async function decrypt (saveName,encryptedData) {
//   var algo = {
//   name: 'AES-GCM',
//   length: 256,
//   iv: encryptedData.iv
//   };
//   var key = await genEncryptionKey(saveName, 'AES-GCM', 256);
//   var decrypted = await crypto.subtle.decrypt(algo, key, encryptedData.cipherData);

//   return new TextDecoder().decode(decrypted);
// }

// export async function WebCrypto(saveName, saveData){
//   if ( typeof saveName !== 'undefined' && typeof saveData !== 'undefined') {
//     return await encrypt(saveName, saveData).then(encryptedData => localforage.setItem(saveName, encryptedData))
//   } else {
//     var Data;
//     await localforage.getItem(saveName).then(encryptedData => Data = encryptedData)
//     return await decrypt(saveName, Data)
//   }
// }

export default store
// Копия начального состояния игры
const initialStateCopy = JSON.parse(JSON.stringify(store.state))
// функция вызова сброса игры
export function resetState() {
  store.replaceState(JSON.parse(JSON.stringify(initialStateCopy)))
}
