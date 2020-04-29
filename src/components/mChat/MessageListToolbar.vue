<template>
  <v-toolbar class="bar" dark flat dense>
    <!-- Кнопка возвращения к списку контактов -->
    <v-btn class="bar__back-btn" icon @click="backToContactsPage()">
      <v-icon size="18"> fas fa-arrow-left </v-icon>
    </v-btn>

    <v-spacer/>
    <!-- ЗАГОЛОВОК ЧАТА преобразует tailor в Tailor -->
    <v-toolbar-title class="bar__title"> 
      {{ this.$store.state.mChat.selectedContactName }} 
    </v-toolbar-title>

    <v-spacer/>
    <!-- Декоративная кнопка -->
    <v-btn class="bar__phone-btn" icon>
      <v-icon size="18"> fas fa-phone </v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
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
}

.bar__phone-btn {
  color: var(--message-list--bar__phone-btn--color) !important;
}

.bar__video-btn {
  color: var(--message-list--bar__video-btn--color) !important;
  background-color: transparent !important;
}

.bar__ellipsis-btn {
  color: var(--message-list--bar__ellipsis-btn--color) !important;
}

</style>
