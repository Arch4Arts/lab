<template>
  <div :style="messageColors">
      {{ data.time }}
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
  }
}
</script>

<style scoped>

</style>
