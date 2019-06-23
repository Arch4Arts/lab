<template>
  <div class="typing-indicator" :style="messageColors">
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>
<script>
export default {
  props: {
    messageColors: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>

.typing-indicator {
  border-radius: 20px;
  padding: 8px 15px;
  margin-top: 2px;
  margin-bottom: 2px;
  display: inline-block;
  text-align: center;
	background-color: #eee;
	position: relative;
	&:before { // Хвостик
		content: "";
		position: absolute;
		z-index: 0;
		bottom: 0;
		left: -7px;
		height: 20px;
		width: 20px;
		background: rgb(233, 233, 233);
		border-bottom-right-radius: 15px;
	}
	&:after { // Хвостик
		content: ""; 
		position: absolute;
		z-index: 1;
		bottom: 0;
		left: -10px;
		width: 10px;
		height: 20px;
		background: white;
		border-bottom-right-radius: 10px;
	}
}

.typing-indicator span {
  display: inline-block;
  background-color: #B6B5BA;
  width: 10px;
  height: 10px;
  border-radius: 100%;
  margin-right: 3px;
  animation: bob 2s infinite;
} 

/* SAFARI GLITCH */
.styping-indicator span:nth-child(1) {
  animation-delay: -1s;
}
.typing-indicator span:nth-child(2) {
  animation-delay: -0.85s;
}
.typing-indicator span:nth-child(3) {
  animation-delay: -0.7s;
}

@keyframes bob {
  10% {
    transform: translateY(-10px);
    background-color: #9E9DA2;
  }
  50% {
    transform: translateY(0);
    background-color: #B6B5BA;
  }
}
</style>
