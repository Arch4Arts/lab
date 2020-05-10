<template>
    <v-app>
    <v-layout class="v-layout" justify-center>
        <v-flex md8 class="Page">
            <section id="StoryTextArea">
                <h1>Entry</h1>
                <Prolog/>
            </section>
        </v-flex>
    </v-layout>
    </v-app>
</template>

<script>
import Prolog from './story/Prolog'

export default {
    components: {
        Prolog,
    },
    data(){
        return {
        }
    },
    methods: {

    },
    mounted: function(){ 
        document.getElementById("StoryTextArea").style.fontFamily = this.$store.state.gameFont;
        document.getElementById("StoryTextArea").style.fontSize = `${this.$store.state.gameFontSize}`;
    }
}
</script>

<style>

</style>