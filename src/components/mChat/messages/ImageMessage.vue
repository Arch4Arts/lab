<template>
  <div v-viewer="options">
    <div class="message-title" v-if="$store.state.mChat.selectedChatIsGroup">{{ author }}</div>
    <img class="image-message" :src="data.src"> 
    <p v-if="data.meta" class='message-meta image'>{{data.meta}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: { 
        inline: false, 
        button: true, 
        navbar: true, 
        title: false, 
        toolbar: true, 
        tooltip: true, 
        movable: true, 
        zoomable: true, 
        rotatable: true, 
        scalable: false, 
        transition: true, 
        fullscreen: true, 
        keyboard: true, 
        url: 'data-source' 
      }
    };
  },
  props: {
    data: {
      type: Object,
      required: true
    },
    author: [String],
  },
};
</script>