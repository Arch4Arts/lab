<template>
<v-navigation-drawer
  v-model="$store.state.isOpenSettingsDrawer"
  temporary
  right
  app
  touchless
  id="drawer"
  dark
  width="700"
>

  <!-- ENGLISH -->
  <section v-if="$store.state.gameLang">
  <v-layout justify-center>
  </v-layout>
  </section>
  <!-- RUSSIAN -->
  <section class="options" v-else>

  <v-expansion-panels accordion class="options__item">
    <v-expansion-panel class="header_panels options__item">
      <v-expansion-panel-header>
        <div class="v-expansion-panel header-icon"><v-icon large left>fas fa-volume</v-icon></div>
        Звук
      </v-expansion-panel-header>
      <v-expansion-panel-content class="bg_panels">
      <v-list
          subheader
          two-line
          flat
        >
        <v-subheader>Hangout notifications</v-subheader>

        <v-list-item-group
          v-model="settings"
          multiple
        >
          <v-list-item>
            <template v-slot:default="{ active, toggle }">
              <v-list-item-action>
                <v-checkbox
                  v-model="active"
                  color="primary"
                  @click="toggle"
                ></v-checkbox>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>Notifications</v-list-item-title>
                <v-list-item-subtitle>Allow notifications</v-list-item-subtitle>
              </v-list-item-content>
            </template>
          </v-list-item>

          <v-list-item>
            <template v-slot:default="{ active, toggle }">
              <v-list-item-action>
                <v-checkbox
                  v-model="active"
                  color="primary"
                  @click="toggle"
                ></v-checkbox>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>Sound</v-list-item-title>
                <v-list-item-subtitle>Hangouts message</v-list-item-subtitle>
              </v-list-item-content>
            </template>
          </v-list-item>

          <v-list-item>
            <template v-slot:default="{ active, toggle }">
              <v-list-item-action>
                <v-checkbox
                  v-model="active"
                  color="primary"
                  @click="toggle"
                ></v-checkbox>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>Video sounds</v-list-item-title>
                <v-list-item-subtitle>Hangouts video call</v-list-item-subtitle>
              </v-list-item-content>
            </template>
          </v-list-item>

          <v-list-item>
            <template v-slot:default="{ active, toggle }">
              <v-list-item-action>
                <v-checkbox
                  v-model="active"
                  color="primary"
                  @click="toggle"
                ></v-checkbox>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>Invites</v-list-item-title>
                <v-list-item-subtitle>Notify when receiving invites</v-list-item-subtitle>
                        <v-select
          v-model="fontFamily"
          :items="fontListRu"
          menu-props="auto"
          label="Font Selector"
          hide-details
          prepend-icon="far fa-font"
          single-line
        ></v-select>
              </v-list-item-content>
            </template>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-slider
        append-icon="fas fa-volume-up"
        prepend-icon="fas fa-volume-down"
        thumb-label
        min="0"
        max="100"
        step="1"
        v-model="achievementVolume"
      ></v-slider>
      <v-slider
        append-icon="fas fa-volume-up"
        prepend-icon="fas fa-volume-down"
        thumb-label
        min="0"
        max="100"
        step="1"
        v-model="diaryVolume"
      ></v-slider>
      <v-slider
        append-icon="fas fa-volume-up"
        prepend-icon="fas fa-volume-down"
        thumb-label
        min="0"
        max="100"
        step="1"
        v-model="smartphoneVolume"
      ></v-slider>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-expansion-panel class="header_panels">
      <v-expansion-panel-header>
        <div class="v-expansion-panel header-icon"><v-icon large left>far fa-eye</v-icon></div>
        Отображение
      </v-expansion-panel-header>
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
          min="10"
          max="24"
          prepend-icon="far fa-text-size"
        ></v-slider>
        <v-btn @click="Dark()">Dark</v-btn>
        <v-btn @click="NordDark()">NordDark</v-btn>
        <v-btn @click="NordLight()">NordLight</v-btn>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>

  </section>
      <v-switch
        v-model="$vuetify.theme.dark"
        label="Dark"
      ></v-switch>
      <v-btn @click="NordDark()">NordDark</v-btn>
      <v-btn @click="NordLight()">NordLight</v-btn>
      <v-btn @click="CustomDark()">CustomDark</v-btn>
</v-navigation-drawer>
</template>

<script>

import extractNumbers from 'extract-numbers' // Для FontSize
// import { NordLight, CustomDark, NordDark } from '../styles/themes'

export default {
  data(){
    return {
      slider: 33,
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
        this.$vuetify.theme.themes.dark = NordDark // Работает
      },
      CustomDark(){
        this.$vuetify.theme.themes.dark = CustomDark // Работает
      },
      NordLight(){
        this.$vuetify.theme.themes.dark = NordLight
      }
  },
  computed: {
      // Звук
      achievementVolume: {
        get: function () {
          var Volume = (this.$store.state.notif_AchievementVolume * 100)
          return Volume;
        },
        set: function (level) {
          this.$store.state.notif_AchievementVolume = (level /= 100)
          this.$store.commit("updateStores");
        } 
      },
      diaryVolume: {
        get: function () {
          var Volume = (this.$store.state.notif_DiaryVolume * 100)
          return Volume;
        },
        set: function (level) {
          this.$store.state.notif_DiaryVolume = (level /= 100)
          this.$store.commit("updateStores");
        } 
      },
      smartphoneVolume: {
        get: function () {
          var Volume = (this.$store.state.notif_SmartphoneVolume * 100)
          return Volume;
        },
        set: function (level) {
          this.$store.state.notif_SmartphoneVolume = (level /= 100)
          this.$store.commit("updateStores");
        } 
      },
      launguage() {
        let result
        (this.$store.state.gameLang) ? result = 1 : result = 0
        return result;
      },
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
}
</script>

<style lang="scss" scoped>

.options {
  display: flex;
  flex-direction: column;
}

.options__item {
  margin: 10px 0;
}

.v-slider__thumb {
  background: coral !important;
}

#drawer {
  background: var(--v-bg_laouyt-base) !important;
  font-size: 14pt;
}

.v-expansion-panel .header-icon {
  flex: none;
  background-color: transparent !important;
  width: 65px !important;
}

</style>