<template>
<div>
  <div class="message-title" style="margin-bottom: 6%" v-if="isGroupChat">{{ author }}</div>
  <div v-html="getTwemoji"></div>
</div>

</template>

<script>
import twemoji from 'twemoji'

export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    isGroupChat: {
      type: Boolean,
      required: true
    },
    author: [String],
  },
  computed: {
    getTwemoji() { 
      let message = this.data.emoji 
      let exceptionList = [
        '<p>',
        '<img'
      ];

      function checkEmojiWasGet(exception){
        return message.includes(exception);
      }
      // Было ли сообщение отформитированно ранее (Для предотвращения повторной обработки после перерендера)
      if (exceptionList.some(checkEmojiWasGet) === false) {
        message = twemoji.parse(message, {
          base: 'assets/img/',            // default MaxCDN
          ext: ".svg",                    // default ".png"
          className: "emoji-message",     // default "emoji"
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
