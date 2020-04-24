<template>
  <!-- ENGLISH -->
  <section v-if="$store.state.gameLang">

  </section>
  <!-- RUSSIAN -->
  <section v-else>
  <!-- Вкл/Выкл горячих клавиш -->
  <v-list :disabled="this.$root.isTouchDevice" subheader two-line flat>
    <v-list-item-group multiple>
      <v-list-item class="v-list-item">
        <!-- Надпись -->
        <v-list-item-content @click="gameHotkeysEnable" class="v-list-item__content">
          <v-list-item-title>Горячие клавиши</v-list-item-title>
        </v-list-item-content>
        <!-- Тумблер -->
        <v-list-item-action class="v-list-item__action">
          <v-switch
            v-model="$store.state.gameHotkeysEnable"
            @click.stop="gameHotkeysEnable"
          ></v-switch>
        </v-list-item-action>
      </v-list-item>
    </v-list-item-group>
  </v-list>
  <!-- Настройки -->
  <v-card v-model="settings" class="hotkey-section" :disabled="!$store.state.gameHotkeysEnable" elevation="0">
    <p :class="($store.state.gameHotkeysEnable) ? 'hotkey-section__name' : 'hotkey-section__name disabled'">Настройки</p>
    <div 
      class="hotkey-section-option"
      :class="{'disabled': !$store.state.gameHotkeysEnable, highlight:settings.key == selected.key}"
      v-for="settings in settingsHotkeys" :key="settings.key" 
      @click="hotkeySelected('settings', settings.key)"
    >
      <div class="hotkey-section-option__desc">
        {{settings.description_ru}}
      </div>
      <div class="hotkey-section-option__key" :class="{highlight:settings.key == selected.key}">
        <!-- Преобразуем первуб букву в заглавную -->
        {{settings.hotkey.charAt(0).toUpperCase() + settings.hotkey.slice(1)}}
      </div>
    </div>
  </v-card>
  <!-- Журнал -->
  <v-card v-model="journal" class="hotkey-section" :disabled="!$store.state.gameHotkeysEnable" elevation="0">
    <p :class="($store.state.gameHotkeysEnable) ? 'hotkey-section__name' : 'hotkey-section__name disabled'">Журнал</p>
    <div 
      class="hotkey-section-option"
      :class="{'disabled': !$store.state.gameHotkeysEnable, highlight:journal.key == selected.key}"
      v-for="journal in journalHotkeys" :key="journal.key" 
      @click="hotkeySelected('journal', journal.key)"
    >
      <div class="hotkey-section-option__desc">
        {{journal.description_ru}}
      </div>
      <div class="hotkey-section-option__key" :class="{highlight:journal.key == selected.key}">
        <!-- Преобразуем первуб букву в заглавную -->
        {{journal.hotkey.charAt(0).toUpperCase() + journal.hotkey.slice(1)}}
      </div>
    </div>
  </v-card>
  <!-- Сохранения -->
  <v-card v-model="saves" class="hotkey-section" :disabled="!$store.state.gameHotkeysEnable" elevation="0">
    <p :class="($store.state.gameHotkeysEnable) ? 'hotkey-section__name' : 'hotkey-section__name disabled'">Сохранения</p>
    <div 
      class="hotkey-section-option"
      :class="{'disabled': !$store.state.gameHotkeysEnable, highlight:saves.key == selected.key}"
      v-for="saves in savesHotkeys" :key="saves.key" 
      @click="hotkeySelected('saves', saves.key)"
    >
      <div class="hotkey-section-option__desc">
        {{saves.description_ru}}
      </div>
      <div class="hotkey-section-option__key" :class="{highlight:saves.key == selected.key}">
        <!-- Преобразуем первуб букву в заглавную -->
        {{saves.hotkey.charAt(0).toUpperCase() + saves.hotkey.slice(1)}}
      </div>
    </div>
  </v-card>
  <!-- Чат -->
  <v-card v-model="mChat" class="hotkey-section" :disabled="!$store.state.gameHotkeysEnable" elevation="0">
    <p :class="($store.state.gameHotkeysEnable) ? 'hotkey-section__name' : 'hotkey-section__name disabled'">Чат</p>
    <div 
      class="hotkey-section-option"
      :class="{'disabled': !$store.state.gameHotkeysEnable, highlight:mChat.key == selected.key}"
      v-for="mChat in mChatHotkeys" :key="mChat.key" 
      @click="hotkeySelected('mChat', mChat.key)"
    >
      <div class="hotkey-section-option__desc">
        {{mChat.description_ru}}
      </div>
      <div class="hotkey-section-option__key" :class="{highlight:mChat.key == selected.key}">
        <!-- Преобразуем первуб букву в заглавную -->
        {{mChat.hotkey.charAt(0).toUpperCase() + mChat.hotkey.slice(1)}}
      </div>
    </div>
  </v-card>
  </section>
</template>

<script>
// библиотека для конвертирования кода клавиши в имя !store.state.isOpenSettingsDrawer
var keycode = require('keycode');

export default {
  data(){
    return {
    settingsHotkeys: [
      { // Открыть журнал
        description: 'Open settings',
        description_ru: 'Открыть настройки',
        hotkey: '',
        key: 'settingsOpen'
      },
      { // Открыть вкладку с персонажами 
        description: 'Switch the sound state in the game',
        description_ru: 'Переключить состояние звука в игре',
        hotkey: '',
        key: 'settingsToggleGlobalSoundEnable'
      },
    ],
    journalHotkeys: [
      { // Открыть журнал
        description: 'Open the journal',
        description_ru: 'Открыть журнал',
        hotkey: '',
        key: 'journalOpen'
      },
      { // Открыть вкладку с персонажами 
        description: 'Open the character tab',
        description_ru: 'Открыть вкладку с персонажами',
        hotkey: '',
        key: 'journalTabCharacters'
      },
      { // Открыть вкладку с дневником
        description: 'Open the diary tab',
        description_ru: 'Открыть вкладку с дневником',
        hotkey: '',
        key: 'journalTabDiary'
      },
      { // Открыть вкладку с достижениями
        description: 'Open the achievements tab',
        description_ru: 'Открыть вкладку с достижениями',
        hotkey: '',
        key: 'journalTabAchievements'
      },
    ],
    savesHotkeys: [
      { // Открыть журнал
        description: '',
        description_ru: 'Открыть сохранения',
        hotkey: '',
        key: 'savesOpen'
      },
      { // Открыть вкладку с персонажами 
        description: 'Quick save',
        description_ru: 'Быстрое сохранение',
        hotkey: '',
        key: 'savesQuickSave'
      },
      { // Открыть вкладку с дневником
        description: 'Quick Load',
        description_ru: 'Быстрая загрузка',
        hotkey: '',
        key: 'savesQuickLoad'
      },
    ],
    mChatHotkeys: [
      { // Открыть журнал
        description: 'Open chat',
        description_ru: 'Открыть чат',
        hotkey: '',
        key: 'mChatOpen'
      },
    ],

    selected: {
      section: '',
      i: '',
      key: '',
    }
    }
  },
  methods: {
    gameHotkeysEnable(){
      this.$store.commit('gameHotkeysEnable')
    },
    hotkeySelected(section, key){
      // Секция горячих клавиш
      this.selected.section = section;
      // Горячая клавиша
      this.selected.key = key;
      // document.body.addEventListener('keyup', this.hotkeyChange, { once: true })
      // Запуск отслеживания нажатия кнопки
      hotkeys('*', this.hotkeyChange);
    },
    // Обработка нажатия кнопки
    hotkeyChange(e){
      // Записываем код нажатой клавиши
      let keyCode = hotkeys.getPressedKeyCodes()
      switch (this.selected.section) {
        case 'settings': {        
          // Конвертируем код в имя клавиши
          let keyName = keycode(keyCode[0]);
          // Записываем данные в хранилище
          this.$store.state.settingsHotkeys[this.selected.key] = keyName
          this.$store.commit('updateStores');
          break;
        }
        case 'journal': {
          // Конвертируем код в имя клавиши
          let keyName = keycode(keyCode[0]);
          // Записываем данные в хранилище
          this.$store.state.journalHotkeys[this.selected.key] = keyName
          this.$store.commit('updateStores');
          break;
        }
        case 'saves': {
          // Конвертируем код в имя клавиши
          let keyName = keycode(keyCode[0]);
          // Записываем данные в хранилище
          this.$store.state.savesHotkeys[this.selected.key] = keyName
          this.$store.commit('updateStores');
          break;
        }
        case 'mChat': {
          // Конвертируем код в имя клавиши
          let keyName = keycode(keyCode[0]);
          // Записываем данные в хранилище
          this.$store.state.mChatHotkeys[this.selected.key] = keyName
          this.$store.commit('updateStores');
          break;
        }
      }
      // Очищаем selected
      for (let key in this.selected) {
        this.selected[key] = undefined;
      }
      // Прекращаем отслеживать нажатие клавиш
      hotkeys.unbind('*');
      // Увеличиваем версию сочетания клавиш, для перепривязки hotkeys
      this.$store.state.keyboardShortcutsVersion += 1;
    }
  },
  computed: {
    settings(){
      this.settingsHotkeys[0].hotkey = this.$store.state.settingsHotkeys['settingsOpen'];
      this.settingsHotkeys[1].hotkey = this.$store.state.settingsHotkeys['settingsToggleGlobalSoundEnable'];
    },
    journal(){
      this.journalHotkeys[0].hotkey = this.$store.state.journalHotkeys['journalOpen'];
      this.journalHotkeys[1].hotkey = this.$store.state.journalHotkeys['journalTabCharacters'];
      this.journalHotkeys[2].hotkey = this.$store.state.journalHotkeys['journalTabDiary'];
      this.journalHotkeys[3].hotkey = this.$store.state.journalHotkeys['journalTabAchievements'];
    },
    saves(){
      this.savesHotkeys[0].hotkey = this.$store.state.savesHotkeys['savesOpen'];
      this.savesHotkeys[1].hotkey = this.$store.state.savesHotkeys['savesQuickSave'];
      this.savesHotkeys[2].hotkey = this.$store.state.savesHotkeys['savesQuickLoad'];
    },
    mChat(){
      this.mChatHotkeys[0].hotkey = this.$store.state.mChatHotkeys['mChatOpen'];
    },
  }
}
</script>

<style lang="scss" scoped>

.v-list-item {
  padding: 0px !important;
}

.v-list-item__content {
  margin-left: 16px;
}

.v-list-item__action {
  margin-right: 16px;
}

.hotkey-section {
  margin: 0 0 12px 0;
  background: transparent !important;
}

.hotkey-section__name {
  margin: 0 8px !important;
  opacity: 1;
  &.disabled {
  opacity: .4;
  }
}


.hotkey-section-option {
  position: relative;
  display: flex;

  margin: 6px 0 0 0;
  opacity: .65;
  font-size: 0.950em;
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
  &.disabled {
  opacity: .4;
  }
  &.highlight {
    opacity: 1;
  }
}

.hotkey-section-option__desc {
  align-Items: center;
  display: flex;
  width: 70%;

  padding-left: 8px;
  margin-left: 16px;

  background: #242933;
}

.hotkey-section-option__key {
  justify-content: center;
  align-Items: center;
  display: flex;

  width: 25%;

  margin-left: 6px;
  background: #434C5E;
  &.highlight {
    opacity: 1;
    box-shadow: 0 0 8px rgb(109, 123, 151);
    background: rgb(109, 123, 151);
  }
}

</style>