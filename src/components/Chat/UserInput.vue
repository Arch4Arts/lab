<template>
  <div>
    <!-- <Suggestions :suggestions="suggestions" v-on:sendSuggestion="_submitSuggestion" :colors="colors"/> -->
    <!-- <div v-if="file" class='file-container' :style="{backgroundColor: colors.userInput.text, color: colors.userInput.bg}">
      <span class='icon-file-message'><img :src="icons.file.img"  :alt="icons.file.name" height="15" /></span>
      {{file.name}}
      <span class='delete-file-message' @click="cancelFile()" ><img :src="icons.closeSvg.img"  :alt="icons.closeSvg.name" height="10" title='Remove the file' /></span>
    </div> -->
    <form class="inputArea">
      <div
        role="button"
        tabIndex="0"
        contentEditable="false"
        :placeholder="($store.state.lang) ? 'Write a message...': 'Введите текст...'"
        class="text-input"
      ></div>
      <div class="inputArea buttons-container">
          <v-icon class="plus-icon">far fa-plus</v-icon>
          <v-icon class="send-icon">send</v-icon>
          <v-icon class="smile-icon">far fa-smile</v-icon>
          <v-icon class="microphone-icon">fas fa-microphone</v-icon>
          <!-- <v-icon class="paperclip-icon">far fa-paperclip</v-icon> -->
      </div>
    </form>
  </div>
</template>


<script>
import Suggestions from './Suggestions.vue'

export default {
  components: {
    Suggestions
  },
  props: {
    suggestions: {
      type: Array,
      default: () => []
    },
    // onSubmit: {
    //   type: Function,
    //   required: true
    // },
  },
  data () {
    return {
      file: null,
      inputActive: false,
    }
  },
  methods: {
    // handleKey (event) {
    //   if (event.keyCode === 13 && !event.shiftKey) {
    //     this._submitText(event)
    //     event.preventDefault()
    //   }
    //   this.$emit('onType')
    // },
    // _submitSuggestion(suggestion) {
    //   this.onSubmit({author: 'me', type: 'text', data: { text: suggestion }})
    // },
    // _submitText (event) {
    //   const text = this.$refs.userInput.textContent
    //   const file = this.file
    //   if (file) {
    //     if (text && text.length > 0) {
    //       this.onSubmit({
    //         author: 'me',
    //         type: 'file',
    //         data: { text, file }
    //       })
    //       this.file = null
    //       this.$refs.userInput.innerHTML = ''
    //     } else {
    //       this.onSubmit({
    //         author: 'me',
    //         type: 'file',
    //         data: { file }
    //       })
    //       this.file = null
    //     }
    //   } else {
    //     if (text && text.length > 0) {
    //       this.onSubmit({
    //         author: 'me',
    //         type: 'text',
    //         data: { text }
    //       })
    //       this.$refs.userInput.innerHTML = ''
    //     }
    //   }
    // },
  }
}
</script>

<style lang="scss">

.inputArea { // Зона размещения поля ввода и кнопок
  min-height: 55px;
  width: 340px;
  padding-right: 8px;
  padding-left: 8px;
  padding-bottom: 5px;
  position: absolute;
  bottom: 0;
  display: flex;
  background-color: var(--inputArea--background-color);
  z-index: 4;
  .text-input { // Поле ввода
    width: var(--inputArea__text-input--width);
    height: var(--inputArea__text-input--height);
    border-radius: var(--inputArea__text-input--border-radius);
    padding: 15px; // позиционирование текста по середине
    padding-left: var(--inputArea__text-input--padding-left); // Смешение текста от левого края
    background-color: var(--inputArea__text-input--background-color);
    color: var(--inputArea__text-input--color);
    &:empty:before {
      content: attr(placeholder);
      /* color: rgba(86, 88, 103, 0.3); */
      filter: contrast(15%);
      outline: none;
    }
  }
  .buttons-container { // Контейнер для кнопок
    background: transparent;
    display: flex;
    .smile-icon { // Кнопка со смайликом
      position: absolute;
      cursor: pointer;
      left: var(--inputArea-smile-icon--left);
      bottom: var(--inputArea-smile-icon--bottom);
      color: var(--inputArea-smile-icon--color);
      background-color: var(--inputArea-smile-icon--background-color);
    }
    .paperclip-icon {
      position: absolute;
      cursor: pointer;
      left: var(--inputArea-paperclip-icon--left);
      bottom: var(--inputArea-paperclip-icon--bottom);
      color: var(--inputArea-paperclip-icon--color);
      background-color: var(--inputArea-paperclip-icon--background-color);
    }
    .plus-icon {
      position: absolute;
      cursor: pointer;
      left: var(--inputArea-plus-icon--left);
      bottom: var(--inputArea-plus-icon--bottom);
      width: var(--inputArea-plus-icon--width);
      height: var(--inputArea-plus-icon--height);
      border-radius: var(--inputArea-plus-icon--border-radius);
      color: var(--inputArea-plus-icon--color);
      background-color: var(--inputArea-plus-icon--background-color);
    }
    .send-icon {
      position: absolute;
      cursor: pointer;
      left: var(--inputArea-send-icon--left);
      bottom: var(--inputArea-send-icon--bottom);
      width: var(--inputArea-send-icon--width);
      color: var(--inputArea-send-icon--color);
    }
    .microphone-icon {
      position: absolute;
      cursor: pointer;
      left: var(--inputArea-microphone-icon--left);
      bottom: var(--inputArea-microphone-icon--bottom);
      width: var(--inputArea-microphone-icon--width);
      color: var(--inputArea-microphone-icon--color);
    }
  }
}

@media (max-width: 450px) {
  .inputArea {
    width: 100%;
  }
}
/* 
.inputArea--button--send {
  width: 30px;
  height: 55px;
  margin-left: 10px;
  margin-right: 2px;
  display: flex;
  flex-direction: column;
  justify-content: center;
} */

/* .inputArea.active {
  box-shadow: none;
  background-color: white;
  box-shadow: 0px -5px 20px 0px rgba(150, 165, 190, 0.2);
} */

/* .inputArea--button label {
  position: relative;
  height: 24px;
  padding-left: 3px;
  cursor: pointer;
}

.inputArea--button label:hover path {
  fill: rgba(86, 88, 103, 1);
}
 */
/* .inputArea--button input {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 99999;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  overflow: hidden;
}

.file-container {
  background-color: #f4f7f9;
  border-top-left-radius: 10px;
  padding: 5px 20px;
  color: #565867;
} */

/* .delete-file-message {
  font-style: normal;
  float: right;
  cursor: pointer;
  color: #c8cad0;
}

.delete-file-message:hover {
  color: #5d5e6d;
}

.icon-file-message {
  margin-right: 5px;
} */
</style>
