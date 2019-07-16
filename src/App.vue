<template>  
  <v-app v-touch="{ right: () => SwipeRight(), 
                    left: () => SwipeLeft()}">
    <v-content>
    <first-dialog></first-dialog>
    <app-header v-if="$store.state.Header"></app-Header>
    <General-Info v-if="$store.state.firstStart"></General-Info>
      <router-view v-if="!$store.state.firstStart"/>
    </v-content>
  </v-app>
</template>

<script>
import FirstDialog from "./components/FirstDialog";
import AppHeader from "./components/AppHeader";
import GeneralInfo from "./components/General_Info";
import Main from "./Pages/Main";

export default {
  name: 'App',
  methods: {
      SwipeRight(){
        if (this.$store.state.appHeaderEnable) { // Включено ли меню (Отключается при выборе палитры цвета диалогов)
          if (this.$route.path != '/Diary') // Отключение свайпа на странице дневника (там переход по подстраницам тоже на свайпах)
          if (this.$store.state.chat.isChatOpen) { // проверка открыт ли чат
            if (this.$store.state.chat.UserListShow) { // проверка открыт ли контакт
              this.$store.state.chat.isChatOpen = !this.$store.state.chat.isChatOpen // закрываем окно чата
              if (screen.width <= 450) this.$store.state.Header = !this.$store.state.Header // Включаем бар при закрытии чата
            }
            else this.$store.state.chat.UserListShow = !this.$store.state.chat.UserListShow // Закрывает текущий контакт если он открыт
          }
          else 
            this.$store.state.DrawerVisible = !this.$store.state.DrawerVisible; // если окно чата не открыто, открываем меню
        }
      },
      SwipeLeft(){
        if (this.$store.state.chat.chatEnable) { // Включён ли чат (Отключается при выборе палитры цвета диалогов)
          if (this.$route.path != '/Diary') // Отключение свайпа на странице дневника (там переход по подстраницам тоже на свайпах)
          if (this.$store.state.DrawerVisible) // Отключаем открытие меню при свайпе влево, если меню не открыто
            this.$store.state.DrawerVisible = !this.$store.state.DrawerVisible;
          else {
            this.$store.state.chat.isChatOpen = !this.$store.state.chat.isChatOpen // открываем окно чата
            if (screen.width <= 450) this.$store.state.Header = !this.$store.state.Header // Отключаем бар при закрытии чата
          }
        }
      }
   },
  components: {
    FirstDialog,
    AppHeader,
    GeneralInfo,
    Main,
  },
}
</script>

<style>

.BG-v-layout {
  background-color: #19191a;
}

.Page {
  background-color: #222222;
  color: #E0E0E0;
  font-size: 14pt;
  text-align: justify;
  padding: 2%;
  box-sizing: border-box;
  height: auto;
  border: 3px solid #2a2a2b; /* Чёрная рамка */
}

.Page-element {
  background-color: #222222;
  color: #E0E0E0;
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
  color: #E0E0E0;
}

h2 {
  color: #E0E0E0;
}

h3 {
  color: #E0E0E0;
}

strong {
  color: #E0E0E0;
}

.font-color {
  color: #E0E0E0;
}
/* СТИЛЬ ССЫЛКИ / АНИМАЦИЯ */
.a { 
  display: inline-block;
  position: relative;
  color: rgb(121, 159, 255);
}

/* .a::after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: rgb(160, 178, 250);
  transform-origin: bottom right;
  transition: transform 0.4s cubic-bezier(0.86, 0, 0.07, 1);
}

.a:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
} */


/* roboto-100 - latin_cyrillic */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 100;
  src: url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-100.eot'); /* IE9 Compat Modes */
  src: local('Roboto Thin'), local('Roboto-Thin'),
       url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-100.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-100.woff2') format('woff2'), /* Super Modern Browsers */
       url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-100.woff') format('woff'), /* Modern Browsers */
       url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-100.ttf') format('truetype'), /* Safari, Android, iOS */
       url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-100.svg#Roboto') format('svg'); /* Legacy iOS */
}
/* roboto-300 - latin_cyrillic */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  src: url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-300.eot'); /* IE9 Compat Modes */
  src: local('Roboto Light'), local('Roboto-Light'),
       url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-300.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-300.woff2') format('woff2'), /* Super Modern Browsers */
       url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-300.woff') format('woff'), /* Modern Browsers */
       url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-300.ttf') format('truetype'), /* Safari, Android, iOS */
       url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-300.svg#Roboto') format('svg'); /* Legacy iOS */
}
/* roboto-100italic - latin_cyrillic */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 100;
  src: url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-100italic.eot'); /* IE9 Compat Modes */
  src: local('Roboto Thin Italic'), local('Roboto-ThinItalic'),
       url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-100italic.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-100italic.woff2') format('woff2'), /* Super Modern Browsers */
       url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-100italic.woff') format('woff'), /* Modern Browsers */
       url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-100italic.ttf') format('truetype'), /* Safari, Android, iOS */
       url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-100italic.svg#Roboto') format('svg'); /* Legacy iOS */
}
/* roboto-300italic - latin_cyrillic */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 300;
  src: url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-300italic.eot'); /* IE9 Compat Modes */
  src: local('Roboto Light Italic'), local('Roboto-LightItalic'),
       url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-300italic.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-300italic.woff2') format('woff2'), /* Super Modern Browsers */
       url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-300italic.woff') format('woff'), /* Modern Browsers */
       url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-300italic.ttf') format('truetype'), /* Safari, Android, iOS */
       url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-300italic.svg#Roboto') format('svg'); /* Legacy iOS */
}
/* roboto-regular - latin_cyrillic */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  src: url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-regular.eot'); /* IE9 Compat Modes */
  src: local('Roboto'), local('Roboto-Regular'),
       url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-regular.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-regular.woff2') format('woff2'), /* Super Modern Browsers */
       url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-regular.woff') format('woff'), /* Modern Browsers */
       url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-regular.ttf') format('truetype'), /* Safari, Android, iOS */
       url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-regular.svg#Roboto') format('svg'); /* Legacy iOS */
}
/* roboto-500 - latin_cyrillic */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  src: url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-500.eot'); /* IE9 Compat Modes */
  src: local('Roboto Medium'), local('Roboto-Medium'),
       url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-500.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-500.woff2') format('woff2'), /* Super Modern Browsers */
       url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-500.woff') format('woff'), /* Modern Browsers */
       url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-500.ttf') format('truetype'), /* Safari, Android, iOS */
       url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-500.svg#Roboto') format('svg'); /* Legacy iOS */
}
/* roboto-italic - latin_cyrillic */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 400;
  src: url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-italic.eot'); /* IE9 Compat Modes */
  src: local('Roboto Italic'), local('Roboto-Italic'),
       url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-italic.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-italic.woff2') format('woff2'), /* Super Modern Browsers */
       url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-italic.woff') format('woff'), /* Modern Browsers */
       url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-italic.ttf') format('truetype'), /* Safari, Android, iOS */
       url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-italic.svg#Roboto') format('svg'); /* Legacy iOS */
}
/* roboto-500italic - latin_cyrillic */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 500;
  src: url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-500italic.eot'); /* IE9 Compat Modes */
  src: local('Roboto Medium Italic'), local('Roboto-MediumItalic'),
       url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-500italic.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-500italic.woff2') format('woff2'), /* Super Modern Browsers */
       url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-500italic.woff') format('woff'), /* Modern Browsers */
       url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-500italic.ttf') format('truetype'), /* Safari, Android, iOS */
       url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-500italic.svg#Roboto') format('svg'); /* Legacy iOS */
}
/* roboto-700 - latin_cyrillic */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  src: url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-700.eot'); /* IE9 Compat Modes */
  src: local('Roboto Bold'), local('Roboto-Bold'),
       url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-700.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-700.woff2') format('woff2'), /* Super Modern Browsers */
       url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-700.woff') format('woff'), /* Modern Browsers */
       url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-700.ttf') format('truetype'), /* Safari, Android, iOS */
       url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-700.svg#Roboto') format('svg'); /* Legacy iOS */
}
/* roboto-900 - latin_cyrillic */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 900;
  src: url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-900.eot'); /* IE9 Compat Modes */
  src: local('Roboto Black'), local('Roboto-Black'),
       url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-900.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-900.woff2') format('woff2'), /* Super Modern Browsers */
       url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-900.woff') format('woff'), /* Modern Browsers */
       url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-900.ttf') format('truetype'), /* Safari, Android, iOS */
       url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-900.svg#Roboto') format('svg'); /* Legacy iOS */
}
/* roboto-900italic - latin_cyrillic */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 900;
  src: url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-900italic.eot'); /* IE9 Compat Modes */
  src: local('Roboto Black Italic'), local('Roboto-BlackItalic'),
       url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-900italic.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-900italic.woff2') format('woff2'), /* Super Modern Browsers */
       url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-900italic.woff') format('woff'), /* Modern Browsers */
       url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-900italic.ttf') format('truetype'), /* Safari, Android, iOS */
       url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-900italic.svg#Roboto') format('svg'); /* Legacy iOS */
}
/* roboto-700italic - latin_cyrillic */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 700;
  src: url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-700italic.eot'); /* IE9 Compat Modes */
  src: local('Roboto Bold Italic'), local('Roboto-BoldItalic'),
       url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-700italic.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-700italic.woff2') format('woff2'), /* Super Modern Browsers */
       url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-700italic.woff') format('woff'), /* Modern Browsers */
       url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-700italic.ttf') format('truetype'), /* Safari, Android, iOS */
       url('./assets/fonts/roboto/roboto-v19-latin_cyrillic-700italic.svg#Roboto') format('svg'); /* Legacy iOS */
}

@font-face {
	font-family: 'HelveticaNeueCyr';
	src: url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-Medium.eot');
	src: local('HelveticaNeueCyr-Medium'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-Medium.eot?#iefix') format('embedded-opentype'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-Medium.woff') format('woff'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-Medium.ttf') format('truetype');
	font-weight: 500;
	font-style: normal;
}

@font-face {
	font-family: 'HelveticaNeueCyr';
	src: url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-Heavy.eot');
	src: local('HelveticaNeueCyr-Heavy'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-Heavy.eot?#iefix') format('embedded-opentype'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-Heavy.woff') format('woff'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-Heavy.ttf') format('truetype');
	font-weight: 900;
	font-style: normal;
}

@font-face {
	font-family: 'HelveticaNeueCyr';
	src: url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-HeavyItalic.eot');
	src: local('HelveticaNeueCyr-HeavyItalic'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-HeavyItalic.eot?#iefix') format('embedded-opentype'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-HeavyItalic.woff') format('woff'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-HeavyItalic.ttf') format('truetype');
	font-weight: 900;
	font-style: italic;
}

@font-face {
	font-family: 'HelveticaNeueCyr';
	src: url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-Black.eot');
	src: local('HelveticaNeueCyr-Black'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-Black.eot?#iefix') format('embedded-opentype'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-Black.woff') format('woff'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-Black.ttf') format('truetype');
	font-weight: 900;
	font-style: normal;
}

@font-face {
	font-family: 'HelveticaNeueCyr';
	src: url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-UltraLightItalic.eot');
	src: local('HelveticaNeueCyr-UltraLightItalic'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-UltraLightItalic.eot?#iefix') format('embedded-opentype'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-UltraLightItalic.woff') format('woff'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-UltraLightItalic.ttf') format('truetype');
	font-weight: 200;
	font-style: italic;
}

@font-face {
	font-family: 'HelveticaNeueCyr';
	src: url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-BlackItalic.eot');
	src: local('HelveticaNeueCyr-BlackItalic'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-BlackItalic.eot?#iefix') format('embedded-opentype'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-BlackItalic.woff') format('woff'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-BlackItalic.ttf') format('truetype');
	font-weight: 900;
	font-style: italic;
}

@font-face {
	font-family: 'HelveticaNeueCyr';
	src: url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-ThinItalic.eot');
	src: local('HelveticaNeueCyr-ThinItalic'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-ThinItalic.eot?#iefix') format('embedded-opentype'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-ThinItalic.woff') format('woff'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-ThinItalic.ttf') format('truetype');
	font-weight: 100;
	font-style: italic;
}

@font-face {
	font-family: 'HelveticaNeueCyr';
	src: url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-MediumItalic.eot');
	src: local('HelveticaNeueCyr-MediumItalic'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-MediumItalic.eot?#iefix') format('embedded-opentype'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-MediumItalic.woff') format('woff'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-MediumItalic.ttf') format('truetype');
	font-weight: 500;
	font-style: italic;
}

@font-face {
	font-family: 'HelveticaNeueCyr';
	src: url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-LightItalic.eot');
	src: local('HelveticaNeueCyr-LightItalic'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-LightItalic.eot?#iefix') format('embedded-opentype'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-LightItalic.woff') format('woff'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-LightItalic.ttf') format('truetype');
	font-weight: 300;
	font-style: italic;
}

@font-face {
	font-family: 'HelveticaNeueCyr';
	src: url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-UltraLight.eot');
	src: local('HelveticaNeueCyr-UltraLight'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-UltraLight.eot?#iefix') format('embedded-opentype'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-UltraLight.woff') format('woff'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-UltraLight.ttf') format('truetype');
	font-weight: 200;
	font-style: normal;
}

@font-face {
	font-family: 'HelveticaNeueCyr';
	src: url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-BoldItalic.eot');
	src: local('HelveticaNeueCyr-BoldItalic'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-BoldItalic.eot?#iefix') format('embedded-opentype'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-BoldItalic.woff') format('woff'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-BoldItalic.ttf') format('truetype');
	font-weight: bold;
	font-style: italic;
}

@font-face {
	font-family: 'HelveticaNeueCyr';
	src: url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-Italic.eot');
	src: local('HelveticaNeueCyr-Italic'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-Italic.eot?#iefix') format('embedded-opentype'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-Italic.woff') format('woff'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-Italic.ttf') format('truetype');
	font-weight: 500;
	font-style: italic;
}

@font-face {
	font-family: 'HelveticaNeueCyr';
	src: url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-Roman.eot');
	src: local('HelveticaNeueCyr-Roman'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-Roman.eot?#iefix') format('embedded-opentype'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-Roman.woff') format('woff'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-Roman.ttf') format('truetype');
	font-weight: normal;
	font-style: normal;
}

@font-face {
	font-family: 'HelveticaNeueCyr';
	src: url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-Bold.eot');
	src: local('HelveticaNeueCyr-Bold'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-Bold.eot?#iefix') format('embedded-opentype'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-Bold.woff') format('woff'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-Bold.ttf') format('truetype');
	font-weight: bold;
	font-style: normal;
}

@font-face {
	font-family: 'HelveticaNeueCyr';
	src: url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-Light.eot');
	src: local('HelveticaNeueCyr-Light'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-Light.eot?#iefix') format('embedded-opentype'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-Light.woff') format('woff'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-Light.ttf') format('truetype');
	font-weight: 300;
	font-style: normal;
}

@font-face {
	font-family: 'HelveticaNeueCyr';
	src: url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-Thin.eot');
	src: local('HelveticaNeueCyr-Thin'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-Thin.eot?#iefix') format('embedded-opentype'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-Thin.woff') format('woff'),
		url('./assets/fonts/HelveticaNeue/HelveticaNeueCyr-Thin.ttf') format('truetype');
	font-weight: 100;
	font-style: normal;
}

</style>

