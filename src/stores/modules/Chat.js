const chat = {
    namespaced: false,
    state: {
        chatEnable: true, // Вкл/Выкл чата
        newMessagesCount: 0, // Счетчик новых сообщений
        isChatOpen: false, // Статус отображения чата
        UserListShow: true, // Отображение списка контактов

        TypingIndicator: true, // Если true отображается имитация набора текста, если false, то ничего не отображается
        
        autoplayChatVideo: false, // Воспроизводить ли видео при наведении мышки

        ContactOnClikedID: '',
        ContactOnClikedName: '',

        currentContacts: ['support','tailor'], // Текущие контакты в телефоне
     },
    mutations: {

     },
  }

export default chat