<template>
<div>
  <v-app-bar 
    class="bar" 
    dark 
    flat 
    dense 
    :hide-on-scroll="!$store.state.mChat.showBarPanelPermanent" 
    elevate-on-scroll 
    scroll-target="#scrolling-techniques-4" 
    :style="{ height: `${height}px` }">
    <!-- Кнопка возвращения к списку контактов -->
    <v-btn class="bar__back-btn" icon @click="backToContactsPage()">
      <a-icon class="bar__back-btn__icon" :icon="['fas', 'arrow-left']" />
    </v-btn>

    <v-spacer />
    <!-- ЗАГОЛОВОК ЧАТА преобразует tailor в Tailor -->
    <v-toolbar-title class="bar__title"> 
      <img class="bar__title__avatar" :src="$store.state.mChat.selectedChatAvatar"> 
      <div> {{ this.$store.state.mChat.selectedChatName }} </div> 
    </v-toolbar-title>
    <v-spacer />
    
    <!-- Декоративная кнопка -->
    <v-btn class="bar__phone-btn" icon>
      <a-icon class="bar__phone-btn__icon" :icon="['fas', 'phone']" />
    </v-btn>
  </v-app-bar>
  <!-- Пространство под шапкой (чтобы туда не залазил MessageList) -->
  <!-- <div :style="{ height: `${height}px` }" /> -->
</div>
</template>

<script>
export default {
  props: {
    height: [Number, String],
  },
  methods: {
    backToContactsPage(){
      this.$store.commit('mChatListShow');
    },
  }
}
</script>

<style lang='scss' scoped>

.v-btn {
  background: var(--message-list__v-btn--background) !important;
}

.v-btn:hover {
  background: var(--message-list__v-btn--background) !important;
}

.bar {
  display: flex;
  flex-direction: column;
  justify-content: center;

  position: fixed;
  padding: 0px 3%;
  width: 100%;
  // height: 6%;

  background-color: var(--message-list__bar--background-color) !important;
  box-shadow: 0px -1px 4px black; // Маленькая тень
  z-index: 4;
}

.bar__title {
  display: flex;
  width: 100%;
  align-items: center;

  color:  var(--message-list__bar__title--color) !important;  
  font-size: 1.2em;
  font-weight: var(--message-list__bar__title--font-weight) !important;  
  &__avatar {
    width: 1.7em;
    height: 1.7em;

    margin-left: 2%;
    margin-right: 2%;

    border-radius: 50%;
  }
  div {
    white-space: nowrap !important;
    text-overflow: ellipsis !important;
    overflow: hidden !important;
  }
}

.bar__back-btn {
  width: var(--vbtn--size) !important;
  height: var(--vbtn--size) !important;
  color: var(--message-list__bar__back-btn--color) !important;
  &__icon {
    font-size: var(--vbtn-icon--fontSize) !important;
  }
}

.bar__phone-btn {
  width: var(--vbtn--size) !important;
  height: var(--vbtn--size) !important;
  color: var(--message-list__bar__phone-btn--color) !important;
  &__icon {
    font-size: var(--vbtn-icon--fontSize) !important;
  }
}

@import '~vuetify/src/styles/styles.sass';
@media #{map-get($display-breakpoints, 'xs-only')} {
  .bar {
    width: 100%;
    padding: 0px 0px;
  }
}

</style>
