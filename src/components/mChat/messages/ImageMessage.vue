<template>
  <!-- <div v-viewer="options">
    <div class="message-title" v-if="isGroupChat">{{ author }}</div>
    <img class="image-message" :src="data.src"> 
    <p v-if="data.meta" class='message-meta image'>{{ data.meta }}</p>
  </div> -->
  <div>
    <div class="message-title" v-if="isGroupChat">{{ author }}</div>
    <img id="imags" class="image-message" :src="data.src"> 
    <p v-if="data.meta" class='message-meta image'>{{ data.meta }}</p>
  </div>
</template>

<script>
import Viewer from 'viewerjs';

export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    isGroupChat: {
      type: Boolean,
      required: true
    },
    author: [String],
  },
  mounted() {
    const viewer = new Viewer(this.$el, {
      title: false,  
      scalable: false, 
    });
  }
};
</script>