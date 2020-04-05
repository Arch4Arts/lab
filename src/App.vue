<template>  
  <v-app> 
  <v-layout v-touch="{ right: () => SwipeRight(), left: () => SwipeLeft(), down: () => SwipeBottom(), up: () => SwipeTop() }">
    <v-content>
    <!-- Pages -->
    <StartPageInfo v-if="$store.state.firstStart"/>
    <!-- Components -->
    <Start18Caution/>
    <Settings/>
    <Saves/>
    <navigation v-if="$store.state.Header"/>
      <router-view v-if="!$store.state.firstStart"/>
    </v-content>
  </v-layout>  
  </v-app>
</template>

<script>
import Start18Caution from "./components/Start18Caution";
import Navigation from "./components/Navigation";
import StartPageInfo from "./Pages/StartPageInfo";
import Settings from './components/Settings';
import Main from "./Pages/Main";

export default {
  name: 'App',
  methods: {
      SwipeRight(){
        if (this.$store.state.isOpenSettings) this.$store.state.isOpenSettings = !this.$store.state.isOpenSettings
        if (this.$store.state.isOpenSaves) this.$store.state.isOpenSaves = !this.$store.state.isOpenSaves
        if (this.$store.state.appHeaderEnable) { // Включено ли меню (Отключается при выборе палитры цвета диалогов)
          if (this.$route.path != '/Diary') // Отключение свайпа на странице дневника (там переход по подстраницам тоже на свайпах)
          if (this.$store.state.chat.isChatOpen) { // проверка открыт ли чат
            if (this.$store.state.chat.UserListShow) { // проверка открыт ли контакт
              this.$store.state.chat.isChatOpen = !this.$store.state.chat.isChatOpen // закрываем окно чата
              this.$store.commit('updateStores');
              if (screen.width <= 450) { // Включаем бар при закрытии чата
                this.$store.state.Header = !this.$store.state.Header
                this.$store.commit('updateStores');
                }
            }
            else this.$store.state.chat.UserListShow = !this.$store.state.chat.UserListShow // Закрывает текущий контакт если он открыт
          }
        }
      },
      SwipeLeft(){
        if (this.$store.state.chat.chatEnable && this.$store.state.chat.UserListShow) { // Включён ли чат (Отключается при выборе палитры цвета диалогов)
          if (this.$route.path != '/Diary') { // Отключение свайпа на странице дневника (там переход по подстраницам тоже на свайпах)
            this.$store.state.chat.isChatOpen = !this.$store.state.chat.isChatOpen // открываем окно чата
            this.$store.commit('updateStores');
            if (screen.width <= 450) { // Отключаем бар при закрытии чата
              this.$store.state.Header = !this.$store.state.Header
              this.$store.commit('updateStores');
            }
          }
        }
      },
      SwipeBottom(){
        this.$store.state.radialMenuShow = true // Не менять, на телефоне прокрутка свайпами не соотвествует направлению прокрутки на компе
        this.$store.commit('updateStores');
      },
      SwipeTop(){
        this.$store.state.radialMenuShow = false
        this.$store.commit('updateStores');
      }
   },
  components: {
    Start18Caution,
    Navigation,
    StartPageInfo,
    Main,
    Settings,
    Saves: () => import('./components/Saves')
  },
}
</script>

<style lang="scss">
@import './Styles/themes.scss';
@import './Styles/chatThemes.scss';

// .v-btn { ОБРАЗЕЦ КАК ПЕРЕНАЗНАЧАТЬ СТИЛИ VUETIFY
//   color: green !important
// }

.v-layout {
  background: var(--app--v-layout--background);
}

.Page {
  background: var(--app--Page--background);
  color: var(--app--Page--color);
  font-size: 14pt;
  text-align: justify;
  padding: 2%;
  box-sizing: border-box;
  height: auto;
  border-right: var(--app--Page--border-right);
  border-left: var(--app--Page--border-left);
}

.Page-element {
  background: var(--app--Page-element--background);
  color: var(--app--Page-element--color);
}

.nav-btn:hover {
  background: var(--app--nav-btn__hover--background) !important;
}

.v-btn:hover {
  background: var(--app--v-btn__hover--background) !important;
}

.v-card {
  background: var(--app--v-card--background) !important;
}

.important-modal-header {
  background: var(--global--important-modal-header--background);
}

.important-modal-bg {
  background: var(--global--important-modal-bg--background);
}

.important-modal-button {
  background: var(--global--important-modal-button--background) !important;
}

.important-modal-button:hover {
  background: var(--global--important-modal-button--background) !important;
}

.v-tooltip {
  background: var(--global--v-tooltip--background) !important;
}

/* Отключаем показ полосы прокрутки (вертикальной) */
html {
  -ms-overflow-style: none;  /* IE 10+ */
  scrollbar-width: none;  /* Firefox */
}

html::-webkit-scrollbar { 
    display: none;  /* Safari and Chrome */
}

h1 {
  font-size: 2.0em;
  color: var(--app--h1--color);
}

.font-color {
  color: var(--app--font-color--color);
}

a { // убираем подчёркивание и делаем жирнее
	text-decoration: none;
    font-weight:bold;
}  

a:hover { 
	text-decoration: none;
    font-weight:bold;
} 

@media (max-width: 450px) {
  .Page {
    border-right: none;
    border-left: none;
  }  
}

/* roboto-100 - cyrillic_latin */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 100;
  src: local('Roboto Thin'), local('Roboto-Thin'),
       url('./assets/fonts/Roboto/roboto-v20-cyrillic_latin-100.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('./assets/fonts/Roboto/roboto-v20-cyrillic_latin-100.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* roboto-100italic - cyrillic_latin */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 100;
  src: local('Roboto Thin Italic'), local('Roboto-ThinItalic'),
       url('./assets/fonts/Roboto/roboto-v20-cyrillic_latin-100italic.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('./assets/fonts/Roboto/roboto-v20-cyrillic_latin-100italic.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* roboto-300 - cyrillic_latin */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  src: local('Roboto Light'), local('Roboto-Light'),
       url('./assets/fonts/Roboto/roboto-v20-cyrillic_latin-300.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('./assets/fonts/Roboto/roboto-v20-cyrillic_latin-300.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* roboto-300italic - cyrillic_latin */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 300;
  src: local('Roboto Light Italic'), local('Roboto-LightItalic'),
       url('./assets/fonts/Roboto/roboto-v20-cyrillic_latin-300italic.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('./assets/fonts/Roboto/roboto-v20-cyrillic_latin-300italic.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* roboto-regular - cyrillic_latin */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  src: local('Roboto'), local('Roboto-Regular'),
       url('./assets/fonts/Roboto/roboto-v20-cyrillic_latin-regular.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('./assets/fonts/Roboto/roboto-v20-cyrillic_latin-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* roboto-italic - cyrillic_latin */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 400;
  src: local('Roboto Italic'), local('Roboto-Italic'),
       url('./assets/fonts/Roboto/roboto-v20-cyrillic_latin-italic.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('./assets/fonts/Roboto/roboto-v20-cyrillic_latin-italic.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* roboto-500 - cyrillic_latin */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  src: local('Roboto Medium'), local('Roboto-Medium'),
       url('./assets/fonts/Roboto/roboto-v20-cyrillic_latin-500.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('./assets/fonts/Roboto/roboto-v20-cyrillic_latin-500.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* roboto-500italic - cyrillic_latin */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 500;
  src: local('Roboto Medium Italic'), local('Roboto-MediumItalic'),
       url('./assets/fonts/Roboto/roboto-v20-cyrillic_latin-500italic.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('./assets/fonts/Roboto/roboto-v20-cyrillic_latin-500italic.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* roboto-700 - cyrillic_latin */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  src: local('Roboto Bold'), local('Roboto-Bold'),
       url('./assets/fonts/Roboto/roboto-v20-cyrillic_latin-700.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('./assets/fonts/Roboto/roboto-v20-cyrillic_latin-700.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* roboto-700italic - cyrillic_latin */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 700;
  src: local('Roboto Bold Italic'), local('Roboto-BoldItalic'),
       url('./assets/fonts/Roboto/roboto-v20-cyrillic_latin-700italic.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('./assets/fonts/Roboto/roboto-v20-cyrillic_latin-700italic.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* roboto-900 - cyrillic_latin */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 900;
  src: local('Roboto Black'), local('Roboto-Black'),
       url('./assets/fonts/Roboto/roboto-v20-cyrillic_latin-900.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('./assets/fonts/Roboto/roboto-v20-cyrillic_latin-900.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* roboto-900italic - cyrillic_latin */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 900;
  src: local('Roboto Black Italic'), local('Roboto-BlackItalic'),
       url('./assets/fonts/Roboto/roboto-v20-cyrillic_latin-900italic.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('./assets/fonts/Roboto/roboto-v20-cyrillic_latin-900italic.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}

/* roboto-slab-100 - cyrillic_latin */
@font-face {
  font-family: 'Roboto Slab';
  font-style: normal;
  font-weight: 100;
  src: local('Roboto Slab Thin'), local('RobotoSlab-Thin'),
       url('./assets/fonts/RobotoSlab/roboto-slab-v9-cyrillic_latin-100.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('./assets/fonts/RobotoSlab/roboto-slab-v9-cyrillic_latin-100.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* roboto-slab-300 - cyrillic_latin */
@font-face {
  font-family: 'Roboto Slab';
  font-style: normal;
  font-weight: 300;
  src: local('Roboto Slab Light'), local('RobotoSlab-Light'),
       url('./assets/fonts/RobotoSlab/roboto-slab-v9-cyrillic_latin-300.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('./assets/fonts/RobotoSlab/roboto-slab-v9-cyrillic_latin-300.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* roboto-slab-regular - cyrillic_latin */
@font-face {
  font-family: 'Roboto Slab';
  font-style: normal;
  font-weight: 400;
  src: local('Roboto Slab Regular'), local('RobotoSlab-Regular'),
       url('./assets/fonts/RobotoSlab/roboto-slab-v9-cyrillic_latin-regular.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('./assets/fonts/RobotoSlab/roboto-slab-v9-cyrillic_latin-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* roboto-slab-700 - cyrillic_latin */
@font-face {
  font-family: 'Roboto Slab';
  font-style: normal;
  font-weight: 700;
  src: local('Roboto Slab Bold'), local('RobotoSlab-Bold'),
       url('./assets/fonts/RobotoSlab/roboto-slab-v9-cyrillic_latin-700.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('./assets/fonts/RobotoSlab/roboto-slab-v9-cyrillic_latin-700.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}

/* open-sans-300 - cyrillic_latin */
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 300;
  src: local('Open Sans Light'), local('OpenSans-Light'),
       url('./assets/fonts/OpenSans/open-sans-v17-cyrillic_latin-300.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('./assets/fonts/OpenSans/open-sans-v17-cyrillic_latin-300.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* open-sans-300italic - cyrillic_latin */
@font-face {
  font-family: 'Open Sans';
  font-style: italic;
  font-weight: 300;
  src: local('Open Sans Light Italic'), local('OpenSans-LightItalic'),
       url('./assets/fonts/OpenSans/open-sans-v17-cyrillic_latin-300italic.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('./assets/fonts/OpenSans/open-sans-v17-cyrillic_latin-300italic.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* open-sans-regular - cyrillic_latin */
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 400;
  src: local('Open Sans Regular'), local('OpenSans-Regular'),
       url('./assets/fonts/OpenSans/open-sans-v17-cyrillic_latin-regular.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('./assets/fonts/OpenSans/open-sans-v17-cyrillic_latin-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* open-sans-italic - cyrillic_latin */
@font-face {
  font-family: 'Open Sans';
  font-style: italic;
  font-weight: 400;
  src: local('Open Sans Italic'), local('OpenSans-Italic'),
       url('./assets/fonts/OpenSans/open-sans-v17-cyrillic_latin-italic.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('./assets/fonts/OpenSans/open-sans-v17-cyrillic_latin-italic.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* open-sans-600 - cyrillic_latin */
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 600;
  src: local('Open Sans SemiBold'), local('OpenSans-SemiBold'),
       url('./assets/fonts/OpenSans/open-sans-v17-cyrillic_latin-600.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('./assets/fonts/OpenSans/open-sans-v17-cyrillic_latin-600.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* open-sans-600italic - cyrillic_latin */
@font-face {
  font-family: 'Open Sans';
  font-style: italic;
  font-weight: 600;
  src: local('Open Sans SemiBold Italic'), local('OpenSans-SemiBoldItalic'),
       url('./assets/fonts/OpenSans/open-sans-v17-cyrillic_latin-600italic.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('./assets/fonts/OpenSans/open-sans-v17-cyrillic_latin-600italic.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* open-sans-700 - cyrillic_latin */
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 700;
  src: local('Open Sans Bold'), local('OpenSans-Bold'),
       url('./assets/fonts/OpenSans/open-sans-v17-cyrillic_latin-700.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('./assets/fonts/OpenSans/open-sans-v17-cyrillic_latin-700.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* open-sans-700italic - cyrillic_latin */
@font-face {
  font-family: 'Open Sans';
  font-style: italic;
  font-weight: 700;
  src: local('Open Sans Bold Italic'), local('OpenSans-BoldItalic'),
       url('./assets/fonts/OpenSans/open-sans-v17-cyrillic_latin-700italic.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('./assets/fonts/OpenSans/open-sans-v17-cyrillic_latin-700italic.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* open-sans-800 - cyrillic_latin */
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 800;
  src: local('Open Sans ExtraBold'), local('OpenSans-ExtraBold'),
       url('./assets/fonts/OpenSans/open-sans-v17-cyrillic_latin-800.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('./assets/fonts/OpenSans/open-sans-v17-cyrillic_latin-800.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* open-sans-800italic - cyrillic_latin */
@font-face {
  font-family: 'Open Sans';
  font-style: italic;
  font-weight: 800;
  src: local('Open Sans ExtraBold Italic'), local('OpenSans-ExtraBoldItalic'),
       url('./assets/fonts/OpenSans/open-sans-v17-cyrillic_latin-800italic.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('./assets/fonts/OpenSans/open-sans-v17-cyrillic_latin-800italic.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}

/* lato-100 - latin */
@font-face {
  font-family: 'Lato';
  font-style: normal;
  font-weight: 100;
  src: local('Lato Hairline'), local('Lato-Hairline'),
       url('./assets/fonts/Lato/lato-v16-latin-100.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('./assets/fonts/Lato/lato-v16-latin-100.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* lato-100italic - latin */
@font-face {
  font-family: 'Lato';
  font-style: italic;
  font-weight: 100;
  src: local('Lato Hairline Italic'), local('Lato-HairlineItalic'),
       url('./assets/fonts/Lato/lato-v16-latin-100italic.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('./assets/fonts/Lato/lato-v16-latin-100italic.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* lato-300 - latin */
@font-face {
  font-family: 'Lato';
  font-style: normal;
  font-weight: 300;
  src: local('Lato Light'), local('Lato-Light'),
       url('./assets/fonts/Lato/lato-v16-latin-300.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('./assets/fonts/Lato/lato-v16-latin-300.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* lato-regular - latin */
@font-face {
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  src: local('Lato Regular'), local('Lato-Regular'),
       url('./assets/fonts/Lato/lato-v16-latin-regular.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('./assets/fonts/Lato/lato-v16-latin-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* lato-300italic - latin */
@font-face {
  font-family: 'Lato';
  font-style: italic;
  font-weight: 300;
  src: local('Lato Light Italic'), local('Lato-LightItalic'),
       url('./assets/fonts/Lato/lato-v16-latin-300italic.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('./assets/fonts/Lato/lato-v16-latin-300italic.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* lato-italic - latin */
@font-face {
  font-family: 'Lato';
  font-style: italic;
  font-weight: 400;
  src: local('Lato Italic'), local('Lato-Italic'),
       url('./assets/fonts/Lato/lato-v16-latin-italic.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('./assets/fonts/Lato/lato-v16-latin-italic.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* lato-700 - latin */
@font-face {
  font-family: 'Lato';
  font-style: normal;
  font-weight: 700;
  src: local('Lato Bold'), local('Lato-Bold'),
       url('./assets/fonts/Lato/lato-v16-latin-700.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('./assets/fonts/Lato/lato-v16-latin-700.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* lato-700italic - latin */
@font-face {
  font-family: 'Lato';
  font-style: italic;
  font-weight: 700;
  src: local('Lato Bold Italic'), local('Lato-BoldItalic'),
       url('./assets/fonts/Lato/lato-v16-latin-700italic.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('./assets/fonts/Lato/lato-v16-latin-700italic.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* lato-900 - latin */
@font-face {
  font-family: 'Lato';
  font-style: normal;
  font-weight: 900;
  src: local('Lato Black'), local('Lato-Black'),
       url('./assets/fonts/Lato/lato-v16-latin-900.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('./assets/fonts/Lato/lato-v16-latin-900.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* lato-900italic - latin */
@font-face {
  font-family: 'Lato';
  font-style: italic;
  font-weight: 900;
  src: local('Lato Black Italic'), local('Lato-BlackItalic'),
       url('./assets/fonts/Lato/lato-v16-latin-900italic.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('./assets/fonts/Lato/lato-v16-latin-900italic.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}

/* merriweather-300 - cyrillic_latin */
@font-face {
  font-family: 'Merriweather';
  font-style: normal;
  font-weight: 300;
  src: local('Merriweather Light'), local('Merriweather-Light'),
       url('./assets/fonts/Merriweather/merriweather-v21-cyrillic_latin-300.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('./assets/fonts/Merriweather/merriweather-v21-cyrillic_latin-300.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* merriweather-regular - cyrillic_latin */
@font-face {
  font-family: 'Merriweather';
  font-style: normal;
  font-weight: 400;
  src: local('Merriweather Regular'), local('Merriweather-Regular'),
       url('./assets/fonts/Merriweather/merriweather-v21-cyrillic_latin-regular.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('./assets/fonts/Merriweather/merriweather-v21-cyrillic_latin-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* merriweather-300italic - cyrillic_latin */
@font-face {
  font-family: 'Merriweather';
  font-style: italic;
  font-weight: 300;
  src: local('Merriweather Light Italic'), local('Merriweather-LightItalic'),
       url('./assets/fonts/Merriweather/merriweather-v21-cyrillic_latin-300italic.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('./assets/fonts/Merriweather/merriweather-v21-cyrillic_latin-300italic.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* merriweather-italic - cyrillic_latin */
@font-face {
  font-family: 'Merriweather';
  font-style: italic;
  font-weight: 400;
  src: local('Merriweather Italic'), local('Merriweather-Italic'),
       url('./assets/fonts/Merriweather/merriweather-v21-cyrillic_latin-italic.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('./assets/fonts/Merriweather/merriweather-v21-cyrillic_latin-italic.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* merriweather-700italic - cyrillic_latin */
@font-face {
  font-family: 'Merriweather';
  font-style: italic;
  font-weight: 700;
  src: local('Merriweather Bold Italic'), local('Merriweather-BoldItalic'),
       url('./assets/fonts/Merriweather/merriweather-v21-cyrillic_latin-700italic.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('./assets/fonts/Merriweather/merriweather-v21-cyrillic_latin-700italic.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* merriweather-700 - cyrillic_latin */
@font-face {
  font-family: 'Merriweather';
  font-style: normal;
  font-weight: 700;
  src: local('Merriweather Bold'), local('Merriweather-Bold'),
       url('./assets/fonts/Merriweather/merriweather-v21-cyrillic_latin-700.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('./assets/fonts/Merriweather/merriweather-v21-cyrillic_latin-700.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* merriweather-900 - cyrillic_latin */
@font-face {
  font-family: 'Merriweather';
  font-style: normal;
  font-weight: 900;
  src: local('Merriweather Black'), local('Merriweather-Black'),
       url('./assets/fonts/Merriweather/merriweather-v21-cyrillic_latin-900.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('./assets/fonts/Merriweather/merriweather-v21-cyrillic_latin-900.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* merriweather-900italic - cyrillic_latin */
@font-face {
  font-family: 'Merriweather';
  font-style: italic;
  font-weight: 900;
  src: local('Merriweather Black Italic'), local('Merriweather-BlackItalic'),
       url('./assets/fonts/Merriweather/merriweather-v21-cyrillic_latin-900italic.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('./assets/fonts/Merriweather/merriweather-v21-cyrillic_latin-900italic.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}

@font-face {
	font-family: 'HelveticaNeueCyr';
	src: local('HelveticaNeueCyr-Medium'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-Medium.woff') format('woff');
	font-weight: 500;
	font-style: normal;
}

@font-face {
	font-family: 'HelveticaNeueCyr';
	src: local('HelveticaNeueCyr-Heavy'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-Heavy.woff') format('woff');
	font-weight: 900;
	font-style: normal;
}

@font-face {
	font-family: 'HelveticaNeueCyr';
	src: local('HelveticaNeueCyr-HeavyItalic'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-HeavyItalic.woff') format('woff');
	font-weight: 900;
	font-style: italic;
}

@font-face {
	font-family: 'HelveticaNeueCyr';
	src: local('HelveticaNeueCyr-Black'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-Black.woff') format('woff');
	font-weight: 900;
	font-style: normal;
}

@font-face {
	font-family: 'HelveticaNeueCyr';
	src: local('HelveticaNeueCyr-UltraLightItalic'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-UltraLightItalic.woff') format('woff');
	font-weight: 200;
	font-style: italic;
}

@font-face {
	font-family: 'HelveticaNeueCyr';
	src: local('HelveticaNeueCyr-BlackItalic'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-BlackItalic.woff') format('woff');
	font-weight: 900;
	font-style: italic;
}

@font-face {
	font-family: 'HelveticaNeueCyr';
	src: local('HelveticaNeueCyr-ThinItalic'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-ThinItalic.woff') format('woff');
	font-weight: 100;
	font-style: italic;
}

@font-face {
	font-family: 'HelveticaNeueCyr';
	src: local('HelveticaNeueCyr-MediumItalic'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-MediumItalic.woff') format('woff');
	font-weight: 500;
	font-style: italic;
}

@font-face {
	font-family: 'HelveticaNeueCyr';
	src: local('HelveticaNeueCyr-LightItalic'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-LightItalic.woff') format('woff');
	font-weight: 300;
	font-style: italic;
}

@font-face {
	font-family: 'HelveticaNeueCyr';
	src: local('HelveticaNeueCyr-UltraLight'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-UltraLight.woff') format('woff');
	font-weight: 200;
	font-style: normal;
}

@font-face {
	font-family: 'HelveticaNeueCyr';
	src: local('HelveticaNeueCyr-BoldItalic'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-BoldItalic.woff') format('woff');
	font-weight: bold;
	font-style: italic;
}

@font-face {
	font-family: 'HelveticaNeueCyr';
	src: local('HelveticaNeueCyr-Italic'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-Italic.woff') format('woff');
	font-weight: 500;
	font-style: italic;
}

@font-face {
	font-family: 'HelveticaNeueCyr';
	src: local('HelveticaNeueCyr-Roman'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-Roman.woff') format('woff');
	font-weight: normal;
	font-style: normal;
}

@font-face {
	font-family: 'HelveticaNeueCyr';
	src: local('HelveticaNeueCyr-Bold'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-Bold.woff') format('woff');
	font-weight: bold;
	font-style: normal;
}

@font-face {
	font-family: 'HelveticaNeueCyr';
	src: local('HelveticaNeueCyr-Light'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-Light.woff') format('woff');
	font-weight: 300;
	font-style: normal;
}

@font-face {
	font-family: 'HelveticaNeueCyr';
	src: local('HelveticaNeueCyr-Thin'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-Thin.woff') format('woff');
	font-weight: 100;
	font-style: normal;
}

@font-face {
    font-family: 'Minion Pro';
    src: local('Minion Pro Medium Italic'), local('MinionPro-MediumIt'),
        url('./assets/fonts/MinionPro/MinionPro-MediumIt.woff') format('woff');
    font-weight: 500;
    font-style: italic;
}

@font-face {
    font-family: 'Minion Pro';
    src: local('Minion Pro Bold Condensed'), local('MinionPro-BoldCn'),
        url('./assets/fonts/MinionPro/MinionPro-BoldCn.woff') format('woff');
    font-weight: bold;
    font-style: normal;
}

@font-face {
    font-family: 'Minion Pro';
    src: local('Minion Pro Bold Italic'), local('MinionPro-BoldIt'),
        url('./assets/fonts/MinionPro/MinionPro-BoldIt.woff') format('woff');
    font-weight: bold;
    font-style: italic;
}

@font-face {
    font-family: 'Minion Pro';
    src: local('Minion Pro Medium'), local('MinionPro-Medium'),
        url('./assets/fonts/MinionPro/MinionPro-Medium.woff') format('woff');
    font-weight: 500;
    font-style: normal;
}

@font-face {
    font-family: 'Minion Pro';
    src: local('Minion Pro Semibold Italic'), local('MinionPro-SemiboldIt'),
        url('./assets/fonts/MinionPro/MinionPro-SemiboldIt.woff') format('woff');
    font-weight: 600;
    font-style: italic;
}

@font-face {
    font-family: 'Minion Pro';
    src: local('Minion Pro Semibold'), local('MinionPro-Semibold'),
        url('./assets/fonts/MinionPro/MinionPro-Semibold.woff') format('woff');
    font-weight: 600;
    font-style: normal;
}

@font-face {
    font-family: 'Minion Pro';
    src: local('Minion Pro Bold'), local('MinionPro-Bold'),
        url('./assets/fonts/MinionPro/MinionPro-Bold.woff') format('woff');
    font-weight: bold;
    font-style: normal;
}

@font-face {
    font-family: 'Minion Pro';
    src: local('Minion Pro Bold Condensed Italic'), local('MinionPro-BoldCnIt'),
        url('./assets/fonts/MinionPro/MinionPro-BoldCnIt.woff') format('woff');
    font-weight: bold;
    font-style: italic;
}

@font-face {
    font-family: 'Minion Pro';
    src: local('Minion Pro Italic'), local('MinionPro-It'),
        url('./assets/fonts/MinionPro/MinionPro-It.woff') format('woff');
    font-weight: normal;
    font-style: italic;
}

@font-face {
    font-family: 'Minion Pro';
    src: local('Minion Pro Regular'), local('MinionPro-Regular'),
        url('./assets/fonts/MinionPro/MinionPro-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}



</style>

