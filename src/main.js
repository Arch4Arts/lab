import Vue from 'vue'

import App from './App.vue'
import router from './router.js'
import store from './stores/store'
import "normalize.css"
import vuetify from './styles/vuetify'
import '@fortawesome/fontawesome-free/css/all.css' // Не менять, в free скидывать файлы от Pro
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import favicon from './assets/favicon.png'; // Для экспорта иконки в run build

Vue.config.productionTip = false

import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
Vue.use(Viewer) // Открывает картинку в новом окне ( аналог просмоторщика Picasa )

import VuePlyr from 'vue-plyr'
import 'plyr/dist/plyr.css'
Vue.use(VuePlyr) // Видео/Аудио плеер

import Chat from './components/Chat/index' // Мобильный чат
Vue.use(Chat, {})

import vueScrollBehavior from 'vue-scroll-behavior' // Сохранение положения прокрутки
Vue.use(vueScrollBehavior, { router: router })

import VueIziToast from 'vue-izitoast'; // Уведомления
import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast/dist/js/iziToast.min.js';
Vue.use(VueIziToast);

import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';
// import 'roboto-fontface/css/roboto/roboto-fontface.css'

import updateAllThemes from './styles/updateAllThemes';
import { checkSoundsEnable } from './components/GameSound'
import { bindHotkeys, unbindHotkeys }from './components/Hotkeys'

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

new Vue({
  router,
  store,
  vuetify,
  data: {
    isTouchDevice: false, // Является ли устройство сенсорным
  },
  mounted: function () { // Определение языка при первой загрузке / А также тип устройства
    this.$nextTick(function () {
      // Определение языка ТОЛЬКО при первой загрузке 
      this.detectLanguage()
      // // Является ли устройство сенсорным
      this.isTouchDevice = this.detectTouchDevice()
      // Обновляем оформление игры
      updateAllThemes()
      // Подключаем горячие клавиши (проверка внутри функции)
      bindHotkeys()
      // проверка состояния звука
      checkSoundsEnable()
    })
  },
  methods: {
    detectTouchDevice(){
      return !!('ontouchstart' in window  // works on most browsers 
      || navigator.maxTouchPoints);       // works on IE10/11 and Surface
    },
    detectLanguage(){
      if (store.state.gameFirstLoad) {
        let lang = window.navigator ? (window.navigator.language || window.navigator.systemLanguage || window.navigator.userLanguage) : "ru";
        lang = lang.substr(0, 2).toLowerCase();
        store.commit('gameFirstLoad');
        if ( lang == 'ru' ) store.commit('langChange');
      }
    },
    errNotify(error){
      Sentry.captureException(error); // Отправка ошибки черезе Sentry
      console.log(error)
      this.$store.state.gameLang 
      ? iziToast.info({message: `Error: ${error}`, position: 'bottomCenter', backgroundColor: 'rgb(255, 102, 102)', icon: 'fas fa-exclamation-triangle', close: true, closeOnClick: false, drag: false, timeout: 0})
      : iziToast.info({message: `Ошибка: ${error}`, position: 'bottomCenter', backgroundColor: 'rgb(255, 102, 102)', icon: 'fas fa-exclamation-triangle', close: true, closeOnClick: false, drag: false, timeout: 0})
    }
  },
  watch: { // Клавиатурные сокращения
    '$store.state.keyboardShortcutsVersion': function () {
      // Отвязываем обработчик со старыми значениями
      unbindHotkeys()
      // Привязываем обработчик с новыми значениями
      bindHotkeys()
    }
  },
  render: function (h) { return h(App) }
}).$mount('#app')

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