<template>
<v-navigation-drawer
  v-model="$store.state.isOpenSettings"
  temporary
  right
  app
  touchless
  id="drawer"
  :class='!(this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs) ? "mt-5 bg_page" : "mt-0 bg_page"'
  :style='!(this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs) ? "top: 44px" : "top: 0px"'
  dark
  width="700"
>

  <!-- ENGLISH -->
  <section v-if="$store.state.lang">
  <v-layout justify-center>


    
  </v-layout>
  </section>
  <!-- RUSSIAN -->
  <section v-else>
  <v-layout justify-center>
    
  <v-expansion-panels>
    <v-expansion-panel class="header_panels">
      <v-expansion-panel-header>Настройки отображения</v-expansion-panel-header>
      <v-expansion-panel-content class="bg_panels">
        <div class="text-center">
          <v-btn-toggle v-model="launguage" rounded>
            <v-btn text width="130">Русский</v-btn>
            <v-btn text @click="$store.commit('langChange')">Английский</v-btn>
          </v-btn-toggle>
        </div>
        <v-select
          v-model="fontFamily"
          :items="fontListRu"
          menu-props="auto"
          label="Font Selector"
          hide-details
          prepend-icon="far fa-font"
          single-line
        ></v-select>
        <br>
        <v-slider
          v-model="fontSize"
          thumb-label
          color="#fff"
          min="10"
          max="32"
          prepend-icon="far fa-text-size"
        ></v-slider>
        <v-btn @click="Dark()">Dark</v-btn>
        <v-btn @click="NordDark()">NordDark</v-btn>
        <v-btn @click="NordLight()">NordLight</v-btn>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>

  </v-layout>
  </section>
      <!-- <v-switch
        v-model="$vuetify.theme.dark"
        label="Dark"
      ></v-switch> -->
</v-navigation-drawer>
</template>

<script>
import extractNumbers from 'extract-numbers' // Для FontSize
import { NordLight, CustomDark, NordDark } from '../plugins/themes'

export default {
  data(){
    return {
      fontList: ['Roboto', 'Roboto Slab', 'Open Sans', 'Lato', 'Merriweather', 'Minion Pro'],
      fontListRu: ['Roboto', 'Roboto Slab', 'Open Sans', 'Merriweather', 'Minion Pro', 'Slut'],
    }
  },
  methods: {
    switchTheme(select){
      if (select === 'CustomDark') this.$vuetify.theme.themes.dark = CustomDark;
      if (select === 'NordDark') this.$vuetify.theme.themes.dark = NordDark;
      if (select === 'NordLight') this.$vuetify.theme.themes.dark = NordLight;
    },
      NordDark(){
        this.$vuetify.theme.themes.dark = NordDark // Работает!!!
      },
      Dark(){
        this.$vuetify.theme.themes.dark = CustomDark // Работает!!!
      },
      NordLight(){
        this.$vuetify.theme.themes.dark = NordLight
      }
  },
  computed: {
      launguage() {
        let result
        (this.$store.state.lang) ? result = 1 : result = 0
        return result;
      },
      fontFamily: {
        get: function () {
          return this.$store.state.font;
        },
        set: function (selected) {
          this.$store.state.font = selected;
          document.getElementById("StoryTextArea").style.fontFamily = selected;
          this.$store.commit("updateStores");
        }
      },
      fontSize: {
        get: function () {
          return extractNumbers(this.$store.state.fontSize)[0];
        },
        set: function (selected) {
          this.$store.state.fontSize = `${selected}pt`;
          document.getElementById("StoryTextArea").style.fontSize = `${selected}pt`;
          this.$store.commit("updateStores");
        } 
      }
  },
}
</script>

<style scoped>

#drawer {
  background-color: #222222;
  color: #E0E0E0;
  font-size: 14pt;
  text-align: justify;
}

</style>