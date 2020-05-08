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

export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    author: [String],
  },
  computed: {
    getFormatMessage() { // Применение форматирования к тексту, демо: https://markdown-it.github.io
      return markdown(this.data.text)
    }
  }
}
</script>
