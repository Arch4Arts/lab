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
      <v-btn slot="activator" dark icon small hover v-model="fab" v-show="visible">
        <a-icon :icon="['fas', 'compass']" class="main-btn" />
      </v-btn>
      <!-- Saves -->
      <v-btn icon dark small class="btns" @click="() => this.$store.state.isOpenSavesDrawer = true">
        <a-icon :icon="['fas', 'save']" />
      </v-btn>
      <!-- Journal -->
      <v-btn icon dark small class="btns" to="/Diary" @click="visible = false">
        <a-icon :icon="['fas', 'book']" />
      </v-btn>
      <!-- Settings -->
      <v-btn icon dark small class="btns" @click="() => this.$store.state.isOpenSettingsDrawer = true">
        <a-icon :icon="['fas', 'cog']" />
      </v-btn>
      <!-- FAQ -->
      <v-btn icon dark small class="btns" to="/FAQ" @click="visible = false">
        <a-icon :icon="['fas', 'question-circle']" />
      </v-btn>  
    </v-speed-dial>
    </v-fab-transition>

    <v-fab-transition transition="scale-transition">
      <!-- Кнопка возврата назад -->
      <v-btn
        v-if="visible != true"
        transition="scale-transition"
        class="main-btn return-btn"
        dark
        icon
        v-show="RadialMenuStatus"
        @click="() => { visible = true; this.$router.push('/')}">
        <a-icon :icon="['fas', 'undo-alt']" />
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

.main-btn {
	background: var(--RadialMenu--main-btn--background) !important;
	color: var(--RadialMenu--main-btn--color) !important;
	font-size: 33px; // размер иконки
}

.btns {
  background: var(--RadialMenu--btns--background) !important;
  color: var(--RadialMenu--btns--color) !important;
}

.return-btn {
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
