<template>
	<v-app>
	<v-layout class="v-layout" justify-center>
		<v-flex md8 class="Page">
			<h1 v-if="$store.state.gameLang" class=" text-center">Achviemenent</h1>
			<h1 v-else class=" text-center">Достижения</h1>
			<div class="container"> 
				<AchievementCard class="Achievement" :dataImage="require('../../media/img/Achievement_imgs/asslick.jpg')">
						<div slot="header_h1">Lorem ipsum</div>
						<div slot="content_h2">More lorem ipsum bacon ipsum.</div>
						<div slot="content_p">Bacon ipsum dolor amet pork belly tri-tip turducken, pancetta bresaola pork chicken meatloaf. Flank sirloin strip steak prosciutto kevin turducken.</div>
				</AchievementCard>
				<AchievementCard class="Achievement" :dataImage="require('../../media/img/Achievement_imgs/asslick.jpg')">
						<div slot="header_h1">Lorem ipsum</div>
						<div slot="content_h2">More lorem ipsum bacon ipsum.</div>
						<div slot="content_p">Bacon ipsum dolor amet pork belly tri-tip turducken, pancetta bresaola pork chicken meatloaf. Flank sirloin strip steak prosciutto kevin turducken.</div>
				</AchievementCard>
				<AchievementCard class="Achievement" :dataImage="require('../../media/img/Achievement_imgs/asslick.jpg')">
						<div slot="header_h1">Lorem ipsum</div>
						<div slot="content_h2">More lorem ipsum bacon ipsum.</div>
						<div slot="content_p">Bacon ipsum dolor amet pork belly tri-tip turducken, pancetta bresaola pork chicken meatloaf. Flank sirloin strip steak prosciutto kevin turducken.</div>
				</AchievementCard>
			</div>
		</v-flex>
	</v-layout>
	</v-app>
</template>

<script>
import AchievementCard from './AchievementsCard'

export default {
	components: {
		AchievementCard
	}
}
</script>

<style scoped>

.Achievement {
    margin: 10px 10px 10px 10px;
}

.container {
  display: flex;
  flex-wrap: wrap;
}

@media (max-width: 450px) {
	.container {
		display: flex;
		justify-content: center
	}
}

</style>
