<template>
  <div class="test" :style="{ width: `${width / 100 * 96}px`, height: `${height / 100 * 85}px` }">

  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: [Number, String],
      default: 300,
    },
    height: {
      type: [Number, String],
      default: 300,
    },
  }
}
</script>

<style scoped>

.test {
  background: tomato;
  width: 200px;
  height: 200px;
}

</style>