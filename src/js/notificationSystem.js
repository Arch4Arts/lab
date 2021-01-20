import '../../source_files/iziToast/dist/css/iziToast.min.css';
import iziToast from '../../source_files/iziToast/dist/js/iziToast.js';
import vuetify from '../styles/vuetify'

// загрузка файла webpack'ом
import exclamationTriangle from '../assets/exclamation-triangle.svg'
import infoCircle from '../assets/info-circle.svg' 

import store from '../store/store'

// Оповещения для errorHandler.js
export function mChatNotify(extOptions) {
  // Параметры по умолчанию
  const OPTIONS = {
    class: 'mchat-notify',
    position: 'bottomRight',
    messageSize: '16',
    displayMode: vuetify.framework.breakpoint.xsOnly ? 2 : 0,
    close: false,
    closeOnClick: true,
    onClick: () => { // Открывает чат при нажатии на уведомление
      store.state.mChat.selectedChatID = extOptions.chatID
      store.commit('mChat/show', true);
      store.commit('mChat/showChatList', false);
    },
    drag: true,
    // timeout: 15000,
    progressBar: false
  }
  // Вывод оповещения
  iziToast.show(Object.assign(OPTIONS, extOptions))
}

// Оповещения для компонента saves
export const savesNotify = {
  OPTIONS: {
    // class: 'saves-notify__save',
    iconUrl: 'assets/img/info-circle.svg',
    position: 'bottomCenter',
    messageSize: '16',
    displayMode: 2, 
    closeOnClick: true,
    close: false,
    progressBar: false,
    timeout: 2000,
  },
  save(message) {
    iziToast.info(Object.assign(this.OPTIONS, message, { class: 'saves-notify__save' }))
  },
  load(message) {
    iziToast.info(Object.assign(this.OPTIONS, message, { class: 'saves-notify__load' }))
  },
  delete(message) {
    iziToast.info(Object.assign(this.OPTIONS, message, { class: 'saves-notify__delete', iconUrl: 'assets/img/exclamation-triangle.svg' }))
  },

  import(message) {
    iziToast.info(Object.assign(this.OPTIONS, message, { class: 'saves-notify__load' }))
  },
  importError(message) {
    iziToast.info(Object.assign(this.OPTIONS, message, { class: 'saves-notify__error', iconUrl: 'assets/img/exclamation-triangle.svg' }))
  },
  export(message) {
    iziToast.info(Object.assign(this.OPTIONS, message, { class: 'saves-notify__save' }))
  },
  exportError(message) {
    iziToast.info(Object.assign(this.OPTIONS, message, { class: 'saves-notify__error', iconUrl: 'assets/img/exclamation-triangle.svg' }))
  },
}

// Оповещения для errorHandler.js
export function errorsHandlingNotify(extOptions) {
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