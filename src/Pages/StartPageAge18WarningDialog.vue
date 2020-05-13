<i18n>
	{
		"en": {
			"v-card-title": "You must be 18 or older to access this game",
			"v-card-text": {
        "1": "<br>This game contains <b>explicit scenes of a sexual nature</b>, with a great bias in <b>femdom</b>!",
        "2": "<br>By clicking on the «<b>Continue</b>» button, you confirm that you are at least 18 years old."
      },
			"v-btn-enter": "Continue",
			"v-btn-leave": "Cancel"
		},
		"ru": {
			"v-card-title": "Вы должны быть старше 18 лет для доступа к этой игре",
			"v-card-text": {
        "1": "<br>Данная игра содержит <b>откровенные сцены сексуального характера</b>, с большим уклоном в <b>женское доминирование</b>!",
        "2": "<br>Нажимая на кнопку «<b>Продолжить</b>», вы подтверждаете, что вам как минимум 18 лет."
      },
			"v-btn-enter": "Продолжить",
			"v-btn-leave": "Отменить"
		}
	}
</i18n>

<template>
<div class="text-center">
  <v-dialog v-model="$store.state.gameAgeWarningDialog" persistent dark width="420">
    <v-card class="text-center">
      <v-card-title class="headline dark important-modal__header">{{ $t('v-card-title') }}</v-card-title>
        <v-card-text class="text--primary">
          <div v-html="$t('v-card-text.1')"></div>
          <div v-html="$t('v-card-text.2')"></div>
        </v-card-text>

      <v-card-actions class="buttons-container">
        <v-btn class="important-modal__button" dark @click="$store.commit('gameAgeWarningDialog')">{{ $t('v-btn-enter') }}</v-btn>
        <v-btn class="leave-btn" text @click="Leave()">{{ $t('v-btn-leave') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</div>
</template>

<script>
export default {
  methods: {
    Leave(){
      location.href = "https://google.com"
    },
  }
}
</script>

<style scoped>

h1 {
  text-align: left;
  font-size: 1.5em
}

.buttons-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.leave-btn {
  margin-top: 1%
}

</style>