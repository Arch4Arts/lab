<template>
  <div class="message">
    <div> {{ data.text }} </div>
    <!-- {{ data.text }} -->
    <p v-if="data.meta" class='message-meta'>{{data.meta}}</p>
  </div>
</template>

<script>

export default {
  props: {
    data: {
      type: Object,
      required: true
    },
  },
  computed: {
    messageText() {
      return this.data.text
    }
  }
}
</script>

<style lang="scss" scoped>

// a.chatLink {
//   color: inherit !important;
// }

</style>
