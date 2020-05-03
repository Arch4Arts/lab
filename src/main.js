import Vue from 'vue'

import App from './App.vue'
import router from './router.js'
import store from './stores/store'

import vuetify from './styles/vuetify'

import favicon from './assets/favicon.png'; // Для экспорта иконки в run build

import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
Vue.use(Viewer) // Открывает картинку в новом окне ( аналог просмоторщика Picasa )

import VuePlyr from 'vue-plyr'
import 'plyr/dist/plyr.css'
Vue.use(VuePlyr) // Видео/Аудио плеер

import vueScrollBehavior from 'vue-scroll-behavior' // Сохранение положения прокрутки
Vue.use(vueScrollBehavior, { router: router })

import VueIziToast from 'vue-izitoast'; // Уведомления
import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast/dist/js/iziToast.min.js';
Vue.use(VueIziToast);

import VueDraggableResizable from 'vue-draggable-resizable'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
Vue.component('vue-draggable-resizable', VueDraggableResizable)

import updateThemes from './styles/updateThemes';
import { checkSoundsEnable } from './js/GameSound'
import { bindHotkeys, unbindHotkeys }from './js/Hotkeys'

import { SentryPush } from './js/GlobalErrorsHandling';
import './js/GlobalErrorsHandling'



import { name as gameName } from  '../package.json';
import { version as gameVersion} from  '../package.json';
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  
  data: {
    gameName: gameName,
    gameVersion: gameVersion,

    isTouchDevice: false, // Является ли устройство сенсорным
    gameEdition: process.env.VUE_APP_EDITION, // Присваивается при npm run build-special
  },
  mounted: function () { // Определение языка при первой загрузке / А также тип устройства
    this.$nextTick(function () { // https://vuejsdevelopers.com/2019/01/22/vue-what-is-next-tick/
      // Определение языка ТОЛЬКО при первой загрузке 
      this.detectLanguage()
      // // Является ли устройство сенсорным
      this.isTouchDevice = this.detectTouchDevice()
      // Обновляем оформление игры
      updateThemes()
      // Подключаем горячие клавиши (проверка внутри функции)
      bindHotkeys()
      // проверка состояния звука
      checkSoundsEnable()
    })
  },
  methods: {
    detectTouchDevice(){ // https://stackoverflow.com/a/4819886/11574854
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
      SentryPush(error) // Отправка ошибки через Sentry
      console.error(`${error}`);
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