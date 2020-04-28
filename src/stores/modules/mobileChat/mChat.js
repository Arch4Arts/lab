const mChat = {
    namespaced: false,
    state: {
        enable: true, // Вкл/Выкл чата
        show: false, // Статус отображения чата
        contactsPageShow: true, // Отображение списка контактов

        autoplayVideoMessageOnHover: false, // Воспроизводить ли видео при наведении мышки
        typingIndicatorEnable: true, // Если true отображается имитация набора текста, если false, то ничего не отображаетсяm
        showAvatars: true, // Скрытие аватарок в чате
        showDecorativeInputPanel: true, // Скрытие декоративной панели ввода в чате
        

        plyrVideoVolume: 0.50, // Громкость видео плеера чата (По умолчанию выкл как и весь звук игры)
        plyrAudioVolume: 0.50, // Громкость видео плеера чата (По умолчанию вкл как и весь звук игры)
        

        selectedContactID: '', // ID выбранного контакта (Который был выбран на странице контактов)
        selectedContactName: '',  // Имя выбранного контакта (Который был выбран на странице контактов)

        newMessagesCount_MC: 0, // Счетчик новых сообщений
        сurrentСontactList_MC: ['support','tailor'], // Текущие контакты в телефоне

        currentSelectedTheme_MC: 'Minimalistic',
        themesList: [
          { themeName: 'Minimalistic' },
          { themeName: 'Dark minimalistic' },
          { themeName: 'Scarllet' }
        ],
     },
    mutations: {      
      mChatEnable(){
        this.state.mChat.enable = !this.state.mChat.enable
      },
      mChatShow(){
        this.state.mChat.show = !this.state.mChat.show
      },
      mChatContactsPageShow(){
        this.state.mChat.contactsPageShow = !this.state.mChat.contactsPageShow
      },

      autoplayVideoMessageOnHover(){
        this.state.mChat.autoplayVideoMessageOnHover = !this.state.mChat.autoplayVideoMessageOnHover
      },
      typingIndicatorEnable(){
        this.state.mChat.typingIndicatorEnable = !this.state.mChat.typingIndicatorEnable
      },
      mChatShowAvatars(){
        this.state.mChat.showAvatars = !this.state.mChat.showAvatars
      },
      showDecorativeInputPanel(){
        this.state.mChat.showDecorativeInputPanel = !this.state.mChat.showDecorativeInputPanel
      },
     },
  }

export default mChat