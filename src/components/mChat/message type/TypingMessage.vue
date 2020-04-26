<template>
<div class="text-msg-container">
  <div class="typing-indicator">
    <span></span>
    <span></span>
    <span></span>
  </div>
</div>  
</template>

<script>
export default {
  props: {
    
  }
}
</script>

<style lang="scss" scoped>
	
.typing-indicator {
  background: var(--from_them_msg_bg);
  will-change: transform;
  width: auto;
  border-radius: 50px;
  padding: 14px;
  display: table;
  margin: 0 auto;
  position: relative;
  animation: 2s bulge infinite ease-out;
  &::before,
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: -2px;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: var(--from_them_msg_bg);
  }
  &::after {
    height: 10px;
    width: 10px;
    left: -10px;
    bottom: -10px;
  }
  span {
    height: 15px;
    width: 15px;
    float: left;
    margin: 0 1px;
    background: var(--typing-indicator__span--background);
    display: block;
    border-radius: 50%;
    opacity: 0.4;
    @for $i from 1 through 3 {
      &:nth-of-type(#{$i}) {
        animation: 1s blink infinite ($i * .3333s);
      }
    }
  }
}

@keyframes blink {
  50% {
    opacity: 1;
  }
}

@keyframes bulge {
  50% {
    transform: scale(1.05);
  }
}
</style>
