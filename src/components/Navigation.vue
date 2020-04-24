<template>
	<div>  
		<!-- Плавающая кпнока для мобильной навигации -->
		<Radial-Menu v-if="!$store.state.mChat.mChat_Show" class="hidden-md-and-up"/> 
		<!-- КНОПКИ В МЕНЮ -->
		<v-app-bar v-if="!(this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs)" app dense dark class="v-app-bar" elevation="14">
			<!-- Название игры + версия -->
			<router-link to="/" tag="span" style="cursor:pointer">
				<v-toolbar-title style="opacity: 0.75">
						{{ $store.state.gameName + ' ' + $store.state.gameVersion }} 
				</v-toolbar-title>
			</router-link>
			<v-spacer></v-spacer>
			<!-- Кнопки -->
			<v-toolbar-items v-if="$store.state.gameLang" class="hidden-sm-and-down">
				<v-btn v-for="(item, i) in menuItems" :key="'btn_' + i"  :to="item.route" @click="openSettings(item.icon)" text>
						<v-icon left v-html="item.icon"></v-icon>
						{{ item.title }}
				</v-btn>
			</v-toolbar-items>
			<v-toolbar-items v-else class="hidden-sm-and-down">
				<v-btn shift v-for="(item, i) in menuItems" :key="'btn_' + i" color="" :to="item.route" @click="openSettings(item.icon)" text>
						<v-icon left v-html="item.icon"></v-icon>
						{{ item.title_ru }}
				</v-btn>
			</v-toolbar-items>
		</v-app-bar>
	</div>    
</template>

<script>
import RadialMenu from './NavigationRadialMenu'

export default {
	computed: {
		menuItems(){
			return [
				{
					icon: 'fas fa-question-circle',
					title: 'FAQ',
					title_ru: 'FAQ',
					route: 'FAQ'
				},
				{
					icon: 'fas fa-cog',
					title: 'Settings',
					title_ru: 'Настройки',
					route: ''
				},
				{
					icon: 'fas fa-book',
					title: 'Diary',
					title_ru: 'Дневник',
					route: 'Diary'
				},
				{
					icon: 'fas fa-save',
					title: 'Saves',
					title_ru: 'Сохранения',
					route: ''
				},]
		}
	},
	methods: {
		openSettings(icon){
			if (icon === 'fas fa-cog') this.$store.state.isOpenSettingsDrawer = true
			if (icon === 'fas fa-save') this.$store.state.isOpenSavesDrawer = true
		}
	},
	components: {
		RadialMenu
	}
}
</script>

<style lang="scss" scoped>

.v-app-bar {
	background: var(--v-app-bar--background) !important;
}

</style>>
