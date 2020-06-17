<i18n>
	{
		"en": {
			"about-game": "General information",
			"faq": "Frequently asked question"
		},
		"ru": {
			"about-game": "Общая информация",
			"faq": "Часто задаваемые вопросы"
		}
	}
</i18n>

<template>
	<v-app>
	<v-layout class="v-layout" justify-center>
	<v-flex md8 class="Page" style="padding: 2% 0px 2% 0px">
	
	<v-expansion-panels accordion dark>
		<!-- Об игре -->
		<v-expansion-panel>
			<v-expansion-panel-header>
				<!-- Заголовок: Об игре -->
				<div>{{ $t('about-game') }}</div>
			</v-expansion-panel-header>
			<!-- Содержимое: Об игре -->
			<v-expansion-panel-content>
				<v-flex text-center class="Page">
					<AboutGame />
				</v-flex>
			</v-expansion-panel-content>
		</v-expansion-panel>
		<!-- FAQ -->
		<v-expansion-panel>
				<v-expansion-panel-header>
					<div>{{ $t('faq') }}</div>
				</v-expansion-panel-header>
			<v-expansion-panel-content>
				<v-expansion-panels popout>
					<v-expansion-panel
						v-for="(FAQ, i) in FAQ"
						:key="i">
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
import AboutGame from './AboutGame'

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
		}
	},
	components: {
		AboutGame
	},
	methods: {
	}
}
</script>

<style lang='scss' scoped>

</style>