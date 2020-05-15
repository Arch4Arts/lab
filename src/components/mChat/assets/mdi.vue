<template>
  <!-- Изменять размер по селектору #mdi -->
  <svg id="mdi" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-hidden="true">
    <path :d="path"></path>
  </svg>
</template>

<script>
export default {
  props: {
    path: String
  }
}
</script>

<style>

</style>