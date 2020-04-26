import store from '../stores/store'
import router from '../router'
import hotkeys from 'hotkeys-js';
import eventBus from './initEventBus'

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
      // console.log('if passed')
      switch (handler.key) {
        case keyShortcuts.settingsOpen: {
          store.commit('isOpenSettingsDrawer')
          break;
        }
        case keyShortcuts.settingsToggleGlobalSoundEnable: {
          store.commit('gameGlobalSoundsEnable')
          break;
        }
        case keyShortcuts.journalOpen: {
          router.push('/Diary')
          break;
        }
        case keyShortcuts.journalTabCharacters: {

          break;
        }
        case keyShortcuts.journalTabDiary: {

          break;
        }
        case keyShortcuts.journalTabAchievements: {

          break;
        }
        // Открыть сохранения
        case keyShortcuts.savesOpen: {
          store.commit('isOpenSavesDrawer')
          break;
        }
        // Быстрое сохранение
        case keyShortcuts.savesQuickSave: {
          eventBus.$emit('QuickSave');
          break;
        }
        // Быстрая загрузка 
        case keyShortcuts.savesQuickLoad: {
          eventBus.$emit('QuickLoad');
          break;
        }
        // Открыть чат
        case keyShortcuts.mChatOpen: {
          store.commit('mChatShow')
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