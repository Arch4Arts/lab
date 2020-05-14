<i18n>
	{
		"en": {
			"panel-title__sound": "Sound",
			"panel-title__appearance": "Appearance",
      "panel-title__hotkeys": "Hotkeys",
      "list-item__saves": {
        "title": "Saves panel",
        "1": {
          "title": "Automatically hide",
          "subtitle": "Automatically hide the panel after saving, overwriting, or loading operations"
        }
      },
			"list-item__mChat": {
        "title": "Chat settings",
        "1": {
          "title": "Automatic playback",
          "subtitle": "Automatic video playback on mouse hovering"
        },
        "2": {
          "title": "Simulating a message set",
          "subtitle": "Animation of a set of messages by a chat participant"
        },
        "3": {
          "title": "Avatar",
          "subtitle": "Disables the display of the chat participant's avatar"
        },
        "4": {
          "title": "The title of the chat",
          "subtitle": "Don't hide the top panel when scrolling the chat"
        },
        "5": {
          "title": "Typeset element",
          "subtitle": "The lower decorative dial element of the chat"
        }
      }
		},
		"ru": {
			"panel-title__sound": "Звук",
			"panel-title__appearance": "Внешний вид",
      "panel-title__hotkeys": "Горячие клавиши",
      "list-item__saves": {
        "title": "Панель сохранений",
        "1": {
          "title": "Автоматически скрывать",
          "subtitle": "Автоматически скрывать панель, после операции сохранения, перезаписи, загрузки"
        }
      },
			"list-item__mChat": {
        "title": "Настройки чата",
        "1": {
          "title": "Автоматическое воспроизведение",
          "subtitle": "Автоматическое воспроизведение видео при наведении мыши"
        },
        "2": {
          "title": "Имитация набора сообщения",
          "subtitle": "Анимация набора сообщений участником чата"
        },
        "3": {
          "title": "Аватар",
          "subtitle": "Отключает отображение аватарки у участника чата"
        },
        "4": {
          "title": "Заголовок чата",
          "subtitle": "Не скрывать верхнюю панель при прокрутке чата"
        },
        "5": {
          "title": "Наборный элемент",
          "subtitle": "Нижний декоративный наборный элемент чата"
        }
      }
		}
	}
</i18n>

<template>
  <v-navigation-drawer
    v-model="$store.state.isOpenSettingsDrawer"
    temporary
    right
    app
    touchless
    dark
    @input="drawerShowState"
    width="700"
    class="v-navigation-drawer"
  >
    <section class="settings">
      <v-expansion-panels accordion>
        <!-- Звук -->
        <v-expansion-panel>
          <v-expansion-panel-header>
            <div class="header">
              <a-icon v-if="$store.state.sound.gameGlobalSoundsEnable" class="header__icon" :icon="['fas', 'volume']" />
              <a-icon v-else color="red" class="header__icon" :icon="['fas', 'volume-mute']" />
            </div> 
            {{ $t('panel-title__sound') }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <settings-sound />
          </v-expansion-panel-content>
        </v-expansion-panel>
        <!-- Внешний вид -->
        <v-expansion-panel >
          <v-expansion-panel-header>
            <div class="header">
              <a-icon class="header__icon" :icon="['fas', 'eye']" />
            </div>
            {{ $t('panel-title__appearance') }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <settings-appearance />
          </v-expansion-panel-content>
        </v-expansion-panel>
        <!-- Горячие клавиши -->
        <v-expansion-panel >
          <v-expansion-panel-header>
            <div class="header">
              <a-icon class="header__icon" :icon="['fas', 'keyboard']" />
            </div>
            {{ $t('panel-title__hotkeys') }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <settings-hotkeys id="hotkeys" />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <!-- Настройки различных параметров (ползунки) -->
      <v-list subheader two-line flat>

        <v-subheader class="v-list-item__header">{{ $t('list-item__saves.title') }}</v-subheader>
        <!-- Панель сохранений -->
        <v-list-item-group multiple>
          <v-list-item class="v-list-item">
            <v-list-item-content @click="autoCloseSavesDrawer()">
              <v-list-item-title>{{ $t('list-item__saves.1.title') }}</v-list-item-title>
              <v-list-item-subtitle>{{ $t('list-item__saves.1.subtitle') }}</v-list-item-subtitle>
            </v-list-item-content>
            <!-- Тумблер -->
            <v-list-item-action>
              <v-switch
                v-model="$store.state.autoCloseSavesDrawer"
                @click.stop="autoCloseSavesDrawer()"
              ></v-switch>
            </v-list-item-action>
          </v-list-item>
        </v-list-item-group>

        <v-subheader class="v-list-item__header">{{ $t('list-item__mChat.title') }}</v-subheader>
        <!-- Настройки чата -->
        <v-list-item-group multiple>
          <!-- Автоматическое воспроизведение видео -->
          <v-list-item class="v-list-item">
            <v-list-item-content @click="autoPlayMsgVideoOnHover()">
              <v-list-item-title>{{ $t('list-item__mChat.1.title') }}</v-list-item-title>
              <v-list-item-subtitle>{{ $t('list-item__mChat.1.subtitle') }}</v-list-item-subtitle>
            </v-list-item-content>
            <!-- Тумблер -->
            <v-list-item-action>
              <v-switch
                v-model="$store.state.mChat.autoplayVideoMessageOnHover"
                @click.stop="autoPlayMsgVideoOnHover()"
              ></v-switch>
            </v-list-item-action>
          </v-list-item>
          <v-divider />
          <!-- Имитация набора сообщения -->
          <v-list-item class="v-list-item">
            <v-list-item-content @click="mChatTypingIndicatorEnable()">
              <v-list-item-title>{{ $t('list-item__mChat.2.title') }}</v-list-item-title>
              <v-list-item-subtitle>{{ $t('list-item__mChat.2.subtitle') }}</v-list-item-subtitle>
            </v-list-item-content>
            <!-- Тумблер -->
            <v-list-item-action>
              <v-switch
                v-model="$store.state.mChat.typingIndicatorEnable"
                @click.stop="mChatTypingIndicatorEnable()"
              ></v-switch>
            </v-list-item-action>
          </v-list-item>
          <v-divider />
          <!-- Отключение показа аватарок в чате -->
          <v-list-item class="v-list-item">
            <v-list-item-content @click="mChatHideAvatars()">
              <v-list-item-title>{{ $t('list-item__mChat.3.title') }}</v-list-item-title>
              <v-list-item-subtitle>{{ $t('list-item__mChat.3.subtitle') }}</v-list-item-subtitle>
            </v-list-item-content>
            <!-- Тумблер -->
            <v-list-item-action>
              <v-switch
                v-model="$store.state.mChat.showAvatars"
                @click.stop="mChatHideAvatars()"
              ></v-switch>
            </v-list-item-action>
          </v-list-item>
          <v-divider />
          <!-- Отключение наборного элемента в чате -->
          <v-list-item class="v-list-item">
            <v-list-item-content @click="mChatHideBarOnScrolling()">
              <v-list-item-title>{{ $t('list-item__mChat.4.title') }}</v-list-item-title>
              <v-list-item-subtitle>{{ $t('list-item__mChat.4.subtitle') }}</v-list-item-subtitle>
            </v-list-item-content>
            <!-- Тумблер -->
            <v-list-item-action>
              <v-switch
                v-model="$store.state.mChat.showBarPanelPermanent"
                @click.stop="mChatHideBarOnScrolling()"
              ></v-switch>
            </v-list-item-action>
          </v-list-item>
          <v-divider />
          <!-- Отключение наборного элемента в чате -->
          <v-list-item class="v-list-item">
            <v-list-item-content @click="mChatHideInput()">
              <v-list-item-title>{{ $t('list-item__mChat.5.title') }}</v-list-item-title>
              <v-list-item-subtitle>{{ $t('list-item__mChat.5.subtitle') }}</v-list-item-subtitle>
            </v-list-item-content>
            <!-- Тумблер -->
            <v-list-item-action>
              <v-switch
                v-model="$store.state.mChat.showDecorativeInputPanel"
                @click.stop="mChatHideInput()"
              ></v-switch>
            </v-list-item-action>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </section>
  </v-navigation-drawer>
</template>

<script>
import SettingsAppearance from './SettingsAppearance'
import SettingsHotkeys from './SettingsHotkeys'
import SettingsSound from './SettingsSound'

import eventBus from '../../js/eventBus'

export default {
  methods: {
    drawerShowState(isShow){ // Записывает изменения стейта из v-model
      if (!isShow) this.$store.commit('updateStores')
    },
    autoCloseSavesDrawer(){
      this.$store.commit('autoCloseSavesDrawer')
    },
    autoPlayMsgVideoOnHover(){
      this.$store.commit('autoplayVideoMessageOnHover')
    },
    mChatTypingIndicatorEnable(){
      this.$store.commit('typingIndicatorEnable')
    },
    mChatHideAvatars(){
      this.$store.commit('mChatShowAvatars')
    },
    mChatHideBarOnScrolling(){
      eventBus.emit('reRender_mChat')
      this.$store.commit('showBarPanelPermanent')
    },
    mChatHideInput(){
      this.$store.commit('showDecorativeInputPanel')
    },
  },
  components: {
    SettingsAppearance,
    SettingsHotkeys,
    SettingsSound,
  }
}
</script>

<style lang="scss" scoped>

.v-navigation-drawer {
  background: var(--v-navigation-drawer--background) !important;
  border-left: var(--v-navigation-drawer--border-left) !important;
}

.settings {
  display: flex;
  flex-direction: column;
}

.v-list-item {
  padding-left: 24px;
  background: var(--settings-v-list-item--background) !important;
}

.v-list-item__header {
  font-size: 1rem !important;

  align-items: flex-end !important;
  padding: 0 12px 6px 12px !important;
}

.v-list-item__title {
  font-size: 0.950rem !important;
}

.v-list-item__subtitle {
  font-size: 0.800rem !important;
}

.header {
  flex: none;
  background-color: transparent !important;
  margin-right: 14px;
  &__icon {
    font-size: 28px;
  }
}

</style>