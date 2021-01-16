const sound = {
  namespaced: true,
  state: {
    // Вкл/выкл звука
    isPlaySoundsEnable: false,

    // ! пример будущей структуры
    // sounds: {
    //   journal: {
    //     diary: {
    //       enable: true,
    //       volume: 0.50,
    //       sound: 'soundName'
    //     },
    //     another: {
    //       ...
    //     }
    //   },
    //   anotherSectionSound: {
    //     ...
    //   }
    // },

    isPlayAchievementSound: true,
    isPlayDiarySound: true,
    isPlaySmartphoneSound: true,

    // Громкость
    achievementVolume: 0.50, // Громкость уведомления о получении достижения
    diaryVolume: 0.50, // Громкость уведомления дневника
    smartphoneVolume: 0.50, // Громкость уведомления смартфона

    // Звук
    achievementSound: 'iOS Notification',
    diarySound: 'Journal write sound',
    smartphoneSound: 'MIUI Notification',
    
    soundsList: [
      'Journal write sound',
      'iOS Notification',
      'MIUI Notification',
      'MotoX Notification',
      'Nice Notification',
      'S7 Notification',
      'Xperia Notification'
    ],
  },
  mutations: {
    // Вкл/Выкл звука
    changePlaySoundsEnableState() {
      this.state.soundSettings.isPlaySoundsEnable = !this.state.soundSettings.isPlaySoundsEnable;
    },
    changeAchievementSoundEnableState() {
      this.state.soundSettings.isPlayAchievementSound = !this.state.soundSettings.isPlayAchievementSound;
    },
    changeDiarySoundEnableState() {
      this.state.soundSettings.isPlayDiarySound = !this.state.soundSettings.isPlayDiarySound;
    },
    changeSmartphoneSoundEnableState() {
      this.state.soundSettings.isPlaySmartphoneSound = !this.state.soundSettings.isPlaySmartphoneSound;
    },
  },
}

export default sound