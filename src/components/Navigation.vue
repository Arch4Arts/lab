<template>
	<div>  
		<!-- Плавающая кпнока для мобильной навигации -->
		<Navigation-Floating-Button v-if="!$store.state.mChat.show" class="hidden-md-and-up"/> 
		<!-- КНОПКИ В МЕНЮ -->
		<v-app-bar v-if="!(this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs)" app dense dark class="v-app-bar" elevation="14">
			<!-- Название игры + версия -->
			<router-link to="/" tag="span" style="cursor:pointer">
				<v-toolbar-title style="opacity: 0.75">
						{{ this.$root.gameName + ' ' + this.$root.gameVersion }} 
				</v-toolbar-title>
			</router-link>
			<v-spacer />
			<!-- Кнопки -->
			<v-toolbar-items class="hidden-sm-and-down">
				<!-- FAQ -->
				<v-btn shift text @click="() => routeChange('FAQ')">
						<font-awesome-icon class="mr-2" :icon="['fas', 'question-circle']" />
						<div v-if="$store.state.gameLang">FAQ</div>
						<div v-else>FAQ</div>
				</v-btn>
				<!-- Настройки -->
				<v-btn shift text @click="() => this.$store.state.isOpenSettingsDrawer = true">
						<font-awesome-icon class="mr-2" :icon="['fas', 'cog']" />
						<div v-if="$store.state.gameLang">Settings</div>
						<div v-else>Настройки</div>
				</v-btn>
				<!-- Журнал -->
				<v-btn shift text @click="() => routeChange('Journal')">
						<font-awesome-icon class="mr-2" :icon="['fas', 'book']" />
						<div v-if="$store.state.gameLang">Journal</div>
						<div v-else>Журнал</div>
				</v-btn>
				<!-- Сохранения -->
				<v-btn shift text @click="() => this.$store.state.isOpenSavesDrawer = true">
						<font-awesome-icon class="mr-2" :icon="['fas', 'save']" />
						<div v-if="$store.state.gameLang">Saves</div>
						<div v-else>Сохранения</div>
				</v-btn>
			</v-toolbar-items>
		</v-app-bar>
	</div>    
</template>

<script>
import NavigationFloatingButton from './NavigationFloatingButton'

export default {
	methods: {
		routeChange(route){
			this.$router.push(`/${route}`)
		}
	},
	components: {
		NavigationFloatingButton
	}
}
</script>

<style lang="scss" scoped>

.v-app-bar {
	background: var(--v-app-bar--background) !important;
}

</style>>
