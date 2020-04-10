<template>
<section>
    <v-color-picker width='550' flat hide-inputs v-model="color"></v-color-picker>
</section>
</template>

<script>
export default {
  data(){
    return {
      color: ''
    }
  },
  watch: {
    'color': function() { // Отслеживание состояние цвета и отправка данных компоненту выше
      this.$emit('colorChange', this.color);
      console.log(this.color);
    }
  }
}
</script>

<style lang="scss">

.v-color-picker {
  background-color: var(--app--Page--background) !important;
}

.v-color-picker__dot {
  height: 40px !important;
  width: 40px !important;
}

</style>