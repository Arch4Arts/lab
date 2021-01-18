<i18n>
	{
		"en": {
			"langChange-title": "Game language",
			"langChange-btn-title-ru": "Russian",
			"langChange-btn-title-en": "English"
		},
		"ru": {
			"langChange-title": "Язык игры",
			"langChange-btn-title-ru": "Русский",
			"langChange-btn-title-en": "Английский"
		}
	}
</i18n>

<template>
<div>
  Требуется доработка
  <!-- Выбор языка -->
  <div class="text-center">
    <div>{{ $t('langChange-title') }}</div>
    <v-btn-toggle v-model="getCurrentLanguage" rounded>
      <v-btn class="toggle-btn" @click="changeLanguage('ru')">{{ $t('langChange-btn-title-ru') }}</v-btn>
      <v-btn class="toggle-btn" @click="changeLanguage('en')">{{ $t('langChange-btn-title-en') }}</v-btn>
    </v-btn-toggle>		
  </div>
  <v-select
    v-model="fontFamily"
    :items="fontListRu"
    menu-props="auto"
    label="Font Selector"
    hide-details
    prepend-icon="$vuetify.icons.values.faFont"
    single-line
  ></v-select>
  <br>
  <v-slider
    class="sound-settings-container__slider"
    prepend-icon="$vuetify.icons.values.faTextSize"
    v-model="fontSize"
    thumb-label
    min="10"
    max="24"
  ></v-slider>
</div>
</template>

<script>
export default {
  data() {
    return {
      fontList: ['Roboto', 'Roboto Slab', 'Open Sans', 'Lato', 'Merriweather', 'Minion Pro'],
      fontListRu: ['Roboto', 'Roboto Slab', 'Open Sans', 'Merriweather', 'Minion Pro'],
    }
  },
  methods: {
		changeLanguage(lang){
			this.$store.commit('langChange', lang)
			this.$root.$i18n.locale = lang
		},
  },
  computed: {
    // Для кнопки смены языка, чтобы было выделение на текущем выбранном языке
		getCurrentLanguage() { 
			return this.$store.state.gameLang === 'ru' ? 0 : 1;
		},
    // Шрифт
    fontFamily: {
      get: function () {
        return this.$store.state.gameFont;
      },
      set: function (selectedFontFamily) {
        this.$store.state.gameFont = selectedFontFamily;
        document.getElementById("StoryTextArea").style.fontFamily = selectedFontFamily;
        this.$store.commit("updateStore");
      }
    },
    // Размер шрифта
    fontSize: {
      get: function () {
        return this.$store.state.gameFontSize;
      },
      set: function (fontSize) {
        this.$store.state.gameFontSize = fontSize;
        document.getElementById("StoryTextArea").style.fontSize = `${fontSize}pt`;
        this.$store.commit("updateStore");
      } 
    }
  },
}
</script>

<style lang='scss' scoped>

.toggle-btn {
	width: 9rem;
}

.v-list-item-action--padding {
  margin-right: 24px;
}
.options__item__v-list__text--padding {
  margin-left: 24px;
}

.sound-options-container {
  position: relative;
  display: flex;
}

.sound-options-container__slider__name {
  position: absolute;
  top: 24px;
  margin-bottom: 0px;
  margin-left: 64px;

  font-size: 14px;
  color: var(--font-color--color) !important;
  opacity: .8;
}

.sound-options-container__slider {
  margin-left: 24px;
  margin-right: 8px;
}

.sound-options-container__btn {
  margin-right: 24px;
  background: transparent !important;
}

.global-sound-enable {
  padding: 0px !important;
}

</style>