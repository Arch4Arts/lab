<template>
<v-card>
  <v-fab-transition transition="scale-transition" v-show="visible">
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
    >
      <!-- Основная кнопка раскрытия списка -->
      <v-btn
        slot="activator"
        class="radial-menu-btn"
        dark
        icon
        hover
        v-model="fab"
        v-show="visible"
      >
        <v-icon x-large>fas fa-compass</v-icon>
      </v-btn>

      <!-- Saves -->
      <v-btn
        fab
        dark
        small
        class="radial-menu-btns"
        @click="() => this.$store.state.isOpenSaves = true"
      >
        <v-icon>fas fa-save</v-icon>
      </v-btn>

      <!-- Diary -->
      <v-btn
        fab
        dark
        small
        class="radial-menu-btns"
        to="/Diary"
        @click="visible = false"
      >
        <v-icon>fas fa-book</v-icon>
      </v-btn>

      <!-- Settings -->
      <v-btn
        fab
        dark
        small
        class="radial-menu-btns"
        @click="() => this.$store.state.isOpenSettings = true"
      >
        <v-icon>fas fa-cog</v-icon>
      </v-btn>

      <!-- FAQ -->
      <v-btn
        fab
        dark
        small
        class="radial-menu-btns"
        to="/FAQ"
        @click="visible = false"
      >
        <v-icon>fas fa-question-circle</v-icon>
      </v-btn>  
    </v-speed-dial>
    </v-fab-transition>

    <v-fab-transition transition="scale-transition">
      <!-- Кнопка возврата назад -->
      <v-btn
        v-if="visible != true"
        transition="scale-transition"
        class="radial-menu-btn return"
        dark
        icon
        v-show="RadialMenuStatus"
        @click="() => { visible = true; this.$router.push('/')}"
      >
        <v-icon>fas fa-undo-alt</v-icon>
    </v-btn>
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
      visible: true // Отображение компаса или кнопки назад
    }),
    computed: {
      RadialMenuStatus(){
        return this.$store.state.radialMenuShow;
      }
    },
    methods: {
    }
}
</script>

<style lang="scss" scoped>

.radial-menu-btn {
  background: var(--RadialMenu--radial-menu-btn--background) !important;
  color: var(--RadialMenu--radial-menu-btn--color) !important;
}

.radial-menu-btns {
  background: var(--RadialMenu--radial-menu-btns--background) !important;
  color: var(--RadialMenu--radial-menu-btns--color) !important;
}

.return {
  position: fixed;
  right: 0px;
  bottom: 0px;
  margin: 14px 14px 14px 14px;
  z-index: 10;
}

.fab-text {
  color: rgba(0,0,0,0.54);
}
</style>
