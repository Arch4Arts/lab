import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import '@fortawesome/fontawesome-pro/css/all.css'

Vue.use(Vuetify, {
  iconfont: 'fa',
  theme: {
    primary: '#292929',
    secondary: '#E0E0E0',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
    // Мои настройки
    font_color: '#E0E0E0',
    bg_element: '#222222',
    head_element: '2d2d2d'
  }
})
