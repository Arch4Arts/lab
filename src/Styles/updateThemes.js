import store from '../stores/store';

export default function updateThemes(){
  // Оформление мобильного чата
  if (store.state.mChat.themesList[0].themeName === store.state.mChat.currentSelectedTheme_MC)
    document.documentElement.setAttribute('mChatTheme', 'Minimalistic')
  else if (store.state.mChat.themesList[1].themeName === store.state.mChat.currentSelectedTheme_MC)
    document.documentElement.setAttribute('mChatTheme', 'Dark-Minimalistic')
  else if (store.state.mChat.themesList[2].themeName === store.state.mChat.currentSelectedTheme_MC)
    document.documentElement.setAttribute('mChatTheme', 'Scarlet')
  // Оформление игры
  if (store.state.gameThemesList[0].themeName === store.state.gameCurrentTheme)
    document.documentElement.setAttribute('gameTheme', 'NordLight')
  else if (store.state.gameThemesList[1].themeName === store.state.gameCurrentTheme)
    document.documentElement.setAttribute('gameTheme', 'NordDark')
  else if (store.state.gameThemesList[2].themeName === store.state.gameCurrentTheme)
    document.documentElement.setAttribute('gameTheme', 'CustomDark')
}