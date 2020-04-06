import Vue from 'vue'

// Все стили для ant должны быть импортарованны вручную, для каждого компонента!
import 'ant-design-vue/lib/divider/style/index.css'
import { Divider, } from 'ant-design-vue'
Vue.use(Divider);

import App from './App.vue'
import router from './router.js'
import store from './stores/store'
import { NordLight, CustomDark, NordDark } from './Styles/themes' // Кастомные стили (темы)
import vuetify from './Styles/vuetify';
import '@fortawesome/fontawesome-free/css/all.css' // Не менять, в free скидывать файлы от Pro
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false

import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
Vue.use(Viewer) // Открывает картинку в новом окне ( аналог просмоторщика Picasa )

import VuePlyr from 'vue-plyr'
import 'plyr/dist/plyr.css'
Vue.use(VuePlyr) // Видео/Аудио плеер

import Chat from './components/Chat/index' // Чат
Vue.use(Chat, {})

import vueScrollBehavior from 'vue-scroll-behavior' // Сохранение положения прокрутки
Vue.use(vueScrollBehavior, { router: router })

import extractNumbers from 'extract-numbers' // Для ColorPicker'a

import VueIziToast from 'vue-izitoast'; // Уведомления
import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast/dist/js/iziToast.min.js';
Vue.use(VueIziToast);

import VueVirtualScroller from 'vue-virtual-scroller'
Vue.use(VueVirtualScroller)

import AsyncComputed from 'vue-async-computed'
Vue.use(AsyncComputed)

import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';
// import 'roboto-fontface/css/roboto/roboto-fontface.css'

import chatThemes from './Styles/chatThemes'

new Vue({
  router,
  store,
  vuetify,
  mounted: function () { // Определение языка при первой загрузке / А также тип устройства
    this.$nextTick(function () { 
      if (store.state.gameFirstLoad) {
        let lang = window.navigator ? (window.navigator.language || window.navigator.systemLanguage || window.navigator.userLanguage) : "ru";
        lang = lang.substr(0, 2).toLowerCase();
        store.commit('gameFirstLoad');
        if ( lang == 'ru' ) store.commit('langChange');
      }
      if (store.state.gameTheme === 'CustomDark') this.$vuetify.theme.themes.dark = CustomDark;
      if (store.state.gameTheme === 'NordDark') this.$vuetify.theme.themes.dark = NordDark;
      if (store.state.gameTheme === 'NordLight') this.$vuetify.theme.themes.dark = NordLight;
      // console.log(getComputedStyle(document.documentElement).getPropertyValue('--amouse-x'))
      chatThemes()
    })
  },
  methods: {
    notif_AchievementSoundEnable(){
    if (this.$store.state.notif_AchievementSoundEnable) {
      var audio = new Audio(require('./Media/audio/Achievements.mp3'));
      audio.volume = this.$store.state.notif_AchievementVolume;
      audio.play();
    }
    },
    notif_DiarySoundEnable(){
      if (this.$store.state.notif_DiarySoundEnable) {
        var audio = new Audio(require('./Media/audio/Diary.mp3'));
        audio.volume = this.$store.state.notif_DiaryVolume;
        audio.play();
      }
    },
    notif_SmartphoneSoundEnable(){
      if (this.$store.state.notif_SmartphoneSoundEnable) {
        var audio = new Audio(require('./Media/audio/Phone.mp3'));
        audio.volume = this.$store.state.notif_smartphoneVolume;
        audio.play();
      }
    },
    convertColor(Color){ // Преобразует hsl(100, 100%, 50%) в h=100, s=100, l=100
      // console.log('3' + Color)
      var hsl = extractNumbers(Color);
      // console.log('3_' + hsl)
      // console.log(parseFloat(hsl[0]))
      // console.log(parseFloat(hsl[1]))
      // console.log(parseFloat(hsl[2]) * 2)
      return { // Преобразуем иначе, вернётся не число, а элемент массива в виде строки
        h: parseFloat(hsl[0]), 
        s: parseFloat(hsl[1]),
        l: parseFloat(hsl[2]) * 2, // умножаем на 2, т.к в ColorPicker'e l всегда возвращается делённой на 2 (т.к l:50% - максимум для цвета 100% уже просто былеый цвет)
      };
    },
    errNotify(error){
      Sentry.captureException(error); // Отправка ошибки черезе Sentry
      console.log(error)
      this.$store.state.gameLang 
      ? iziToast.info({message: `Error: ${error}`, position: 'bottomCenter', backgroundColor: 'rgb(255, 102, 102)', icon: 'fas fa-exclamation-triangle', close: true, closeOnClick: false, drag: false, timeout: 0})
      : iziToast.info({message: `Ошибка: ${error}`, position: 'bottomCenter', backgroundColor: 'rgb(255, 102, 102)', icon: 'fas fa-exclamation-triangle', close: true, closeOnClick: false, drag: false, timeout: 0})
    },
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    sendMessage(mChatHistory_ChatID ,author, type, data, suggestions) { // Для suggestion ONLY нужно указать type: suggestion и data: undefined
      this.$store.state.mChat.mChat_NewMessagesCount = this.mChat_Show ? this.$store.state.mChat.mChat_NewMessagesCount : this.$store.state.mChat.mChat_NewMessagesCount + 1

      // setTimeout можно заменить на sleep(ms)
      if (this.$store.state.mChat.mChat_TypingIndicatorEnable && type !== 'suggestion' && this.$store.state.mChat.mChat_ContactsPage === false){
        this.onMessageWasSent(mChatHistory_ChatID, {author: author, type: 'typing', data: undefined, suggestions: undefined});
        (type === 'text' && data.text.length <= '8') 
        ? setTimeout(() => this.onMessageWasSent(mChatHistory_ChatID, {author: author, type: type, data: data, suggestions: suggestions}), 500) 
        : (type === 'text' && data.text.length <= '20') 
        ? setTimeout(() => this.onMessageWasSent(mChatHistory_ChatID, {author: author, type: type, data: data, suggestions: suggestions}), 1000)
        : setTimeout(() => this.onMessageWasSent(mChatHistory_ChatID, {author: author, type: type, data: data, suggestions: suggestions}), 3000)
      }
      else this.onMessageWasSent(mChatHistory_ChatID, {author: author, type: type, data: data, suggestions: suggestions})
    },
    onMessageWasSent(mChatHistory_ChatID, message){ // Импорт для userInput (Suggestions)
      // this.messageList = [...this.messageList, message]
      var users = this.$store.state.mChatHistory; // Не копируем массив, чтобы изменять оригинал
      for (let user of users) { // Перебираем для каждого пользователя
        if (user.mChatHistory_ChatID === mChatHistory_ChatID) {
          user.mChatHistory_unReadMsgCount += 1
          // Удаляем сообщение typing, если используется имитация набора
          if (user.mChatHistory_MsgHistory[user.mChatHistory_MsgHistory.length - 1].type === 'typing') user.mChatHistory_MsgHistory.splice([user.mChatHistory_MsgHistory.length - 1], 1)
          user.mChatHistory_MsgHistory = [...user.mChatHistory_MsgHistory, message]
          this.$store.commit('updateStores');
        }
      }
    },
    addContactToChatList(newContact){
      let doubleDetect = false;
      let contacts = this.$store.state.mChat.mChat_CurrentContacts_MC
      for (let contact of contacts) {
        if (contact === newContact) doubleDetect = true;
      }
      if (doubleDetect === false) {
        this.$store.state.mChat.mChat_CurrentContacts_MC.push(newContact);
        this.$store.commit('updateStores');
      }
    },
  },
  render: function (h) { return h(App) }
}).$mount('#app')

if (process.env.NODE_ENV === 'production') { // Включение Sentry только для продакшена
  Sentry.init({
    dsn: 'https://6b82c070a6874f70ad6e9fe5ebcb9fb8@sentry.io/1509214',
    integrations: [new Integrations.Vue({Vue, attachProps: true})],
    release: store.state.gameVersion, // Версия ПО
    beforeSend(event, hint) {
      fetch('https://sentry.io/api/1509214/store/?sentry_key=6b82c070a6874f70ad6e9fe5ebcb9fb8&sentry_version=7') // Проверка не блокируется ли Sentry блокировщиком рекламы
      .then(result => {
        console.log(`Sentry fetch status: ${result.status}\nmsg: ${result.statusText}\nOK: ${result.ok}`)
        if (result.status === 400) {
          if (event.exception && store.state.gameLang) {
            Sentry.showReportDialog({ 
              eventId: event.event_id,
              lang: 'en',
              title: 'It looks like the game crashed',
              subtitle: 'The game developer has been notified.',
              subtitle2: 'If you’d like to help, tell what happened below.',
              user: {
                name: 'Player',
                email: 'Player@example.com'
              },
            });
          } else {
            Sentry.showReportDialog({ 
              eventId: event.event_id,
              lang: 'ru',
              title: 'Произошел сбой игры',
              subtitle: 'Разработчик игры был уведомлён.',
              subtitle2: 'Если хочешь помочь, расскажи, что произошло',
              labelName: 'Имя',
              labelEmail: 'Почта',
              labelComments: 'Что произошло?',
              errorGeneric: 'При отправке отчета произошла неизвестная ошибка. Пожалуйста, попробуйте еще раз',
              errorFormEntry: 'Заполни все поля, и попробуй еще раз',
              successMessage: 'Спасибо! Отчёт был отправлен',
              user: {
                name: 'Player',
                email: 'Player@example.ru'
              },
            });
          }
        } else {
          store.state.gameLang 
          ? iziToast.info({message: `Sentry failed to send error report: status: ${result.status}\nmsg: ${result.statusText}\nOK: ${result.ok}. Add your site to the ad blocker exception list.`, position: 'bottomCenter', backgroundColor: 'rgb(255, 102, 102)', close: true, closeOnClick: false, drag: false, timeout: 0})
          : iziToast.info({message: `Sentry не удалось отправить отчёт об ошибке: status: ${result.status}\nmsg: ${result.statusText}\nOK: ${result.ok}. Добавьте сайт в список исключений блокировщика рекламы.`, position: 'bottomCenter', backgroundColor: 'rgb(255, 102, 102)', close: true, closeOnClick: false, drag: false, timeout: 0})
        }
      })
      .catch(result => {
        store.state.gameLang 
        ? iziToast.info({message: `Sentry failed to send error report: ${result}. Add your site to the ad blocker exception list.`, position: 'bottomCenter', backgroundColor: 'rgb(255, 102, 102)', close: true, closeOnClick: false, drag: false, timeout: 0})
        : iziToast.info({message: `Sentry не удалось отправить отчёт об ошибке: ${result}. Добавьте сайт в список исключений блокировщика рекламы.`, position: 'bottomCenter', backgroundColor: 'rgb(255, 102, 102)', close: true, closeOnClick: false, drag: false, timeout: 0})
      })
      return event;
    }
  })
};

if (process.env.NODE_ENV === 'production') {
  Vue.config.errorHandler = function(err, vm, info) { // Обработчик ошибок Vue
    Sentry.captureException(err, vm, info);
    store.state.gameLang 
    ? iziToast.info({message: `Error: ${err.toString()} Info: ${info}`, position: 'bottomCenter', backgroundColor: 'rgb(255, 102, 102)', icon: 'fas fa-exclamation-triangle', close: true, closeOnClick: false, drag: false, timeout: 0})
    : iziToast.info({message: `Ошибка: ${err.toString()} Инфо: ${info}`, position: 'bottomCenter', backgroundColor: 'rgb(255, 102, 102)', icon: 'fas fa-exclamation-triangle', close: true, closeOnClick: false, drag: false, timeout: 0})
  };
};

// window.onerror = function(message, source, line, column, error) {
//   console.log(`Error: ${error} ${message} ${source} ${line}`);
// }

// var decoded = String.fromCharCode(...new Uint8Array(encrypted.cipherData));
// var encoded = Uint8Array.from([...decoded].map(ch => ch.charCodeAt())).buffer;

// export async function WebCrypto(){
//   var mode = 'AES-GCM',
//   length = 256,
//   ivLength = 12;

//   var encrypted = await encrypt('Secret text', 'password', mode, length, ivLength).then(function(data){encrypted = data
// /*   console.log(store.state.gameName) */
// })
//   // console.log(encrypted); // { cipherText: ArrayBuffer, iv: Uint8Array }
//   return encrypted

//   // var decrypted = await decrypt(encrypted, 'password', mode, length);
//   // console.log(decrypted); // Secret text
//   }


// CryptoJS.AES.encrypt(JSON.stringify(this.$store.state), this.$store.state.Cryptokey)
// CryptoJS.AES.decrypt(temp.toString(), this.$store.state.Cryptokey).toString(CryptoJS.enc.Utf8)
// window.crypto.subtle.generateKey(
//     {
//         name: "AES-GCM",
//         length: 256, //can be  128, 192, or 256
//     },
//     true, //whether the key is extractable (i.e. can be used in exportKey)
//     ["encrypt", "decrypt"] //can "encrypt", "decrypt", "wrapKey", or "unwrapKey"
// )
// .then(function(key){
//     console.log(key);
//     window.crypto.subtle.exportKey(
//         "jwk", //can be "jwk" or "raw"
//         key //extractable must be true
//     )
//     .then(function(keydata){
//         //returns the exported key data
//         console.log(JSON.stringify(keydata)); //{"alg":"A256GCM","ext":true,"k":"3DHkmQMNctBvOYeb8RWuCM8OGTH6NanJi3erMcwN-jU","key_ops":["encrypt","decrypt"],"kty":"oct"}
//     })
//     .catch(function(err){
//         console.error(err);
//     });
// })
// .catch(function(err){
//     console.error(err);
// });