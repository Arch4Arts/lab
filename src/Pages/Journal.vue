<i18n>
	{
		"en": {
			"mc": "Main Character",
			"chars": "Characters",
			"diary": "Diary",
			"achievements": "Achievements"
		},
		"ru": {
			"mc": "Главный герой",
			"characters": "Персонажи",
			"diary": "Дневник",
			"achievements": "Достижения"
		}
	}
</i18n>

<template>
	<v-app>
	<v-tabs centered dark id="journal">
		<v-tab><a-icon class="mr-2" :icon="['fas', 'user-crown']" />{{ $t('mc') }}</v-tab>
		<v-tab-item> <MC-page/> </v-tab-item>

		<v-tab><a-icon class="mr-2" :icon="['fas', 'users']" />{{ $t('characters') }}</v-tab>
		<v-tab-item> <Characters/> </v-tab-item>

		<v-tab><a-icon class="mr-2" :icon="['fas', 'book-heart']" />{{ $t('diary') }}</v-tab>
		<v-tab-item> <Diary/> </v-tab-item>

		<v-tab><a-icon class="mr-2" :icon="['fas', 'trophy-alt']" />{{ $t('achievements') }}</v-tab>
		<v-tab-item> <Achievements/> </v-tab-item>
	</v-tabs>
	</v-app>
</template>

<script>
import MCPage from './journalPages/MC'
import Characters from './journalPages/Characters'
import Diary from './journalPages/Diary'
import Achievements from './journalPages/Achievements'

export default {
	components: {
		MCPage,
		Characters,
		Diary,
		Achievements
	}
}
</script>

<style>

#journal .v-tabs-bar__content {
	background: #242933 !important;
}

#journal .v-tabs-slider {
	position: absolute !important;
  top: -46px !important;
}

</style>