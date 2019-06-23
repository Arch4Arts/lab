<template>
  <div class="message" :style="messageColors">
    <!-- <p v-html="messageText"></p> -->
    {{ data.text }}
    <p v-if="data.meta" class='message-meta' :style="{color: messageColors.color}">{{data.meta}}</p>
  </div>
</template>

<script>

export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    messageColors: {
      type: Object,
      required: true
    },
    messageStyling: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    messageText() {
      return this.data.text
    }
  }
}
</script>

<style lang="scss" scoped>

a.chatLink {
  color: inherit !important;
}

</style>
