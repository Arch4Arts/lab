import Vue from 'vue'
import store from '../store/store'
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';
import { RewriteFrames } from "@sentry/integrations";
import SentryRRWeb from "@sentry/rrweb";

import { errorsHandlingNotify } from './notificationSystem'

function errorMessage(msg_ru, msg) {
  errorsHandlingNotify({ message: store.state.gameLang === 'ru' ? msg_ru : msg })
}

export function SentryPush(error) {
  Sentry.captureException(error);
  errorMessage(error, error)
}

// правка для загрузки Source Maps
// Преобразует file:///D:/Dev/lab/dist/lab%200.3.0/assets/js/chunk-vendors.js -> app://chunk-vendors.js
// Пути должны совпадать если app://chunk-vendors.js то карта должна быть загружена и доступна по пути ~/chunk-vendors.js (См раздел с артефактами)
const rewriteFramesIntegration = new RewriteFrames({
  iteratee: frame => {
    if (frame.filename) {
      frame.filename = frame.filename
        .replace(/^file\:\/\//, "")
        .replace(/^address at /, "")
        .replace(/^.*\/[^\.]+(\.app|CodePush|.*(?=\/))/, "")
        .replace(/^at /, '')

      const appPrefix = "app://";
      // We always want to have a tripple slash
      frame.filename =
        frame.filename.indexOf("/") === 0
          ? `${appPrefix}${frame.filename}`
          : `${appPrefix}/${frame.filename}`;
    }
    return frame;
  }
});


if (process.env.NODE_ENV === 'production') { // Включение Sentry только для продакшена
  Sentry.init({
    dsn: 'https://6b82c070a6874f70ad6e9fe5ebcb9fb8@sentry.io/1509214',
    integrations: [
      rewriteFramesIntegration,
      new Integrations.Vue({ 
        Vue, 
        attachProps: true 
      }),     
      new SentryRRWeb({
        maskAllInputs: false
      })
    ],
    release: store.state.gameVersion, // Версия ПО
    
    beforeSend(event) {
      fetch('https://sentry.io/api/1509214/store/?sentry_key=6b82c070a6874f70ad6e9fe5ebcb9fb8&sentry_version=7') // Проверка не блокируется ли Sentry блокировщиком рекламы
      .then(result => {
        console.log(`Sentry fetch status: ${result.status}\nmsg: ${result.statusText}\nOK: ${result.ok}`)
        if (result.status === 400) { // 400 значит работает
          if (event.exception && store.state.gameLang === 'ru') {
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
                name: `Name`,
                email: 'Player@example.ru'
              },
            });
          } else {
            Sentry.showReportDialog({ 
              eventId: event.event_id,
              lang: 'en',
              title: 'It looks like the game crashed',
              subtitle: 'The game developer has been notified.',
              subtitle2: 'If you’d like to help, tell what happened below.',
              user: {
                name: `Name`,
                email: 'Player@example.com'
              },
            });
          }
        } else {
          errorMessage(
            `Sentry не удалось отправить отчёт об ошибке <br> ${result} <br> Проверьте подключение к сети или добавьте игру в список исключений блокировщика рекламы.`,
            `Sentry failed to send error report <br> ${result} <br> Check your network connection or add the game to the ad blocker's list of exceptions.`
          )
          console.error(`Sentry failed to send error report\n${err}`);
        }
      })
      .catch(err => {
        errorMessage(
          `Sentry не удалось отправить отчёт об ошибке <br> ${err} <br> Проверьте подключение к сети или добавьте игру в список исключений блокировщика рекламы.`,
          `Sentry failed to send error report <br> ${err} <br> Check your network connection or add the game to the ad blocker's list of exceptions.`
        )
        console.error(`Sentry failed to send error report\n${err}`);
      })
      return event;
    }
  })
};

// * Vue
if (process.env.NODE_ENV === 'production') {
  Vue.config.errorHandler = function(err, vm, info) { // Обработчик ошибок Vue
    Sentry.captureException(err, vm, info);

    console.error(`${err} \n${info}`);
    errorMessage(
      `Ошибка: ${err.toString()} <br> Инфо: ${info}`,
      `Error: ${err.toString()} <br> Info: ${info}`
    )
  };  
}

// warnHandler - отключён по умолчанию в production
// renderError - отключён по умолчанию в production
// И т.д

// * JS
if (process.env.NODE_ENV === 'production') {
  window.onerror = function(message, source, line, column, error) {
    Sentry.captureException(message, source, line, column, error);

    console.error(`${message}\n${source}\n${error}`);
    errorMessage(
      `Ошибка: ${message.toString()} <br> ${source} ${error}`,
      `Error: ${message.toString()} <br> ${source} ${error}`
    )
  };
}

