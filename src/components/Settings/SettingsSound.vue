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
            v-model="$store.state.sound.gameGlobalSoundsEnable"
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
      ($store.state.sound.gameGlobalSoundsEnable && $store.state.sound.achievementSoundEnable)
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
      @start="volumeChangePlayLoop($store.state.sound.achievementSound, $store.state.sound.achievementVolume)"
      @end="volumeChangeStop()"
      @input="realtimeVolumeChange($store.state.sound.achievementVolume)"
      :disabled="!$store.state.sound.gameGlobalSoundsEnable || !$store.state.sound.achievementSoundEnable"
      v-model="achievementVolumeSlider"
    ></v-slider>
    <!-- Выбор звука + кнопка вкл / выкл -->
    <v-menu 
      :disabled="!$store.state.sound.achievementSoundEnable" 
      left 
      offset-x 
      open-on-hover
      :close-on-content-click="false"
      >
      <template v-slot:activator="{ on }">
        <!-- Кнопка -->
        <v-btn @click="changeSoundEnable('achievementSoundEnable')" class="sound-options-container__btn" icon v-on="on" :disabled="!$store.state.sound.gameGlobalSoundsEnable">
          <a-icon v-if="$store.state.sound.achievementSoundEnable" :icon="['fas', 'music-alt']" />
          <a-icon v-else color="red" :icon="['fas', 'music-alt-slash']" />
        </v-btn>
      </template>
      <!-- Список звуков / показывает текущий выбранный звук / воспроизводит звук при нажатии -->
      <v-list class="v-menu--background">
        <v-list-item-group v-model="achievementSelectedSound">
        <v-list-item
          v-for="(sound, i) in $store.state.sound.soundsList"
          :key="i"
          :value="sound.soundName"
          @click="playbacSelectedSound(sound.soundName, $store.state.sound.achievementVolume)"
        >
          <v-list-item-title>{{ sound.soundName }}</v-list-item-title>
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
      ($store.state.sound.gameGlobalSoundsEnable && $store.state.sound.diarySoundEnable)
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
      @start="volumeChangePlayLoop($store.state.sound.diarySound, $store.state.sound.diaryVolume)"
      @end="volumeChangeStop()"
      @input="realtimeVolumeChange($store.state.sound.diaryVolume)"
      :disabled="!$store.state.sound.gameGlobalSoundsEnable || !$store.state.sound.diarySoundEnable"
      v-model="diaryVolumeSlider"
    ></v-slider>
    <!-- Выбор звука + кнопка вкл / выкл -->
    <v-menu 
      :disabled="!$store.state.sound.diarySoundEnable" 
      left 
      offset-x 
      open-on-hover
      :close-on-content-click="false"
      >
      <template v-slot:activator="{ on }">
        <!-- Кнопка -->
        <v-btn @click="changeSoundEnable('diarySoundEnable')" class="sound-options-container__btn" icon v-on="on" :disabled="!$store.state.sound.gameGlobalSoundsEnable">
          <a-icon v-if="$store.state.sound.diarySoundEnable" :icon="['fas', 'music-alt']" />
          <a-icon v-else color="red" :icon="['fas', 'music-alt-slash']" />
        </v-btn>
      </template>
      <!-- Список звуков / показывает текущий выбранный звук / воспроизводит звук при нажатии -->
      <v-list class="v-menu--background">
        <v-list-item-group v-model="diarySelectedSound">
        <v-list-item
          v-for="(sound, i) in $store.state.sound.soundsList"
          :key="i"
          :value="sound.soundName"
          @click="playbacSelectedSound(sound.soundName, $store.state.sound.diaryVolume)"
        >
          <v-list-item-title>{{ sound.soundName }}</v-list-item-title>
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
      ($store.state.sound.gameGlobalSoundsEnable && $store.state.sound.smartphoneSoundEnable)
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
      @start="volumeChangePlayLoop($store.state.sound.smartphoneSound, $store.state.sound.smartphoneVolume)"
      @end="volumeChangeStop()"
      @input="realtimeVolumeChange($store.state.sound.smartphoneVolume)"
      :disabled="!$store.state.sound.gameGlobalSoundsEnable || !$store.state.sound.smartphoneSoundEnable"
      v-model="smartphoneVolumeSlider"
    ></v-slider>
    <!-- Выбор звука + кнопка вкл / выкл -->
    <v-menu 
      :disabled="!$store.state.sound.smartphoneSoundEnable" 
      left 
      offset-x 
      open-on-hover
      :close-on-content-click="false"
      >
      <template v-slot:activator="{ on }">
        <!-- Кнопка -->
        <v-btn @click="changeSoundEnable('smartphoneSoundEnable')" class="sound-options-container__btn" icon v-on="on" :disabled="!$store.state.sound.gameGlobalSoundsEnable">
          <a-icon v-if="$store.state.sound.smartphoneSoundEnable" :icon="['fas', 'music-alt']" />
          <a-icon v-else color="red" :icon="['fas', 'music-alt-slash']" />
        </v-btn>
      </template>
      <!-- Список звуков / показывает текущий выбранный звук / воспроизводит звук при нажатии -->
      <v-list class="v-menu--background">
        <v-list-item-group v-model="smartphoneSelectedSound">
        <v-list-item
          v-for="(sound, i) in $store.state.sound.soundsList"
          :key="i"
          :value="sound.soundName"
          @click="playbacSelectedSound(sound.soundName, $store.state.sound.smartphoneVolume)"
        >
          <v-list-item-title>{{ sound.soundName }}</v-list-item-title>
        </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
  </div>
</div>
</template>

<script>
import { checkSoundsEnable, soundPlay, soundPlayLoop } from '../../js/gameSound'

export default {
  methods: {
      // Проиграть выбранный звук (для спика)
      playbacSelectedSound(soundName, volume){
        soundPlay(soundName, volume)
      },
      // Играть звук, пока мышь удерживает ползунок слайдера
      volumeChangePlayLoop(soundName, volume){
        soundPlayLoop(soundName, volume)
      },
      // Перестать играть звук, когда мышь отпускает ползунок слайдера
      volumeChangeStop(){
        var soundPlayLoop = document.getElementById('soundPlayLoop')
        soundPlayLoop.pause();
        document.body.removeChild(soundPlayLoop); 
      },
      // Обновление уровня громкости в реальном времени при перетаскивании ползунка слайдера (во время проигрывании звука)      
      realtimeVolumeChange(volume) { 
        var soundPlayLoop = document.getElementById('soundPlayLoop')
        if (soundPlayLoop != null) soundPlayLoop.volume = volume
      },
      // Вкл / выкл всех звуков в игре по нажатию на v-list-item
      changeGlobalSoundEnable(){
        this.$store.commit('gameGlobalSoundsEnable')
      },
      // Вкл / Выкл звука по значку ноты
      changeSoundEnable(commitName) {
        this.$store.commit(commitName)
      },
  },
  computed: {
      // Текущий выбранный звук, выбор нового звука
      achievementSelectedSound: { 
        get: function () {
          return this.$store.state.sound.achievementSound
        },
        set: function (soundName) {
          this.$store.state.sound.achievementSound = soundName;
          this.$store.commit('updateStores');
        } 
      },
      diarySelectedSound: { 
        get: function () {
          return this.$store.state.sound.diarySound
        },
        set: function (soundName) {
          this.$store.state.sound.diarySound = soundName;
          this.$store.commit('updateStores');
        } 
      },
      smartphoneSelectedSound: { 
        get: function () {
          return this.$store.state.sound.smartphoneSound
        },
        set: function (soundName) {
          this.$store.state.sound.smartphoneSound = soundName;
          this.$store.commit('updateStores');
        } 
      },

      // Изменение громкости на слайдере
      achievementVolumeSlider: {
        get: function () {
          var Volume = (this.$store.state.sound.achievementVolume * 100)
          return Volume;
        },
        set: function (level) {
          this.$store.state.sound.achievementVolume = (level /= 100)
          this.$store.commit("updateStores");
        } 
      },
      diaryVolumeSlider: {
        get: function () {
          var Volume = (this.$store.state.sound.diaryVolume * 100)
          return Volume;
        },
        set: function (level) {
          this.$store.state.sound.diaryVolume = (level /= 100)
          this.$store.commit("updateStores");
        } 
      },
      smartphoneVolumeSlider: {
        get: function () {
          var Volume = (this.$store.state.sound.smartphoneVolume * 100)
          return Volume;
        },
        set: function (level) {
          this.$store.state.sound.smartphoneVolume = (level /= 100)
          this.$store.commit("updateStores");
        } 
      },
  },
}
</script>

<style lang="scss" scoped>

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