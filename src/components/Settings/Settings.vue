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
    <!-- ENGLISH -->
    <section v-if="$store.state.gameLang">

    </section>

    <!-- RUSSIAN -->
    <section class="settings" v-else>
      <v-expansion-panels accordion>
        <!-- Звук -->
        <v-expansion-panel>
          <v-expansion-panel-header>
            <div class="v-expansion-panel header-icon">
              <v-icon large left v-if="$store.state.sound.gameGlobalSoundsEnable">fas fa-volume</v-icon>
              <v-icon large left v-else>fas fa-volume-mute</v-icon>
            </div> 
            Звук
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <settings-sound />
          </v-expansion-panel-content>
        </v-expansion-panel>
        <!-- Внешний вид -->
        <v-expansion-panel >
          <v-expansion-panel-header>
            <div class="v-expansion-panel header-icon"><v-icon large left>far fa-eye</v-icon></div>
            Внешний вид
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <settings-appearance />
          </v-expansion-panel-content>
        </v-expansion-panel>
        <!-- Горячие клавиши -->
        <v-expansion-panel >
          <v-expansion-panel-header>
            <div class="v-expansion-panel header-icon"><v-icon large left>fas fa-keyboard</v-icon></div>
            Горячие клавиши
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <settings-hotkeys id="hotkeys" />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <!-- Настройки различных параметров (ползунки) -->
      <v-list subheader two-line flat>
        <v-subheader class="v-list-item__header">Панель сохранений</v-subheader>
        <!-- Панель сохранений -->
        <v-list-item-group multiple>
          <v-list-item class="v-list-item">
            <v-list-item-content @click="autoCloseSavesDrawer()">
              <v-list-item-title>Автоматически скрывать</v-list-item-title>
              <v-list-item-subtitle>Автоматически скрывать панель, после операции сохранения, перезаписи, загрузки</v-list-item-subtitle>
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
        <v-subheader class="v-list-item__header">Настройки чата</v-subheader>
        <!-- Настройки чата -->
        <v-list-item-group multiple>
          <!-- Автоматическое воспроизведение видео -->
          <v-list-item class="v-list-item">
            <v-list-item-content @click="autoPlayMsgVideoOnHover()">
              <v-list-item-title>Автоматическое воспроизведение</v-list-item-title>
              <v-list-item-subtitle>Автоматическое воспроизведение видео при наведении мыши</v-list-item-subtitle>
            </v-list-item-content>
            <!-- Тумблер -->
            <v-list-item-action>
              <v-switch
                v-model="$store.state.mChat.autoplayVideoMessageOnHover"
                @click.stop="autoPlayMsgVideoOnHover()"
              ></v-switch>
            </v-list-item-action>
          </v-list-item>
          <!-- Имитация набора сообщения -->
          <v-list-item class="v-list-item">
            <v-list-item-content @click="mChatTypingIndicatorEnable()">
              <v-list-item-title>Имитация набора сообщения</v-list-item-title>
              <v-list-item-subtitle>Анимация набора сообщений участником чата</v-list-item-subtitle>
            </v-list-item-content>
            <!-- Тумблер -->
            <v-list-item-action>
              <v-switch
                v-model="$store.state.mChat.typingIndicatorEnable"
                @click.stop="mChatTypingIndicatorEnable()"
              ></v-switch>
            </v-list-item-action>
          </v-list-item>
          <!-- Отключение показа аватарок в чате -->
          <v-list-item class="v-list-item">
            <v-list-item-content @click="mChatHideAvatars()">
              <v-list-item-title>Аватар</v-list-item-title>
              <v-list-item-subtitle>Отключает отображение аватарки у участника чата</v-list-item-subtitle>
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
            <v-list-item-content @click="mChatHideInput()">
              <v-list-item-title>Наборный элемент</v-list-item-title>
              <v-list-item-subtitle>Нижний декоративный наборный элемент чата</v-list-item-subtitle>
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

export default {
  data(){
    return {

    }
  },
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
    mChatHideInput(){
      this.$store.commit('showDecorativeInputPanel')
    },
  },
  computed: {

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

.v-expansion-panel .header-icon {
  flex: none;
  background-color: transparent !important;
  width: 65px !important;
}

</style>