<template>
<v-expand-x-transition>
  <div v-show="showQuickMenu" class="float-btns-container vertical" :class="{ 'horizontal': isQuickMenuHorizontalAlign }">
    <!-- Toggle FullScreen Mode -->
    <div>
      <v-btn v-if="this.$root.isFullScreen === false" icon dark class="btn" @click="$root.launchFullScreen()">
        <a-icon :icon="['fas', 'expand']" />
      </v-btn>
      <v-btn v-else icon dark class="btn" @click="$root.exitFullScreen()">
        <a-icon :icon="['fas', 'compress']" />
      </v-btn>
    </div>
    <!-- FAQ -->
    <v-btn icon dark class="btn" to="/FAQ" @click="showBackspace = true">
      <a-icon :icon="['fas', 'question-circle']" />
    </v-btn>
    <!-- Settings -->
    <v-btn icon dark class="btn" @click="() => this.$store.state.showSettingsDrawer = true">
      <a-icon :icon="['fas', 'cog']" />
    </v-btn>
    <!-- Saves -->
    <v-btn icon dark class="btn" @click="() => this.$store.state.showSavesDrawer = true">
      <a-icon :icon="['fas', 'save']" />
    </v-btn>
    <!-- Journal -->
    <v-btn icon dark class="btn" to="/Journal" @click="showBackspace = true">
      <a-icon :icon="['fas', 'book']" />
    </v-btn>
    <!-- Кнопка возврата назад -->
    <v-btn v-if="showBackspace" class="btn" dark icon @click="() => { showBackspace = false; this.$router.push('/')}">
      <a-icon :icon="['fas', 'undo-alt']" />
    </v-btn>
  </div>
</v-expand-x-transition>  
</template>

<script>
export default {
  data: function () {
    return {
      showBackspace: false // Отображение кнопки назад (домой)
    }
  },
  computed: {
    showQuickMenu(){
      return this.$store.state.showQuickMenu;
    },
    // Горизонтальная ориентация панели быстрого доступа
    isQuickMenuHorizontalAlign(){
      return this.$store.state.isQuickMenuHorizontalAlign;
    }
  },
}
</script>

<style lang='scss' scoped>

.float-btns-container {
  background-color: rgba(0, 0, 0, 0.25);

  display: flex;
  
  position: fixed;
  right: 10px;
  bottom: 16px;

  width: none !important;
  z-index: 4;
  &.vertical {
    flex-direction: column;
  }
  &.horizontal {
    flex-direction: row;
  }
}

.btn {
  background: var(--RadialMenu--btn--background) !important;
  color: var(--RadialMenu--btn--color) !important;
}

.v-btn:hover {
  background: var(--RadialMenu--btn_hover--background) !important;
}

// Отключение ripple эффекта после нажатия кнопки
.theme--dark.v-btn--active:hover::before, .theme--dark.v-btn--active::before {
    opacity: 0;
}

</style>
