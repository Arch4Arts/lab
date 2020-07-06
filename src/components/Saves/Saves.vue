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
    v-model="$store.state.isOpenSavesDrawer"
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
import { saveNotify } from '../../js/notificationSystem';
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
    // Подписываемся на события
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
      const t0 = performance.now()
      if (this.savesList.length) {
        this.savesList.sort(this.sortBy('saveID'))
      }
      const t1 = performance.now()
      console.log((t1 - t0).toFixed(3) + 'ms')
      this.savesNumber = await localforage.length().then(length => length);
    },
    async clearSelectedSavesList(){
      setTimeout(() => this.listSelectedSaves = [], 100)
    },
    // Обновляет кол-во сохранений, при новом сохранении, или удалении и т.д.
    quickSave(){
      let isExist = false;
      for (let save of this.savesList) {
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
      for (let save of this.savesList) {
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
    // Сохранение игры
    async saveGame(saveName){
      saveName = saveName.length ? saveName : this.$t('default-save-name')
      this.saveNameInput = ''; // Очищаем поле ввода
      this.$store.state.saveName = saveName; // Имя
      this.$store.state.saveTime = dayjs().format("DD.MM.YYYY - HH:mm"); // Время сохранения
      this.$store.state.saveID = dayjs().format("x"); // миллисекунды с начала эпохи Unix
      this.$store.state.saveGameVersion = this.$root.gameVersion; // Версия игры на момент сохранения

      // Объединяем все данные в один заголовок
      let saveHeader = `${this.$store.state.saveName},${this.$store.state.saveTime},${this.$store.state.saveID},${this.$store.state.saveGameVersion}`;
      // Шифруем
      await WebCrypto.encrypt(saveHeader, JSON.stringify(this.$store.state))
      .then( encryptedData => localforage.setItem(saveHeader, encryptedData) )
      // Добавляем новоё сохранение в отображаемый список
      this.savesList.push({
        saveName: this.$store.state.saveName, 
        saveTime: this.$store.state.saveTime, 
        saveID: this.$store.state.saveID, 
        saveGameVersion: this.$store.state.saveGameVersion
      })
      this.updateSaveList()
      // Оповещение
      saveNotify({message: this.$t('notify-save')})
      // Автоматическое закрытие панели сохранений
      if (this.$store.state.closeDrawerAfterSaving) 
        this.closeDrawerAfterSaving()
    },
    // Перезапись сохранения
    async overwriteSave(saveName, saveTime, saveID, saveGameVersion){
      this.$store.state.saveTime = dayjs().format("DD.MM.YYYY - HH:mm"); // Обновляем время сохранения
      this.$store.state.saveID = dayjs().format("x");// миллисекунды с начала эпохи Unix
      
      // Объединяем все данные в один заголовок
      let saveHeader = `${saveName},${this.$store.state.saveTime},${this.$store.state.saveID},${this.$root.gameVersion}`;
      // Добавем новый за место старого (удалённого)
      await WebCrypto.encrypt(saveHeader, JSON.stringify(this.$store.state))
        .then( encryptedData => localforage.setItem(saveHeader, encryptedData) )
      // Оповещение
      saveNotify({message: this.$t('notify-overwrite-save')})
      // Ищем выбранное сохранение для перезаписи и обновляем его время и ID (чтобы не перерендерить весь список)
      this.savesList.find(function(item) {
        if (item.saveID === saveID) {
          item.saveTime = dayjs().format("DD.MM.YYYY - HH:mm");
          item.saveID = store.state.saveID;
        }
      })
      // Удаляем выбранное сохранение для перезаписи, если шифрование не сработает, сохранение не будет удалённо
      localforage.removeItem(`${saveName},${saveTime},${saveID},${saveGameVersion}`)
      // Сортируем (чтобы новый элемент в списке вышел на первое место (по времени))
      this.updateSaveList()
      // сбрасываем выделения списка сохранений
      this.clearSelectedSavesList()
      // Автоматическое закрытие панели сохранений, если включено
      if (this.$store.state.closeDrawerAfterSaving) 
        this.closeDrawerAfterSaving()
    },
    // Загрузка сохранения
    async loadSave(saveName, saveTime, saveID, saveGameVersion){
      const name = `${saveName},${saveTime},${saveID},${saveGameVersion}`
      const encryptedData = await localforage.getItem(name).then( data => data )
      const decryptedData = await WebCrypto.decrypt(name, encryptedData).then(data => JSON.parse(data))
      // Заменяем store
      await this.$store.replaceState(decryptedData);
      // Перерисовываем компоненты
      this.$store.state.reRender_mChatPlayersVolume++;
      // Фиксируем новые переменные
      this.$store.commit('updateStore');
      // Обновляем темы
      updateTheme('game');
      updateTheme('mChat');
      // Автоматическое закрытие панели сохранений, если включено
      if (this.$store.state.closeDrawerAfterSaving) this.closeDrawerAfterSaving()
      // Оповещение
      saveNotify({message: this.$t('notify-load-save'), class: 'save-notify__load'})
      // сбрасываем выделения списка сохранений
      this.clearSelectedSavesList()
    },
    // Удаление сохранения
    async deleteSave(saveName, saveTime, saveID, saveGameVersion) {
      // Удаляем
      await localforage.removeItem(`${saveName},${saveTime},${saveID},${saveGameVersion}`)
      // Оповещенеие
      saveNotify({message: this.$t('notify-delete-save'), iconUrl: 'assets/img/exclamation-triangle.svg', class: 'save-notify__delete'})
      // Находим в отображаемом списке удалённое сохранение
      const saveIndex = this.savesList.findIndex(function(item) {
        return (item.saveID === saveID)
      })
      // Удаляем из списка
      this.savesList.splice(saveIndex, 1);
      // Стал ли список пустым?
      // Обновляем кол-во сохранение в БД
      this.updateSaveList()
      // сбрасываем выделения списка сохранений
      this.clearSelectedSavesList()
    },
    // Удаление всех сохранений
    async DeleteAllSaves(){
      // Очистка хранилища
      await localforage.clear()
      // Оповещение
      saveNotify({message: this.$t('notify-delete-all-save'), iconUrl: 'assets/img/exclamation-triangle.svg', class: 'save-notify__delete'})
      // Закрываем модальное окно
      this.showModalDelSavesAll = false
      // Обнуляем список сохранений (перерисовываем список)
      this.savesList = [];
      this.updateSaveList()
    },
    // Перезапуск игры
    async restartGame(){
      // await resetState()
      await localStorage.removeItem(`vuex`);
      await location.reload()
    },
    closeDrawerAfterSaving(){
      if (this.$store.state.isOpenSavesDrawer) 
        this.$store.state.isOpenSavesDrawer = false;
    },
    // регистрация изменений $store.state.isOpenSavesDrawer из v-model
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