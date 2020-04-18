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
      </v-expansion-panels>
      <!-- Настройки различных параметров (ползунки) -->
      <v-list subheader two-line flat>
        <v-subheader class="v-list-item__header">Панель сохранений</v-subheader>
        <!-- Панелья сохранений -->
        <v-list-item-group multiple>
          <v-list-item class="v-list-item">
            <v-list-item-content @click="autoCloseSavesDrawer()">
              <v-list-item-title>Автоматически закрывать</v-list-item-title>
              <v-list-item-subtitle>После операции сохранения, перезаписи, загрузки</v-list-item-subtitle>
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
          <!-- Отключение показа аватарок в чате -->
          <v-list-item class="v-list-item">
            <v-list-item-content @click="mChatHideAvatars()">
              <v-list-item-title>Скрыть аватарки</v-list-item-title>
            </v-list-item-content>
            <!-- Тумблер -->
            <v-list-item-action>
              <v-switch
                v-model="$store.state.mChat.mChat_HideAvatars"
                @click.stop="mChatHideAvatars()"
              ></v-switch>
            </v-list-item-action>
          </v-list-item>
          <v-divider />
          <!-- Отключение наборной панели в чате -->
          <v-list-item class="v-list-item">
            <v-list-item-content @click="mChatHideInput()">
              <v-list-item-title>Скрыть наборный элемент</v-list-item-title>
              <v-list-item-subtitle>Скрывает нижний декоративный наборный элемент чата</v-list-item-subtitle>
            </v-list-item-content>
            <!-- Тумблер -->
            <v-list-item-action>
              <v-switch
                v-model="$store.state.mChat.mChat_HideInput"
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
      this.$store.state.autoCloseSavesDrawer =! this.$store.state.autoCloseSavesDrawer
    },
    mChatHideAvatars(){
      this.$store.state.mChat.mChat_HideAvatars =! this.$store.state.mChat.mChat_HideAvatars
    },
    mChatHideInput(){
      this.$store.state.mChat.mChat_HideInput =! this.$store.state.mChat.mChat_HideInput
    }
  },
  computed: {

  },
  components: {
    SettingsAppearance,
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
  align-items: flex-end !important;
  padding: 0 12px 6px 12px !important;
}

.v-expansion-panel .header-icon {
  flex: none;
  background-color: transparent !important;
  width: 65px !important;
}

</style>