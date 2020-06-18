<template>
  <v-app>
  <v-layout class="v-layout" justify-center>
    <v-flex md8 class="Page">
      <section id="StoryTextArea">
        <h1>Entry</h1>
        <test-page />
      </section>
    </v-flex>
  </v-layout>
  </v-app>
</template>

<script>
import testPage from './story/testPage'

export default {
	mounted: function(){ 
		document.getElementById("StoryTextArea").style.fontFamily = this.$store.state.gameFont;
		document.getElementById("StoryTextArea").style.fontSize = `${this.$store.state.gameFontSize}`;
	},
	components: {
		'test-page': testPage
	},
}
</script>

<style lang='scss'>

</style>