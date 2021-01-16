const hotkeySettings = {
  namespaced: true,
  state: {
    isEnable: true,
    version: '0',
    hotkeys: {
      settingsOpen: {
        key: 'o',
        code: 'KeyO',
      },                    // Открыть журнала
      settingsToggleGlobalSoundEnable: {
        key: 'p',
        code: 'KeyP',
      }, // Вкл / выкл звук глобально
      journalOpen: {
        key: 'q',
        code: 'KeyQ',
      },                     // Открыть журнала
      journalTabCharacters: {
        key: 'w',
        code: 'KeyW',
      },            // Открыть вкладку с персонажами 
      journalTabDiary: {
        key: 'e',
        code: 'KeyE',
      },                 // Открыть вкладку с дневником
      journalTabAchievements: {
        key: 'r',
        code: 'KeyR',
      },          // Открыть вкладку с достижениями   
      savesOpen: {
        key: 'a',
        code: 'KeyA',
      },                       // Открыть сохранения
      savesQuickSave: {
        key: '1',
        code: 'Digit1',
      },                  // Быстрое сохранение
      savesQuickLoad: {
        key: '3',
        code: 'Digit3',
      },                  // Быстрая загрузка
      mChatOpen: {
        key: 'd',
        code: 'KeyD',
      },
    },
  },
  mutations: {
    changeEnableState() {
      this.state.hotkeySettings.isEnable = !this.state.hotkeySettings.isEnable;
    }
  },
}

export default hotkeySettings