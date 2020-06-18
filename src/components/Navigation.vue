<i18n>
	{
		"en": {
			"FAQ": "FAQ",
			"settings": "Settings",
			"journal": "Journal",
			"saves": "Saves"
		},
		"ru": {
			"FAQ": "FAQ",
			"settings": "Настройки",
			"journal": "Журнал",
			"saves": "Сохранения"
		}
	}
</i18n>

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
						<a-icon class="mr-2" :icon="['fas', 'question-circle']" />
						<div>{{ $t('FAQ') }}</div>
				</v-btn>
				<!-- Настройки -->
				<v-btn shift text @click="() => this.$store.state.isOpenSettingsDrawer = true">
						<a-icon class="mr-2" :icon="['fas', 'cog']" />
						<div>{{ $t('settings') }}</div>
				</v-btn>
				<!-- Журнал -->
				<v-btn shift text @click="() => routeChange('Journal')">
						<a-icon class="mr-2" :icon="['fas', 'book']" />
						<div>{{ $t('journal') }}</div>
				</v-btn>
				<!-- Сохранения -->
				<v-btn shift text @click="() => this.$store.state.isOpenSavesDrawer = true">
						<a-icon class="mr-2" :icon="['fas', 'save']" />
						<div>{{ $t('saves') }}</div>
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

<style lang='scss' scoped>

.v-app-bar {
	background: var(--v-app-bar--background) !important;
}

</style>
