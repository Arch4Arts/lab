<i18n>
	{
		"en": {
			"placeholder": "Message"
		},
		"ru": {
			"placeholder": "Сообщение"
		}
	}
</i18n>

<template>
<div>
  <div class="input-area" :style="{ height: `${height}px`}">
    <div
      :placeholder="$t('placeholder')"
      class="text-input" />
    <div class="buttons-container">
      <div class="plus-icon">
        <a-icon class="plus-icon__icon" :icon="['far', 'plus']" />
      </div>
      <mdi class="send-icon" :path="send" />
      <a-icon class="smile-icon" :icon="['far', 'smile']" />
      <mdi class="paperclip-icon" :path="paperclip" />
      <!-- <a-icon class="microphone-icon" :icon="['far', 'paperclip']" /> -->
    </div>
  </div>
  <!-- Пространство под панелью ввода (чтобы туда не залазил MessageList) -->
  <div v-if="$store.state.mChat.showDecorativeInputPanel" :style="{ height: `${height}px` }" />    
</div>
</template>

<script>
import mdi from './assets/mdi.vue'
import { mdiSend, mdiPaperclip } from '@mdi/js'

export default {
  data: function () {
    return {
    send: mdiSend,
    paperclip: mdiPaperclip      
    }
  },
  props: {
    width: [Number, String],
    height: [Number, String],
  },
  components: {
    mdi
  }
}
</script>

<style lang='scss' scoped>

.input-area { // Зона размещения поля ввода и кнопок
  display: flex;
  position: fixed;
  align-items: center;
  // bottom: 5.5%;
  // ! нужен рефакторинг
  width: 99%;
  // height: 8%;

  // padding-right: 2%;
  padding-left: 2%;
    // manual bottom border-radius
  // border-radius: 0px 0px calc(var(--mChatWidth) / 100 * 6) calc(var(--mChatWidth) / 100 * 6);
  // padding-bottom: 1%;

  background: var(--message-list-input--background) !important;
  box-shadow: 0px 1px 4px black; // Маленькая тень
  z-index: 4;
}

.text-input { // Поле ввода
  position: absolute;
  display: flex;
  align-items: center;

  
  width: 75%;
  height: 85%;
  padding-left: 15%;
  
  border-radius: 18px;
  font-size: 0.850em;
  
  background: var(--message-list-input__text-input--background) !important;
  color: var(--message-list-input__text-input--color) !important;
  cursor: text;
  &:empty:before {
    border-left: var(--message-list-input__text-input__blink-caret); /* The typwriter cursor */
    animation: blink-caret 1s step-end infinite;
    content: attr(placeholder);
    outline: none;
  }
}

@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: var(--message-list-input__text-input__blink-caret--color) }
}

.buttons-container { // Контейнер для кнопок
  display: flex;
  position: absolute;
  align-items: center;
  
  width: 70%;
  height: 100%;

  background: transparent !important;
  .plus-icon {
    position: absolute;
    cursor: pointer;
    left: var(--message-list-input__plus-icon--left) !important;
    width: var(--message-list-input__plus-icon--width) !important;
    height: var(--message-list-input__plus-icon--height) !important;
    border-radius: var(--message-list-input__plus-icon--border-radius) !important;
    color: var(--message-list-input__plus-icon--color) !important;
    background: var(--message-list-input__plus-icon--background) !important;
    &__icon {
      position: absolute;
      // width: 100%;
      left: 18%;
      height: 100%;
      // bottom: calc(var(--mChatWidth) / 100 * 0.6);
      font-size: 1.275em;
    }
  }
  .smile-icon { // Кнопка со смайликом
    position: absolute;
    cursor: pointer;
    font-size: var(--message-list-input__smile-icon--font-size) !important;
    left: var(--message-list-input__smile-icon--left) !important;
    color: var(--message-list-input__smile-icon--color) !important;
    background: var(--message-list-input__smile-icon--background) !important;
  }
  .paperclip-icon {
    position: absolute;
    cursor: pointer;
    left: var(--message-list-input__paperclip-icon--left) !important;
    &#mdi {
      width: var(--message-list-input__paperclip-icon--width);
    }
    fill: var(--message-list-input__paperclip-icon--fill) !important;
    background: var(--message-list-input__paperclip-icon--background) !important;
  }
  .send-icon {
    position: absolute;
    cursor: pointer;
    left: var(--message-list-input__send-icon--left) !important;
    &#mdi {
      width: var(--message-list-input__send-icon--width) !important;
    }
    fill: var(--message-list-input__send-icon--fill) !important;
  }
}

@import '~vuetify/src/styles/styles.sass';
@media #{map-get($display-breakpoints, 'xs-only')} {
  .input-area {
    width: 100%;
    bottom: 0%;
  }
}

</style>
