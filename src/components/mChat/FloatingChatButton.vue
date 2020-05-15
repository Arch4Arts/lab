<template>
  <vue-draggable-resizable 
    :x="x"
    :y="y"
    :z="3"

    @dragging="onDrag" 
    @dragstop="savePosition"
    :draggable="!$vuetify.breakpoint.xsOnly"
  >
    <!-- Иконка открывающая чат -->
    <div class="launcher hidden-sm-and-down" @mouseup="$store.state.mChat.show ? closeChat() : openChat()">
      <!-- Элемент показывающий кол-во сообщений рядом с эконкой -->
      <v-badge
        :content="unreadMessagesCount"
        :value="unreadMessagesCount"
        overlap
      >
        <v-btn text large fab icon><a-icon class="mChat-btn" :icon="['fas', 'mobile-alt']" /></v-btn>
      </v-badge>
      <!-- <div v-if="unreadMessagesCount > 0 && !$store.state.mChat.show" class="new-msg-count">
        {{ unreadMessagesCount }}
      </div> -->
    </div>
  </vue-draggable-resizable>

</template>

<script>
import VueDraggableResizable from 'vue-draggable-resizable'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

export default {
  data() {
    return {
      x: this.$store.state.mChat.posX_floatButton,
      y: this.$store.state.mChat.posY_floatButton,
      isDragNow: false,
    }
  },
  props: {
    unreadMessagesCount: {
      type: Number,
      required: true,
    }
  },
  methods: {
    onDrag(x, y) {
      this.x = x
      this.y = y
      console.log(`x: ${this.x}, y: ${this.y}`)
      this.isDragNow = true
    },
    savePosition(x, y){
      this.$store.state.mChat.posX_floatButton = x
      this.$store.state.mChat.posY_floatButton = y
      this.$store.commit('updateStores');

      setTimeout(() => { this.isDragNow = false }, 100);
    },
    openChat() {
      if (!this.isDragNow) this.$store.commit('mChatShow');
    },
    closeChat() {
      if (!this.isDragNow) this.$store.commit('mChatShow');
    },
  },
  mounted(){
    console.log(`x: ${this.x}, y: ${this.y}`)
  },
  components: {
    'vue-draggable-resizable': VueDraggableResizable,
  }
}
</script>

<style lang='scss' scoped>

* { // Перезисываем глобальный класс, для badge
  --v-primary-base: var(--important-modal__header--background);
}

.mChat-btn {
  font-size: 28px;
}

.v-badge__badge {
  color: var(--h1--color) !important;
}

.v-btn {
  background: transparent !important;
  &:hover {
    background: transparent !important;
  }
}

.launcher {
  /* width: 60px;
  height: 60px;
  background-position: center;
  background-repeat: no-repeat; */
  position: fixed;
  // right: 2%;
  // bottom: 2%;
  /* border-radius: 50%;
  box-shadow: none; */
  transition: box-shadow 0.2s ease-in-out;
  cursor: pointer;
  .new-msg-count {
    position: absolute;
    top: 6px;
    left: 55px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    border-radius: 50%;
    width: 22px;
    height: 22px;
    background: #ff4646;
    color: white;
    text-align: center;
    margin: auto;
    font-size: 12px;
    font-weight: 500;
    /* Чтобы красный кружок не перекрывался выделением кнопки */
    z-index: 1;
  }
  z-index: 1;
}

</style>
