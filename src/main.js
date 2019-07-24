import Vue from 'vue'

// Все стили для ant должны быть импортарованны вручную, для каждого компонента!
import 'ant-design-vue/lib/divider/style/index.less'
import { Divider, } from 'ant-design-vue'
Vue.use(Divider);

import './plugins/vuetify'

import App from './App.vue'
import router from './router.js'
import store from './stores/store'

Vue.config.productionTip = false

import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
Vue.use(Viewer) // Открывает картинку в новом окне ( аналог просмоторщика Picasa )

import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'
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

import SmoothScrollbar from 'vue-smooth-scrollbar'
Vue.use(SmoothScrollbar)

import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';

// if (process.env.NODE_ENV === 'production') { // Включение Sentry только для продакшена
  Sentry.init({
    dsn: 'https://6b82c070a6874f70ad6e9fe5ebcb9fb8@sentry.io/1509214',
    integrations: [new Integrations.Vue({Vue, attachProps: true})],
    release: store.state.version, // Версия ПО
    beforeSend(event, hint) {
      fetch('https://sentry.io/api/1509214/store/?sentry_key=6b82c070a6874f70ad6e9fe5ebcb9fb8&sentry_version=7') // Проверка не блокируется ли Sentry блокировщиком рекламы
      .then(result => {
        console.log(`Sentry fetch status: ${result.status}\nmsg: ${result.statusText}\nOK: ${result.ok}`)
        if (result.status === 400) {
          if (event.exception && store.state.lang) {
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
          }
          else {
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
          return event;
        }
        else {
          store.state.lang 
          ? iziToast.info({message: `Sentry failed to send error report: status: ${result.status}\nmsg: ${result.statusText}\nOK: ${result.ok}. Add your site to the ad blocker exception list.`, position: 'bottomCenter', backgroundColor: 'rgb(255, 102, 102)', close: true, closeOnClick: false, drag: false, timeout: 0})
          : iziToast.info({message: `Sentry не удалось отправить отчёт об ошибке: status: ${result.status}\nmsg: ${result.statusText}\nOK: ${result.ok}. Добавьте сайт в список исключений блокировщика рекламы.`, position: 'bottomCenter', backgroundColor: 'rgb(255, 102, 102)', close: true, closeOnClick: false, drag: false, timeout: 0})
        }
      })
      .catch(result => {
        store.state.lang 
        ? iziToast.info({message: `Sentry failed to send error report: ${result}. Add your site to the ad blocker exception list.`, position: 'bottomCenter', backgroundColor: 'rgb(255, 102, 102)', close: true, closeOnClick: false, drag: false, timeout: 0})
        : iziToast.info({message: `Sentry не удалось отправить отчёт об ошибке: ${result}. Добавьте сайт в список исключений блокировщика рекламы.`, position: 'bottomCenter', backgroundColor: 'rgb(255, 102, 102)', close: true, closeOnClick: false, drag: false, timeout: 0})
      })
    }
  })
// };

Vue.config.errorHandler = function(err, vm, info) { // Обработчик ошибок Vue
  if (process.env.NODE_ENV === 'production') Sentry.captureException(err, vm, info);
  store.state.lang 
  ? iziToast.info({message: `Error: ${err.toString()} Info: ${info}`, position: 'bottomCenter', backgroundColor: 'rgb(255, 102, 102)', icon: 'fas fa-exclamation-triangle', close: true, closeOnClick: false, drag: false, timeout: 0})
  : iziToast.info({message: `Ошибка: ${err.toString()} Инфо: ${info}`, position: 'bottomCenter', backgroundColor: 'rgb(255, 102, 102)', icon: 'fas fa-exclamation-triangle', close: true, closeOnClick: false, drag: false, timeout: 0})
}

// window.onerror = function(message, source, line, column, error) {
//   console.log(`Error: ${error} ${message} ${source} ${line}`);
// }

new Vue({
  router,
  store,
  mounted: function () { // Определение языка при первой загрузке / А также тип устройства
    this.$nextTick(function () { 
      if (store.state.firstLoad) {
        let lang = window.navigator ? (window.navigator.language || window.navigator.systemLanguage || window.navigator.userLanguage) : "ru";
        lang = lang.substr(0, 2).toLowerCase();
        store.commit('firstLoad');
        if ( lang == 'ru' ) store.commit('langChange');
      }
    })
  },
  methods: {

    achievementSound(){
    if (this.$store.state.achievementSound) {
      var audio = new Audio(require('./Media/audio/Achievements.mp3'));
      audio.volume = this.$store.state.achievementVolume;
      audio.play();
    }
    },
    diarySound(){
      if (this.$store.state.diarySound) {
        var audio = new Audio(require('./Media/audio/Diary.mp3'));
        audio.volume = this.$store.state.diaryVolume;
        audio.play();
      }
    },
    phoneSound(){
      if (this.$store.state.phoneSound) {
        var audio = new Audio(require('./Media/audio/Phone.mp3'));
        audio.volume = this.$store.state.phoneVolume;
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
      this.$store.state.lang 
      ? iziToast.info({message: `Error: ${error}`, position: 'bottomCenter', backgroundColor: 'rgb(255, 102, 102)', icon: 'fas fa-exclamation-triangle', close: true, closeOnClick: false, drag: false, timeout: 0})
      : iziToast.info({message: `Ошибка: ${error}`, position: 'bottomCenter', backgroundColor: 'rgb(255, 102, 102)', icon: 'fas fa-exclamation-triangle', close: true, closeOnClick: false, drag: false, timeout: 0})
    },
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    sendMessage(chatID ,author, type, data, suggestions) { // Для suggestion ONLY нужно указать type: suggestion и data: undefined
      this.$store.state.chat.newMessagesCount = this.isChatOpen ? this.$store.state.chat.newMessagesCount : this.$store.state.chat.newMessagesCount + 1

      // setTimeout можно заменить на sleep(ms)
      if (this.$store.state.chat.TypingIndicator && type !== 'suggestion' && this.$store.state.chat.UserListShow === false){
        this.onMessageWasSent(chatID, {author: author, type: 'typing', data: undefined, suggestions: undefined});
        (type === 'text' && data.text.length <= '8') 
        ? setTimeout(() => this.onMessageWasSent(chatID, {author: author, type: type, data: data, suggestions: suggestions}), 500) 
        : (type === 'text' && data.text.length <= '20') 
        ? setTimeout(() => this.onMessageWasSent(chatID, {author: author, type: type, data: data, suggestions: suggestions}), 1000)
        : setTimeout(() => this.onMessageWasSent(chatID, {author: author, type: type, data: data, suggestions: suggestions}), 3000)
      }
      else this.onMessageWasSent(chatID, {author: author, type: type, data: data, suggestions: suggestions})
    },
    onMessageWasSent(chatID, message){ // Импорт для userInput (Suggestions)
      // this.messageList = [...this.messageList, message]
      var users = this.$store.state.chatUsers; // Не копируем массив, чтобы изменять оригинал
      for (let user of users) { // Перебираем для каждого пользователя
        if (user.chatID === chatID) {
          user.unreadMSGCount += 1
          // Удаляем сообщение typing, если используется имитация набора
          if (user.messagesHistory[user.messagesHistory.length - 1].type === 'typing') user.messagesHistory.splice([user.messagesHistory.length - 1], 1)
          user.messagesHistory = [...user.messagesHistory, message]
        }
      }
    },
    addContactToChatList(newContact){
      let doubleDetect = false;
      let contacts = this.$store.state.chat.currentContacts
      for (let contact of contacts) {
        if (contact === newContact) doubleDetect = true;
      }
      if (doubleDetect === false) this.$store.state.chat.currentContacts.push(newContact)
    }
  },
  render: function (h) { return h(App) }
}).$mount('#app')

// var decoded = String.fromCharCode(...new Uint8Array(encrypted.cipherData));
// var encoded = Uint8Array.from([...decoded].map(ch => ch.charCodeAt())).buffer;

// export async function WebCrypto(){
//   var mode = 'AES-GCM',
//   length = 256,
//   ivLength = 12;
  
//   var encrypted = await encrypt('Secret text', 'password', mode, length, ivLength).then(function(data){encrypted = data
// /*   console.log(store.state.name) */
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