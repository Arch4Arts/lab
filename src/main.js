import Vue from 'vue'

import App from './App.vue'
import router from './router.js'
import store from './store/store'

import vuetify from './styles/vuetify'

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
import './js/specialActivate-worker/index'
import updateTheme from './styles/updateTheme';
import { checkSoundsEnable } from './js/gameSound'
import hotkeySystem from './js/hotkeySystem'

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
  mounted: function () { // Определение языка при первой загрузке / А также тип устройства
    this.$nextTick(function () { // https://vuejsdevelopers.com/2019/01/22/vue-what-is-next-tick/
      // Определение языка ТОЛЬКО при первой загрузке 
      this.detectLanguage()
      // Является ли устройство сенсорным
      this.isTouchDevice = this.detectTouchDevice();
      // Обновляем оформление игры
      updateTheme('game');
      updateTheme('mChat');
      // Подключаем горячие клавиши (проверка внутри функции)
      hotkeySystem.bindHotkeys();
      // проверка состояния звука
      checkSoundsEnable();
      
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
    errNotify(error){
      SentryPush(error) // Отправка ошибки через Sentry
      console.error(error);
    }
  },
  watch: { // Клавиатурные сокращения
    '$store.state.keyboardShortcutsVersion': function () {
      // Отвязываем обработчик со старыми значениями
      hotkeySystem.unbindHotkeys()
      // Привязываем обработчик с новыми значениями
      hotkeySystem.bindHotkeys()
    }
  },
  render: function (h) { return h(App) }
}).$mount('#app')