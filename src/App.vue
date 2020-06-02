<template>  
  <v-app> 
  <v-layout v-touch="{ right: () => swipeRight(), left: () => swipeLeft(), down: () => swipeBottom(), up: () => swipeTop() }">
  <v-content @click="test()">
    <StartPage v-if="$store.state.gameDisplayingStartPage" />

    <Settings />
    <Saves />
    <mc-chat />
    <navigation v-if="$store.state.appHeaderEnable" />

    <router-view v-if="!$store.state.gameDisplayingStartPage">
      <!-- Entry --> 
    </router-view>
  </v-content>
  </v-layout>  
  </v-app>
</template>

<script>
import mcChat from './components/mChat/mcChat.vue'
import Navigation from "./components/Navigation";
import StartPage from "./pages/StartPage";
import Entry from "./pages/Entry";

export default {
  name: 'App',
  methods: {
    swipeRight(){
      // Открытие/Закрытие панели настроек
      if (this.$store.state.isOpenSettingsDrawer) this.$store.state.isOpenSettingsDrawer = !this.$store.state.isOpenSettingsDrawer
      // Открытие/закрытие панели сохранений
      if (this.$store.state.isOpenSavesDrawer) this.$store.state.isOpenSavesDrawer = !this.$store.state.isOpenSavesDrawer
      // Отключение свайпа на странице дневника (там переход по подстраницам тоже на свайпах)
      if (this.$route.path != '/Journal') {
        if (this.$store.state.mChat.show) { // проверка открыт ли чат, если да то...
          // Открыта ли страница контактов, true, то закрываем, если false, возвращаемся к странице контактов, т.к открыт чат с контактом
          if (this.$store.state.mChat.chatListShow) {
            this.$store.commit('mChatShow'); // закрываем окно чата
          }
          // Закрывает чат с контактом если он открыт
          else this.$store.state.mChat.chatListShow = !this.$store.state.mChat.chatListShow
        }
      }
    },
    swipeLeft(){
      if (this.$store.state.mChat.enable) { // Включён ли чат (Отключается при выборе палитры цвета диалогов)
        // Отключение свайпа на странице дневника (там переход по подстраницам тоже на свайпах)
        if (this.$route.path != '/Journal') {
          // открываем окно чата, если оно не было открыто ранее
          if (!this.$store.state.mChat.show) this.$store.commit('mChatShow');
        }
      }
    },
    // Тригеры для появления и исчезновения radialMenu
    swipeBottom(){
      this.$store.state.radialMenuShow = true // ! Не менять, на телефоне прокрутка свайпами не соотвествует направлению прокрутки на компе
      this.$store.commit('updateStores');
    },
    // Тригеры для появления и исчезновения radialMenu
    swipeTop(){
      this.$store.state.radialMenuShow = false
      this.$store.commit('updateStores');
    },    
    updateCSSVars(){
      let element = document.querySelector('html');
      element.style.setProperty("--AppWidth", `${window.innerWidth}px`);
      element.style.setProperty("--AppFontSize", `${window.innerWidth / 18}px`);
      element.style.setProperty("--AppHeight", `${window.innerHeight}px`);
    },
  },
  created() {
    // Для адаптивности
    this.updateCSSVars()
    window.addEventListener("resize", this.updateCSSVars);
  },
  destroyed() {
    window.removeEventListener("resize", this.updateCSSVars);
  },
  components: {
    Navigation,
    StartPage,
    Entry,
    'mc-chat': mcChat,
    Settings: () => import('./components/Settings/Settings'), // Ленивая загрузка компонента (Dynamic Imports) для повышения производительности
    Saves: () => import('./components/Saves/Saves'),
  },
}
</script>

<style lang="scss">
@import './styles/normalize.css';
@import './styles/gameThemes.scss';
@import './styles/mChatThemes.scss';

a { // убираем подчёркивание и делаем жирнее
	text-decoration: none;
  font-weight:bold;
}  

a:hover { 
	text-decoration: none;
  font-weight:bold;
} 

.v-layout {
  background: var(--v-layout--background) !important;
}

.Page {
  background: var(--Page--background) !important;
  color: var(--Page--color) !important;
  text-align: justify;
  padding: 2%;
  box-sizing: border-box;
  height: auto;
  border: var(--Page--border) !important;
}

.Page-element {
  color: var(--Page-element--color) !important;
  background: var(--Page-element--background) !important;
}

// Модальные окна с важными оповещениями
.important-modal__header {
  justify-content: center;
  word-break: normal; // Для правильного переноса строк
  background: var(--important-modal__header--background) !important;
}

.important-modal__button {
  background: var(--important-modal__button--background) !important;
}

.important-modal__button:hover {
  background: var(--important-modal__button--background) !important;
}

/* Отключаем показ полосы прокрутки (вертикальной) */
* {
  -ms-overflow-style: none;
  /* IE 10+ */
  scrollbar-width: none;
  /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
}

@media (max-width: 450px) {

  .Page {
  border: none !important;
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

