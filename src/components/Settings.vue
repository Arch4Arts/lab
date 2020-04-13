<template>
  <v-navigation-drawer
    v-model="$store.state.isOpenSettingsDrawer"
    temporary
    right
    app
    touchless
    dark
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
              <v-icon large left v-if="$store.state.gameGlobalSoundsEnable">fas fa-volume</v-icon>
              <v-icon large left v-else>fas fa-volume-mute</v-icon>
            </div> 
            Звук
          </v-expansion-panel-header>
          <v-expansion-panel-content class="bg_panels">
          <v-list subheader two-line flat>
            <v-list-item-group v-model="settings" multiple>
              <v-list-item>
                <v-list-item-content @click="ApplyChangeCheckBox('gameGlobalSoundsEnable')" class="options__item__v-list__text--padding">
                  <v-list-item-title>Включить звук</v-list-item-title>
                  <v-list-item-subtitle v-if='$store.state.gameGlobalSoundsEnable'>Звук включён</v-list-item-subtitle>
                  <v-list-item-subtitle v-else>Звук отключён</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action class="options__item__v-list__checkbox--padding">
                  <v-switch
                    v-model="gameGlobalSoundsEnable"
                  ></v-switch>
                </v-list-item-action>
              </v-list-item>
            </v-list-item-group>
          </v-list>
          <p v-if="$store.state.gameGlobalSoundsEnable" class="options__item__slider__name">Громкость оповещения о получении достижений</p>
          <p v-else class="options__item__slider__name" style="opacity: .5">Громкость оповещения о получении достижений</p>
          <v-slider
            class="options__item__slider--padding"
            prepend-icon="fas fa-trophy-alt"
            thumb-label
            min="0"
            max="100"
            step="1"
            :disabled="!$store.state.gameGlobalSoundsEnable"
            v-model="achievementVolume"
          ></v-slider>
          <p v-if="$store.state.gameGlobalSoundsEnable" class="options__item__slider__name">Громкость оповещений дневника</p>
          <p v-else class="options__item__slider__name" style="opacity: .5">Громкость оповещений дневника</p>
          <v-slider
            class="options__item__slider--padding"
            prepend-icon="fas fa-book"
            thumb-label
            min="0"
            max="100"
            step="1"
            :disabled="!$store.state.gameGlobalSoundsEnable"
            v-model="diaryVolume"
          ></v-slider>
          <p v-if="$store.state.gameGlobalSoundsEnable" class="options__item__slider__name">Громкость мобильных оповещений</p>
          <p v-else class="options__item__slider__name" style="opacity: .5">Громкость мобильных оповещений</p>
          <v-slider
            class="options__item__slider--padding"
            prepend-icon="fas fa-mobile-android-alt"
            thumb-label
            min="0"
            max="100"
            step="1"
            :disabled="!$store.state.gameGlobalSoundsEnable"
            v-model="smartphoneVolume"
          ></v-slider>
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
              class="options__item__slider--padding"
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
// import { NordLight, CustomDark, NordDark } from '../styles/themes'

export default {
  data(){
    return {
      settings: [], // Пустышка
      fontList: ['Roboto', 'Roboto Slab', 'Open Sans', 'Lato', 'Merriweather', 'Minion Pro'],
      fontListRu: ['Roboto', 'Roboto Slab', 'Open Sans', 'Merriweather', 'Minion Pro', 'Slut'],
    }
  },
  methods: {
      ApplyChangeCheckBox(storeCommitName){
        this.$store.commit(storeCommitName)
      },
      // switchTheme(select){
      //   if (select === 'CustomDark') this.$vuetify.theme.themes.dark = CustomDark;
      //   if (select === 'NordDark') this.$vuetify.theme.themes.dark = NordDark;
      //   if (select === 'NordLight') this.$vuetify.theme.themes.dark = NordLight;
      // },
      // NordDark(){
      //   this.$vuetify.theme.themes.dark = NordDark // Работает
      // },
      // CustomDark(){
      //   this.$vuetify.theme.themes.dark = CustomDark // Работает
      // },
      // NordLight(){
      //   this.$vuetify.theme.themes.dark = NordLight
      // }
  },
  computed: {
      // Звук
      gameGlobalSoundsEnable: {
        get: function () {
          return this.$store.state.gameGlobalSoundsEnable
        },
        set: function () {
          this.ApplyChangeCheckBox('gameGlobalSoundsEnable')
        } 
      },
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

.options__item__v-list__checkbox--padding {
  margin-right: 24px;
}
.options__item__v-list__text--padding {
  margin-left: 24px;
}

.options__item__slider--padding {
  margin-left: 24px;
  margin-right: 24px;
}

.options__item__slider__name {
  margin-bottom: 0px;
  margin-left: 64px;

  font-size: 14px;
  color: var(--font-color--color) !important;
}

.v-list-item {
  padding: 0px !important;
}

.v-expansion-panel .header-icon {
  flex: none;
  background-color: transparent !important;
  width: 65px !important;
}

</style>