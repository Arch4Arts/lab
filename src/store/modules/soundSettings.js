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
      this.state.sound.isPlaySoundsEnable = !this.state.sound.isPlaySoundsEnable;
    },
    isPlayAchievementSound() {
      this.state.sound.isPlayAchievementSound = !this.state.sound.isPlayAchievementSound;
    },
    isPlayDiarySound() {
      this.state.sound.isPlayDiarySound = !this.state.sound.isPlayDiarySound;
    },
    isPlaySmartphoneSound() {
      this.state.sound.isPlaySmartphoneSound = !this.state.sound.isPlaySmartphoneSound;
    },
  },
}

export default sound