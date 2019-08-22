<template>
<div class="text-msg-container">
  <div class="text-message">
    <div> {{ data.text }} </div>
    <p v-if="data.meta" class='text-message-meta'>{{ data.meta }}</p>
  </div>
  <div class="tail"></div>
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
