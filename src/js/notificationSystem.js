import '../../source_files/iziToast/dist/css/iziToast.min.css';
import iziToast from '../../source_files/iziToast/dist/js/iziToast.js';
import vuetify from '../styles/vuetify'

// идентификатор infoCircle нигде не используется, но импорт нужен для загрузки самого svg файла
import exclamationTriangle from '../assets/exclamation-triangle.svg'
import infoCircle from '../assets/info-circle.svg' 

import store from '../store/store'

// Оповещения для globalErrorsHandling.js
export function mChatNotify(extOptions){
  // Параметры по умолчанию
  const OPTIONS = {
    class: 'mchat-notify',
    position: 'bottomRight',
    messageSize: '16',
    displayMode: vuetify.framework.breakpoint.xsOnly ? 2 : 0,
    close: false,
    closeOnClick: true,
    onClick: () => { // Открывает чат при нажатии на уведомление
      store.commit('set_mChatShow', true);
      store.state.mChat.selectedChatID = extOptions.chatID
      store.state.mChat.selectedChatAvatar = extOptions.chatAvatar
      store.commit('mChatListShow');
    },
    drag: true,
    // timeout: 15000,
    progressBar: false
  }
  // Вывод оповещения
  iziToast.show(Object.assign(OPTIONS, extOptions))
}

// Оповещения для компонента saves
export function saveNotify(extOptions){
  // Параметры по умолчанию
  const OPTIONS = {
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
  iziToast.info(Object.assign(OPTIONS, extOptions))
}

// Оповещения для globalErrorsHandling.js
export function errorsHandlingNotify(extOptions){
  // Параметры по умолчанию
  const OPTIONS = {
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
  iziToast.info(Object.assign(OPTIONS, extOptions))
}