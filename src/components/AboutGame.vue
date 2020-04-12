<template>
  <!-- ENGLISH -->
  <section v-if="$store.state.gameLang">
    <!-- ОБ ИГРЕ -->
    <p></p>
    <div class="separator"><h1> About the game </h1></div>
    <p></p>
    <p> This game contains many fetishes, perversions, before starting the game, please read the list below: </p>
    <p><i> Click on the tag to open the description. </i></p>

    <v-chip class="genres" v-for="(genre, i) in genres" :key="'genre' + i" @click="ClickGenre(genresLink[i])"> {{ genres[i] }} </v-chip>
    
    <p></p>
    <p> If you are satisfied with the above fetishes, then welcome, otherwise, do not play this game, you have been warned. </p>
    <!-- ПОДДЕРЖКА -->
    <div class="separator"><h2> Support </h2></div>
    <p></p>
    <p> If you like the game and you want to support me, visit my <a :href="$store.state.patreon_link" class="subscribe-star">Subscribe Star</a></p>
    <p> Also, the game requires an adequate translation into English, and if you can help with this in any way, write to me. </p>
    <!-- СООБЩЕСТВО -->
    <div class="separator"><h2> Community </h2></div>
    <p></p>
    <p> If you have suggestions for improving the game, ideas or questions, you can visit our <a :href="$store.state.discord_link" class="discord">Discord</a> </p>
    <p> Also visit these resources: <a :href="$store.state.tfgames_link" class="tfgames">TFGames</a> and <a :href="$store.state.f95zone_link" class="f95">F95</a><a :href="$store.state.f95zone_link" class="f95-zone">Zone</a> there you can also find useful information in discussions. </p>
    
  </section>

  <section v-else>
    <!-- ВЫБОР ЯЗЫКА -->
    <!-- ОБ ИГРЕ -->
    <p></p>
    <div class="separator"><h1> Об игре </h1></div>
    <p></p>
    <p> Данная игра, содержит множество фетишей, извращений, перед началом игры, пожалуйста, ознакомтесь со списком ниже: </p>
    <p><i> Нажми на тег, чтобы открыть описание </i></p>

    <v-chip class="genres" v-for="(genre, i) in genres" :key="'genre' + i" @click="ClickGenre(genresLink[i])"> {{ genres[i] }} </v-chip>

    <p></p>
    <p> Если вас устраивает вышеперечисленные фетиши, тогда добро пожаловать, в противном случае, не играйте в эту игру, вы были предупреждены. </p>
    <!-- ПОДДЕРЖКА -->
    <div class="separator"><h2> Поддержка </h2></div>
    <p></p>
    <p> Если вам нравится игра, и вы хотите поддержать меня, посетите мой  <a :href="$store.state.patreon_link" class="subscribe-star">Subscribe Star</a></p>
    <p> Также игре требуется адекватный перевод на английский язык, и если вы можете как-либо помочь с этим, напишите мне. </p>
    <!-- СООБЩЕСТВО -->
    <div class="separator"><h2 class="test"> Сообщество </h2></div>
    <p></p>
    <p> Если у вас есть предложения по улучшению игры, идеи или вопросы, вы можете посетить наш <a :href="$store.state.discord_link" class="discord">Discord</a> </p>
    <p> Также посетите данные ресурсы: <a :href="$store.state.tfgames_link" class="tfgames">TFGames</a> and <a :href="$store.state.f95zone_link" class="f95">F95</a><a :href="$store.state.f95zone_link" class="f95-zone">Zone</a> там вы также можете найти полезную информацию в обсуждениях. </p>
  
  </section>
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
	}
}
</script>

<style lang="scss" scoped>

.separator {
  display: flex;
  align-items: center;
  text-align: center;

  &::before, &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #E0E0E0;
  }

  &::before {
    margin-right: .25em;
  }

  &::after {
    margin-left: .25em;
  }
}

.v-btn-toggle {
	background: transparent !important;
}

.continue-button {
	background: var(--startPageInfo--continue-button--background) !important;
}

.continue-button:hover {
	background: var(--startPageInfo--continue-button--background) !important;
}

.genres {
	font-size: 12pt;
	margin: 4px 2px 2px 2px;
	background: var(--v-chip--background) !important;
}

a { 
text-decoration: none;
	font-weight:bold;
}  

a:hover { 
text-decoration: none;
	font-weight:bold;
} 

.subscribe-star {
	color: var(--subscribe-star--color) !important;
}

.discord {
	color: var(--discord--color) !important;
}

.tfgames {
	color: var(--tfgames--color) !important;
}

.f95 {
	color: var(--f95--color) !important;
}

.f95-zone {
	color: var(--f95-zone--color) !important;
}

</style>