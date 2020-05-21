import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast/dist/js/iziToast.min.js';

// идентификатор infoCircle нигде не используется, но импорт нужен для загрузки самого svg файла
import exclamationTriangle from '../assets/exclamation-triangle.svg'
import infoCircle from '../assets/info-circle.svg'

// Оповещения для globalErrorsHandling.js
export function mChatNotify(options){
  // Параметры по умолчанию
  iziToast.settings({
    class: 'mchat-notify',
    // iconUrl: 'assets/img/info-circle.svg',
    position: 'bottomRight',
    messageSize: '16',
    close: false,
    timeout: 0
  });
  // Вывод оповещения
  iziToast.info(options)
}

// Оповещения для компонента saves
export function saveNotify(options){
  // Параметры по умолчанию
  iziToast.settings({
    class: 'save-notify-save',
    iconUrl: 'assets/img/info-circle.svg',
    position: 'bottomCenter',
    messageSize: '16',
    displayMode: 2, 
    closeOnClick: true,
    close: false,
  });
  // Вывод оповещения
  iziToast.info(options)
}

// Оповещения для globalErrorsHandling.js
export function errorsHandlingNotify(options){
  // Параметры по умолчанию
  iziToast.settings({
    class: 'errors-handling-notify',
    iconUrl: 'assets/img/exclamation-triangle.svg', 
    position: 'bottomCenter', 
    messageSize: '16',
    closeOnClick: false,     
    close: true, 
    drag: false, 
    timeout: 0
  });
  // Вывод оповещения
  iziToast.info(options)
}