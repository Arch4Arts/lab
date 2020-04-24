// import store from '../stores/store'

export default function chatThemes(){
    if (store.state.mChat.mChat_CurrentTheme_MC === store.state.mChat.mChat_ThemesList[0].title) { // Minimalistic
      // Список контактов
      document.documentElement.style.setProperty('--contacts-page--background', '#fff');
      document.documentElement.style.setProperty('--contacts-page__bar--background', '#fff');
      document.documentElement.style.setProperty('--contacts-page__vlist--background', '#fff');
      document.documentElement.style.setProperty('--contacts-page__vlist-item--background', '#fff');
      document.documentElement.style.setProperty('--contacts-page__vlist-item--margin-bttom', '0px');
      document.documentElement.style.setProperty('--contacts-page__palette-menu--hover--background', '#f5f5f5');
      document.documentElement.style.setProperty('--contacts_page__vlist__avatar_badge--border', '2px solid #ffffff');
      document.documentElement.style.setProperty('--contacts_page__vlist__avatar_badge--box-shadow', '0 0 12px #37addf');
      document.documentElement.style.setProperty('--contacts-page__vlist--contact-title--color', '#4c4c4c');
      document.documentElement.style.setProperty('--contacts-page__vlist--contact-title--font-weight', '700');
      document.documentElement.style.setProperty('--contacts-page__vlist--contact-subtitle--color', '#6d6d6d');
      document.documentElement.style.setProperty('--contacts-page__vlist--contact-subtitle-icon--color', '#818181');
      document.documentElement.style.setProperty('--contacts-page__bar__nav-btn--color', '#37addf');
      document.documentElement.style.setProperty('--contacts-page__bar__palette-btn--color', '#37addf');
      document.documentElement.style.setProperty('--contacts-page__bar__search_btn--color', '#37addf');
      document.documentElement.style.setProperty('--contacts-page__v-btn--background', 'transparent');
      document.documentElement.style.setProperty('--contacts-page__palette-menu--background', '#fff');
      document.documentElement.style.setProperty('--contacts-page__palette-menu-font--color', '#4c4c4c');
      document.documentElement.style.setProperty('--contacts-page__vlist--contact-badge--color', '#37addf');
      document.documentElement.style.setProperty('--contacts-page__vlist--contact-badge--background', '#e8e8e8');
      document.documentElement.style.setProperty('--contacts-page__vlist--contact-badge--font-size', '14px');
      document.documentElement.style.setProperty('--contacts-page__vlist--contact-badge--font-weight', '700');
      document.documentElement.style.setProperty('--contacts-page__vlist--contact-badge--border-radius', '4px');
      document.documentElement.style.setProperty('--contacts-page__vlist--contact-badge--width', '26px');
      document.documentElement.style.setProperty('--contacts-page__vlist--contact-badge--height', '26px');
      // Чат
      document.documentElement.style.setProperty('--bar--background', 'transparent');
      document.documentElement.style.setProperty('--message-list--bar__title--color', '#606060');
      document.documentElement.style.setProperty('--message-list--bar__title--font-weight', '400');
      document.documentElement.style.setProperty('--message-list--bar__back-btn--color', '#37addf');
      document.documentElement.style.setProperty('--message-list--bar__phone-btn--color', '#37addf');
      document.documentElement.style.setProperty('--message-list--bar__video-btn--color', '#37addf');
      document.documentElement.style.setProperty('--message-list--bar__ellipsis-btn--color', '#37addf');
      document.documentElement.style.setProperty('--message-list--background', '#fff');
      document.documentElement.style.setProperty('--from_me_msg_font', '#fff');
      document.documentElement.style.setProperty('--from_me_msg_bg', '#00bfe4');
      document.documentElement.style.setProperty('--from_me_tail_color', '#00bfe4');
      document.documentElement.style.setProperty('--from_them_msg_font', 'black');
      document.documentElement.style.setProperty('--from_them_msg_bg', '#eee');
      document.documentElement.style.setProperty('--from_them_tail_color', '#eee');
      document.documentElement.style.setProperty('--message-system--background', '#dedede');
      document.documentElement.style.setProperty('--message-system--color', 'black');
      document.documentElement.style.setProperty('--message-meta--color', 'black');
      document.documentElement.style.setProperty('--suggestions-element--border', '1px solid #37addf');
      document.documentElement.style.setProperty('--suggestions-element--color', '#37addf');
      document.documentElement.style.setProperty('--suggestions-element--background', 'transparent');
      document.documentElement.style.setProperty('--typing-indicator__span--background', '#9E9EA1');
      document.documentElement.style.setProperty('--plyr--audio--color', 'black');
      // Панель ввода
      document.documentElement.style.setProperty('--inputArea--background', 'transparent');
      document.documentElement.style.setProperty('--inputArea__text-input--width', '250px');
      document.documentElement.style.setProperty('--inputArea__text-input--height', '50px');
      document.documentElement.style.setProperty('--inputArea__text-input--border-radius', '17px');
      document.documentElement.style.setProperty('--inputArea__text-input--padding-left', '50px');
      document.documentElement.style.setProperty('--inputArea__text-input--background', '#edf0f7');
      document.documentElement.style.setProperty('--inputArea__text-input--color', '#9c9d9d');
      // Элементы панели ввода
      document.documentElement.style.setProperty('--inputArea-smile-icon--left', '217px');
      document.documentElement.style.setProperty('--inputArea-smile-icon--bottom', '18px');
      document.documentElement.style.setProperty('--inputArea-smile-icon--color', '#9c9d9d');
      document.documentElement.style.setProperty('--inputArea-smile-icon--background', 'none');
      document.documentElement.style.setProperty('--inputArea-paperclip-icon--left', '217px');
      document.documentElement.style.setProperty('--inputArea-paperclip-icon--bottom', '18px');
      document.documentElement.style.setProperty('--inputArea-paperclip-icon--color', '#37addf');
      document.documentElement.style.setProperty('--inputArea-paperclip-icon--background', 'none');
      document.documentElement.style.setProperty('--inputArea-plus-icon--left', '10px');
      document.documentElement.style.setProperty('--inputArea-plus-icon--bottom', '15px');
      document.documentElement.style.setProperty('--inputArea-plus-icon--width', '30px');
      document.documentElement.style.setProperty('--inputArea-plus-icon--height', '30px');
      document.documentElement.style.setProperty('--inputArea-plus-icon--border-radius', '8px');
      document.documentElement.style.setProperty('--inputArea-plus-icon--color', '#37addf');
      document.documentElement.style.setProperty('--inputArea-plus-icon--background', '#d9dade');
      document.documentElement.style.setProperty('--inputArea-send-icon--left', '295px');
      document.documentElement.style.setProperty('--inputArea-send-icon--bottom', '18px');
      document.documentElement.style.setProperty('--inputArea-send-icon--width', '18px');
      document.documentElement.style.setProperty('--inputArea-send-icon--color', '#37addf');
      document.documentElement.style.setProperty('--inputArea-microphone-icon--left', '262px');
      document.documentElement.style.setProperty('--inputArea-microphone-icon--bottom', '18px');
      document.documentElement.style.setProperty('--inputArea-microphone-icon--width', '18px');
      document.documentElement.style.setProperty('--inputArea-microphone-icon--color', '#37addf');
    };
    if (store.state.mChat.mChat_CurrentTheme_MC === store.state.mChat.mChat_ThemesList[1].title) { // Dark Minimalistic
      // Список контактов
      document.documentElement.style.setProperty('--contacts-page--background', '#242933');
      document.documentElement.style.setProperty('--contacts-page__bar--background', 'transparent');
      document.documentElement.style.setProperty('--contacts-page__vlist--background', 'transparent');
      document.documentElement.style.setProperty('--contacts-page__vlist-item--background', '#2E3440');
      document.documentElement.style.setProperty('--contacts-page__vlist-item--margin-bottom', '8px');
      document.documentElement.style.setProperty('--contacts-page__palette-menu--hover--background', '#3B4252');
      document.documentElement.style.setProperty('--contacts_page__vlist__avatar_badge--border', '2px solid #2E3440');
      document.documentElement.style.setProperty('--contacts_page__vlist__avatar_badge--box-shadow', '0 0 12px #88c0d0');
      document.documentElement.style.setProperty('--contacts-page__vlist--contact-title--color', '#ECEFF4');
      document.documentElement.style.setProperty('--contacts-page__vlist--contact-title--font-weight', '700');
      document.documentElement.style.setProperty('--contacts-page__vlist--contact-subtitle--color', '#869cac');
      document.documentElement.style.setProperty('--contacts-page__vlist--contact-subtitle-icon--color', '#869cac');
      document.documentElement.style.setProperty('--contacts-page__bar__nav-btn--color', '#fff');
      document.documentElement.style.setProperty('--contacts-page__bar__palette-btn--color', '#fff');
      document.documentElement.style.setProperty('--contacts-page__bar__search_btn--color', '#fff');
      document.documentElement.style.setProperty('--contacts-page__v-btn--background', 'transparent');
      document.documentElement.style.setProperty('--contacts-page__palette-menu--background', '#242933');
      document.documentElement.style.setProperty('--contacts-page__palette-menu-font--color', '#ECEFF4');
      document.documentElement.style.setProperty('--contacts-page__vlist--contact-badge--color', '#88c0d0');
      document.documentElement.style.setProperty('--contacts-page__vlist--contact-badge--background', '#434C5E');
      document.documentElement.style.setProperty('--contacts-page__vlist--contact-badge--font-size', '14px');
      document.documentElement.style.setProperty('--contacts-page__vlist--contact-badge--font-weight', '700');
      document.documentElement.style.setProperty('--contacts-page__vlist--contact-badge--border-radius', '4px');
      document.documentElement.style.setProperty('--contacts-page__vlist--contact-badge--width', '26px');
      document.documentElement.style.setProperty('--contacts-page__vlist--contact-badge--height', '26px');
      // Чат
      document.documentElement.style.setProperty('--bar--background', 'transparent');
      document.documentElement.style.setProperty('--message-list--bar__title--color', '#ECEFF4');
      document.documentElement.style.setProperty('--message-list--bar__title--font-weight', '400');
      document.documentElement.style.setProperty('--message-list--bar__back-btn--color', '#fff');
      document.documentElement.style.setProperty('--message-list--bar__phone-btn--color', '#fff');
      document.documentElement.style.setProperty('--message-list--bar__video-btn--color', '#fff');
      document.documentElement.style.setProperty('--message-list--bar__ellipsis-btn--color', '#fff');
      document.documentElement.style.setProperty('--message-list--background', '#242933');
      document.documentElement.style.setProperty('--from_me_msg_font', '#ECEFF4');
      document.documentElement.style.setProperty('--from_me_msg_bg', '#5E81AC');
      document.documentElement.style.setProperty('--from_me_tail_color', '#5E81AC');
      document.documentElement.style.setProperty('--from_them_msg_font', '#ECEFF4');
      document.documentElement.style.setProperty('--from_them_msg_bg', '#3B4252');
      document.documentElement.style.setProperty('--from_them_tail_color', '#3B4252');
      document.documentElement.style.setProperty('--message-system--background', '#3B4252');
      document.documentElement.style.setProperty('--message-system--color', '#ECEFF4');
      document.documentElement.style.setProperty('--message-system-meta--color', '#ECEFF4');
      document.documentElement.style.setProperty('--message-meta--color', '#ECEFF4');
      document.documentElement.style.setProperty('--suggestions-element--border', '1px solid #81A1C1');
      document.documentElement.style.setProperty('--suggestions-element--color', '#81A1C1');
      document.documentElement.style.setProperty('--suggestions-element--background', 'transparent');
      document.documentElement.style.setProperty('--typing-indicator__span--background', '#9E9EA1');
      document.documentElement.style.setProperty('--plyr--audio--color', '#fff');
      // Панель ввода
      document.documentElement.style.setProperty('--inputArea--background', 'transparent');
      document.documentElement.style.setProperty('--inputArea__text-input--width', '250px');
      document.documentElement.style.setProperty('--inputArea__text-input--height', '50px');
      document.documentElement.style.setProperty('--inputArea__text-input--border-radius', '17px');
      document.documentElement.style.setProperty('--inputArea__text-input--padding-left', '50px');
      document.documentElement.style.setProperty('--inputArea__text-input--background', '#2E3440');
      document.documentElement.style.setProperty('--inputArea__text-input--color', '#9c9d9d');
      // Элементы панели ввода
      document.documentElement.style.setProperty('--inputArea-smile-icon--left', '217px');
      document.documentElement.style.setProperty('--inputArea-smile-icon--bottom', '18px');
      document.documentElement.style.setProperty('--inputArea-smile-icon--color', '#9c9d9d');
      document.documentElement.style.setProperty('--inputArea-smile-icon--background', 'none');
      document.documentElement.style.setProperty('--inputArea-paperclip-icon--left', '217px');
      document.documentElement.style.setProperty('--inputArea-paperclip-icon--bottom', '18px');
      document.documentElement.style.setProperty('--inputArea-paperclip-icon--color', '#88C0D0');
      document.documentElement.style.setProperty('--inputArea-paperclip-icon--background', 'none');
      document.documentElement.style.setProperty('--inputArea-plus-icon--left', '10px');
      document.documentElement.style.setProperty('--inputArea-plus-icon--bottom', '15px');
      document.documentElement.style.setProperty('--inputArea-plus-icon--width', '30px');
      document.documentElement.style.setProperty('--inputArea-plus-icon--height', '30px');
      document.documentElement.style.setProperty('--inputArea-plus-icon--border-radius', '8px');
      document.documentElement.style.setProperty('--inputArea-plus-icon--color', '#88C0D0');
      document.documentElement.style.setProperty('--inputArea-plus-icon--background', '#3B4252');
      document.documentElement.style.setProperty('--inputArea-send-icon--left', '295px');
      document.documentElement.style.setProperty('--inputArea-send-icon--bottom', '18px');
      document.documentElement.style.setProperty('--inputArea-send-icon--width', '18px');
      document.documentElement.style.setProperty('--inputArea-send-icon--color', '#88C0D0');
      document.documentElement.style.setProperty('--inputArea-microphone-icon--left', '262px');
      document.documentElement.style.setProperty('--inputArea-microphone-icon--bottom', '18px');
      document.documentElement.style.setProperty('--inputArea-microphone-icon--width', '18px');
      document.documentElement.style.setProperty('--inputArea-microphone-icon--color', '#88C0D0');
    };
  }