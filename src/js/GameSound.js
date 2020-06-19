import store from '../store/store'

const SOUNDS_PATH = [ 
  { path: require('../media/audio/notifications/Journal write sound.mp3') },
  { path: require('../media/audio/notifications/iOS Notification.mp3') },
  { path: require('../media/audio/notifications/MIUI Notification.mp3') },
  { path: require('../media/audio/notifications/MotoX Notification.mp3') },
  { path: require('../media/audio/notifications/Nice Notification.mp3') },
  { path: require('../media/audio/notifications/S7 Notification.mp3') },
  { path: require('../media/audio/notifications/Xperia Notification.mp3') }, 
]

export function checkSoundsEnable(){
  if (!store.state.sound.gameGlobalSoundsEnable) { // Mute
    // console.log('mute')
    document.querySelectorAll("video, audio").forEach(element => element.muted = true);
  }
  else { // Unmute
    // console.log('unmute')
    document.querySelectorAll("video, audio").forEach(element => element.muted = false);
  } 
}

export function searchPath(soundName){
  // Если путь был найден, возвращает путь
  let searchResult;
  SOUNDS_PATH.find(function(item) {
    if (item.path.indexOf(soundName) > 0)
    searchResult = item.path
  })
  return searchResult
}

export function soundPlay(soundName, volumeState = 0.5){
  if (store.state.sound.gameGlobalSoundsEnable) {
    let audio = new Audio(searchPath(soundName));
    audio.volume = volumeState
    audio.play();    
  }
}

export function soundPlayLoop(soundName, volumeState = 0.5){ 
  if (store.state.sound.gameGlobalSoundsEnable) {
    let loopAudio = new Audio(searchPath(soundName));
    loopAudio.volume = volumeState;
    loopAudio.loop = true;
    loopAudio.id = 'soundPlayLoop';
    loopAudio.play();
    document.body.appendChild(loopAudio); // Для остановка проигрывания изневго, при поиске по id
  }
}