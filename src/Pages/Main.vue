<template>
    <v-app>
    <v-layout class="BG-v-layout" justify-center>
        <v-flex md8 class="Page">
            <h1>Home</h1>
            <prolog/>
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
}
</script>

<style>

</style>