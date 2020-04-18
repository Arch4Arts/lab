import store from '../stores/store'

var soundsPath = [ 
  { path: require('../Media/audio/Notifications/Diary write sound.mp3') },
  { path: require('../Media/audio/Notifications/iOS Notification.mp3') },
  { path: require('../Media/audio/Notifications/MIUI Notification.mp3') },
  { path: require('../Media/audio/Notifications/Moan.mp3') },
  { path: require('../Media/audio/Notifications/MotoX Notification.mp3') },
  { path: require('../Media/audio/Notifications/Nice Notification.mp3') },
  { path: require('../Media/audio/Notifications/S7 Notification.mp3') },
  { path: require('../Media/audio/Notifications/Xperia Notification.mp3') }, 
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
  var searchResult;
  soundsPath.find(function(item) {
    if (item.path.indexOf(soundName) > 0)
    searchResult = item.path
  })
  return searchResult
}

export function soundPlay(soundName, volumeState = 0.5){ 
  var audio = new Audio(searchPath(soundName));
  audio.volume = volumeState
  audio.play();
}

export function soundPlayLoop(soundName, volumeState = 0.5){ 
  var loopAudio = new Audio(searchPath(soundName));
  loopAudio.volume = volumeState;
  loopAudio.loop = true;
  loopAudio.id = 'soundPlayLoop';
  loopAudio.play();
  document.body.appendChild(loopAudio); // Для остановка проигрывания изневго, при поиске по id
}

// const gameSound = new Vue({
//   // Управляет включанием звука plyr, а также всех видео и аудио элементов при перезагрузке (первом запуске)
//   created: function () {
//     if (!store.state.sound.gameGlobalSoundsEnable) {
//       // console.log('mute')
//       document.querySelectorAll("video, audio").forEach(element => element.muted = true);
//     }
//     else {
//       // console.log('unmute')
//       document.querySelectorAll("video, audio").forEach(element => element.muted = false);
//     }  
//   },
//   data: {
//     soundsPath: [ // Пути ко всем звукам
//       { path: require('../Media/audio/Notifications/Diary write sound.mp3') },
//       { path: require('../Media/audio/Notifications/iOS Notification.mp3') },
//       { path: require('../Media/audio/Notifications/MIUI Notification.mp3') },
//       { path: require('../Media/audio/Notifications/Moan.mp3') },
//       { path: require('../Media/audio/Notifications/MotoX Notification.mp3') },
//       { path: require('../Media/audio/Notifications/Nice Notification.mp3') },
//       { path: require('../Media/audio/Notifications/S7 Notification.mp3') },
//       { path: require('../Media/audio/Notifications/Xperia Notification.mp3') }, 
//     ]
//   },
//   methods: {
//     checkSoundsEnable(){
//       if (!store.state.sound.gameGlobalSoundsEnable) { // Mute
//         // console.log('mute')
//         document.querySelectorAll("video, audio").forEach(element => element.muted = true);
//       }
//       else { // Unmute
//         // console.log('unmute')
//         document.querySelectorAll("video, audio").forEach(element => element.muted = false);
//       } 
//     },
//     searchPath(soundName){
//       // Если путь был найден, возвращает путь
//       var searchResult;
//       gameSound.$data.soundsPath.find(function(item) {
//         if (item.path.indexOf(soundName) > 0)
//         searchResult = item.path
//       })
//       return searchResult
//     },
//     soundPlay(soundName, volumeState = 0.5){ 
//       var audio = new Audio(this.searchPath(soundName));
//       audio.volume = volumeState
//       audio.play();
//     },
//     soundPlayLoop(soundName, volumeState = 0.5){ 
//       var loopAudio = new Audio(this.searchPath(soundName));
//       loopAudio.volume = volumeState;
//       loopAudio.loop = true;
//       loopAudio.id = 'soundPlayLoop';
//       loopAudio.play();
//       document.body.appendChild(loopAudio);  
//     },
//   },
// })

// export default gameSound



// export function checkSoundsEnable(){
//   if (!store.state.sound.gameGlobalSoundsEnable) {
//     // console.log('mute')
//     document.querySelectorAll("video, audio").forEach(element => element.muted = true);
//   }
//   else {
//     // console.log('unmute')
//     document.querySelectorAll("video, audio").forEach(element => element.muted = false);
//   }  

// }

// function searchPath(soundName){
//   // Если путь был найден, возвращает путь
//   var searchResult;
//   soundsPath.find(function(item) {
//     if (item.path.indexOf(soundName) > 0)
//     searchResult = item.path
//   })
//   return searchResult
// }

// export function soundPlay(soundName, volumeState = 0.5){ 
//   var audio = new Audio(searchPath(soundName));
//   audio.volume = volumeState
//   audio.play();
// };

// export function soundPlayLoop(soundName, volumeState = 0.5){ 
//   var loopAudio = new Audio(searchPath(soundName));
//   loopAudio.volume = volumeState;
//   loopAudio.loop = true;
//   loopAudio.id = 'soundPlayLoop';
//   loopAudio.play();
//   document.body.appendChild(loopAudio);  
// };

