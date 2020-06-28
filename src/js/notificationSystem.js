import '../../source_files/iziToast/dist/css/iziToast.min.css';
import iziToast from '../../source_files/iziToast/dist/js/iziToast.js';
import vuetify from '../styles/vuetify'

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
      store.commit('mChatShow', true);
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
    iconUrl: 'assets/img/icons/info-circle.svg',
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
    iconUrl: 'assets/img/icons/exclamation-triangle.svg', 
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