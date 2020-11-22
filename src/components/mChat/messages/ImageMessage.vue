<template>
  <div v-viewer="options">
    <div class="message-title" v-if="isGroupChat">{{ author }}</div>
    <img class="image-message" :src="data.src"> 
    <p v-if="data.meta" class='message-meta image'>{{ data.meta }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: { 
        title: false,  
        scalable: false, 
        // url: 'data-source' 
      }
    };
  },
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
};
</script>