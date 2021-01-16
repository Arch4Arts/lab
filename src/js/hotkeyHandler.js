import store from '../store/store'
import router from '../router'
import eventBus from './eventBus'

document.body.addEventListener('keyup', function(e) {
  if (store.state.hotkeySettings.isEnable && !store.state.showSettingsDrawer && !store.state.showSavesDrawer) {
    const hotkeys = store.state.hotkeySettings.hotkeys;
    switch (e.code) {
      case hotkeys.settingsOpen.code: {
        store.commit('showSettingsDrawer')
        break;
      }
      case hotkeys.settingsToggleGlobalSoundEnable.code: {
        store.commit('soundSettings/changePlaySoundsEnableState')
        break;
      }
      case hotkeys.journalOpen.code: {
        router.push('/Journal')
        break;
      }
      case hotkeys.journalTabCharacters.code: {

        break;
      }
      case hotkeys.journalTabDiary.code: {

        break;
      }
      case hotkeys.journalTabAchievements.code: {

        break;
      }
      // Открыть сохранения
      case hotkeys.savesOpen.code: {
        store.commit('showSavesDrawer')
        break;
      }
      // Быстрое сохранение
      case hotkeys.savesQuickSave.code: {
        eventBus.emit('QuickSave');
        break;
      }
      // Быстрая загрузка 
      case hotkeys.savesQuickLoad.code: {
        eventBus.emit('QuickLoad');
        break;
      }
      // Открыть чат
      case hotkeys.mChatOpen.code: {
        if (!store.state.mChat.show)
          store.commit('mChat/show', true);
        else 
          store.commit('mChat/show', false);
        break;
      }
    }
  }
})

