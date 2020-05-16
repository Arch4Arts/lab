import Vue from 'vue'

import App from './App.vue'
import router from './router.js'
import store from './stores/store'

import vuetify from './styles/vuetify'

import vClickOutside from 'v-click-outside'
Vue.use(vClickOutside)

import i18n from './i18n'

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
  i18n,
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
        lang == 'ru' ? store.commit('langChange', 'ru') : store.commit('langChange', 'en');
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