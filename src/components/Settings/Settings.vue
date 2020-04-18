<template>
  <v-navigation-drawer
    v-model="$store.state.isOpenSettingsDrawer"
    temporary
    right
    app
    touchless
    dark
    @input="drawerShowState"
    width="700"
    class="v-navigation-drawer">

    <!-- ENGLISH -->
    <section v-if="$store.state.gameLang">

    </section>

    <!-- RUSSIAN -->
    <section class="options" v-else>
      <v-expansion-panels accordion class="options__item">
        <!-- Звук -->
        <v-expansion-panel class="options__item test">
          <v-expansion-panel-header>
            <div class="v-expansion-panel header-icon">
              <v-icon large left v-if="$store.state.sound.gameGlobalSoundsEnable">fas fa-volume</v-icon>
              <v-icon large left v-else>fas fa-volume-mute</v-icon>
            </div> 
            Звук
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <settings-sound />
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel >
          <v-expansion-panel-header>
            <div class="v-expansion-panel header-icon"><v-icon large left>far fa-eye</v-icon></div>
            Внешний вид
          </v-expansion-panel-header>
          <v-expansion-panel-content>
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
              class="sound-options-container__slider"
              prepend-icon="far fa-text-size"
              v-model="fontSize"
              thumb-label
              min="10"
              max="24"
            ></v-slider>
            <v-btn @click="Dark()">Dark</v-btn>
            <v-btn @click="NordDark()">NordDark</v-btn>
            <v-btn @click="NordLight()">NordLight</v-btn>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </section>
  </v-navigation-drawer>
</template>

<script>

import extractNumbers from 'extract-numbers' // Для FontSize
import SettingsSound from './SettingsSound'

export default {
  data(){
    return {
      settings: [], // Пустышка
      test: 3,
      fontList: ['Roboto', 'Roboto Slab', 'Open Sans', 'Lato', 'Merriweather', 'Minion Pro'],
      fontListRu: ['Roboto', 'Roboto Slab', 'Open Sans', 'Merriweather', 'Minion Pro', 'Slut'],
    }
  },
  methods: {
    drawerShowState(isShow){ // Записывает изменения стейта из v-model
      if (!isShow) this.$store.commit('updateStores')
    }
  },
  computed: {
      // drawerShow: {
      //   get: function () {
      //     return this.$store.state.isOpenSettingsDrawer;
      //   },
      //   set: function () {
      //     this.$store.commit('isOpenSettingsDrawer');
      //   }
      // },
      // Выбор языка
      launguage() {
        let result
        (this.$store.state.gameLang) ? result = 1 : result = 0
        return result;
      },
      // Шрифт
      fontFamily: {
        get: function () {
          return this.$store.state.gameFont;
        },
        set: function (selected) {
          this.$store.state.gameFont = selected;
          document.getElementById("StoryTextArea").style.fontFamily = selected;
          this.$store.commit("updateStores");
        }
      },
      // Размер шрифта
      fontSize: {
        get: function () {
          return extractNumbers(this.$store.state.gameFontSize)[0];
        },
        set: function (selected) {
          this.$store.state.gameFontSize = `${selected}pt`;
          document.getElementById("StoryTextArea").style.fontSize = `${selected}pt`;
          this.$store.commit("updateStores");
        } 
      }
  },
  components: {
    SettingsSound
  }
}
</script>

<style lang="scss" scoped>

.v-navigation-drawer {
  background: var(--v-navigation-drawer--background) !important;
  border-left: var(--v-navigation-drawer--border-left) !important;
}

.options {
  display: flex;
  flex-direction: column;
}

.options__item {
  margin: 10px 0;
}

.v-expansion-panel .header-icon {
  flex: none;
  background-color: transparent !important;
  width: 65px !important;
}

</style>