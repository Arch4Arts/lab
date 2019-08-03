<template>
<v-navigation-drawer
  v-model="$store.state.isOpenSettings"
  temporary
  right
  app
  id="drawer"
  :class='!(this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs) ? "mt-5" : "mt-0"'
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
    <v-expansion-panel>
      <v-expansion-panel-header>Настройки отображения</v-expansion-panel-header>
      <v-expansion-panel-content>
        <div class="text-center">
          <v-btn-toggle v-model="launguage" rounded>
            <v-btn text width="130">Русский</v-btn>
            <v-btn text @click="$store.commit('langChange')">Английский</v-btn>
          </v-btn-toggle>
        </div>
        <v-select
          v-model="fontFamily"
          :items="fontList"
          menu-props="auto"
          label="Font Selector"
          hide-details
          prepend-icon="far fa-font"
          single-line
        ></v-select>
        <v-slider
          v-model="fontSize"
          thumb-label
          min="10"
          max="32"
          prepend-icon="far fa-text-size"
        ></v-slider>
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

export default {
  data(){
    return {
      fontList: ['Roboto','Pridi'],
    }
  },
  methods: {

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