<template>
<div class="bubble-container">
  <div class="message-title" v-if="$store.state.mChat.selectedChatIsGroup">{{ author }}</div>
  <div class="text-message">
    <div v-html="getFormatMessage"></div>
    <div v-if="data.meta" class='message-meta text'>{{ data.meta }}</div>
  </div>
  <div class="tail"></div>
</div>
</template>

<script>
import { markdown } from './drawdown'
import twemoji from 'twemoji'

export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    author: [String],
  },
  computed: {
    getFormatMessage() { 
      let message = this.data.text 
      let exceptionList = [
        '<p>',
        '<b>',
        '<i>',
        '<img'
      ];

      function checkMessageWasFormatted(exception){
        return message.includes(exception);
      }
      // Было ли сообщение отформитированно ранее (Для предотвращения повторной обработки после перерендера)
      if (exceptionList.some(checkMessageWasFormatted) === false) {
        message = markdown(message) // Применение форматирования к тексту, демо: https://markdown-it.github.io
        message = twemoji.parse(message, {
          base: 'assets/img/',              // default MaxCDN
          ext: ".svg",                      // default ".png"
          className: "text-message__emoji", // default "emoji"
          folder: "twemoji"
        })
        return message        
      }
      // Если да, оставляем как есть
      else return message
    }
  }
}
</script>
