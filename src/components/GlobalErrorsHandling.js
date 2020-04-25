import Vue from 'vue'
import store from '../stores/store'
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';

import VueIziToast from 'vue-izitoast'; // Уведомления
import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast/dist/js/iziToast.min.js';
Vue.use(VueIziToast);


if (process.env.NODE_ENV === 'production') { // Включение Sentry только для продакшена
  Sentry.init({
    dsn: 'https://6b82c070a6874f70ad6e9fe5ebcb9fb8@sentry.io/1509214',
    integrations: [new Integrations.Vue({Vue, attachProps: true})],
    release: store.state.gameVersion, // Версия ПО
    beforeSend(event, hint) {
      fetch('https://sentry.io/api/1509214/store/?sentry_key=6b82c070a6874f70ad6e9fe5ebcb9fb8&sentry_version=7') // Проверка не блокируется ли Sentry блокировщиком рекламы
      .then(result => {
        console.log(`Sentry fetch status: ${result.status}\nmsg: ${result.statusText}\nOK: ${result.ok}`)
        if (result.status === 400) {
          if (event.exception && store.state.gameLang) {
            Sentry.showReportDialog({ 
              eventId: event.event_id,
              lang: 'en',
              title: 'It looks like the game crashed',
              subtitle: 'The game developer has been notified.',
              subtitle2: 'If you’d like to help, tell what happened below.',
              user: {
                name: 'Player',
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
                name: 'Player',
                email: 'Player@example.ru'
              },
            });
          }
        } else {
          store.state.gameLang 
          ? iziToast.info({message: `Sentry failed to send error report: status: ${result.status}\nmsg: ${result.statusText}\nOK: ${result.ok}. Add your site to the ad blocker exception list.`, position: 'bottomCenter', backgroundColor: 'rgb(255, 102, 102)', close: true, closeOnClick: false, drag: false, timeout: 0})
          : iziToast.info({message: `Sentry не удалось отправить отчёт об ошибке: status: ${result.status}\nmsg: ${result.statusText}\nOK: ${result.ok}. Добавьте сайт в список исключений блокировщика рекламы.`, position: 'bottomCenter', backgroundColor: 'rgb(255, 102, 102)', close: true, closeOnClick: false, drag: false, timeout: 0})
        }
      })
      .catch(result => {
        store.state.gameLang 
        ? iziToast.info({message: `Sentry failed to send error report: ${result}. Add your site to the ad blocker exception list.`, position: 'bottomCenter', backgroundColor: 'rgb(255, 102, 102)', close: true, closeOnClick: false, drag: false, timeout: 0})
        : iziToast.info({message: `Sentry не удалось отправить отчёт об ошибке: ${result}. Добавьте сайт в список исключений блокировщика рекламы.`, position: 'bottomCenter', backgroundColor: 'rgb(255, 102, 102)', close: true, closeOnClick: false, drag: false, timeout: 0})
      })
      return event;
    }
  })
};

if (process.env.NODE_ENV === 'production') {
  Vue.config.errorHandler = function(err, vm, info) { // Обработчик ошибок Vue
    Sentry.captureException(err, vm, info);
    store.state.gameLang 
    ? iziToast.info({message: `Error: ${err.toString()} Info: ${info}`, position: 'bottomCenter', backgroundColor: 'rgb(255, 102, 102)', icon: 'fas fa-exclamation-triangle', close: true, closeOnClick: false, drag: false, timeout: 0})
    : iziToast.info({message: `Ошибка: ${err.toString()} Инфо: ${info}`, position: 'bottomCenter', backgroundColor: 'rgb(255, 102, 102)', icon: 'fas fa-exclamation-triangle', close: true, closeOnClick: false, drag: false, timeout: 0})
  };
};