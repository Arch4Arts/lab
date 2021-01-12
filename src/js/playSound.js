import store from '../store/store'

const SOUND_LIST = [ 
  require('../media/audio/notifications/Journal write sound.mp3'),
  require('../media/audio/notifications/iOS Notification.mp3'),
  require('../media/audio/notifications/MIUI Notification.mp3'),
  require('../media/audio/notifications/MotoX Notification.mp3'),
  require('../media/audio/notifications/Nice Notification.mp3'),
  require('../media/audio/notifications/S7 Notification.mp3'),
  require('../media/audio/notifications/Xperia Notification.mp3'), 
]

function getSoundByName(soundName) {
  return SOUND_LIST.find(sound => {
    if (sound.includes(soundName)) 
      return true;
  })
}

export function playSound(soundName, volumeState = 0.5) {
  if (store.state.sound.isPlaySoundsEnable) {
    const audio = new Audio(getSoundByName(soundName));
    audio.volume = volumeState;
    audio.play();    
  }
}

export function playSoundLoop(soundName, volumeState = 0.5) { 
  if (store.state.sound.isPlaySoundsEnable) {
    const loopAudio = new Audio(getSoundByName(soundName));
    loopAudio.volume = volumeState;
    loopAudio.loop = true;
    loopAudio.id = 'playbackSoundLoop';
    loopAudio.play();
    document.body.appendChild(loopAudio); // Для остановка проигрывания изневго, при поиске по id
  }
}