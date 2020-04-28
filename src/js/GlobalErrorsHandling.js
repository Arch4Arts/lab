import Vue from 'vue'
import store from '../stores/store'
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';

import VueIziToast from 'vue-izitoast'; // Уведомления
import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast/dist/js/iziToast.min.js';
Vue.use(VueIziToast);


function errorMessage(msg, msg_ru){
  iziToast.info({
    message: (store.state.gameLang) ? msg : msg_ru,
    position: 'bottomCenter', 
    backgroundColor: 'rgb(255, 102, 102)', 
    icon: 'fas fa-exclamation-triangle', 
    close: true, 
    closeOnClick: false, 
    drag: false, 
    timeout: 0
  })
}

export function SentryPush(error){
  Sentry.captureException(error);
  errorMessage(error)
}

if (process.env.NODE_ENV === 'production') { // Включение Sentry только для продакшена
  let uniqid = require('uniqid');
  Sentry.init({
    dsn: 'https://6b82c070a6874f70ad6e9fe5ebcb9fb8@sentry.io/1509214',
    integrations: [new Integrations.Vue({Vue, attachProps: true})],
    release: store.state.gameVersion, // Версия ПО
    
    beforeSend(event) {
      fetch('https://sentry.io/api/1509214/store/?sentry_key=6b82c070a6874f70ad6e9fe5ebcb9fb8&sentry_version=7') // Проверка не блокируется ли Sentry блокировщиком рекламы
      .then(result => {
        console.log(`Sentry fetch status: ${result.status}\nmsg: ${result.statusText}\nOK: ${result.ok}`)
        if (result.status === 400) { // 400 значит работает
          if (event.exception && store.state.gameLang) {
            Sentry.showReportDialog({ 
              eventId: event.event_id,
              lang: 'en',
              title: 'It looks like the game crashed',
              subtitle: 'The game developer has been notified.',
              subtitle2: 'If you’d like to help, tell what happened below.',
              user: {
                name: `ID: ${uniqid()}`,
                email: 'Player@example.com'
              },
            });
          } else {
            Sentry.showReportDialog({ 
              eventId: event.event_id,
              lang: 'ru',
              title: 'Произошел сбой игры',
              subtitle: 'Разработчик игры был уведомлён.',
              subtitle2: 'Если хочешь помочь, расскажи, что произошло',
              labelName: 'Имя',
              labelEmail: 'Почта',
              labelComments: 'Что произошло?',
              errorGeneric: 'При отправке отчета произошла неизвестная ошибка. Пожалуйста, попробуйте еще раз',
              errorFormEntry: 'Заполни все поля, и попробуй еще раз',
              successMessage: 'Спасибо! Отчёт был отправлен',
              user: {
                name: `ID: ${uniqid()}`,
                email: 'Player@example.ru'
              },
            });
          }
        } else {
          errorMessage(
            `Sentry failed to send error report: status: ${result.status}\nmsg: ${result.statusText}\nOK: ${result.ok}. Add your site to the ad blocker exception list.`,
            `Sentry не удалось отправить отчёт об ошибке: status: ${result.status}\nmsg: ${result.statusText}\nOK: ${result.ok}. Добавьте сайт в список исключений блокировщика рекламы.`
          )
        }
      })
      .catch(result => {
        errorMessage(
          `Sentry failed to send error report: ${result}. Add your site to the ad blocker exception list.`,
          `Sentry не удалось отправить отчёт об ошибке: ${result}. Добавьте сайт в список исключений блокировщика рекламы.`
        )
      })
      return event;
    }
  })
};


if (process.env.NODE_ENV === 'production') {
  Vue.config.errorHandler = function(err, vm, info) { // Обработчик ошибок Vue
    Sentry.captureException(err, vm, info);

    console.error(`${err} \n${info}`);
    errorMessage(
      `Error: ${err.toString()} Info: ${info}`,
      `Ошибка: ${err.toString()} Инфо: ${info}`
    )
  };  
}

// warnHandler - отключён по умолчанию в Production
// renderError - отключён по умолчанию в Production
// И т.д

if (process.env.NODE_ENV === 'production') {
  window.onerror = function(message, source, line, column, error) {
    Sentry.captureException(message, source, line, column, error);

    console.error(`${message}\n${source}\n${error}`);
    errorMessage(
      `Error: ${message.toString()} ${source} ${error}`,
      `Ошибка: ${message.toString()} ${source} ${error}`
    )
  };
}

