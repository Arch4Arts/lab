<template>
<section v-viewer="options">
  <img class="image-message" :src="data.src"> 
  <p v-if="data.meta" class='message-meta' :style="{color: messageColors.color}">{{data.meta}}</p>
</section>
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
    messageColors: {
      type: Object,
      required: true
    },
  },
};
</script>