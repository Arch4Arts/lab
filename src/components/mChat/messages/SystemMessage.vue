<template>
  <div class="message-system">
    {{ data.text }}
    <p v-if="data.meta" class='message-meta system'>{{ data.meta }}</p>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    },
  }
}
</script>

<style lang='scss' scoped>

</style>
