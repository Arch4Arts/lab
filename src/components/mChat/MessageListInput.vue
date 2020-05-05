<template>
<div class="inputArea">
  <div
    :placeholder="($store.state.gameLang) ? 'Write a message...': 'Введите текст...'"
    class="text-input"
  ></div>
  <div class="buttons-container">
      <div class="plus">
        <a-icon class="plus__icon" :icon="['far', 'plus']" />
      </div>
      <v-icon class="send-icon">{{ svgPath }}</v-icon>
      <a-icon class="smile-icon" :icon="['far', 'smile']" />
      <a-icon class="microphone-icon" :icon="['fas', 'microphone']" />
      <!-- <v-icon class="plus-icon">far fa-plus</v-icon>
      <v-icon class="send-icon">{{ svgPath }}</v-icon>
      <v-icon class="smile-icon">far fa-smile</v-icon>
      <v-icon class="microphone-icon">fas fa-microphone</v-icon> -->
      <!-- <v-icon class="paperclip-icon">far fa-paperclip</v-icon> -->
  </div>
</div>  
</template>

<script>
import { mdiSend } from '@mdi/js'

export default {
  data: () => ({
    svgPath: mdiSend 
  }),
}
</script>

<style lang="scss" scoped>

$elements-top: 58px;

.inputArea { // Зона размещения поля ввода и кнопок
  min-height: $elements-top;
  padding-right: 8px;
  padding-left: 8px;
  padding-bottom: 5px;
  position: relative;
  // position: absolute;
  // position: fixed;
  // bottom: 41px;
  width: 100%;
  display: flex;
  background: var(--inputArea--background) !important;
  box-shadow: 0px 2px 4px black; // Маленькая тень
  z-index: 4;
}

.text-input { // Поле ввода
  position: absolute;
  top: 4px;
  width: var(--inputArea__text-input--width) !important;
  height: var(--inputArea__text-input--height) !important;
  border-radius: var(--inputArea__text-input--border-radius) !important;
  padding: 15px; // позиционирование текста по середине
  padding-left: var(--inputArea__text-input--padding-left) !important; // Смешение текста от левого края
  background: var(--inputArea__text-input--background) !important;
  color: var(--inputArea__text-input--color) !important;
  cursor: text;
  &:empty:before {
    content: attr(placeholder);
    /* color: rgba(86, 88, 103, 0.3); */
    filter: contrast(15%);
    outline: none;
  }
}

.buttons-container { // Контейнер для кнопок
  background: transparent !important;
  display: flex;
  position: absolute;
  top: $elements-top;
  .smile-icon { // Кнопка со смайликом
    position: absolute;
    cursor: pointer;
    left: var(--inputArea-smile-icon--left) !important;
    bottom: var(--inputArea-smile-icon--bottom) !important;
    color: var(--inputArea-smile-icon--color) !important;
    background: var(--inputArea-smile-icon--background) !important;
  }
  .paperclip-icon {
    position: absolute;
    cursor: pointer;
    left: var(--inputArea-paperclip-icon--left) !important;
    bottom: var(--inputArea-paperclip-icon--bottom) !important;
    color: var(--inputArea-paperclip-icon--color) !important;
    background: var(--inputArea-paperclip-icon--background) !important;
  }
  .plus {
    position: absolute;
    cursor: pointer;
    left: var(--inputArea-plus-icon--left) !important;
    bottom: var(--inputArea-plus-icon--bottom) !important;
    width: var(--inputArea-plus-icon--width) !important;
    height: var(--inputArea-plus-icon--height) !important;
    border-radius: var(--inputArea-plus-icon--border-radius) !important;
    color: var(--inputArea-plus-icon--color) !important;
    background: var(--inputArea-plus-icon--background) !important;
    &__icon {
      position: absolute;
      left: 6px;
      bottom: 3px;
      font-size: 24px;
    }
  }
  .send-icon {
    position: absolute;
    cursor: pointer;
    left: var(--inputArea-send-icon--left) !important;
    bottom: var(--inputArea-send-icon--bottom) !important;
    width: var(--inputArea-send-icon--width) !important;
    color: var(--inputArea-send-icon--color) !important;
  }
  .microphone-icon {
    position: absolute;
    cursor: pointer;
    left: var(--inputArea-microphone-icon--left) !important;
    bottom: var(--inputArea-microphone-icon--bottom) !important;
    width: var(--inputArea-microphone-icon--width) !important;
    color: var(--inputArea-microphone-icon--color) !important;
  }
}

@media (max-width: 450px) {

  .inputArea {
    width: 100%;
  }
}

</style>
