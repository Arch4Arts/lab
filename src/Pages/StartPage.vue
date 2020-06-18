<i18n>
	{
		"en": {
			"langChange-title": "Game language",
			"langChange-btn-title-ru": "Russian",
			"langChange-btn-title-en": "English",
			"continue-btn": "Continue"
		},
		"ru": {
			"langChange-title": "Язык игры",
			"langChange-btn-title-ru": "Русский",
			"langChange-btn-title-en": "Английский",
			"continue-btn": "Продолжить"
		}
	}
</i18n>

<template>
<v-app>
	<v-layout justify-center class="v-layout">
		<v-flex md8 text-center class="Page">

			<!-- <StartPageAge18WarningDialog /> -->

			<!-- ВЫБОР ЯЗЫКА -->
			<div><h1>{{ $t('langChange-title') }}</h1></div>
			<v-btn-toggle v-model="getCurrentLanguage" rounded>
				<v-btn class="toggle-btn" @click="changeLanguage('ru')">{{ $t('langChange-btn-title-ru') }}</v-btn>
				<v-btn class="toggle-btn" @click="changeLanguage('en')">{{ $t('langChange-btn-title-en') }}</v-btn>
			</v-btn-toggle>			
			<!-- Об игре -->
			<AboutGame />
			<!-- Кнопка: продолжить -->
			<v-btn rounded class="continue-button" dark @click=ClickStart()>{{ $t('continue-btn') }}</v-btn>
			
		</v-flex>
	</v-layout>
</v-app>
</template>

<script>
import AboutGame from './AboutGame'
import StartPageAge18WarningDialog from "./StartPageAge18WarningDialog";

export default {
	computed: {
		getCurrentLanguage() { // Для кнопки смены языка, чтобы было выделение на текущем выбранном языке
			return this.$store.state.gameLang == 'ru' ? 0 : 1;
		}
	},
	methods: {
		changeLanguage(lang){
			this.$store.commit('langChange', lang)
			this.$root.$i18n.locale = lang
		},
		ClickStart(){
			this.$store.commit('gameDisplayingStartPage');
		}
	},
	components: {
		AboutGame,
		StartPageAge18WarningDialog
	}
}
</script>

<style lang='scss' scoped>

.toggle-btn {
	width: 9rem;
}

.continue-button {
	background: var(--FirstLaunchPageInfo--continue-button--background) !important;
}

.continue-button:hover {
	background: var(--FirstLaunchPageInfo--continue-button--background) !important;
}

</style>