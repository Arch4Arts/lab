import store from '../store/store';

export default function updateTheme(type){
  // Оформление интерфейса игры
  if (type === 'game') {
    if (store.state.gameThemesList[0].themeName === store.state.gameCurrentTheme)
      document.documentElement.setAttribute('gameTheme', 'NordLight')
    else if (store.state.gameThemesList[1].themeName === store.state.gameCurrentTheme)
      document.documentElement.setAttribute('gameTheme', 'NordDark')
    else if (store.state.gameThemesList[2].themeName === store.state.gameCurrentTheme)
      document.documentElement.setAttribute('gameTheme', 'CustomDark')
  }
  // Оформление мобильного чата
  if (type === 'mChat') {
    if (store.state.mChat.themesList[0].themeName === store.state.mChatData.MC.currentSelectedTheme)
      document.documentElement.setAttribute('mChatTheme', 'Minimalistic')
    else if (store.state.mChat.themesList[1].themeName === store.state.mChatData.MC.currentSelectedTheme)
      document.documentElement.setAttribute('mChatTheme', 'Dark-Minimalistic')
    else if (store.state.mChat.themesList[2].themeName === store.state.mChatData.MC.currentSelectedTheme)
      document.documentElement.setAttribute('mChatTheme', 'Scarlet')    
  }
}