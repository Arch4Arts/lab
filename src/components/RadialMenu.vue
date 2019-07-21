<template>
<v-card id="create">
    <v-speed-dial
      v-model="fab"
      :top="top"
      :bottom="bottom"
      :right="right"
      :left="left"
      :direction="direction"
      :hover="hover"
      :transition="transition"
      fixed
    >
      <v-btn
        slot="activator"
        class="blue darken-2"
        dark
        fab
        hover
        v-model="fab"
      >
        <v-icon x-large>fas fa-plus-circle</v-icon>
        <v-icon>fas fa-times-circle</v-icon>
      </v-btn>
      
      <v-btn
        fab
        dark
        small
        class="blue"
      >
        <v-icon >cloud_download</v-icon>
      </v-btn>
      
      <v-btn
        fab
        dark
        small
        class="blue"
      >
        <v-icon >folder</v-icon>
      </v-btn>
      
      <div class="fab-text">
        <v-layout row align-center>
          <v-flex class="mr-1" xs-6>
            <v-icon>tab</v-icon>
          </v-flex>
          <v-flex xs-6>
            Module
          </v-flex>
        </v-layout>
      </div>
   
      <v-btn
        fab
        dark
        small
        class="green"
      >
        <v-icon >cloud_download</v-icon>
      </v-btn>
      
      <v-btn
        fab
        dark
        small
        class="green"
      >
        <v-icon >folder</v-icon>
      </v-btn>
      
      <v-btn
        fab
        dark
        small
        class="red"
      >
        <v-icon>delete</v-icon>
      </v-btn>
      
      <div class="fab-text">
        <v-layout row align-center>
          <v-flex class="mr-1" xs-6>
            <v-icon>view_quilt</v-icon>
          </v-flex>
          <v-flex xs-6>
            Layout
          </v-flex>
        </v-layout>
      </div>
      
    </v-speed-dial>
</v-card>
</template>

<script>
export default {
  data: () => ({
      direction: "top",
      fab: false,
      fling: false,
      hover: false,
      tabs: null,
      top: false,
      right: true,
      bottom: true,
      left: false,
      transition: 'slide-y-reverse-transition'
    }),

    watch: {
      top (val) {
        this.bottom = !val
      },
      right (val) {
        this.left = !val
      },
      bottom (val) {
        this.top = !val
      },
      left (val) {
        this.right = !val
      }
    },

    computed: {
      activeFab () {
        switch (this.tabs) {
          case 'one': return { 'class': 'purple', icon: 'account_circle' }
          case 'two': return { 'class': 'red', icon: 'edit' }
          case 'three': return { 'class': 'green', icon: 'keyboard_arrow_up' }
          default: return {}
        }
      }
    }
}
</script>

<style scoped>
.fab-text {
  color: rgba(0,0,0,0.54);
}
</style>
