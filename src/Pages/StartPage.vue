<template>
<v-app>
	<v-layout justify-center class="v-layout">
		<v-flex md8 text-center class="Page">

			<StartPageAge18WarningDialog />

			<!-- ВЫБОР ЯЗЫКА -->
			<section v-if="$store.state.gameLang">
				<div><h1> Game language </h1></div>
				<v-btn-toggle class="v-btn-toggle" v-model="currentLanguage" rounded>
					<v-btn text @click="$store.commit('langChange')">Russian</v-btn>
					<v-btn text>English</v-btn>
				</v-btn-toggle>
			</section>
			<section v-else>
				<div><h1> Язык игры </h1></div>
				<v-btn-toggle class="v-btn-toggle" v-model="currentLanguage" rounded>
					<v-btn text width="130">Русский</v-btn>
					<v-btn text @click="$store.commit('langChange')">Английский</v-btn>
				</v-btn-toggle>					
			</section>
			<!-- Об игре -->
			<AboutGame />
			<!-- Кнопка: продолжить -->
			<v-btn v-if="$store.state.gameLang" rounded class="continue-button" dark @click=ClickStart()> Continue </v-btn>
			<v-btn v-else rounded class="continue-button" dark @click=ClickStart()> Продолжить </v-btn>

		</v-flex>
	</v-layout>
</v-app>
</template>

<script>
import AboutGame from './AboutGame'
import StartPageAge18WarningDialog from "./StartPageAge18WarningDialog";

export default {
	computed: {
		currentLanguage() { // Для кнопки смены языка, чтобы было выделение на текущем выбранном языке
			let result
			(this.$store.state.gameLang) ? result = 1 : result = 0
			return result;
		}
	},
	methods: {
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

<style lang="scss" scoped>

.v-btn-toggle {
	background: transparent !important;
}

.continue-button {
	background: var(--FirstLaunchPageInfo--continue-button--background) !important;
}

.continue-button:hover {
	background: var(--FirstLaunchPageInfo--continue-button--background) !important;
}

</style>