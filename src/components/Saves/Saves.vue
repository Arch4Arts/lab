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
    @input="drawerShowState"
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
          @keyup.enter="saveGame()"
          v-model="saveNameInput"
        ></v-text-field>
        <!-- КНОПКА: СОХРАНИТЬ + ПОДСКАЗКА -->
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn class="save-name__btn" v-on="on" @click="saveGame(false)" icon>
              <a-icon class="save-name__btn__color" :icon="['fas', 'download']" />
            </v-btn>
          </template>
            <span>{{ $t('default-save-name') }}</span>
        </v-tooltip>
      </v-flex>

      <!-- Список сохранений -->
      <v-list v-show="numberSavesIDB > 0" two-line subheader>
        <v-list-item-group v-model="ListSelectedSaves" multiple>
          <virtual-list
            class="saves-list"
            :keeps="20"

            data-key="saveID"
            :data-sources="savesList"
            :data-component="component"
            :extra-props="{ 
              numberSavesIDB: numberSavesIDB,
              overwriteSave: overwriteSave,
              loadSave: loadSave,
              deleteSave: deleteSave,
            }"
          />
        </v-list-item-group>
      </v-list>
      <!-- Если нет сохранений -->
      <div v-show="numberSavesIDB == 0" class="saves-list">
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
          <v-btn class="save-to-disk-btn" @click="prepareDataSaveToDisk()" v-on="on" icon>
            <a-icon class="save-to-disk-btn__color" :icon="['fas', 'hdd']" />
          </v-btn>
        </template>
          <span>{{ $t('tooltip__save-to-disk') }}</span>
      </v-tooltip>
      <!-- Загрузка с диска -->
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn class="load-from-disk-btn" @click="chooseFiles()" v-on="on" icon>
            <input type="file" id="saveUpload" @change="loadFromDisk($event)" multiple hidden />
            <a-icon class="load-from-disk-btn__color" :icon="['far', 'hdd']" />
          </v-btn>
        </template>
          <span>{{ $t('tooltip__load-from-disk') }}</span>
      </v-tooltip>
      <!-- Удаление всех сохранений -->
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn class="delete-all-saves-btn" @click="showModalDelSavesAll = !showModalDelSavesAll" :disabled="(numberSavesIDB == 0) ? true : false" v-on="on" icon>
            <a-icon 
              class="delete-all-saves-btn__color" 
              :class="{ 'delete-all-saves-btn__color__disabled': (numberSavesIDB == 0) }" 
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
          <div class="text-center" v-on="on">{{ $t('number-of-saves') }} {{ numberSavesIDB }}</div>
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
import WebCrypto from './SavesWebCrypto'; // Модуль для шифрования и дешифрования сохранений
import localforage from 'localforage';

import eventBus from '../../js/eventBus'
import { saveNotify } from '../../js/notificationSystem'
import updateTheme from '../../styles/updateTheme';

import VirtualList from 'vue-virtual-scroll-list'

import savesListComponent from './SavesList'

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

      isEndSaveList: false, // Достигнут ли конец списка
      savesNumber: 0, // Кол-во сейвов

      ListSelectedSaves: [],

      saveNameInput: '', // Поле ввода сохранения

      savesList: [], // Рабочий список отсортированных сохранений 
      savesHeaderIDB: [], // Список сохранений, для сортировки
      savesHeaderIDBSorted: [], // Первоначальный список отсортированных сохранеий (по дате Unix)
      numberSavesIDB: 0, //  Кол-во сохранений в БД
    }
  },
  created: async function () {
    this.savesHeaderIDB = await localforage.keys().then(keysList => this.savesHeaderIDB = keysList); // все ключи из IndexedDB
    this.numberSavesIDB = await localforage.length().then(length => this.numberSavesIDB = length); // Кол-во сохранений в IndexedDB
    if (this.numberSavesIDB > 0) {
      for (let i = 0; i < this.numberSavesIDB; i++) { // Преобразуем строку в объект для сортировки
        let saveHeader = this.savesHeaderIDB[i].split(',');
        this.savesHeaderIDBSorted.push({saveName: saveHeader[0],saveTime: saveHeader[1],saveID: saveHeader[2],saveGameVersion: saveHeader[3]}); 
      }
      this.savesList = this.savesHeaderIDBSorted.sort(this.sortBy('saveID')); // сортируем
    }
    this.savesNumber = this.numberSavesIDB;
  },
  mounted(){
    // Подписываемся на события
    eventBus.on('QuickSave', this.isQuickSave)
    eventBus.on('QuickLoad', this.isQuickLoad)
  },
  beforeDestroy(){
    eventBus.off('QuickSave')
    eventBus.off('QuickLoad')
  },
  methods:{
    reRender(){
      this.$store.state.reRender_mChatPlayersVolume++;
    },
    // Сортировка по...
    sortBy(key) { // (убыванию) < desc, asc > (возрастанию)
      return (a, b) => (a[key] < b[key]) ? 1 : ((b[key] < a[key]) ? -1 : 0);
    },
    // Обновляет кол-во сохранений, при новом сохранении, или удалении и т.д.
    async updateNumberSavesIDB(){
      this.numberSavesIDB = await localforage.length().then(length => this.numberSavesIDB = length); // Кол-во сохранений в IndexedDB
    },
    isQuickSave(){
      let isExist = false;
      // Перебираем список
      for (let save of this.savesList) {
        // Если быстрое сохранение найдно, перезаписываем
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
        this.saveGame(true)
      }
    },
    isQuickLoad(){
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
    async saveGame(isQuickSave){
      // Проверка на QuickSave
      let saveName;
      if (isQuickSave) { 
        saveName = this.$t('default-quick-save-name');  
      } else {
        saveName = this.saveNameInput // Копируем значение
        this.saveNameInput = '' // И очищаем поле ввода
        if (saveName === '') // Проверка введенно ли имя сохранения, если нет, назначаем стандартное
          saveName = this.$t('default-save-name');
      }

      this.$store.state.saveName = saveName; // Имя
      this.$store.state.saveTime = dayjs().format("DD.MM.YYYY - HH:mm"); // Время сохранения

      this.$store.state.saveID = dayjs().format("x"); // миллисекунды с начала эпохи Unix
      this.$store.state.saveGameVersion = this.$root.gameVersion; // Версия игры на момент сохранения

      // Объединяем все данные в один заголовок
      let saveHeader = `${this.$store.state.saveName},${this.$store.state.saveTime},${this.$store.state.saveID},${this.$store.state.saveGameVersion}`;
      // Шифруем
      await WebCrypto.encrypt(saveHeader, JSON.stringify(this.$store.state))
        .then( encryptedData => localforage.setItem(saveHeader, encryptedData) )
      // Оповещение
      this.$store.state.gameLang == 'ru'
        ? saveNotify({message: 'Игра успешно сохранена'})
        : saveNotify({message: 'Game successfully saved'});
      // Добавляем новоё сохранение в отображаемый список
      this.savesList.push({ 
        saveName: this.$store.state.saveName, 
        saveTime: this.$store.state.saveTime, 
        saveID: this.$store.state.saveID, 
        saveGameVersion: this.$store.state.saveGameVersion
      })
      this.savesList.sort(this.sortBy('saveID'));
      this.updateNumberSavesIDB()
      // Автоматическое закрытие панели сохранений, если включено
      if (this.$store.state.autoCloseSavesDrawer) this.autoCloseDrawer()
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
      this.$store.state.gameLang == 'ru'
        ? saveNotify({message: 'Сохранение успешно перезаписано'})
        : saveNotify({message: 'Saving successfully overwritten'});
      // Ищем выбранное сохранение для перезаписи и обновляем его время и ID (чтобы не перерендерить весь список)
      this.savesList.find(function(item) {
        if (item.saveID === saveID) {
          item.saveTime = dayjs().format("DD.MM.YYYY - HH:mm");
          item.saveID = store.state.saveID;
        }
      })
      // Сортируем (чтобы новый элемент в списке вышел на первое место (по времени))
      this.savesList.sort(this.sortBy('saveID'));
      // Удаляем выбранное сохранение для перезаписи, если шифрование не сработает, сохранение не будет удалённо
      localforage.removeItem(`${saveName},${saveTime},${saveID},${saveGameVersion}`)
      // сбрасываем выделения списка сохранений
      setTimeout(() => this.ListSelectedSaves = [], 100)
      // Автоматическое закрытие панели сохранений, если включено
      if (this.$store.state.autoCloseSavesDrawer) this.autoCloseDrawer()
    },
    // Загрузка сохранения
    async loadSave(saveName, saveTime, saveID, saveGameVersion){
      const name = `${saveName},${saveTime},${saveID},${saveGameVersion}`
      const encryptedData = await localforage.getItem(name).then( data => data )
      const decryptedData = await WebCrypto.decrypt(name, encryptedData).then(data => JSON.parse(data))
      // Заменяем store
      await this.$store.replaceState(decryptedData);
      // Перерисовываем компоненты
      this.reRender()
      // Фиксируем новые переменные
      this.$store.commit('updateStore');
      // Обновляем темы
      updateTheme('game');
      updateTheme('mChat');
      // Автоматическое закрытие панели сохранений, если включено
      if (this.$store.state.autoCloseSavesDrawer) this.autoCloseDrawer()
      // Оповещение
      this.$store.state.gameLang == 'ru'
        ? saveNotify({message: 'Игра загружена успешно', class: 'save-notify__load'})
        : saveNotify({message: 'Game loaded successfully', class: 'save-notify__load'});
      // сбрасываем выделения списка сохранений
      setTimeout(() => this.ListSelectedSaves = [], 100)
    },
    // Удаление сохранения
    deleteSave(saveName, saveTime, saveID, saveGameVersion) {
      // Удаляем
      localforage.removeItem(`${saveName},${saveTime},${saveID},${saveGameVersion}`)
      // Оповещенеие
      this.$store.state.gameLang == 'ru'
        ? saveNotify({message: 'Сохранение было удалено!', iconUrl: 'assets/img/exclamation-triangle.svg', class: 'save-notify__delete'})
        : saveNotify({message: 'Saving has been deleted!', iconUrl: 'assets/img/exclamation-triangle.svg', class: 'save-notify__delete'});
      // Находим в отображаемом списке удалённое сохранение
      let indexDeletedSave = this.savesList.findIndex(function(item) {
        return (item.saveID === saveID)
      })
      // Удаляем из списка
      this.savesList.splice(indexDeletedSave, 1);
      // Стал ли список пустым?
      // Обновляем кол-во сохранение в БД
      this.updateNumberSavesIDB()
      // сбрасываем выделения списка сохранений
      setTimeout(() => this.ListSelectedSaves = [], 100)
    },
    // Удаление всех сохранений
    async DeleteAllSaves(){
      // Очистка хранилища
      await localforage.clear()
      // Оповещение
      this.$store.state.gameLang == 'ru'
        ? saveNotify({message: 'Всё сохранения были удалены!', iconUrl: 'assets/img/exclamation-triangle.svg', class: 'save-notify__delete'})
        : saveNotify({message: 'All saves have been deleted!', iconUrl: 'assets/img/exclamation-triangle.svg', class: 'save-notify__delete'});
      // Закрываем модальное окно
      this.showModalDelSavesAll = false
      // Обнуляем список сохранений (перерисовываем список)
      this.savesList = []
      this.updateNumberSavesIDB()
    },
    // Подготовка данных к сохранению на диск пользователя
    async prepareDataSaveToDisk() {
      let saveFile = ''
      const saveToDisk = function(filename, data, mime, bom) { // Сохранение на диск
        // сбрасываем выделения списка сохранений
        setTimeout(() => this.ListSelectedSaves = [], 100)

        let blobData = (typeof bom !== 'undefined') ? [bom, data] : [data]
        let blob = new Blob(blobData, {type: mime || 'application/octet-stream'});
        if (typeof window.navigator.msSaveBlob !== 'undefined') {
          window.navigator.msSaveBlob(blob, filename);
        }
        else {
          let blobURL = (window.URL && window.URL.createObjectURL) ? window.URL.createObjectURL(blob) : window.webkitURL.createObjectURL(blob);
          let tempLink = document.createElement('a');
          tempLink.style.display = 'none';
          tempLink.href = blobURL;
          tempLink.setAttribute('download', filename);
          if (typeof tempLink.download === 'undefined') {
            tempLink.setAttribute('target', '_blank');
          }
          document.body.appendChild(tempLink);
          tempLink.click();
          setTimeout(function() {
            document.body.removeChild(tempLink);
            window.URL.revokeObjectURL(blobURL);
          }, 0)
        }
      }
      // Выбранны ли определённые сохранения пользователем
      if (this.ListSelectedSaves.length > 0) {
        for (var i = 0; i < this.ListSelectedSaves.length; i++) {
          // Извлекаем данные
          let saveData = await localforage.getItem(this.ListSelectedSaves[i]).then(data => data)
          // Преобразовываем буфер в строку
          let cipherData = String.fromCharCode.apply(null, new Uint8Array(saveData.cipherData));
          // Преобразовываем представление Uint8 в строку
          let iv = String.fromCharCode.apply(null, new Uint8Array(saveData.iv));
          // Устранение двух пробелов в самом начале, если сейф в файле один
          if (saveFile.length > 0)
            saveFile = `${saveFile}\n\n((${this.ListSelectedSaves[i]},cipherData${cipherData}iv${iv}))`
          else
            saveFile = `${saveFile}((${this.ListSelectedSaves[i]},cipherData${cipherData}iv${iv}))`
        }
        if (this.$store.state.gameLang == 'ru')
          saveToDisk(`${this.$root.gameName}.${(i == 1 ? 'save' : 'saves')}`, saveFile)
        else
          saveToDisk(`${this.$root.gameName}.${(i == 1 ? 'save' : 'saves')}`, saveFile)
      }
      else if (this.numberSavesIDB > 0) { // Если нет, обрабатываем всё
        var allSavesKey = await localforage.keys().then(keysList => keysList)
        for (var i = 0; i < allSavesKey.length; i++) {
          // Извлекаем данные
          let saveData = await localforage.getItem(allSavesKey[i]).then(data => data)
          // Преобразовываем буфер в строку
          // Преобразовываем буфер в строку
          let cipherData = String.fromCharCode.apply(null, new Uint8Array(saveData.cipherData));
          // Преобразовываем представление Uint8 в строку
          let iv = String.fromCharCode.apply(null, new Uint8Array(saveData.iv));
          // Устранение двух пробелов в самом начале, если сейф в файле один
          if (saveFile.length > 0)
            saveFile = `${saveFile}\n\n((${allSavesKey[i]},cipherData${cipherData}iv${iv}))`
          else
            saveFile = `${saveFile}((${allSavesKey[i]},cipherData${cipherData}iv${iv}))`
        }
        if (this.$store.state.gameLang == 'ru')
          saveToDisk(`${this.$root.gameName}.saves`, saveFile)
        else
          saveToDisk(`${this.$root.gameName}.saves`, saveFile)
      }
      else {
        if (this.$store.state.gameLang == 'ru')
          saveNotify({message: 'Сохранения отсутствуют'});
        else
          saveNotify({message: 'There are no saves'});
      }
    },
    // Открытие диалогового окна с выбром файлов (для загрузки в приложение)
    chooseFiles() {
      document.getElementById("saveUpload").click()
    },
    // Загрузка файлов с диска пользователя
    loadFromDisk(event){
      // Файлы
      let files = event.target.files 
      // Если файлов несколько, обрабатываем каждый
      for (let file of files) {
        // Процесс чтения данных из файла (нужен для FileReader, т.е он асинхронный)
        const processFile = new Promise((resolve, reject) => {
          let reader = new FileReader();
          // Если данные были успешно прочитаны
          reader.onload = function() {
            // Передаём результат к обработчику then()
            resolve(reader.result);
          };
          // Если произошла ошибка при открытии данных
          reader.onerror = function() {
            // Передаём результат к обработчику cath()
            reject(reader.error)
          };
          reader.readAsText(file);
        })
        processFile.then(result => {
          if (result.includes('cipherData')) {
            // Функция преобразования в ArrayBuffer и BufferView, завращаются два этих представления
            const str2ab = function(str) {
              let data = new Object();
              data.buf = new ArrayBuffer(str.length);
              data.bufView = new Uint8Array(data.buf);
              for (let i = 0, strLen = str.length; i < strLen; i++) {
                data.bufView[i] = str.charCodeAt(i);
              }
              return data;
            };
            // Функция определения содержится ли в файле больше одного сохранения
            const detectMultiSave = function(str, substr) {
              let listIdx = []
              let lastIndex = -1
              while ((lastIndex = str.indexOf(substr, lastIndex + 1)) !== -1) {
                listIdx.push(lastIndex)
              }
              return listIdx
            };
            // Количество сохранений в одном файле
            let savesNumber = detectMultiSave(result, 'cipherData').length
            // Перебираем все сохранения в файле
            for (let i = 0; i < savesNumber; i++) {
              // Определяем позиции заголовка сохранения
              let saveHeader_Start = result.indexOf("((") + 2;
              let saveHeader_End = result.indexOf(",cipherData", 0);
              // Извлекаем заголовок сохранения
              let saveHeader = result.slice(saveHeader_Start, saveHeader_End);
              // Делим строку на подстроки
              let saveHeaderElem = saveHeader.split(',');
              // Определяем позицию cipherData и iv
              let cipherData_Pos = result.indexOf('cipherData', saveHeader_End) + 10;
              let iv_Pos = result.indexOf('iv', cipherData_Pos);
              let iv_PosEnd = result.indexOf('))', iv_Pos);
              // Извлекаем cipherData и iv
              let cipherData = result.slice(cipherData_Pos, iv_Pos)
              let iv = result.slice(iv_Pos + 2, iv_PosEnd)
              // Удаляем ту часть сохранения, которая уже была обработана
              result = result.slice(iv_PosEnd, result.length)
              // Загружаем данные в IDB
              localforage.setItem(saveHeader, { cipherData: str2ab(cipherData).buf, iv: str2ab(iv).bufView })
              // Добавляем сохранение в отображаемый список
              this.savesList.push({ 
                saveName: saveHeaderElem[0], 
                saveTime: saveHeaderElem[1], 
                saveID: saveHeaderElem[2], 
                saveGameVersion: saveHeaderElem[3]
              })
            }
          } else {
            this.$store.state.gameLang == 'ru'
              ? saveNotify({message: 'В данном файле не содержится данные сохранения', iconUrl: 'assets/img/exclamation-triangle.svg', class: 'save-notify__delete'})
              : saveNotify({message: 'This file does not contain any save data', iconUrl: 'assets/img/exclamation-triangle.svg', class: 'save-notify__delete'});
          }
        })
        .then(() => {
            // Сортируем
            this.numberSavesIDB += this.savesList.length
            this.updateNumberSavesIDB()
            this.savesList.sort(this.sortBy('saveID'));
        })
        .catch(error => {
          this.$root.errNotify(error)
        })   
      }
    },
    // Перезапуск игры
    async restartGame(){
      // await resetState()
      await localStorage.removeItem(`vuex`);
      await location.reload()
    },
    autoCloseDrawer(){
      if (this.$store.state.isOpenSavesDrawer) 
        this.$store.state.isOpenSavesDrawer = false;
    },
    // регистрация изменений $store.state.isOpenSavesDrawer из v-model
    drawerShowState(isShow){
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