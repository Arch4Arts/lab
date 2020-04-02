<template>
    <v-app>
    <v-layout class="v-layout" justify-center>
        <v-flex md8 class="Page">
            <section id="StoryTextArea">
                <h1>Home</h1>
                <prolog/>
            </section>
        </v-flex>
        <Chat/> <!-- ЧАТ ДОЛЖЕН БЫТЬ ПОСЛЕДНИЙ ЧТОБЫ ОН ПЕРЕКРЫВАЛ ВСЁ ЭЛЕМЕНТЫ -->
    </v-layout>
    </v-app>
</template>

<script>
import Chat from '../components/Chat/Chat.vue'
import prolog from './story/prolog'

export default {
    components: {
        Chat,
        prolog,
    },
    data(){
        return {
        }
    },
    methods: {

    },
    mounted: function(){ 
        document.getElementById("StoryTextArea").style.fontFamily = this.$store.state.font;
        document.getElementById("StoryTextArea").style.fontSize = `${this.$store.state.fontSize}`;
    }
}
</script>

<style>

</style>