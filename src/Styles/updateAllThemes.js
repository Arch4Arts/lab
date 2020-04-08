import store from '../stores/store';

export default function updateAllThemes(){
  // Оформление мобильного чата
  if (store.state.mChat.mChat_ThemesList[0].themeName === store.state.mChat.mChat_CurrentTheme_MC)
    document.documentElement.setAttribute('mChatTheme', 'Minimalistic')
  else if (store.state.mChat.mChat_ThemesList[1].themeName === store.state.mChat.mChat_CurrentTheme_MC)
    document.documentElement.setAttribute('mChatTheme', 'Dark-Minimalistic')
  else if (store.state.mChat.mChat_ThemesList[2].themeName === store.state.mChat.mChat_CurrentTheme_MC)
    document.documentElement.setAttribute('mChatTheme', 'Scarlet')
  // Оформление игры
  if (store.state.gameThemesList[0].themeName === store.state.gameCurrentTheme)
    document.documentElement.setAttribute('gameCurrentTheme', 'NordLight')
  else if (store.state.gameThemesList[1].themeName === store.state.gameCurrentTheme)
    document.documentElement.setAttribute('gameCurrentTheme', 'NordDark')
  else if (store.state.gameThemesList[2].themeName === store.state.gameCurrentTheme)
    document.documentElement.setAttribute('gameCurrentTheme', 'CustomDark')
}