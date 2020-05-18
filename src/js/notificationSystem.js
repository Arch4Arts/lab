import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast/dist/js/iziToast.min.js';

// идентификатор infoCircle нигде не используется, но импорт нужен для загрузки самого svg файла
import exclamationTriangle from '../assets/exclamation-triangle.svg'
import infoCircle from '../assets/info-circle.svg'

// Оповещения для компонента saves
export function saveNotify(options){
  // Параметры по умолчанию
  iziToast.settings({
    class: 'save-notify-save',
    progressBar: false,
    displayMode: 2,
    closeOnClick: true,
    close: false,
    iconUrl: 'assets/img/info-circle.svg',
    messageSize: '16',
    position: 'bottomCenter',
  });
  // Вывод оповещения
  iziToast.info(options)
}

// Оповещения для globalErrorsHandling.js
export function errorsHandlingNotify(options){
  // Параметры по умолчанию
  iziToast.settings({
    class: 'errors-handling-notify',
    position: 'bottomCenter', 
    iconUrl: 'assets/img/exclamation-triangle.svg', 
    messageSize: '16',
    close: true, 
    closeOnClick: false, 
    drag: false, 
    timeout: 0
  });
  // Вывод оповещения
  iziToast.info(options)
}