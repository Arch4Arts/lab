<template>
<div class="tile"> 
  <!-- <img :src="dataImage"/> -->
  <div class="tile img" :style="[cardBgImage]"></div>
  <div class="text">
    <h1><slot name="header_h1"></slot></h1>
    <h2 class="animate-text"><slot name="content_h2"></slot></h2>
    <p class="animate-text"><slot name="content_p"></slot></p>
    <!-- <div class="dots">
      <span></span>
      <span></span>
      <span></span>
    </div> -->
  </div>
</div>
    <!-- <div class="card-wrap" ref="card">
      <div class="card">
        <div class="card-bg" :style="[cardBgImage]"></div>
        <div class="card-info">
          <slot name="header"></slot>
          <slot name="content"></slot>
        </div>
      </div>
    </div> -->
</template>

<script>
export default {
  props: ['dataImage'],
  data: function () {
    return {
      width: 0,
      height: 0,      
    }
  },
  computed: {
    cardBgImage() {
      return {
        backgroundImage: `url(${this.dataImage})`
      }
    }
  },
}
</script>

<style lang='scss' scoped>

.tile
{
  width:300px;
  height:380px;
  /* margin:10px; */
  background-color:#222222;
  display:inline-block;
  position:relative;
  cursor:pointer;
  transition: all 0.4s ease-out;
  /* box-shadow: 0px 35px 77px -17px rgba(0,0,0,0.44); */
  overflow:hidden;
  color:white;
  font-family:'Roboto';
  border-radius: 5%;
}
.tile .img
{
  background-position: center;
  background-size:cover;
  height:100%;
  width:100%;
  position:absolute;
  top:0;
  left:0;
  z-index:0;
  transition: all 0.4s ease-out;
}
.tile .text
{
/*   z-index:99; */
  position:absolute;
  padding:30px;
  height:calc(100% - 60px);
}
.tile h1
{
  font-weight:700;
  margin:0;
  /* text-shadow: 2px 2px 10px rgba(0,0,0,0.3); */
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

.tile h2
{
  font-weight:100;
  margin:20px 0 0 0;
  font-style:italic;
   transform: translateX(200px);
}
.tile p
{
  font-weight:300;
  margin:20px 0 0 0;
  line-height: 25px;
/*   opacity:0; */
  transform: translateX(-200px);
  transition-delay: 0.2s;
}
.animate-text
{
  opacity:0;
  transition: all 0.6s ease-in-out;
}
.tile:hover
{
/*   background-color:#99aeff; */
  /* box-shadow: 0px 35px 77px -17px rgba(0,0,0,0.64); */
  transform:scale(1.05);
}

.tile:hover h1 {
  text-shadow: 2px 2px 10px rgba(0,0,0,0.3);
}

.tile:hover .img
{
  opacity: 0.4;
}
.tile:hover .animate-text
{
  transform:translateX(0);
  opacity:1;
}

</style>