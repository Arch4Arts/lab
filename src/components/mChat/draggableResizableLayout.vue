<template>
  <vue-draggable-resizable 
    :minWidth="150"
    :w="width" 
    :h="height" 
    :z="3"
    
    :handles="['ml','mr']" 
    drag-cancel=".pos"

    @dragging="onDrag" 
    @resizing="onResize"
    @resizestop="updateHandleGrid">
    <div>
      <device-layout id="svgDevice" :width="width" />
      <test class="pos" :width="width" :height="height" />    
    </div>
  </vue-draggable-resizable>
</template>

<script>
import VueDraggableResizable from 'vue-draggable-resizable'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

import deviceLayout from './deviceLayout.vue'

import test from './test'

export default {
  data() {
    return {
      width: 330,
      height: 100,
      x: 0,
      y: 0
    }
  },
  methods: {
    onDrag(x, y) {

      this.x = x
      this.y = y
    },
    // Свойства w и h реактивны только после того, как компонент перестанет изменяться (после отработки onResize)
    updateHandleGrid(x, y, width, height) {
      let size = this.getDeviceSize();
      this.height = size.height
    },
    onResize(x, y, width, height) {
      this.x = x
      this.y = y
      this.width = width
      this.height = this.getDeviceSize().height
      // this.getDeviceSize().height / 100 * 85
    },
    getDeviceSize(){
      let element = document.getElementById('svgDevice');
      let elementInfo = element.getBoundingClientRect();
      let device = {
        width: elementInfo.width,
        height: elementInfo.height
      }
      return device
    }
  },
  mounted(){
    let size = this.getDeviceSize();
    this.width = size.width
    this.height = size.height
  },
  components: {
    'vue-draggable-resizable': VueDraggableResizable,
    deviceLayout,
    test
  }
}
</script>

<style lang='scss'>

.pos {
  position: absolute;
  margin: 15% 2% 15% 2%;
  border-radius: 6px;
  left: 0;
  top: 0;
  z-index: 2;
}

.active {
  position: fixed;
}

.vdr {
  border: none;
}

.handle {
  height: 91%;
  width: 3%;
  position: absolute;
  background-color: transparent !important;
  border-width: 0px !important;
  // background-color: red;
}
.handle-ml {
  top: 9%;
  left: 0;
}
.handle-mr {
  top: 9%;
  right: 0;
}

</style>