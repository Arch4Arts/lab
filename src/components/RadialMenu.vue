<template>
<v-card id="create">
  <v-fab-transition transition="scale-transition">
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
      v-show="RadialMenuStatus"
      transition="scale-transition"
    >
      <!-- Основная кнопка раскрытия списка -->
      <v-btn
        slot="activator"
        dark
        icon
        hover
        v-model="fab"
      >
        <v-icon>fas fa-ellipsis-v</v-icon>
        <!-- <v-icon>fas fa-times-circle</v-icon> -->
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="blue"
        @click="() => this.$store.state.isOpenSaves = true"
      >
        <v-icon>fas fa-save</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="blue"
      >
        <v-icon>fas fa-book</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="blue"
        @click="() => this.$store.state.isOpenSettings = true"
      >
        <v-icon>fas fa-cog</v-icon>
      </v-btn>

      <v-btn
        fab
        dark
        small
        color="blue"
      >
        <v-icon>fas fa-question-circle</v-icon>
      </v-btn>

<!-- 
      <router-link v-for="(item, i) in menuItems" :key="'btn' + i" :to="item.route">
      <v-btn
        fab
        dark
        small
        class="blue"
        @click="openSettings(item.icon)"
      >
        <v-icon >{{item.icon}}</v-icon>
      </v-btn>
      </router-link> -->
      
    </v-speed-dial>
    </v-fab-transition>
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
      transition: 'slide-y-reverse-transition',
      menuItems: [
                {
                icon: 'fas fa-save',
                route: 'Saves'
                },
                {
                icon: 'fas fa-book',
                route: 'Diary'
                },
                {
                icon: 'fas fa-cog',
                route: ''
                },
                {
                icon: 'fas fa-question-circle',
                route: 'FAQ'
                },
                ]
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
      RadialMenuStatus(){
        return this.$store.state.radialMenuShow;
      },
      activeFab () {
        switch (this.tabs) {
          case 'one': return { 'class': 'purple', icon: 'account_circle' }
          case 'two': return { 'class': 'red', icon: 'edit' }
          case 'three': return { 'class': 'green', icon: 'keyboard_arrow_up' }
          default: return {}
        }
      }
    },
    methods: {
        openSettings(icon){
            if (icon === 'fas fa-cog') this.$store.state.isOpenSettings = true
        }
    },
}
</script>

<style scoped>
.fab-text {
  color: rgba(0,0,0,0.54);
}
</style>
