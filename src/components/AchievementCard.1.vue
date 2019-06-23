<template>
    <div class="card-wrap" ref="card">
      <div class="card">
        <div class="card-bg" :style="[cardBgImage]"></div>
        <div class="card-info">
          <slot name="header"></slot>
          <slot name="content"></slot>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  mounted() {
    this.width = this.$refs.card.offsetWidth;
    this.height = this.$refs.card.offsetHeight;
  },
  props: ['dataImage'],
  data: () => ({
    width: 0,
    height: 0,
  }),
  computed: {
    cardBgImage() {
      return {
        backgroundImage: `url(${this.dataImage})`
      }
    }
  },
}
</script>

<style lang="scss" scoped>

$hoverEasing: cubic-bezier(0.23, 1, 0.32, 1);
$returnEasing: cubic-bezier(0.445, 0.05, 0.55, 0.95);


h1+p, p+p {
  margin-top: 10px;
}

.card-wrap {
  // margin: 10px;
  // transform: perspective(800px);
  // transform-style: preserve-3d;
  cursor: pointer;
  // background-color: #fff;
  &:hover {
    .card-info {
      transform: translateY(0);
      background-color: rgba(black, 0.5);
    }
    .card-info p {
      opacity: 1;
    }
    .card-info h1 {
      opacity: 1;
      transition: 0.1s $hoverEasing;
    }
    .card-info, .card-info p {
      transition: 0.6s $hoverEasing;
    }
    .card-info:after {
      transition: 5s $hoverEasing;
      opacity: 1;
      transform: translateY(0);
    }
    .card-bg {
      transition: 
        0.6s $hoverEasing,
        opacity 0.1s $hoverEasing; // Скорость затенения
      // opacity: 0.5;
    }
    .card {
      transition:
        0.6s $hoverEasing,
        box-shadow 2s $hoverEasing;
      // box-shadow:
      //   // rgba(white, 0.2) 0 0 40px 5px,
      //   // rgba(white, 1) 0 0 0 1px,
      //   // rgba(black, 0.66) 0 30px 60px 0,
      //   inset #333 0 0 0 5px,
      //   inset white 0 0 0 6px;
    }
  }
}

.card {
  position: relative;
  flex: 0 0 240px;
  width: 240px;
  height: 320px;
  background-color: #333;
  overflow: hidden;
  border-radius: 10px;
  // box-shadow:
  //   // rgba(black, 0.66) 0 30px 60px 0,
  //   inset #333 0 0 0 5px,
  //   inset rgba(white, 1) 0 0 0 6px;
  transition: 1s $returnEasing;
}

.card-bg {
  opacity: 1;
  position: absolute;
//   top: -20px; left: -20px;
  width: 100%;
  height: 100%;
  padding: 20px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  transition:
    1s $returnEasing,
    opacity 3s 1s $returnEasing;
  pointer-events: none;
}

.card-info {
  padding: 20px;
  position: absolute;
  bottom: 0;
  color: #fff;
  transform: translateY(60%);
  transition: 0.6s 1.6s cubic-bezier(0.215, 0.61, 0.355, 1);
  
  p {
    opacity: 0;
    text-shadow: rgba(black, 1) 0 2px 3px;
    transition: 0.6s 1.6s cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  
  * {
    position: relative;
    z-index: 1;
  }
  
  &:after {
    content: '';
    position: absolute;
    // top: 0; left: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to bottom, transparent 0%, rgba(#000, 0.6) 100%);
    background-blend-mode: overlay;
    opacity: 0;
    transform: translateY(100%);
    transition: 5s 1s $returnEasing;
  }
}

.card-info h1 {
  transition: 15s;
  opacity: 0;
  font-family: 'Helvetica Neue', sans-serif;
  line-height: 1.2;
  font-size: 36px;
  font-weight: 700;
	text-shadow: 
		-0   -1px 2px #000000,
		 0   -1px 2px #000000,
		-0    1px 2px #000000,
		 0    1px 2px #000000,
		-1px -0   2px #000000,
		 1px -0   2px #000000,
		-1px  0   2px #000000,
		 1px  0   2px #000000,
		-1px -1px 2px #000000,
		 1px -1px 2px #000000,
		-1px  1px 2px #000000,
		 1px  1px 2px #000000,
		-1px -1px 2px #000000,
		 1px -1px 2px #000000,
		-1px  1px 2px #000000,
		 1px  1px 2px #000000;
}

</style>


