<i18n>
 {
  "en": {
    "default-save-name": "New save",
    "default-quick-save-name": "Quick Save",
    "tooltip__save": "New save",
    "no-saves": "No saves",
    "tooltip__restart": "Restart game",
    "tooltip__save-to-disk": "Save to Disk",
    "tooltip__load-from-disk": "Load from Disk",
    "tooltip__delete-all-saves": "Delete all saves",
    "number-of-saves": "Number of saves: ",
    "tooltip__number-saves": "A large number of saves can cause performance degradation",
    "notify-save": "Game successfully saved",
    "notify-overwrite-save": "Saving successfully overwritten",
    "notify-load-save": "Game loaded successfully",
    "notify-delete-save": "Saving has been deleted!",
    "notify-delete-all-save": "All saves have been deleted!",
    "notify-save-to-disk": "Saves successfully exported",
    "notify-save-to-disk-error": "There are no saves",
    "notify-load-from-disk": "Saves were imported successfully",
    "notify-load-from-disk-error": "This file does not contain any save data",
    "dialog__delete-all-saves": {
      "title": "Delete all saves",
      "content": {
        "1": "This operation will delete all current saves!",
        "2": "Are you sure you want to continue?"
      },
      "btn": {
        "yes": "Yes",
        "no": "No"
      }
    },
    "dialog__restart-game": {
      "title": "Restart game",
      "content": {
        "1": "When you restart the game, all current progress will be lost!",
        "2": "Are you sure you want to continue?"
      },
      "btn": {
        "yes": "Yes",
        "no": "No"
      }
    }
  },
  "ru": {
    "default-save-name": "Новое сохранение",
    "default-quick-save-name": "Быстрое сохранение",
    "tooltip__save": "Новое сохранение",
    "no-saves": "Сохранения отсутствуют",
    "tooltip__restart": "Перезапуск игры",
    "tooltip__save-to-disk": "Сохранить на диск",
    "tooltip__load-from-disk": "Загрузить с диска",
    "tooltip__delete-all-saves": "Удаление всех сохранений",
    "number-of-saves": "Кол-во сохранений: ",
    "tooltip__number-saves": "Большое количество сохранений могут вызвать падение производительности",
    "notify-save": "Игра успешно сохранена",
    "notify-overwrite-save": "Сохранение успешно перезаписано",
    "notify-load-save": "Игра загружена успешно",
    "notify-delete-save": "Сохранение было удалено!",
    "notify-delete-all-save": "Всё сохранения были удалены!",
    "notify-save-to-disk": "Сохранения успешно экспортированы",
    "notify-save-to-disk-error": "Сохранения отсутствуют",
    "notify-load-from-disk": "Сохранения успешно импортированы",
    "notify-load-from-disk-error": "В данном файле не содержится данные сохранения",
    "dialog__delete-all-saves": {
      "title": "Удаление всех сохранений",
      "content": {
        "1": "Данная операция удалит все текущие сохранения!",
        "2": "Вы уверены, что хотите продолжить?"
      },
      "btn": {
        "yes": "Да",
        "no": "Нет"
      }
    },
    "dialog__restart-game": {
      "title": "Перезапуск игры",
      "content": {
        "1": "При перезапуске игры, будeт потерян весь текущий прогресс!",
        "2": "Вы уверены, что хотите продолжить?"
      },
      "btn": {
        "yes": "Да",
        "no": "Нет"
      }
    }
  }
 }
</i18n>

<template>
  <v-navigation-drawer
    v-model="$store.state.showSavesDrawer"
    temporary
    right
    app
    touchless
    dark
    @input="updateDrawerState"
    width="700"
    class="v-navigation-drawer"
  >
    <!-- Поле ввода + список сохранений -->
    <v-card dark elevation="0">
      <!-- Ввод имени сохранения + кнопка -->
      <v-flex class="input-area">
        <v-text-field dark
          class="save-name__input"
          color="grey lighten-2"
          :autofocus="(this.$root.isTouchDevice) ? false : true"
          :placeholder="$t('default-save-name')"
          @keyup.enter="saveGame(saveNameInput)"
          v-model="saveNameInput"
        ></v-text-field>
        <!-- КНОПКА: СОХРАНИТЬ + ПОДСКАЗКА -->
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn class="save-name__btn" v-on="on" @click="saveGame(saveNameInput)" icon>
              <a-icon class="save-name__btn__color" :icon="['fas', 'download']" />
            </v-btn>
          </template>
            <span>{{ $t('default-save-name') }}</span>
        </v-tooltip>
      </v-flex>

      <!-- Список сохранений -->
      <v-list v-show="savesNumber > 0" two-line subheader>
        <v-list-item-group v-model="listSelectedSaves" multiple>
          <virtual-list
            class="saves-list"
            :keeps="30"

            data-key="saveID"
            :data-sources="savesList"
            :data-component="component"
            :extra-props="{ 
              savesNumber: savesNumber,
              overwriteSave: overwriteSave,
              loadSave: loadSave,
              deleteSave: deleteSave,
            }"
          />
        </v-list-item-group>
      </v-list>
      <!-- Если нет сохранений -->
      <div v-show="savesNumber == 0" class="saves-list">
        <div class="text-center"><br>{{ $t('no-saves') }}<br><br></div>
      </div>
    </v-card>

    <!-- СОХР НА ДИСК / ЗАГР С ДИСКА / ПЕРЕЗАПУСК / УДАЛЕНИЕ ВСЕХ СОХРАНЕНИЙ -->
    <div class="text-right">
      <!-- Перезапуск игры -->
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn class="restart-game-btn" @click="showModalRestart = !showModalRestart" v-on="on" icon>
            <a-icon class="restart-game-btn__color" :icon="['fas', 'power-off']" />
          </v-btn>
        </template>
          <span>{{ $t('tooltip__restart') }}</span>
      </v-tooltip>
      <!-- Сохранение на диск -->
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn class="save-to-disk-btn" @click="saveToDisk()" v-on="on" icon>
            <a-icon class="save-to-disk-btn__color" :icon="['fas', 'hdd']" />
          </v-btn>
        </template>
          <span>{{ $t('tooltip__save-to-disk') }}</span>
      </v-tooltip>
      <!-- Загрузка с диска -->
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn class="load-from-disk-btn" @click="chooseFiles()" v-on="on" icon>
            <input type="file" id="saveUpload" @change="loadFromDisk($event, savesList)" multiple hidden />
            <a-icon class="load-from-disk-btn__color" :icon="['far', 'hdd']" />
          </v-btn>
        </template>
          <span>{{ $t('tooltip__load-from-disk') }}</span>
      </v-tooltip>
      <!-- Удаление всех сохранений -->
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn class="delete-all-saves-btn" @click="showModalDelSavesAll = !showModalDelSavesAll" :disabled="(savesNumber == 0) ? true : false" v-on="on" icon>
            <a-icon 
              class="delete-all-saves-btn__color" 
              :class="{ 'delete-all-saves-btn__color__disabled': (savesNumber == 0) }" 
              :icon="['fas', 'trash-alt']" 
            />
          </v-btn>
        </template>
          <span>{{ $t('tooltip__delete-all-saves') }}</span>
      </v-tooltip>
      <br>

      <!-- Счётчик кол-ва сохранений -->
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <div class="text-center" v-on="on">{{ $t('number-of-saves') }} {{ savesNumber }}</div>
        </template>
          <span>{{ $t('tooltip__number-saves') }}</span>
      </v-tooltip>
    </div>

    <!-- ДИАЛОГ ПОДТВЕРЖДЕНИЯ УДАЛЕНИЯ ВСЕХ СОХРАНЕНИЙ -->
    <v-dialog v-model="showModalDelSavesAll" persistent dark width="230">
      <v-card class="text-center">
        <v-card-title class="headline dark important-modal__header">{{ $t('dialog__delete-all-saves.title') }}</v-card-title>
        <v-card-text class="text--primary"> 
          <br>
          <b>{{ $t('dialog__delete-all-saves.content.1') }}</b>
          <br><br>
          {{ $t('dialog__delete-all-saves.content.2') }}
        </v-card-text>
        <v-card-actions>
          <v-layout align-center justify-center>
            <v-btn dark text @click="DeleteAllSaves()">{{ $t('dialog__delete-all-saves.btn.yes') }}</v-btn>
            <v-btn dark text @click="showModalDelSavesAll = !showModalDelSavesAll">{{ $t('dialog__delete-all-saves.btn.no') }}</v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- ОКНО С ПОДТВЕРЖДЕНИЕМ ПЕРЕЗАПУСКА ИГРЫ-->
    <v-dialog v-model="showModalRestart" persistent dark width="230">
      <v-card class="text-center">
        <v-card-title class="headline dark important-modal__header">{{ $t('dialog__restart-game.title') }}</v-card-title>
        <v-card-text class="text--primary"> 
          <br>
          <b>{{ $t('dialog__restart-game.content.1') }}</b>
          <br><br>
          {{ $t('dialog__restart-game.content.2') }}
        </v-card-text>
        <v-card-actions>
          <v-layout align-center justify-center>
            <v-btn dark text @click="restartGame()">{{ $t('dialog__restart-game.btn.yes') }}</v-btn>
            <v-btn dark text @click="showModalRestart = !showModalRestart">{{ $t('dialog__restart-game.btn.no') }}</v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-navigation-drawer>
</template>

<script>
import dayjs from 'dayjs'; // библиотека для работы с временем
import advancedFormat from 'dayjs/plugin/advancedFormat'; // Плагин
dayjs.extend(advancedFormat);

import store from '../../store/store';
import WebCrypto from './utils/SavesWebCrypto';
import localforage from 'localforage';

import { loadFromDisk, chooseFiles } from './utils/SavesImport'
import saveToDisk from './utils/SavesExport'
import eventBus from '../../js/eventBus';
import { savesNotify } from '../../js/notificationSystem';
import updateTheme from '../../styles/updateTheme';

import VirtualList from 'vue-virtual-scroll-list';

import savesListComponent from './SavesList';

localforage.config({
  name: 'vuex',
  storeName: 'saves'
});

export default {
  data () {
    return {
      component: savesListComponent,

      showModalRestart: false, // Для показа модального окна, меняется при нажатия на кнопку и появляется диалог
      showModalDelSavesAll: false, // Для показа модального окна, меняется при нажатия на кнопку и появляется диалог

      listSelectedSaves: [],

      saveNameInput: '', // Поле ввода сохранения

      savesList: [], // Рабочий список отсортированных сохранений 
      savesNumber: 0, // Кол-во сейвов
    }
  },
  created: async function () {
    const savesList = await localforage.keys().then(keysList => keysList);
    for (const save of savesList) {
      const saveHeader = save.split(',');
      this.savesList.push({
        saveName: saveHeader[0],
        saveTime: saveHeader[1],
        saveID: saveHeader[2],
        saveGameVersion: saveHeader[3]
      })
    }
    this.updateSaveList()
  },
  mounted(){
    eventBus.on('QuickSave', this.quickSave)
    eventBus.on('QuickLoad', this.quickLoad)
  },
  beforeDestroy(){
    eventBus.off('QuickSave')
    eventBus.off('QuickLoad')
  },
  computed: {
    loadFromDisk: () => loadFromDisk,
    chooseFiles: () => chooseFiles,
    saveToDisk: () => saveToDisk,
  },
  methods:{
    sortBy(key) { // (убыванию) < desc, asc > (возрастанию)
      return (a, b) => (a[key] < b[key]) ? 1 : ((b[key] < a[key]) ? -1 : 0);
    },
    async updateSaveList() {
      if (this.savesList.length) {
        this.savesList.sort(this.sortBy('saveID'))
      }
      this.savesNumber = await localforage.length().then(length => length);
    },
    async clearSelectedSavesList(){
      setTimeout(() => this.listSelectedSaves = [], 100)
    },
    quickSave(){
      let isExist = false;
      for (const save of this.savesList) {
        if (save.saveName == 'Quick Save' || save.saveName == 'Быстрое сохранение') {
          isExist = true
          this.overwriteSave(
            save.saveName, 
            save.saveTime, 
            save.saveID, 
            save.saveGameVersion
          )
          break;
        }
      }
      // Если быстрого сохранения нет, делаем новое
      if (!isExist) {
        this.saveGame(this.$t('default-quick-save-name'))
      }
    },
    quickLoad(){
      for (const save of this.savesList) {
        if (save.saveName == 'Quick Save' || save.saveName == 'Быстрое сохранение') {
          this.loadSave(
            save.saveName, 
            save.saveTime, 
            save.saveID, 
            save.saveGameVersion
          )
          break;
        }
      }
    },
    async saveGame(saveName){
      saveName = saveName || this.$t('default-save-name')
      this.saveNameInput = ''; // Очищаем поле ввода
      this.$store.state.saveName = saveName;
      const saveTime = this.$store.state.saveTime = dayjs().format("DD.MM.YYYY - HH:mm");
      const saveID = this.$store.state.saveID = dayjs().format("x");
      const saveGameVersion = this.$store.state.saveGameVersion = this.$root.gameVersion;

      const saveHeader = `${saveName},${saveTime},${saveID},${saveGameVersion}`;
      await WebCrypto.encrypt(saveHeader, JSON.serialize(this.$store.state))
        .then(encryptedData => localforage.setItem(saveHeader, encryptedData))
        .then(() => savesNotify.save({message: this.$t('notify-save')}))
        .then(() => {
          this.savesList.push({saveName, saveTime, saveID, saveGameVersion})
          this.updateSaveList()
          this.closeDrawerAfterSaving()
        })
        .catch(err => this.$root.pushError(err.toString()))
    },
    async overwriteSave(saveName, saveTime, saveID, saveGameVersion){
      const oldSaveHeader = `${saveName},${saveTime},${saveID},${saveGameVersion}`
      saveTime = this.$store.state.saveTime = dayjs().format("DD.MM.YYYY - HH:mm");
      saveID = this.$store.state.saveID = dayjs().format("x");
      saveGameVersion = this.$store.state.saveGameVersion = this.$root.gameVersion;
      
      // Добавляем новый
      const saveHeader = `${saveName},${saveTime},${saveID},${saveGameVersion}`;
      await WebCrypto.encrypt(saveHeader, JSON.serialize(this.$store.state))
        .then( encryptedData => localforage.setItem(saveHeader, encryptedData) )
        .then(() => savesNotify.save({message: this.$t('notify-overwrite-save')}))
        .catch(err => this.$root.pushError(err.toString()))

      // Удаляем старый
      localforage.removeItem(oldSaveHeader)
        .then(() => {
          const oldSave = oldSaveHeader.split(',')
          const saveID = oldSave[2]
          this.savesList.find(function(save) {
            if (save.saveID === saveID) {
              save.saveTime = saveTime
              save.saveID = saveID;
            }
          })
          this.updateSaveList()
          this.clearSelectedSavesList()
          this.closeDrawerAfterSaving()
        })
        .catch(err => this.$root.pushError(err.toString()))
      this.updateSaveList()
    },
    async loadSave(saveName, saveTime, saveID, saveGameVersion){
      const saveHeader = `${saveName},${saveTime},${saveID},${saveGameVersion}`
      const encryptedData = await localforage.getItem(saveHeader).then( data => data )
      await WebCrypto.decrypt(saveHeader, encryptedData)
        .then(decryptedData => JSON.deserialize(decryptedData))
        .then(state => this.$store.replaceState(state))
        .then(() => {
          // Перерисовываем компоненты
          this.$store.state.reRender_mChatPlayersVolume++;
          updateTheme('game');
          updateTheme('mChat');
          this.$store.commit('updateStore');
          this.clearSelectedSavesList()
          this.closeDrawerAfterSaving()
        })
        .then(() => savesNotify.load({message: this.$t('notify-load-save')}))
        .catch(err => this.$root.pushError(err.toString()))
    },
    async deleteSave(saveName, saveTime, saveID, saveGameVersion) {
      const saveHeader = `${saveName},${saveTime},${saveID},${saveGameVersion}`
      await localforage.removeItem(saveHeader)
        .then(() => savesNotify.delete({message: this.$t('notify-delete-save')}))
        .then(() => {
          const saveIndex = this.savesList.findIndex(function(save) {
            return (save.saveID === saveID)
          })
          this.savesList.splice(saveIndex, 1);
          this.updateSaveList()
          this.clearSelectedSavesList()          
        })
        .catch(err => this.$root.pushError(err.toString()))
    },
    async DeleteAllSaves(){
      // Очистка хранилища
      await localforage.clear()
        .then(() => savesNotify.delete({message: this.$t('notify-delete-all-save')}))
        .catch(err => this.$root.pushError(err.toString()))
      // Закрываем модальное окно
      this.showModalDelSavesAll = false
      // Обнуляем список сохранений (перерисовываем список)
      this.savesList = [];
      this.updateSaveList()
    },
    async restartGame(){
      await localStorage.removeItem(`vuex`);
      await location.reload()
    },
    closeDrawerAfterSaving(){
      if (this.$store.state.showSavesDrawer && this.$store.state.isCloseDrawerAfterSaving) 
        this.$store.state.showSavesDrawer = false;
    },
    // регистрация изменений $store.state.showSavesDrawer из v-model
    updateDrawerState(isShow){
      if (!isShow) 
        this.$store.commit('updateStore')
    },
  },
  components: {
    savesListComponent,
    'virtual-list': VirtualList
  },
}
</script>

<style lang='scss' scoped>

.v-navigation-drawer {
  background: var(--v-navigation-drawer--background) !important;
  border-left: var(--v-navigation-drawer--border-left) !important;
  height: 100vh !important;
}

.input-area {
  display: flex;
  align-items: center;
  background: var(--v-navigation-drawer--background) !important
}

.save-name__input {
  margin-left: 16%; 
}

.save-name__btn {
  margin-right: 16%;
  margin-left: 4px;
  background: transparent !important;
  &__color {
    color: rgb(126, 193, 255);
  }
}

.v-list {
  padding: 0px 0px 0px 0px !important;
  background: var(--saves--v-list--background) !important;
}

.saves-list {
  width: inherit;
  height: 80vh;
  overflow-y: auto;

  background: var(--saves--v-list--background) !important;

  margin-bottom: 8px;
  border-top: var(--saves--saves-list--border-top);
  border-bottom: var(--saves--saves-list--border-top);
}

.restart-game-btn {
  margin-right: 10px;
  background: transparent !important;
  &__color  {
    color: var(--saves--restart-game-btn--color);
  }
}

.save-to-disk-btn {
  background: transparent !important;
  &__color  {
    color: var(--saves--save-to-disk-btn--color);
  }
}

.load-from-disk-btn {
  margin-right: 14px;
  background: transparent !important;
  &__color  {
    color: var(--saves--load-from-disk-btn--color);
  }
}

.delete-all-saves-btn {
  margin-right: 15px;
  background: transparent !important;
  &__color  {
    color: var(--saves--delete-all-saves-btn--color);
    &__disabled {
      color: hsla(0,0%,100%,.3)!important;
    }
  }
}


@media (max-width: 450px) {

  .save-name__input {
    width: 100%;
    margin-left: 4px; 
  }

  .save-name__btn {
    margin-right: 4px;
  }

  .saves-list {
    width: inherit;
    height: 75vh;
    overflow-y: auto;

    border-top: var(--saves--saves-list--border-top);
    border-bottom: var(--saves--saves-list--border-top);    
  }

}
</style>