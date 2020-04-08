const mChat = {
    namespaced: false,
    state: {
        mChat_Enable: true, // Вкл/Выкл чата
        mChat_NewMessagesCount: 0, // Счетчик новых сообщений
        mChat_Show: false, // Статус отображения чата
        mChat_ContactsPage: true, // Отображение списка контактов

        mChat_TypingIndicatorEnable: true, // Если true отображается имитация набора текста, если false, то ничего не отображается
        
        mChat_HoverPlayMsgVideo: false, // Воспроизводить ли видео при наведении мышки

        mChat_ContactClikedID: '',
        mChat_ContactClikedName: '',

        mChat_CurrentContacts_MC: ['support','tailor'], // Текущие контакты в телефоне

        mChat_CurrentTheme_MC: 'Minimalistic',
        mChat_ThemesList: [
        { themeName: 'Minimalistic' },
        { themeName: 'Dark minimalistic' },
        { themeName: 'Scarllet' }
        ],
     },
    mutations: {

     },
  }

export default mChat