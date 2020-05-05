<template>
  <v-toolbar class="bar" dark flat dense :style="{ width: `${width - (width / 100 * 6.24)}px`}">
    <!-- Кнопка возвращения к списку контактов -->
    <v-btn class="bar__back-btn" icon @click="backToContactsPage()">
      <a-icon class="bar__back-btn__icon" :icon="['fas', 'arrow-left']" />
    </v-btn>

    <v-spacer />
    <!-- ЗАГОЛОВОК ЧАТА преобразует tailor в Tailor -->
    <v-toolbar-title class="bar__title"> 
      {{ this.$store.state.mChat.selectedContactName }} 
    </v-toolbar-title>
    <v-spacer />
    
    <!-- Декоративная кнопка -->
    <v-btn class="bar__phone-btn" icon>
      <a-icon class="bar__phone-btn__icon" :icon="['fas', 'phone']" />
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  props: {
    width: [Number, String]
  },
  methods: {
    backToContactsPage(){
      this.$store.commit('mChatListShow');
    },
  }
}
</script>

<style lang="scss" scoped>

.v-btn {
  background: var(--message-list__v-btn--background) !important;
}

.v-btn:hover {
  background: var(--message-list__v-btn--background) !important;
}

.bar {
  position: fixed;
  width: 100%;
  background-color: var(--message-list--bar--background-color) !important;
  box-shadow: 0px -2px 4px black; // Маленькая тень
  z-index: 4;
}

.bar__title {
  color:  var(--message-list--bar__title--color) !important;
  font-weight: var(--message-list--bar__title--font-weight) !important;  
}

.bar__back-btn {
  color: var(--message-list--bar__back-btn--color) !important;
  &__icon {
    font-size: 20px;
  }
}

.bar__phone-btn {
  color: var(--message-list--bar__phone-btn--color) !important;
  &__icon {
    font-size: 20px;
  }
}

.bar__video-btn {
  color: var(--message-list--bar__video-btn--color) !important;
  background-color: transparent !important;
}

.bar__ellipsis-btn {
  color: var(--message-list--bar__ellipsis-btn--color) !important;
}

</style>
