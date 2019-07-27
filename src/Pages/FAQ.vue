<template>
    <v-app>
    <v-layout class="BG-v-layout" justify-center>
    <v-flex md8 class="Page" style="padding: 2% 0px 2% 0px">
    <v-expansion-panels accordion dark>
        <v-expansion-panel class="head_element">
        <v-expansion-panel-header>
          <div v-if="$store.state.lang">General information</div>
          <div v-else>Общая информация</div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
            <section v-if="$store.state.lang">
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

            </section>

            <section v-else>
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
                 
             </section>
        </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel class="head_element" v-if="$store.state.lang">
            <v-expansion-panel-header>
                <div> Frequently asked question </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                <v-expansion-panels popout>
                <v-expansion-panel
                    v-for="(FAQ, i) in FAQ_ru"
                    :key="i"
                >
                        <v-expansion-panel-header>
                            <div>{{ FAQ.header }}</div>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            {{ FAQ.content }}
                        </v-expansion-panel-content>
                </v-expansion-panel>
                </v-expansion-panels>
            </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel class="head_element" v-else>
            <v-expansion-panel-header>
                <div> Часто задаваемые вопросы </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                <v-expansion-panels popout>
                <v-expansion-panel
                    v-for="(FAQ, i) in FAQ_ru"
                    :key="i"
                >
                        <v-expansion-panel-header>
                            <div>{{ FAQ.header }}</div>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            {{ FAQ.content }}
                        </v-expansion-panel-content>
                </v-expansion-panel>
                </v-expansion-panels>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
    </v-flex>
    </v-layout>
    </v-app>
</template>

<script>
import GeneralInfo from '../components/General_Info'

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
            FAQ: [
                {
                header: 'Test question',
                content: 'test'
                },
                {
                header: 'Test question 2',
                content: 'test'
                },
            ],
            FAQ_ru: [
                {
                header: 'Test question',
                content: 'test'
                },
                {
                header: 'Test question 2',
                content: 'test'
                },
            ],
        }
    },
    components: {
        GeneralInfo
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