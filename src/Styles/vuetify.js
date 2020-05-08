import Vue from '../../node_modules/vue';
import Vuetify from 'vuetify/lib';
import { Touch } from 'vuetify/lib/directives';

Vue.use(Vuetify, {
  directives: {
    Touch,
}});

// https://github.com/ngdanghau/fontawesome-pro
// https://github.com/starcoma/pro-light-svg-icons
// https://github.com/starcoma/pro-solid-svg-icons
// https://github.com/starcoma/pro-regular-svg-icons

// !! https://github.com/minddocdev/npm-packages/tree/master/%40fortawesome !!

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// a-icon 
Vue.component('a-icon', FontAwesomeIcon)
import { 
  faQuestionCircle, // FAQ
  faCog,            // Настройки
  faBook,           // Журнал
  faSave,           // Сохранения

  faCompass,  // Навигация: плавающая иконка
  faUndoAlt,  // Навигация: вернуться назад

  faDownload, // Сохранить
  faUpload,   // Загрузить
  faTrash,    // Удалить

  faPowerOff, // перезапуск
  faHdd,      // Сохранение на диск
  faTrashAlt, // Удаление всех сохранений

  faMusicAlt,      // Нота
  faMusicAltSlash, // Зачёркнутая нота

  faVolume,        // Громкость
  faVolumeMute,    // Громкость заглушена (зачёркнута)

  faUserCrown, // Главный герой
  faUsers,     // Персонажи
  faBookHeart, // Дневник (с сердечком)
  faTrophyAlt, // Достижения
  faMobileAlt, // Мобильник

  faEye,      // Внешний вид (глаз)
  faFont,     // Шрифт
  faTextSize, // Размер шрифта

  faKeyboard, // Раскладка клавиатуры

  faPalette,  // Выбор темы в чате
  faArrowLeft,// Стрелка влево
  faPhone,    // Иконка телефонной трубки

  faPhotoVideo, // Для чата (иконка в списке чатов (содержимое сообщения))
  
} from '../../source_files/pro-solid-svg-icons'   // fas
import { faHdd as faHdd2 } from '../../source_files/pro-regular-svg-icons' // far

import { 
  
  faBars,     // Меню (список чатов)
  faPlus,       // Плюс
  faSmile,      // Смайлик

} from '../../source_files/pro-regular-svg-icons' // far
// import { fal } from '../../source_files/pro-light-svg-icons'   // fal

library.add({
  faQuestionCircle, // FAQ
  faCog,            // Настройки
  faBook,           // Журнал
  faSave,           // Сохранения

  faCompass,  // Навигация: плавающая иконка
  faUndoAlt,  // Навигация: вернуться назад

  faDownload, // Сохранить
  faUpload,   // Загрузить
  faTrash,    // Удалить

  faPowerOff, // перезапуск
  faHdd,      // Сохранить на диск
  faHdd2,     // Загрузить на диск
  faTrashAlt, // Удаление всех сохранений

  faMusicAlt,      // Нота
  faMusicAltSlash, // Зачёркнутая нота

  faVolume,        // Громкость
  faVolumeMute,    // Громкость заглушена (зачёркнута)

  faUserCrown, // Главный герой
  faUsers,     // Персонажи
  faBookHeart, // Дневник (с сердечком)
  faTrophyAlt, // Достижения
  faMobileAlt, // Мобильник

  faEye,      // Внешний вид (глаз)
  faFont,     // Шрифт
  faTextSize, // Размер шрифта

  faKeyboard, // Раскладка клавиатуры

  faBars,     // Меню (список чатов)
  faPalette,  // Выбор темы в чате
  faArrowLeft,// Стрелка влево
  faPhone,    // Иконка телефонной трубки

  faPlus,       // Плюс
  faSmile,      // Смайлик

  faPhotoVideo, // Для чата (иконка в списке чатов (содержимое сообщения))
})

export default new Vuetify({
  theme: {
      options: {
        customProperties: true,
      },
      dark: true,
  },
  icons: {
    iconfont: 'faSvg' && 'mdiSvg',
    values: {
      // Достижения
      faTrophyAlt: {
        component: FontAwesomeIcon,
        props: {
          icon: ["fas", "trophy-alt"]
        },
      },
      // Журнал
      faBook: {
        component: FontAwesomeIcon,
        props: {
          icon: ["fas", "book"]
        },
      },
      // Мобильник
      faMobileAlt: {
        component: FontAwesomeIcon,
        props: {
          icon: ["fas", "mobile-alt"]
        },
      },
      // Шрифт
      faFont: {
        component: FontAwesomeIcon,
        props: {
          icon: ["fas", "font"]
        },
      },
      // Размер шрифта
      faTextSize: {
        component: FontAwesomeIcon,
        props: {
          icon: ["fas", "text-size"]
        },
      },
    },
  },
});
