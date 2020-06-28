import store from '../store/store'
import router from '../router'
import hotkeys from 'hotkeys-js';
import eventBus from './eventBus'

// Получение текущих клавиатурных сокращений
function _getKeyboardShortcuts(){
  // Список всех горячих клавиш
  const HOTKEYS_DATA = {
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
  const str = '';
  // Объёдиняем все значение в одну строку
  for (let key in HOTKEYS_DATA) {
    str = `${str}${HOTKEYS_DATA[key]},`
  }
  // Убираем запятую в конце
  str = str.substring(0, str.length - 1)
  // Добавляем новоё своёство к объекту
  HOTKEYS_DATA.allHotkeys = str

  return HOTKEYS_DATA;
}

export default {
  bindHotkeys: function(){
    // Получаем текущие клавиатурные сокращения
    const keyShortcuts = _getKeyboardShortcuts()
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
            router.push('/Journal')
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
            eventBus.emit('QuickSave');
            break;
          }
          // Быстрая загрузка 
          case keyShortcuts.savesQuickLoad: {
            eventBus.emit('QuickLoad');
            break;
          }
          // Открыть чат
          case keyShortcuts.mChatOpen: {
            if (!store.state.mChat.show)
              store.commit('mChatShow', true);
            else 
              store.commit('mChatShow', false);
            break;
          }
        }      
      }
    });
  },
  unbindHotkeys: function(){
    // Удаляем ранее установленную привязку
    hotkeys.deleteScope('all');
  }
}

