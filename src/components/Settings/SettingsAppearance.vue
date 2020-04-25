<template>
  <!-- ENGLISH -->
  <section v-if="$store.state.gameLang">

  </section>
  <!-- RUSSIAN -->
  <section v-else>
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
      class="sound-settings-container__slider"
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
  </section>
</template>

<script>
import extractNumbers from 'extract-numbers' // Для FontSize

export default {
  data(){
    return {
      fontList: ['Roboto', 'Roboto Slab', 'Open Sans', 'Lato', 'Merriweather', 'Minion Pro'],
      fontListRu: ['Roboto', 'Roboto Slab', 'Open Sans', 'Merriweather', 'Minion Pro'],
    }
  },
  methods: {

  },
  computed: {
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

.v-list-item-action--padding {
  margin-right: 24px;
}
.options__item__v-list__text--padding {
  margin-left: 24px;
}

.sound-options-container {
  position: relative;
  display: flex;
}

.sound-options-container__slider__name {
  position: absolute;
  top: 24px;
  margin-bottom: 0px;
  margin-left: 64px;

  font-size: 14px;
  color: var(--font-color--color) !important;
  opacity: .8;
}

.sound-options-container__slider {
  margin-left: 24px;
  margin-right: 8px;
}

.sound-options-container__btn {
  margin-right: 24px;
  background: transparent !important;
}

.global-sound-enable {
  padding: 0px !important;
}

</style>