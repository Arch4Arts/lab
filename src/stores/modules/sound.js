import store from './../store'
import { checkSoundsEnable } from '../../js/gameSound'

const sound = {
  namespaced: false,
  state: {
    // Громкость
    achievementVolume: 0.50, // Громкость уведомления о получении достижения
    diaryVolume: 0.50, // Громкость уведомления дневника
    smartphoneVolume: 0.50, // Громкость уведомления смартфона

    // Включение звука
    gameGlobalSoundsEnable: true, // Откл все звуки по умолчанию
    achievementSoundEnable: true, // Вкл/Выкл звука
    diarySoundEnable: true, // Вкл/Выкл звука
    smartphoneSoundEnable: true, // Вкл/Выкл звука

    // Выбор звука
    achievementSound: 'iOS Notification', // Вкл/Выкл звука
    diarySound: 'Journal write sound', // Вкл/Выкл звука
    smartphoneSound: 'MIUI Notification', // Вкл/Выкл звука
    
    soundsList: [
      { soundName: 'Journal write sound' },
      { soundName: 'iOS Notification' },
      { soundName: 'MIUI Notification' },
      { soundName: 'MotoX Notification' },
      { soundName: 'Nice Notification' },
      { soundName: 'S7 Notification' },
      { soundName: 'Xperia Notification' }
    ],
  },
  mutations: {
    // Громкость звука
    achievementVolume(){
      this.state.sound.achievementVolume = this.state.sound.achievementVolume;
    },
    diaryVolume(){
      this.state.sound.diaryVolume = this.state.sound.diaryVolume;
    },
    smartphoneVolume(){
      this.state.sound.smartphoneVolume = this.state.sound.smartphoneVolume;
    },

    // Вкл/Выкл звука
    gameGlobalSoundsEnable(){
      this.state.sound.gameGlobalSoundsEnable = !this.state.sound.gameGlobalSoundsEnable;
      checkSoundsEnable() // Mute or unmute
    },
    achievementSoundEnable(){
      this.state.sound.achievementSoundEnable = !this.state.sound.achievementSoundEnable;
    },
    diarySoundEnable(){
      this.state.sound.diarySoundEnable = !this.state.sound.diarySoundEnable;
    },
    smartphoneSoundEnable(){
      this.state.sound.smartphoneSoundEnable = !this.state.sound.smartphoneSoundEnable;
    },
    
    // Выбор звука
    achievementSound(){
      this.state.sound.achievementSound = this.state.sound.achievementSound;
    },
    diarySound(){
      this.state.sound.diarySound = this.state.sound.diarySound;
    },
    smartphoneSound(){
      this.state.sound.smartphoneSound = this.state.sound.smartphoneSound;
    },
  },
}

export default sound