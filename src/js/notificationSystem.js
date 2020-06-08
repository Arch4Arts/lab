import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast/dist/js/iziToast.min.js';
import vuetify from '../styles/vuetify'

// идентификатор infoCircle нигде не используется, но импорт нужен для загрузки самого svg файла
import exclamationTriangle from '../assets/exclamation-triangle.svg'
import infoCircle from '../assets/info-circle.svg'

import store from '../stores/store'

// Оповещения для globalErrorsHandling.js
export function mChatNotify(extOptions){
  // Параметры по умолчанию
  let options = {
    class: 'mchat-notify',
    position: 'bottomRight',
    messageSize: '16',
    displayMode: vuetify.framework.breakpoint.xsOnly ? 2 : 0,
    close: false,
    closeOnClick: true,
    onClosing: () => { // Открывает чат при нажатии на уведомление
      store.commit('mChatShow');
      store.state.mChat.selectedChatID = extOptions.chatID
      store.state.mChat.selectedChatAvatar = extOptions.chatAvatar
      store.commit('mChatListShow');
    },
    drag: true,
    // timeout: 15000,
    progressBar: false
  }
  // Вывод оповещения
  iziToast.show(Object.assign(options, extOptions))
}

// Оповещения для компонента saves
export function saveNotify(extOptions){
  // Параметры по умолчанию
  let options = {
    class: 'save-notify-save',
    iconUrl: 'assets/img/info-circle.svg',
    position: 'bottomCenter',
    messageSize: '16',
    displayMode: 2, 
    closeOnClick: true,
    close: false,
    progressBar: false
  }
  // Вывод оповещения
  iziToast.info(Object.assign(options, extOptions))
}

// Оповещения для globalErrorsHandling.js
export function errorsHandlingNotify(extOptions){
  // Параметры по умолчанию
  let options = {
    class: 'errors-handling-notify',
    iconUrl: 'assets/img/exclamation-triangle.svg', 
    position: 'bottomCenter', 
    messageSize: '16',
    closeOnClick: false,     
    close: true, 
    drag: false, 
    timeout: 0,
    progressBar: false
  }
  // Вывод оповещения
  iziToast.info(Object.assign(options, extOptions))
}