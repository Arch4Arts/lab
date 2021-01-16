<i18n>
	{
		"en": {
      "main-toggle-title": "Hotkeys",
      "settings": {
        "title": "Settings",
        "1": "Open settings",
        "2": "Switch the sound state in the game"
      },
      "journal": {
        "title": "Journal",
        "1": "Open the journal",
        "2": "Open the character tab",
        "3": "Open the diary tab",
        "4": "Open the achievements tab"
      },
      "saves": {
        "title": "Saves",
        "1": "Open saves",
        "2": "Quick save",
        "3": "Quick Load"
      },
      "mChat": {
        "title": "Chat",
        "1": "Open chat"
      }
		},
		"ru": {
      "main-toggle-title": "Горячие клавиши",
      "settings": {
        "title": "Настройки",
        "1": "Открыть настройки",
        "2": "Переключить состояние звука в игре"
      },
      "journal": {
        "title": "Журнал",
        "1": "Открыть журнал",
        "2": "Открыть вкладку с персонажами",
        "3": "Открыть вкладку с дневником",
        "4": "Открыть вкладку с достижениями"
      },
      "saves": {
        "title": "Сохранения",
        "1": "Открыть сохранения",
        "2": "Быстрое сохранение",
        "3": "Быстрая загрузка"
      },
      "mChat": {
        "title": "Чат",
        "1": "Открыть чат"
      }
		}
	}
</i18n>

<template>
<section>
  <!-- Вкл/Выкл горячих клавиш -->
  <v-list :disabled="this.$root.isTouchDevice" subheader two-line flat>
    <v-list-item-group multiple>
      <v-list-item class="v-list-item">
        <!-- Надпись -->
        <v-list-item-content @click="setHotkeyEnableState()" class="v-list-item__content">
          <v-list-item-title>{{ $t('main-toggle-title') }}</v-list-item-title>
        </v-list-item-content>
        <!-- Тумблер -->
        <v-list-item-action class="v-list-item__action">
          <v-switch
            v-model="$store.state.hotkeySettings.isEnable"
            @click.stop="setHotkeyEnableState()"
          ></v-switch>
        </v-list-item-action>
      </v-list-item>
    </v-list-item-group>
  </v-list>
  <!-- Настройки -->
  <v-card v-model="settings" class="hotkey-section" :disabled="!$store.state.hotkeySettings.isEnable" elevation="0">
    <p :class="($store.state.hotkeySettings.isEnable) ? 'hotkey-section__name' : 'hotkey-section__name disabled'">
      {{ $t('settings.title') }}
    </p>
    <div 
      class="hotkey-section-option"
      :class="{ 'disabled': !$store.state.hotkeySettings.isEnable, highlight: settings.hotkey == hotkeySelected }"
      v-for="settings in hotkeys.settings" :key="settings.hotkey" 
      @click="hotkeyChange(settings.hotkey)"
    >
      <div class="hotkey-section-option__desc">
        {{ settings.description }}
      </div>
      <div class="hotkey-section-option__key" :class="{ highlight: settings.hotkey == hotkeySelected }">
        <!-- Преобразуем первуб букву в заглавную -->
        {{ settings.key.charAt(0).toUpperCase() + settings.key.slice(1) }}
      </div>
    </div>
  </v-card>
  <!-- Журнал -->
  <v-card v-model="journal" class="hotkey-section" :disabled="!$store.state.hotkeySettings.isEnable" elevation="0">
    <p :class="($store.state.hotkeySettings.isEnable) ? 'hotkey-section__name' : 'hotkey-section__name disabled'">
      {{ $t('journal.title') }}
    </p>
    <div 
      class="hotkey-section-option"
      :class="{ 'disabled': !$store.state.hotkeySettings.isEnable, highlight: journal.hotkey == hotkeySelected }"
      v-for="journal in hotkeys.journal" :key="journal.hotkey" 
      @click="hotkeyChange(journal.hotkey)"
    >
      <div class="hotkey-section-option__desc">
        {{ journal.description }}
      </div>
      <div class="hotkey-section-option__key" :class="{ highlight: journal.hotkey == hotkeySelected }">
        <!-- Преобразуем первуб букву в заглавную -->
        {{ journal.key.charAt(0).toUpperCase() + journal.key.slice(1) }}
      </div>
    </div>
  </v-card>
  <!-- Сохранения -->
  <v-card v-model="saves" class="hotkey-section" :disabled="!$store.state.hotkeySettings.isEnable" elevation="0">
    <p :class="($store.state.hotkeySettings.isEnable) ? 'hotkey-section__name' : 'hotkey-section__name disabled'">
      {{ $t('saves.title') }}
    </p>
    <div 
      class="hotkey-section-option"
      :class="{ 'disabled': !$store.state.hotkeySettings.isEnable, highlight: saves.hotkey == hotkeySelected }"
      v-for="saves in hotkeys.saves" :key="saves.hotkey" 
      @click="hotkeyChange(saves.hotkey)"
    >
      <div class="hotkey-section-option__desc" :class="{ highlight: saves.hotkey == hotkeySelected }">
        {{ saves.description }}
      </div>
      <div class="hotkey-section-option__key" :class="{ highlight: saves.hotkey == hotkeySelected }">
        <!-- Преобразуем первуб букву в заглавную -->
        {{ saves.key.charAt(0).toUpperCase() + saves.key.slice(1) }}
      </div>
    </div>
  </v-card>
  <!-- Чат -->
  <v-card v-model="mChat" class="hotkey-section" :disabled="!$store.state.hotkeySettings.isEnable" elevation="0">
    <p :class="($store.state.hotkeySettings.isEnable) ? 'hotkey-section__name' : 'hotkey-section__name disabled'">
      {{ $t('mChat.title') }}
    </p>
    <div 
      class="hotkey-section-option"
      :class="{ 'disabled': !$store.state.hotkeySettings.isEnable, highlight: mChat.hotkey == hotkeySelected }"
      v-for="mChat in hotkeys.mChat" :key="mChat.hotkey" 
      @click="hotkeyChange(mChat.hotkey)"
    >
      <div class="hotkey-section-option__desc" :class="{ highlight: mChat.hotkey == hotkeySelected }">
        {{ mChat.description }}
      </div>
      <div class="hotkey-section-option__key" :class="{ highlight: mChat.hotkey == hotkeySelected}">
        <!-- Преобразуем первуб букву в заглавную -->
        {{ mChat.key.charAt(0).toUpperCase() + mChat.key.slice(1) }}
      </div>
    </div>
  </v-card>
</section>
</template>

<script>
const keycode = require('keycode');

export default {
  data(){
    return {
    hotkeys: {
      settings: [
        { // Открыть журнал
          description: this.$t('settings.1'),
          hotkey: 'settingsOpen',
          key: ''
        },
        { // Открыть вкладку с персонажами 
          description:this.$t('settings.2'),
          hotkey: 'settingsToggleGlobalSoundEnable',
          key: ''
        },
      ],
      journal: [
        { // Открыть журнал
          description: this.$t('journal.1'),
          hotkey: 'journalOpen',
          key: ''
        },
        { // Открыть вкладку с персонажами 
          description: this.$t('journal.2'),
          hotkey: 'journalTabCharacters',
          key: ''
        },
        { // Открыть вкладку с дневником
          description: this.$t('journal.3'),
          hotkey: 'journalTabDiary',
          key: ''
        },
        { // Открыть вкладку с достижениями
          description: this.$t('journal.4'),
          hotkey: 'journalTabAchievements',
          key: ''
        },
      ],
      saves: [
        { // Открыть журнал
          description: this.$t('saves.1'),
          hotkey: 'savesOpen',
          key: ''
        },
        { // Открыть вкладку с персонажами 
          description: this.$t('saves.2'),
          hotkey: 'savesQuickSave',
          key: ''
        },
        { // Открыть вкладку с дневником
          description: this.$t('saves.3'),
          hotkey: 'savesQuickLoad',
          key: ''
        },
      ],
      mChat: [
        { // Открыть журнал
          description: this.$t('mChat.1'),
          hotkey: 'mChatOpen',
          key: ''
        },
      ],
    },

    hotkeySelected: '',
    }
  },
  methods: {
    setHotkeyEnableState(){
      this.$store.commit('hotkeySettings/changeEnableState');
    },
    hotkeyChange(hotkey){
      // Секция горячих клавиш
      this.hotkeySelected = hotkey;
      document.body.addEventListener('keyup', (e) => {
        if (this.$store.state.showSettingsDrawer && (keycode(e) !== undefined)) { 
          this.checkDuplicateKey(keycode(e))
          this.hotkeySelected = '';
          this.$store.state.hotkeySettings.hotkeys[hotkey] = {
            key: keycode(e),
            code: e.code,
          }          
        }
        else this.hotkeySelected = '';
      }, { once: true })
    },
    checkDuplicateKey(key) {
      const hotkeyList = this.$store.state.hotkeySettings.hotkeys;
      for (const hotkey in hotkeyList) {
        if (hotkeyList[hotkey].key === key) { // Clean Up
          hotkeyList[hotkey].key = '';
          hotkeyList[hotkey].code = '';
        }
      }
    }
  },
  computed: {
    settings(){
      this.hotkeys.settings[0].key = this.$store.state.hotkeySettings.hotkeys['settingsOpen'].key;
      this.hotkeys.settings[1].key = this.$store.state.hotkeySettings.hotkeys['settingsToggleGlobalSoundEnable'].key;
    },
    journal(){
      this.hotkeys.journal[0].key = this.$store.state.hotkeySettings.hotkeys['journalOpen'].key;
      this.hotkeys.journal[1].key = this.$store.state.hotkeySettings.hotkeys['journalTabCharacters'].key;
      this.hotkeys.journal[2].key = this.$store.state.hotkeySettings.hotkeys['journalTabDiary'].key;
      this.hotkeys.journal[3].key = this.$store.state.hotkeySettings.hotkeys['journalTabAchievements'].key;
    },
    saves(){
      this.hotkeys.saves[0].key = this.$store.state.hotkeySettings.hotkeys['savesOpen'].key;
      this.hotkeys.saves[1].key = this.$store.state.hotkeySettings.hotkeys['savesQuickSave'].key;
      this.hotkeys.saves[2].key = this.$store.state.hotkeySettings.hotkeys['savesQuickLoad'].key;
    },
    mChat(){
      this.hotkeys.mChat[0].key = this.$store.state.hotkeySettings.hotkeys['mChatOpen'].key;
    },
  },
  watch: {
    '$store.state.showSettingsDrawer': function () { this.hotkeySelected = '' }
  }
}
</script>

<style lang='scss' scoped>

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

  margin: 4px 0 0 0;
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
  &.highlight {
    opacity: 1;
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.15);
  }
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