<i18n>
	{
		"en": {
      "main-toggle-title": "Sound",
      "achievement-desc": "The volume of the alerts when you get achievements",
      "journal-desc": "The volume of journal notifications",
      "mobile-desc": "The volume of mobile alerts"
		},
		"ru": {
      "main-toggle-title": "Звук",
      "achievement-desc": "Громкость оповещения о получении достижений",
      "journal-desc": "Громкость оповещений журнала",
      "mobile-desc": "Громкость мобильных оповещений"
		}
	}
</i18n>

<template>
<div>
  <!-- Вкл / Выкл звука глобально -->
  <v-list subheader two-line flat>
    <v-list-item-group multiple>
      <v-list-item class="v-list-item--padding">
        <!-- Надпись -->
        <v-list-item-content @click="changeGlobalSoundEnable()" class="v-list-item__content">
          <v-list-item-title>{{ $t('main-toggle-title') }}</v-list-item-title>
        </v-list-item-content>
        <!-- Тумблер -->
        <v-list-item-action class="v-list-item__action">
          <v-switch
            v-model="$store.state.sound.isPlaySoundsEnable"
            @click.stop="changeGlobalSoundEnable()"
          ></v-switch>
        </v-list-item-action>
      </v-list-item>
    </v-list-item-group>
  </v-list>
  <!-- ДОСТИЖЕНИЯ -->
  <!-- Громкость + выбор звука + вкл / выкл -->
  <div class="sound-options-container">
    <p 
      :class="
      ($store.state.sound.isPlaySoundsEnable && $store.state.sound.isPlayAchievementSound)
      ? 
      'sound-options-container__slider__name'
      :
      'sound-options-container__slider__name disabled'"
    >
      {{ $t('achievement-desc') }}
    </p>
    <!-- Слайдер -->
    <v-slider
      class="sound-options-container__slider"
      prepend-icon="$vuetify.icons.values.faTrophyAlt"
      thumb-label
      min="0"
      max="100"
      step="1"
      @start="startPlaySoundLoop($store.state.sound.achievementSound, $store.state.sound.achievementVolume)"
      @end="stopPlaySoundLoop()"
      @input="volumeSoundChange($store.state.sound.achievementVolume)"
      :disabled="!$store.state.sound.isPlaySoundsEnable || !$store.state.sound.isPlayAchievementSound"
      v-model="volumeSlider_Achievement"
    ></v-slider>
    <!-- Выбор звука + кнопка вкл / выкл -->
    <v-menu 
      :disabled="!$store.state.sound.isPlayAchievementSound" 
      left 
      offset-x 
      open-on-hover
      :close-on-content-click="false"
      >
      <template v-slot:activator="{ on }">
        <!-- Кнопка -->
        <v-btn @click="setSoundState('soundSettings/isPlayAchievementSound')" class="sound-options-container__btn" icon v-on="on" :disabled="!$store.state.sound.isPlaySoundsEnable">
          <a-icon v-if="$store.state.sound.isPlayAchievementSound" :icon="['fas', 'music-alt']" />
          <a-icon v-else color="red" :icon="['fas', 'music-alt-slash']" />
        </v-btn>
      </template>
      <!-- Список звуков / показывает текущий выбранный звук / воспроизводит звук при нажатии -->
      <v-list class="v-menu--background">
        <v-list-item-group v-model="soundList_Achievement">
        <v-list-item
          v-for="(sound, i) in $store.state.sound.soundsList"
          :key="i"
          :value="sound"
          @click="playSelectedSound(sound, $store.state.sound.achievementVolume)"
        >
          <v-list-item-title>{{ sound }}</v-list-item-title>
        </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
  </div>
  <!-- ДНЕВНИК -->
  <!-- Громкость + выбор звука + вкл / выкл -->
  <div class="sound-options-container">
    <p 
      :class="
      ($store.state.sound.isPlaySoundsEnable && $store.state.sound.isPlayDiarySound)
      ? 
      'sound-options-container__slider__name'
      :
      'sound-options-container__slider__name disabled'"
    >
      {{ $t('journal-desc') }}
    </p>
    <!-- Слайдер -->
    <v-slider
      class="sound-options-container__slider"
      prepend-icon="$vuetify.icons.values.faBook"
      thumb-label
      min="0"
      max="100"
      step="1"
      @start="startPlaySoundLoop($store.state.sound.diarySound, $store.state.sound.diaryVolume)"
      @end="stopPlaySoundLoop()"
      @input="volumeSoundChange($store.state.sound.diaryVolume)"
      :disabled="!$store.state.sound.isPlaySoundsEnable || !$store.state.sound.isPlayDiarySound"
      v-model="volumeSlider_Diary"
    ></v-slider>
    <!-- Выбор звука + кнопка вкл / выкл -->
    <v-menu 
      :disabled="!$store.state.sound.isPlayDiarySound" 
      left 
      offset-x 
      open-on-hover
      :close-on-content-click="false"
      >
      <template v-slot:activator="{ on }">
        <!-- Кнопка -->
        <v-btn @click="setSoundState('soundSettings/isPlayDiarySound')" class="sound-options-container__btn" icon v-on="on" :disabled="!$store.state.sound.isPlaySoundsEnable">
          <a-icon v-if="$store.state.sound.isPlayDiarySound" :icon="['fas', 'music-alt']" />
          <a-icon v-else color="red" :icon="['fas', 'music-alt-slash']" />
        </v-btn>
      </template>
      <!-- Список звуков / показывает текущий выбранный звук / воспроизводит звук при нажатии -->
      <v-list class="v-menu--background">
        <v-list-item-group v-model="soundList_Diary">
        <v-list-item
          v-for="(sound, i) in $store.state.sound.soundsList"
          :key="i"
          :value="sound"
          @click="playSelectedSound(sound, $store.state.sound.diaryVolume)"
        >
          <v-list-item-title>{{ sound }}</v-list-item-title>
        </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
  </div>
  <!-- СМАРТФОН -->
  <!-- Громкость + выбор звука + вкл / выкл -->
  <div class="sound-options-container">
    <p 
      :class="
      ($store.state.sound.isPlaySoundsEnable && $store.state.sound.isPlaySmartphoneSound)
      ? 
      'sound-options-container__slider__name'
      :
      'sound-options-container__slider__name disabled'"
    >
      {{ $t('mobile-desc') }}
    </p>
    <!-- Слайдер -->
    <v-slider
      class="sound-options-container__slider"
      prepend-icon="$vuetify.icons.values.faMobileAlt"
      thumb-label
      min="0"
      max="100"
      step="1"
      @start="startPlaySoundLoop($store.state.sound.smartphoneSound, $store.state.sound.smartphoneVolume)"
      @end="stopPlaySoundLoop()"
      @input="volumeSoundChange($store.state.sound.smartphoneVolume)"
      :disabled="!$store.state.sound.isPlaySoundsEnable || !$store.state.sound.isPlaySmartphoneSound"
      v-model="volumeSlider_Smartphone"
    ></v-slider>
    <!-- Выбор звука + кнопка вкл / выкл -->
    <v-menu 
      :disabled="!$store.state.sound.isPlaySmartphoneSound" 
      left 
      offset-x 
      open-on-hover
      :close-on-content-click="false"
      >
      <template v-slot:activator="{ on }">
        <!-- Кнопка -->
        <v-btn @click="setSoundState('soundSettings/isPlaySmartphoneSound')" class="sound-options-container__btn" icon v-on="on" :disabled="!$store.state.sound.isPlaySoundsEnable">
          <a-icon v-if="$store.state.sound.isPlaySmartphoneSound" :icon="['fas', 'music-alt']" />
          <a-icon v-else color="red" :icon="['fas', 'music-alt-slash']" />
        </v-btn>
      </template>
      <!-- Список звуков / показывает текущий выбранный звук / воспроизводит звук при нажатии -->
      <v-list class="v-menu--background">
        <v-list-item-group v-model="soundList_Smartphone">
        <v-list-item
          v-for="(sound, i) in $store.state.sound.soundsList"
          :key="i"
          :value="sound"
          @click="playSelectedSound(sound, $store.state.sound.smartphoneVolume)"
        >
          <v-list-item-title>{{ sound }}</v-list-item-title>
        </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
  </div>
</div>
</template>

<script>
import { playSound, playSoundLoop } from '../../js/playSound'

export default {
  methods: {
    // Проиграть выбранный звук (для спика)
    playSelectedSound(soundName, volume){
      playSound(soundName, volume)
    },
    // Играть звук, пока мышь удерживает ползунок слайдера
    startPlaySoundLoop(soundName, volume){
      playSoundLoop(soundName, volume)
    },
    // Перестать играть звук, когда мышь отпускает ползунок слайдера
    stopPlaySoundLoop(){
      const soundLoop = document.getElementById('playbackSoundLoop')
      soundLoop.pause();
      document.body.removeChild(soundLoop); 
    },
    // Обновление уровня громкости в реальном времени при перетаскивании ползунка слайдера (во время проигрывании звука)      
    volumeSoundChange(volume) { 
      const soundLoop = document.getElementById('playbackSoundLoop')
      if (soundLoop != null) 
        soundLoop.volume = volume;
    },
    // Вкл / выкл всех звуков в игре по нажатию на v-list-item
    changeGlobalSoundEnable(){
      this.$store.commit('soundSettings/isPlaySoundsEnable')
    },
    // Вкл / Выкл звука по значку ноты
    setSoundState(commitName) {
      this.$store.commit(commitName)
    },
  },
  computed: {
    // Текущий выбранный звук, выбор нового звука
    soundList_Achievement: { 
      get: function () {
        return this.$store.state.sound.achievementSound
      },
      set: function (soundName) {
        this.$store.state.sound.achievementSound = soundName;
        this.$store.commit('updateStore');
      } 
    },
    soundList_Diary: { 
      get: function () {
        return this.$store.state.sound.diarySound
      },
      set: function (soundName) {
        this.$store.state.sound.diarySound = soundName;
        this.$store.commit('updateStore');
      } 
    },
    soundList_Smartphone: { 
      get: function () {
        return this.$store.state.sound.smartphoneSound
      },
      set: function (soundName) {
        this.$store.state.sound.smartphoneSound = soundName;
        this.$store.commit('updateStore');
      } 
    },
    // Изменение громкости на слайдере
    volumeSlider_Achievement: {
      get: function () {
        return (this.$store.state.sound.achievementVolume * 100)
      },
      set: function (level) {
        this.$store.state.sound.achievementVolume = (level /= 100)
        this.$store.commit("updateStore");
      } 
    },
    volumeSlider_Diary: {
      get: function () {
        return (this.$store.state.sound.diaryVolume * 100)
      },
      set: function (level) {
        this.$store.state.sound.diaryVolume = (level /= 100)
        this.$store.commit("updateStore");
      } 
    },
    volumeSlider_Smartphone: {
      get: function () {
        return (this.$store.state.sound.smartphoneVolume * 100)
      },
      set: function (level) {
        this.$store.state.sound.smartphoneVolume = (level /= 100)
        this.$store.commit("updateStore");
      } 
    },
  },
}
</script>

<style lang='scss' scoped>

.v-menu--background {
  background: var(--settings-v-list-item--background) !important;
}

.v-list-item--padding { // ! Название не менять!
  padding: 0px !important;
}

.v-list-item__content {
  margin-left: 16px;
}

.v-list-item__action {
  margin-right: 16px;
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
  &.disabled {
    opacity: .4;
  }
}

.sound-options-container__slider {
  margin-left: 16px;
  margin-right: 8px;
}

.sound-options-container__btn {
  margin-right: 12px;
  background: transparent !important;
}

</style>