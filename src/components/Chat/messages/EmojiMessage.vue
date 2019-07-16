<template>
  <img class="emoji-img-size" :src="data.src" />
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

.emoji-img-size {
  max-height: 50px;
}

</style>
