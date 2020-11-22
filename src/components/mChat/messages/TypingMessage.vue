<template>
<div class="bubble-container">
  <div class="message-title" v-if="isGroupChat">{{ author }}</div>
  <div class="text-message">
    <span></span>
    <span></span>
    <span></span>
  </div>
  <div class="tail"></div>
</div>  
</template>

<script>
export default {
  props: {
    author: [String],
    isGroupChat: {
      type: Boolean,
      required: true
    },
  }
}
</script>

<style lang='scss' scoped>

span {
  height: 0.850em;
  width: 0.850em;
  float: left; 
  margin: 8px 0px;

  background: var(--typing-message__span--background);
  border-radius: 50%;
  opacity: 0.4;
  @for $i from 1 through 3 {
    &:nth-of-type(#{$i}) {
      animation: 1s blink infinite ($i * .3333s);
    }
  }
}

@keyframes blink {
  50% {
    opacity: 1;
  }
}

// @keyframes bulge {
//   50% {
//     transform: scale(1.05);
//   }
// }
</style>
