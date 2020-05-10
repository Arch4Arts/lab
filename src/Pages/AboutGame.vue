<i18n>
	{
		"en": {
			"section-aboutGame": {
        "title": "About the game",
        "1": "This game contains many fetishes, perversions, before starting the game, please read the list below:",
        "2": "Click on the tag to open the description.",
        "3": "If you are satisfied with the above fetishes, then welcome, otherwise, do not play this game, you have been warned."
      },
      "section-support": {
        "title": "Support",
        "1": "If you like the game and you want to support me, visit my <a :href='$store.state.patreon_link' class='subscribe-star'>Subscribe Star</a>",
        "2": "Also, the game requires an adequate translation into English, and if you can help with this in any way, write to me."
      },
      "section-community": {
        "title": "Community",
        "1": "If you have suggestions for improving the game, ideas or questions, you can visit our <a :href='$store.state.discord_link' class='discord'>Discord</a>",
        "2": "Also visit these resources: <a :href='$store.state.tfgames_link' class='tfgames'>TFGames</a> and <a :href='$store.state.f95zone_link' class='f95'>F95</a><a :href='$store.state.f95zone_link' class='f95-zone'>Zone</a> there you can also find useful information in discussions."
      }
		},
		"ru": {
			"section-aboutGame": {
        "title": "Об игре",
        "1": "Данная игра, содержит множество фетишей, извращений, перед началом игры, пожалуйста, ознакомтесь со списком ниже:",
        "2": "Нажми на тег, чтобы открыть описание",
        "3": "Если вас устраивает вышеперечисленные фетиши, тогда добро пожаловать, в противном случае, не играйте в эту игру, вы были предупреждены."
      },
      "section-support": {
        "title": "Поддержка",
        "1": "Если вам нравится игра, и вы хотите поддержать меня, посетите мой  <a :href='$store.state.patreon_link' class='subscribe-star'>Subscribe Star</a>",
        "2": "Также игре требуется адекватный перевод на английский язык, и если вы можете как-либо помочь с этим, напишите мне."
      },
      "section-community": {
        "title": "Сообщество",
        "1": "Если у вас есть предложения по улучшению игры, идеи или вопросы, вы можете посетить наш <a :href='$store.state.discord_link' class='discord'>Discord</a>",
        "2": "Также посетите данные ресурсы: <a :href='$store.state.tfgames_link' class='tfgames'>TFGames</a> and <a :href='$store.state.f95zone_link' class='f95'>F95</a><a :href='$store.state.f95zone_link' class='f95-zone'>Zone</a> там вы также можете найти полезную информацию в обсуждениях."
      }
		}
	}
</i18n>

<template>
<div>
  <!-- ВЫБОР ЯЗЫКА -->
  <!-- ОБ ИГРЕ -->
  <p></p>
  <div class="separator"><h1>{{ $t('section-aboutGame.title') }}</h1></div>
  <p></p>
  <p>{{ $t('section-aboutGame.1') }}</p>
  <p><i>{{ $t('section-aboutGame.2') }}</i></p>
  <v-chip class="genres" v-for="(genre, i) in genres" :key="'genre' + i" @click="openGenreDescriptionLink(genresLink[i])"> {{ genres[i] }} </v-chip>
  <p></p>
  <p>{{ $t('section-aboutGame.3') }}</p>
  <!-- ПОДДЕРЖКА -->
  <div class="separator"><h2>{{ $t('section-support.title') }}</h2></div>
  <p />
  <p v-html="$t('section-support.1')" />
  <p v-html="$t('section-support.2')" />
  <!-- СООБЩЕСТВО -->
  <div class="separator"><h2>{{ $t('section-community.title') }}</h2></div>
  <p></p>
  <p v-html="$t('section-community.1')" />
  <p v-html="$t('section-community.2')" />
</div>

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
		openGenreDescriptionLink(link){
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
	background: var(--FirstLaunchPageInfo--continue-button--background) !important;
}

.continue-button:hover {
	background: var(--FirstLaunchPageInfo--continue-button--background) !important;
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

p ::v-deep .subscribe-star {
	color: var(--subscribe-star--color) !important;
}

p ::v-deep .discord {
	color: var(--discord--color) !important;
}

p ::v-deep .tfgames {
	color: var(--tfgames--color) !important;
}

p ::v-deep .f95 {
	color: var(--f95--color) !important;
}

p ::v-deep .f95-zone {
	color: var(--f95-zone--color) !important;
}

</style>