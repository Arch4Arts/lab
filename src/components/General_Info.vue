<template>
<v-app>
    <v-layout justify-center class="BG-v-layout">
         <v-flex md8 text-center class="Page">
            <!-- ENGLISH -->
            <section v-if="$store.state.lang">

                <!-- ВЫБОР ЯЗЫКА -->
                <p> The game is available in Russian (the author’s native language) and English, before starting, select a language. </p>
                <v-btn color="grey darken-2" dark @click="$store.commit('langChange')"> English </v-btn>
                <!-- ОБ ИГРЕ -->
                <p></p>
                <a-divider class="divider"><h1> About the game </h1></a-divider>
                <p></p>
                <p> This game contains many fetishes, perversions, before starting the game, please read the list below: </p>
                <p><i> Click on the tag to open the description. </i></p>
                <v-chip class="genres" v-for="(genre, i) in genres" :key="'genre' + i" @click="ClickGenre(genresLink[i])" color="pink darken-3" text-color="white" > {{ genres[i] }} </v-chip>
                <p></p>
                <p> If you are satisfied with the above fetishes, then welcome, otherwise, do not play this game, you have been warned. </p>
                <!-- ПОДДЕРЖКА -->
                <a-divider class="divider"><h2> Support </h2></a-divider>
                <p></p>
                <p> If you like the game and you want to support me, visit my <a :href="$store.state.patreon_link" class="patreon">Patreon</a></p>
                <p> Also, the game requires an adequate translation into English, and if you can help with this in any way, write to me. </p>
                <!-- СООБЩЕСТВО -->
                <a-divider class="divider"><h2> Community </h2></a-divider>
                <p></p>
                <p> If you have suggestions for improving the game, ideas or questions, you can visit our <a :href="$store.state.discord_link" class="discord">Discord</a> </p>
                <p> Also visit these resources: <a :href="$store.state.tfgames_link" class="tfgames">TFGames</a> and <a :href="$store.state.f95zone_link" class="f95">F95</a><a :href="$store.state.f95zone_link" class="f95-zone">Zone</a> there you can also find useful information in discussions. </p>
                
                <v-btn rounded color="red lighten-1" dark @click=ClickStart()> Continue </v-btn>

            </section>

            <section v-else>
                <!-- ВЫБОР ЯЗЫКА -->
                <p> Игра доступна на русском (родной язык автора) и английском языке, перед началом, выберите язык. </p>
                <v-btn color="grey darken-2" dark @click="$store.commit('langChange')"> Русский </v-btn>
                <!-- ОБ ИГРЕ -->
                <p></p>
                <a-divider class="divider"><h1> Об игре </h1></a-divider>
                <p></p>
                <p> Данная игра, содержит множество фетишей, извращений, перед началом игры, пожалуйста, ознакомтесь со списком ниже: </p>
                <p><i> Нажми на тег, чтобы открыть описание </i></p>
                <v-chip class="genres" v-for="(genre, i) in genres" :key="'genre' + i" @click="ClickGenre(genresLink[i])" color="pink darken-3" text-color="white" > {{ genres[i] }} </v-chip>
                <p></p>
                <p> Если вас устраивает вышеперечисленные фетиши, тогда добро пожаловать, в противном случае, не играйте в эту игру, вы были предупреждены. </p>
                <!-- ПОДДЕРЖКА -->
                <a-divider class="divider"><h2> Поддержка </h2></a-divider>
                <p></p>
                <p> Если вам нравится игра, и вы хотите поддержать меня, посетите мой  <a :href="$store.state.patreon_link" class="patreon">Patreon</a></p>
                <p> Также игре требуется адекватный перевод на английский язык, и если вы можете как-либо помочь с этим, напишите мне. </p>
                <!-- СООБЩЕСТВО -->
                <a-divider class="divider"><h2> Сообщество </h2></a-divider>
                <p></p>
                <p> Если у вас есть предложения по улучшению игры, идеи или вопросы, вы можете посетить наш <a :href="$store.state.discord_link" class="discord">Discord</a> </p>
                <p> Также посетите данные ресурсы: <a :href="$store.state.tfgames_link" class="tfgames">TFGames</a> and <a :href="$store.state.f95zone_link" class="f95">F95</a><a :href="$store.state.f95zone_link" class="f95-zone">Zone</a> там вы также можете найти полезную информацию в обсуждениях. </p>
                
                <v-btn rounded color="red lighten-1" dark @click=ClickStart()> Продолжить </v-btn>
                 
             </section>
         </v-flex>
     </v-layout>
</v-app>
</template>

<script>
export default {
    data(){
        return {
            genres: [
                'Sissy',
                'Humiliation',
                'Femdom',
                'Pegging',
                'Chastity Cage',
                'Asswoship',
                'Asslick',
                'Dick shrinking',
                'SPH',
                'Homosexuality',
            ],
            genresLink: [
                'https://www.urbandictionary.com/define.php?term=sissy',
                'https://www.urbandictionary.com/define.php?term=humiliation',
                'https://www.urbandictionary.com/define.php?term=Femdom',
                'https://www.urbandictionary.com/define.php?term=pegging',
                'https://www.urbandictionary.com/define.php?term=chastity+cage',
                'https://www.urbandictionary.com/define.php?term=ass%20worship',
                'https://www.urbandictionary.com/define.php?term=asslick',
                'https://www.urbandictionary.com/define.php?term=shrink+dick',
                'https://www.urbandictionary.com/define.php?term=sph',
                'https://www.urbandictionary.com/define.php?term=homosexuality',
            ],
        }
    },
    methods: {
        ClickGenre(link){
            window.open(link);
        },
        ClickStart(){
            this.$store.commit('firstStart'); // Отключаем стартовую страницу
            this.$store.commit('Header'); // Включаем хедер
            this.$router.push('/'); // Переходим в корень
        }
    }
}
</script>

<style scoped>

.divider {
    color: #E0E0E0;
}

.genres {
    font-size: 12pt
}
a { 
	text-decoration: none;
    font-weight:bold;
}  
a:hover { 
	text-decoration: none;
    font-weight:bold;
} 
.patreon {
    color: #e44727;
}
.discord {
    color: #7289da;
}
.tfgames {
    color: #405dc6;
}
.f95 {
    color: white;
}
.f95-zone {
    color: #ba4545;
}
</style>