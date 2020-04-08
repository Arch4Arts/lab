<template>
	<v-app>
	<v-layout class="v-layout" justify-center>
	<v-flex md8 class="Page" style="padding: 2% 0px 2% 0px">

	<v-expansion-panels accordion dark>
		<v-expansion-panel>
		<v-expansion-panel-header class="header-panels">
			<!-- Заголовок: Об игре -->
			<div v-if="$store.state.gameLang">General information</div>
			<div v-else>Общая информация</div>
		</v-expansion-panel-header>
	  <!-- Содержимое: Об игре -->
		<v-expansion-panel-content class="content-panels">
			<AboutGame />
		</v-expansion-panel-content>
		</v-expansion-panel>
		<!-- FAQ -->
		<v-expansion-panel v-if="$store.state.gameLang">
				<v-expansion-panel-header class="header-panels">
					<div> Frequently asked question </div>
				</v-expansion-panel-header>
			<v-expansion-panel-content class="content-panels">
				<v-expansion-panels popout>
				<v-expansion-panel
					v-for="(FAQ, i) in FAQ_en"
					:key="i">
					<v-expansion-panel-header class="content-panels">
						<div>{{ FAQ.header }}</div>
					</v-expansion-panel-header>
					<v-expansion-panel-content class="content-panels">
						{{ FAQ.content }}
					</v-expansion-panel-content>
				</v-expansion-panel>
				</v-expansion-panels>
			</v-expansion-panel-content>
		</v-expansion-panel>

		<v-expansion-panel v-else>
			<v-expansion-panel-header class="header-panels">
				<div> Часто задаваемые вопросы </div>
			</v-expansion-panel-header>
			<v-expansion-panel-content class="content-panels">
				<v-expansion-panels popout>
				<v-expansion-panel
					v-for="(FAQ, i) in FAQ_ru"
					:key="i">
					<v-expansion-panel-header class="header-panels">
						<div>{{ FAQ.header }}</div>
					</v-expansion-panel-header>
					<v-expansion-panel-content class="content-panels">
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
import StartPageInfo from '../Pages/StartPageInfo'
import AboutGame from '../components/AboutGame'

export default {
	data(){
		return {
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
		AboutGame
	},
	methods: {
	}
}
</script>

<style lang="scss" scoped>

.header-panels {
	background: var(--global--header-panels--background);
}

.content-panels {
	background: var(--global--content-panels--background);
}

</style>