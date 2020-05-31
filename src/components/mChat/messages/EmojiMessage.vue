<template>
<div>
  <div class="message-title" style="margin-bottom: 6%" v-if="$store.state.mChat.selectedChatIsGroup">{{ author }}</div>
  <div v-html="getEmoji"></div>
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
    author: [String],
  },
  computed: {
    getEmoji() { 
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
