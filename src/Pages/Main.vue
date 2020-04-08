<template>
    <v-app>
    <v-layout class="v-layout" justify-center>
        <v-flex md8 class="Page">
            <section id="StoryTextArea">
                <h1>Home</h1>
                <Prolog/>
            </section>
        </v-flex>
        <mChat/> <!-- ЧАТ ДОЛЖЕН БЫТЬ ПОСЛЕДНИЙ ЧТОБЫ ОН ПЕРЕКРЫВАЛ ВСЁ ЭЛЕМЕНТЫ -->
    </v-layout>
    </v-app>
</template>

<script>
import mChat from '../components/Chat/mChat.vue'
import Prolog from './story/Prolog'

export default {
    components: {
        mChat,
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