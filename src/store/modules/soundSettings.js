const sound = {
  namespaced: true,
  state: {
    // Вкл/выкл звука
    isPlaySoundsEnable: false,

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
    isPlaySoundsEnable() {
      this.state.soundSettings.isPlaySoundsEnable = !this.state.soundSettings.isPlaySoundsEnable;
    },
    isPlayAchievementSound() {
      this.state.soundSettings.isPlayAchievementSound = !this.state.soundSettings.isPlayAchievementSound;
    },
    isPlayDiarySound() {
      this.state.soundSettings.isPlayDiarySound = !this.state.soundSettings.isPlayDiarySound;
    },
    isPlaySmartphoneSound() {
      this.state.soundSettings.isPlaySmartphoneSound = !this.state.soundSettings.isPlaySmartphoneSound;
    },
  },
}

export default sound