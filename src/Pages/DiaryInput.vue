<template>
	<v-app>
	<v-tabs v-if="$store.state.gameLang" centered dark id="diary-input">
		<v-tab> <v-icon left>fas fa-user-crown</v-icon>Main Character </v-tab>
		<v-tab-item> <MC-page/> </v-tab-item>

		<v-tab> <v-icon left>fas fa-users</v-icon> Characters</v-tab>
		<v-tab-item> <Characters/> </v-tab-item>

		<v-tab> <v-icon left>fas fa-book-heart</v-icon> Diary</v-tab>
		<v-tab-item> <Diary/> </v-tab-item>

		<v-tab> <v-icon left>fas fa-trophy-alt</v-icon> Achievements</v-tab>
		<v-tab-item> <Achievements/> </v-tab-item>
	</v-tabs>
	
  <!-- <v-layout class="v-layout" justify-center>
      <v-flex md8 class="Page">
				<v-tabs centered dark id="diary-input">
					<v-tab> <v-icon left>fas fa-user-crown</v-icon> Главный герой</v-tab>
					<v-tab-item> <MC-page/> </v-tab-item>

					<v-tab> <v-icon left>fas fa-users</v-icon> Персонажи</v-tab>
					<v-tab-item> <Characters/> </v-tab-item>

					<v-tab> <v-icon left>fas fa-book-heart</v-icon> Дневник</v-tab>
					<v-tab-item>  <Diary/> </v-tab-item>

					<v-tab> <v-icon left>fas fa-trophy-alt</v-icon> Достижения</v-tab>
					<v-tab-item> <Achievements/> </v-tab-item>
				</v-tabs>
      </v-flex>
  </v-layout> -->

	<v-tabs v-else centered dark id="diary-input">
		<v-tab> <v-icon left>fas fa-user-crown</v-icon> Главный герой</v-tab>
		<v-tab-item> <MC-page/> </v-tab-item>

		<v-tab> <v-icon left>fas fa-users</v-icon> Персонажи</v-tab>
		<v-tab-item> <Characters/> </v-tab-item>

		<v-tab> <v-icon left>fas fa-book-heart</v-icon> Дневник</v-tab>
		<v-tab-item>  <Diary/> </v-tab-item>

		<v-tab> <v-icon left>fas fa-trophy-alt</v-icon> Достижения</v-tab>
		<v-tab-item> <Achievements/> </v-tab-item>
	</v-tabs>
	</v-app>
</template>

<script>
import MCPage from './DiaryPages/MC'
import Characters from './DiaryPages/Characters'
import Diary from './DiaryPages/Diary'
import Achievements from './DiaryPages/Achievements'

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

#diary-input .v-tabs-bar__content {
	background: #242933 !important;
}

#diary-input .v-tabs-slider {
	position: absolute !important;
  top: -46px !important;
}

</style>