import store from '../stores/store'
import hotkeys from 'hotkeys-js';


// Получение текущих клавиатурных сокращений
function keyboardShortcuts(){
  // Список всех горячих клавиш
  let hotkeyData = {
    settingsOpen: store.state.settingsHotkeys.settingsOpen,                   
    settingsToggleGlobalSoundEnable: store.state.settingsHotkeys.settingsToggleGlobalSoundEnable,

    journalOpen: store.state.journalHotkeys.journalOpen,           
    journalTabCharacters: store.state.journalHotkeys.journalTabCharacters,  
    journalTabDiary: store.state.journalHotkeys.journalTabDiary,       
    journalTabAchievements: store.state.journalHotkeys.journalTabAchievements,

    savesOpen: store.state.savesHotkeys.savesOpen,     
    savesQuickSave: store.state.savesHotkeys.savesQuickSave, 
    savesQuickLoad: store.state.savesHotkeys.savesQuickLoad,

    mChatOpen: store.state.mChatHotkeys.mChatOpen,
  }
  let str = '';
  // Объёдиняем все значение в одну строку
  for (let key in hotkeyData) {
    str = `${str}${hotkeyData[key]},`
  }
  // Убираем запятую в конце
  str = str.substring(0, str.length - 1)
  // Добавляем новоё своёство к объекту
  hotkeyData.allHotkeys = str

  return hotkeyData;
}

export function bindHotkeys(){
  // Получаем текущие клавиатурные сокращения
  let keyShortcuts = keyboardShortcuts()
  // Устанавливаем привязку на текущие клавиатурные сокращения
  hotkeys(keyShortcuts.allHotkeys, function (handler){
    if (store.state.gameHotkeysEnable && !store.state.isOpenSettingsDrawer) {
      console.log('if passed')
      switch (handler.key) {
        case keyShortcuts.settingsOpen: {
          console.log('you pressed ctrl+a!');
          break;
        }
        case keyShortcuts.settingsToggleGlobalSoundEnable: {
          console.log('you pressed ctrl+b!');
          break;
        }
        case keyShortcuts.journalOpen: {
          console.log('you pressed r!');
          break;
        }
        case keyShortcuts.journalTabCharacters: {
          console.log('you pressed f!');
          break;
        }
        case keyShortcuts.journalTabDiary: {
          console.log('you pressed f!');
          break;
        }
        case keyShortcuts.journalTabAchievements: {
          console.log('you pressed f!');
          break;
        }
        case keyShortcuts.savesOpen: {
          console.log('you pressed f!');
          break;
        }
        case keyShortcuts.savesQuickSave: {
          console.log(keyShortcuts.savesQuickSave);
          break;
        }
        case keyShortcuts.savesQuickLoad: {
          console.log('savesQuickLoad');
          break;
        }
        case keyShortcuts.mChatOpen: {
          console.log('mChatOpen');
          break;
        }
      }      
    }
  });
}

export function unbindHotkeys(){
  // Удаляем ранее установленную привязку
  hotkeys.deleteScope('all');
}