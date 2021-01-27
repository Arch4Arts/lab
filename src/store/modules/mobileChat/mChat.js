const mChat = {
    namespaced: true,
    state: {
        enable: true,       // Вкл/Выкл чата
        show: false,        // Статус отображения чата
        showChatList: true, // Отображение списка контактов

        autoplayVideoMessageOnHover: false, // Воспроизводить ли видео при наведении мышки
        typingIndicatorEnable: true,        // Если true отображается имитация набора текста, если false, то ничего не отображаетсяm
        showAvatars: true,                  // Скрытие аватарок в чате
        showBarPanelPermanent: true,        // Если false, панель будет скрываться при скролинге вниз, и показываться при скролинге вверх
        showDecorativeInputPanel: true,     // Скрытие декоративной панели ввода в чате
        closeChatOnClickedOutside: false,    // Закрытие чата при клике снаружи

        posX_floatButton: window.innerWidth - 90,   // Позиция чата по горизонтали
        posY_floatButton: window.innerHeight - 120, // Позиция чата по вертикали
        
        posX: null,   // Позиция чата по горизонтали
        posY: 0,           // Позиция чата по вертикали
        width: 340,   // Ширина "экрана" на svg текстуре смартфона
        height: 740,  // Высота "экрана" на svg текстуре смартфона

        videoVolume: 0.50, // Громкость видео плеера чата (По умолчанию выкл как и весь звук игры)
        audioVolume: 0.50, // Громкость видео плеера чата (По умолчанию вкл как и весь звук игры)
        
        selectedChatID: '', // ID выбранного чата (Который был выбран на странице контактов)

        themesList: [
          { themeName: 'Minimalistic' },
          { themeName: 'Dark minimalistic' },
          // { themeName: 'Scarllet' }
        ],
     },
    mutations: {      
      enable() {
        this.state.mChat.enable = !this.state.mChat.enable
      },
      show(state, value) {
        this.state.mChat.show = value
      },
      showChatList(state, value) {
        this.state.mChat.showChatList = value
      },
      closeChatOnClickedOutside() {
        this.state.mChat.closeChatOnClickedOutside = !this.state.mChat.closeChatOnClickedOutside
      },
      autoplayVideoMessageOnHover() {
        this.state.mChat.autoplayVideoMessageOnHover = !this.state.mChat.autoplayVideoMessageOnHover
      },
      typingIndicatorEnable() {
        this.state.mChat.typingIndicatorEnable = !this.state.mChat.typingIndicatorEnable
      },
      showAvatars() {
        this.state.mChat.showAvatars = !this.state.mChat.showAvatars
      },
      showBarPanelPermanent() {
        this.state.mChat.showBarPanelPermanent = !this.state.mChat.showBarPanelPermanent
      },
      showDecorativeInputPanel() {
        this.state.mChat.showDecorativeInputPanel = !this.state.mChat.showDecorativeInputPanel
      },
     },
  }

export default mChat