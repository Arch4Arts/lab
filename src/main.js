import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store/store'

import vuetify from './styles/vuetify'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
Vue.component('a-icon', FontAwesomeIcon)

import vClickOutside from 'v-click-outside'
Vue.use(vClickOutside)

import i18n from './i18n'

// Открывает картинку в новом окне ( аналог просмоторщика Picasa )
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
Vue.use(Viewer)

// Видео/Аудио плеер
import VuePlyr from 'vue-plyr'
import 'plyr/dist/plyr.css'
Vue.use(VuePlyr)

// Сохранение положения прокрутки
import vueScrollBehavior from 'vue-scroll-behavior'
Vue.use(vueScrollBehavior, { router: router })


// Сообственные функции и методы
import './js/specialActivate'
import updateTheme from './styles/updateTheme';
import './js/hotkeyHandler'

import { SentryPush } from './js/globalErrorsHandling';
import './js/globalErrorsHandling'


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
    isFullScreen: false, // Находится ли приложение в полноэкраном режиме
  },
  mounted: function () { // Init
    this.$nextTick(function () { // https://vuejsdevelopers.com/2019/01/22/vue-what-is-next-tick/
      // Определение языка
      this.checkLanguage()
      // Является ли устройство сенсорным
      this.detectTouchDevice();
      // Обновляем оформление игры
      updateTheme('game');
      updateTheme('mChat');
      
      const self = this;
      document.addEventListener("fullscreenchange", function () {
        if (document.fullscreenElement) {
          self.isFullScreen = true;
        } else {
          self.isFullScreen = false;
        }
      });
    })
  },
  methods: {
    detectTouchDevice(){ // https://stackoverflow.com/a/4819886/11574854
      this.isTouchDevice = !!('ontouchstart' in window  // works on most browsers 
      || navigator.maxTouchPoints);       // works on IE10/11 and Surface
    },
    checkLanguage(){
      if (store.state.isFirstGameLaunch) {
        let lang = window.navigator ? (window.navigator.language || window.navigator.systemLanguage || window.navigator.userLanguage) : "ru";
        lang = lang.substr(0, 2).toLowerCase();
        store.commit('isFirstGameLaunch');
        lang == 'ru' ? store.commit('langChange', 'ru') : store.commit('langChange', 'en');
      }
    },
    launchFullScreen() {
      let element = document.documentElement;

      if(element.requestFullscreen) {
        element.requestFullscreen();
      } else if(element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if(element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if(element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    },
    exitFullScreen() {
      if(document.exitFullscreen) {
        document.exitFullscreen();
      } else if(document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if(document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    },
    pushError(error){
      error = error.toString();
      SentryPush(error) // Отправка ошибки через Sentry
      console.error(error);
    }
  },
  render: function (h) { return h(App) }
}).$mount('#app')