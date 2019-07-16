<template>
  <div>
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
  }
}
</script>

<style scoped>

</style>
