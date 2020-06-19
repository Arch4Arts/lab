<template>
<section>
  <v-color-picker 
  :width='calcWidth - 32' 
  flat 
  mode='hexa'
  v-model="color"
  :key="$store.state.reRender_ColorPickerCanvas"
  >
  </v-color-picker>
</section>
</template>

<script>
export default {
  data(){
    return {
      color: this.currentColor,
      calcWidth: 440 // Default
    }
  },
  props: { // Текущий цвет, если есть
    currentColor: {
      type: String,
      required: true,
    },
    parentBlockNameID: { // передаёт название id='' 
      type: String,
      required: true,
    }
  },
  created() {
    this.widthSizeDetect()
    window.addEventListener("resize", this.widthSizeDetect);
  },
  destroyed() {
    window.removeEventListener("resize", this.widthSizeDetect);
  },
  methods: {
    // Автомаштабирование по ширине на основании родительского компонента
    widthSizeDetect() {
      let element = document.getElementById(this.parentBlockNameID);
      let elementInfo = element.getBoundingClientRect();
      this.calcWidth = elementInfo.width
      this.$store.state.reRender_ColorPickerCanvas++;
    },
  },
  watch: {
    'color': function() { // Отслеживание состояние цвета и отправка данных родительскому компоненту через события
      this.$emit('colorChange', this.color);
    }
  },
}
</script>

<style lang='scss'>

.v-color-picker {
  background-color: var(--Page--background) !important;
}

.v-color-picker__dot {
  height: 40px !important;
  width: 40px !important;
}

</style>