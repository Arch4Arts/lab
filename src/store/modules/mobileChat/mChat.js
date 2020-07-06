import eventBus from "../../../js/eventBus"

const mChat = {
    namespaced: false,
    state: {
        enable: true,       // Вкл/Выкл чата
        show: false,        // Статус отображения чата
        chatListShow: true, // Отображение списка контактов

        autoplayVideoMessageOnHover: false, // Воспроизводить ли видео при наведении мышки
        typingIndicatorEnable: true,        // Если true отображается имитация набора текста, если false, то ничего не отображаетсяm
        showAvatars: true,                  // Скрытие аватарок в чате
        showBarPanelPermanent: true,        // Если false, панель будет скрываться при скролинге вниз, и показываться при скролинге вверх
        showDecorativeInputPanel: true,     // Скрытие декоративной панели ввода в чате
        closeChatOnClickedOutside: false,    // Закрытие чата при клике снаружи

        posX_floatButton: window.innerWidth - 90,   // Позиция чата по горизонтали
        posY_floatButton: window.innerHeight - 120, // Позиция чата по вертикали
        
        posX: undefined,   // Позиция чата по горизонтали
        posY: 0,           // Позиция чата по вертикали
        width: 340,   // Ширина "экрана" на svg текстуре смартфона
        height: 740,  // Высота "экрана" на svg текстуре смартфона

        videoVolume: 0.50, // Громкость видео плеера чата (По умолчанию выкл как и весь звук игры)
        audioVolume: 0.50, // Громкость видео плеера чата (По умолчанию вкл как и весь звук игры)
        

        selectedChatID: '', // ID выбранного чата (Который был выбран на странице контактов)
        selectedChatName: '',  // Имя выбранного чата (Который был выбран на странице контактов)
        selectedChatAvatar: '', // Аватар выбранного чата
        selectedChatIsGroup: undefined, // Является ли выбранный чат групповым

        themesList: [
          { themeName: 'Minimalistic' },
          { themeName: 'Dark minimalistic' },
          // { themeName: 'Scarllet' }
        ],
     },
    mutations: {      
      mChatEnable(){
        this.state.mChat.enable = !this.state.mChat.enable
      },
      set_mChatShow(state, value){
        this.state.mChat.show = value
      },
      mChatListShow(){
        this.state.mChat.chatListShow = !this.state.mChat.chatListShow
      },

      closeChatOnClickedOutside(){
        this.state.mChat.closeChatOnClickedOutside = !this.state.mChat.closeChatOnClickedOutside
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
      showBarPanelPermanent(){
        this.state.mChat.showBarPanelPermanent = !this.state.mChat.showBarPanelPermanent
      },
      showDecorativeInputPanel(){
        this.state.mChat.showDecorativeInputPanel = !this.state.mChat.showDecorativeInputPanel
      },
     },
  }

export default mChat