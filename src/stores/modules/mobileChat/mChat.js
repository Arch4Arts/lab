const mChat = {
    namespaced: false,
    state: {
        enable: true, // Вкл/Выкл чата
        show: false, // Статус отображения чата
        chatListShow: true, // Отображение списка контактов

        autoplayVideoMessageOnHover: false, // Воспроизводить ли видео при наведении мышки
        typingIndicatorEnable: true, // Если true отображается имитация набора текста, если false, то ничего не отображаетсяm
        showAvatars: true, // Скрытие аватарок в чате
        showDecorativeInputPanel: true, // Скрытие декоративной панели ввода в чате
        
        posX: undefined,   // Позиция чата по горизонтали
        posY: 0,      // Позиция чата по вертикали
        width: 340,   // Ширина "экрана" на svg текстуре смартфона
        height: 740,  // Высота "экрана" на svg текстуре смартфона

        plyrVideoVolume: 0.50, // Громкость видео плеера чата (По умолчанию выкл как и весь звук игры)
        plyrAudioVolume: 0.50, // Громкость видео плеера чата (По умолчанию вкл как и весь звук игры)
        

        selectedChatID: '', // ID выбранного чата (Который был выбран на странице контактов)
        selectedChatName: '',  // Имя выбранного чата (Который был выбран на странице контактов)
        selectedChatAvatar: '', // Аватар выбранного чата
        selectedChatIsGroup: undefined, // Является ли выбранный чат групповым

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
      mChatListShow(){
        this.state.mChat.chatListShow = !this.state.mChat.chatListShow
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