<template>
<div class="text-msg-container">
  <div class="text-message">
    <div v-html="getFormatMessage"></div>
    <div v-if="data.meta" class='text-message-meta'>{{ data.meta }}</div>
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
  },
  computed: {
    getFormatMessage() { // Применение форматирования к тексту, демо: https://markdown-it.github.io
      return markdown(this.data.text)
    }
  }
}
</script>
