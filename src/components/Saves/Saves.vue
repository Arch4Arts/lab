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
          :placeholder="($store.state.gameLang) ? defaultSaveName : defaultSaveName_ru"
          @keyup.enter="saveGame()"
          v-model="saveNameInput"
        ></v-text-field>
        <!-- КНОПКА: СОХРАНИТЬ + ПОДСКАЗКА -->
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn class="save-name__btn saves-v-btns" v-on="on" @click="saveGame(false)" icon>
              <v-icon color="rgb(126, 193, 255)"> fas fa-download </v-icon>
            </v-btn>
          </template>
            <span v-if="$store.state.gameLang">New save</span>
            <span v-else>Новое сохранение</span>
        </v-tooltip>
      </v-flex>

      <!-- Список сохранений -->
      <v-list v-show="numberSavesIDB > 0" two-line subheader>
        <v-list-item-group v-model="ListSelectedSaves" multiple>
          <virtual-list
            class="saves-list"
            :size="30"
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
        <div v-if="$store.state.gameLang" class="text-center"><br>No saves<br><br></div>
        <div v-else class="text-center"><br>Сохранения отсутствуют<br><br></div>
      </div>
    </v-card>
    <!-- СОХР НА ДИСК / ЗАГР С ДИСКА / ПЕРЕЗАПУСК / УДАЛЕНИЕ ВСЕХ СОХРАНЕНИЙ -->
    <div class="text-right">
      <!-- Перезапуск игры -->
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn class="restart-game-btn saves-v-btns" @click="showModalRestart = !showModalRestart" v-on="on" icon>
            <v-icon color="rgb(255, 102, 102)"> fas fa-power-off </v-icon>
          </v-btn>
        </template>
          <span v-if="$store.state.gameLang">showModalRestart game</span>
          <span v-else >Перезапуск игры</span>
      </v-tooltip>
      <!-- Сохранение на диск -->
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn class="save-all-btn" @click="prepareDataSaveToDisk()" v-on="on" icon>
            <v-icon color="rgb(126, 193, 255)"> fas fa-hdd </v-icon>
          </v-btn>
        </template>
          <span v-if="$store.state.gameLang">Save to Disk</span>
          <span v-else >Сохранить на диск</span>
      </v-tooltip>
      <!-- Загрузка с диска -->
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn class="load-save-all-btn saves-v-btns" @click="chooseFiles()" v-on="on" icon>
            <input type="file" id="saveUpload" @change="loadFromDisk($event)" multiple hidden />
            <v-icon color="rgb(255, 254, 173)"> far fa-hdd </v-icon>
          </v-btn>
        </template>
          <span v-if="$store.state.gameLang">Load from Disk</span>
          <span v-else >Загрузить с диска</span>
      </v-tooltip>
      <!-- Удаление всех сохранений -->
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn class="delete-all-saves-btn saves-v-btns" @click="showModalDelSavesAll = !showModalDelSavesAll" :disabled="(numberSavesIDB == 0) ? true : false" v-on="on" icon>
            <v-icon color="rgb(255, 102, 102)"> fas fa-trash-alt </v-icon>
          </v-btn>
        </template>
          <span v-if="$store.state.gameLang">Delete all saves</span>
          <span v-else >Удаление всех сохранений</span>
      </v-tooltip>
      <br>
      <!-- Счётчик кол-ва сохранений -->
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <div v-if="$store.state.gameLang" class="text-center" v-on="on">Number of saves: {{numberSavesIDB}}</div>
          <div v-else class="text-center" v-on="on">Кол-во сохранений: {{numberSavesIDB}}</div>
        </template>
          <span v-if="$store.state.gameLang">A large number of saves can cause performance degradation.</span>
          <span v-else>Большое количество сохранений могут вызвать падение производительности.</span>
      </v-tooltip>
    </div>

    <!-- ДИАЛОГ ПОДТВЕРЖДЕНИЯ УДАЛЕНИЯ ВСЕХ СОХРАНЕНИЙ -->
    <v-dialog v-model="showModalDelSavesAll" persistent dark width="230">
        <v-card class="text-center">
          <section v-if="$store.state.gameLang">
          <v-card-title class="headline dark important-modal__header"> Delete all saves </v-card-title>
            <v-card-text class="text--primary"> 
              <br>
              <b>This operation will delete all current saves!</b>
              <br><br>
              Are you sure you want to continue?
            </v-card-text>
          </section>
          <section v-else>
          <v-card-title class="headline dark important-modal__header"> Удаление всех сохранений </v-card-title>
            <v-card-text class="text--primary"> 
              <br>
              <b>Данная операция удалит все текущие сохранения!</b>
              <br><br>
              Вы уверены, что хотите продолжить?
            </v-card-text>
          </section>
          <v-card-actions>
            <v-layout align-center justify-center>
                <section v-if="$store.state.gameLang">
                  <v-btn dark text @click="DeleteAllSaves()"> Yes </v-btn>
                  <v-btn dark text @click="showModalDelSavesAll = !showModalDelSavesAll"> No </v-btn>
                </section>
                <section v-else>
                  <v-btn dark text @click="DeleteAllSaves()"> Да </v-btn>
                  <v-btn dark text @click="showModalDelSavesAll = !showModalDelSavesAll"> Нет </v-btn>
                </section>
            </v-layout>
          </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- ОКНО С ПОДТВЕРЖДЕНИЕМ ПЕРЕЗАПУСКА ИГРЫ-->
    <v-dialog v-model="showModalRestart" persistent dark width="230">
        <v-card class="text-center">
          <section v-if="$store.state.gameLang">
          <v-card-title class="headline dark important-modal__header"> showModalRestart game </v-card-title>
            <v-card-text class="text--primary">
              <br> 
              <b>When you showModalRestart the game, all current progress will be lost!</b>
              <br><br>
              Are you sure you want to continue?
            </v-card-text>
          </section>
          <section v-else>
          <v-card-title class="headline dark important-modal__header"> Перезапуск игры </v-card-title>
            <v-card-text class="text--primary"> 
              <br>
              <b>При перезапуске игры, будeт потерян весь текущий прогресс!</b>
              <br><br>
              Вы уверены, что хотите продолжить?
            </v-card-text>
          </section>
          <v-card-actions>
            <v-layout align-center justify-center>
                <section v-if="$store.state.gameLang">
                  <v-btn dark text @click="restartGame()"> Yes </v-btn>
                  <v-btn dark text @click="showModalRestart = !showModalRestart"> No </v-btn>
                </section>
                <section v-else>
                  <v-btn dark text @click="restartGame()"> Да </v-btn>
                  <v-btn dark text @click="showModalRestart = !showModalRestart"> Нет </v-btn>
                </section>
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

import WebCrypto from './SavesWebCrypto'; // Модуль для шифрования и дешифрования сохранений

import localforage from 'localforage';

import { resetState }  from '../../stores/store';
import store from '../../stores/store';

import iziToast from 'izitoast/dist/js/iziToast.min.js';

import updateAllThemes from '../../styles/updateAllThemes';

import eventBus from '../initEventBus'

import savesListComp from './SavesList'

import VirtualList from 'vue-virtual-scroll-list'

// Конфиги
localforage.config({
    name: 'vuex',
    storeName: 'saves'
});

iziToast.settings({
  progressBar: false,
  displayMode: 2,
  closeOnClick: true,
  close: false,
  icon: 'fal fa-info-circle',
  messageSize: '16',
  theme: 'light',
  position: 'bottomCenter'
});

export default {
  data: () => ({
    component: savesListComp,

    showModalRestart: false, // Для показа модального окна, меняется при нажатия на кнопку и появляется диалог
    showModalDelSavesAll: false, // Для показа модального окна, меняется при нажатия на кнопку и появляется диалог

    isEndSaveList: false, // Достигнут ли конец списка
    savesNumber: 0, // Кол-во сейвов

    ListSelectedSaves: [],

    saveNameInput: '', // Поле ввода сохранения
    defaultSaveName: 'New save', // Placeholder поля ввода
    defaultSaveName_ru: 'Новое сохранение',

    savesList: [], // Рабочий список отсортированных сохранений 
    savesHeaderIDB: [], // Список сохранений, для сортировки
    savesHeaderIDBSorted: [], // Первоначальный список отсортированных сохранеий (по дате Unix)
    numberSavesIDB: 0, //  Кол-во сохранений в БД
  }),
  created: async function () {
    this.savesHeaderIDB = await localforage.keys().then(keysList => this.savesHeaderIDB = keysList); // все ключи из IndexedDB
    this.numberSavesIDB = await localforage.length().then(length => this.numberSavesIDB = length); // Кол-во сохранений в IndexedDB
    if (this.numberSavesIDB > 0) {
      for (let i = 0; i < this.numberSavesIDB; i++) { // Преобразуем строку в объект для сортировки
        var saveHeader = this.savesHeaderIDB[i].split(',');
        this.savesHeaderIDBSorted.push({saveName: saveHeader[0],saveTime: saveHeader[1],saveID: saveHeader[2],saveGameVersion: saveHeader[3]}); 
      }
      this.savesList = this.savesHeaderIDBSorted.sort(this.sortBy('saveID')); // сортируем
    }
    this.savesNumber = this.numberSavesIDB;
  },
  mounted(){
    // Подписываемся на события
    eventBus.$on('QuickSave', this.isQuickSave)
    eventBus.$on('QuickLoad', this.isQuickLoad)
  },
  beforeDestroy(){
    eventBus.$off('QuickSave')
    eventBus.$off('QuickLoad')
  },
  methods:{
    // Сортировка по...
    sortBy(key) { // (убыванию) desc <, asc (возрастанию) >
      return (a, b) => (a[key] < b[key]) ? 1 : ((b[key] < a[key]) ? -1 : 0);
    },
    // Обновляет кол-во сохранений, при новом сохранении, или удалении и т.д.
    async updateNumberSavesIDB(){
      this.numberSavesIDB = await localforage.length().then(length => this.numberSavesIDB = length); // Кол-во сохранений в IndexedDB
    },
    isQuickSave(){
      let isExist = false;
      // Перебираем список
      for (let key in this.savesList) {
        // Если быстрое сохранение найдно, перезаписываем
        if (this.savesList[key].saveName == 'Quick Save' || this.savesList[key].saveName == 'Быстрое сохранение') {
          isExist = true
          this.overwriteSave(
            this.savesList[key].saveName, 
            this.savesList[key].saveTime, 
            this.savesList[key].saveID, 
            this.savesList[key].saveGameVersion
          )
          // Прерываем цикл, чтобы не создавались дубликаты
          break;
        }
      }
      // Если быстрого сохранения нет, делаем новое
      if (!isExist) {
        this.saveGame(true)
      }
    },
    isQuickLoad(){
      for (let key in this.savesList) {
        if (this.savesList[key].saveName == 'Quick Save' || this.savesList[key].saveName == 'Быстрое сохранение') {
          this.loadSave(
            this.savesList[key].saveName, 
            this.savesList[key].saveTime, 
            this.savesList[key].saveID, 
            this.savesList[key].saveGameVersion
          )
          break;
        }
      }
    },
    // Сохранение игры
    async saveGame(isQuickSave){
      // Проверка на QuickSave
      if (isQuickSave) { 
        (this.$store.state.gameLang) ? name = 'Quick Save' : name = 'Быстрое сохранение'          
      } else {
        var name = this.saveNameInput // Копируем значение
        this.saveNameInput = '' // И очищаем поле ввода
        if (name === '') // Проверка введенно ли имя сохранения, если нет, назначаем стандартное
          (this.$store.state.gameLang) ? name = 'New Save' : name = 'Новое сохранение'    
      }

      this.$store.state.saveName = name; // Имя
      this.$store.state.saveTime = dayjs().format("DD.MM.YYYY - HH:mm"); // Время сохранения

      this.$store.state.saveID = dayjs().format("x"); // миллисекунды с начала эпохи Unix
      this.$store.state.saveGameVersion = this.$root.gameVersion; // Версия игры на момент сохранения

      // Объединяем все данные в один заголовок
      var saveHeader = `${this.$store.state.saveName},${this.$store.state.saveTime},${this.$store.state.saveID},${this.$store.state.saveGameVersion}`;
      // Шифруем
      await WebCrypto(saveHeader, JSON.stringify(this.$store.state))
      // Оповещение
      this.$store.state.gameLang 
        ? iziToast.info({message: 'Game successfully saved'})
        : iziToast.info({message: 'Игра успешно сохранена'})
      // Добавляем новоё сохранение в отображаемый список
      this.savesList.unshift({ 
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
      var saveHeader = `${saveName},${this.$store.state.saveTime},${this.$store.state.saveID},${this.$root.gameVersion}`;
      await WebCrypto(saveHeader, JSON.stringify(this.$store.state)) // Добавем новый за место старого (удалённого)
      // Оповещение
      this.$store.state.gameLang 
        ? iziToast.info({message: 'Saving successfully overwritten'})
        : iziToast.info({message: 'Сохранение успешно перезаписано'})
      // Ищем выбранное сохранение для перезаписи и обновляем его время и ID (чтобы не перерендоривать весь список)
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
      // Автоматическое закрытие панели сохранений, если включено
      if (this.$store.state.autoCloseSavesDrawer) this.autoCloseDrawer()
    },
    // Загрузка сохранения
    async loadSave(saveName, saveTime, saveID, saveGameVersion){
      // Заменяем store
      await this.$store.replaceState(await WebCrypto(`${saveName},${saveTime},${saveID},${saveGameVersion}`));
      // Перерисовываем компоненты плееров для применянения настроек звука
      this.$store.state.reRender_mChatPlayersVolume += 1;
      // Фиксируем новые переменные
      this.$store.commit('updateStores');
      // Обновляем темы
      updateAllThemes()
      // Очистка списка выбранных сохранеий (т.к они выбираются при нажатии кнопок: Перезаписи и Загрузки сохранения)
      this.ListSelectedSaves = [];
      // Автоматическое закрытие панели сохранений, если включено
      if (this.$store.state.autoCloseSavesDrawer) this.autoCloseDrawer()
      // Оповещение
      this.$store.state.gameLang 
        ? iziToast.info({message: 'Game loaded successfully', backgroundColor: 'rgb(255, 254, 173)'})
        : iziToast.info({message: 'Игра загружена успешно', backgroundColor: 'rgb(255, 254, 173)'})
    },
    // Удаление сохранения
    deleteSave(saveName, saveTime, saveID, saveGameVersion) {
      // Удаляем
      localforage.removeItem(`${saveName},${saveTime},${saveID},${saveGameVersion}`)
      // Оповещенеие
      this.$store.state.gameLang 
        ? iziToast.info({message: 'Saving has been deleted!', backgroundColor: 'rgb(255, 102, 102)', icon: 'fas fa-exclamation-triangle'})
        : iziToast.info({message: 'Сохранение было удалено!', backgroundColor: 'rgb(255, 102, 102)', icon: 'fas fa-exclamation-triangle'})
      // Находим в отображаемом списке удалённое сохранение
      let indexDeletedSave = this.savesList.findIndex(function(item) {
        return (item.saveID === saveID)
      })
      // Удаляем из списка
      this.savesList.splice(indexDeletedSave, 1);
      // Стал ли список пустым?
      // Обновляем кол-во сохранение в БД
      this.updateNumberSavesIDB()
    },
    // Удаление всех сохранений
    async DeleteAllSaves(){
      // Очистка хранилища
      await localforage.clear()
      // Оповещение
      this.$store.state.gameLang 
        ? iziToast.warning({message: 'All saves have been deleted!', icon: 'fas fa-exclamation-triangle', backgroundColor: 'rgb(255, 102, 102)'})
        : iziToast.warning({message: 'Всё сохранения были удалены!', icon: 'fas fa-exclamation-triangle', backgroundColor: 'rgb(255, 102, 102)'})
      // Закрываем модальное окно
      this.showModalDelSavesAll = false
      // Обнуляем список сохранений (перерисовываем список)
      this.savesList = []
      this.updateNumberSavesIDB()
    },
    // Подготовка данных к сохранению на диск пользователя
    async prepareDataSaveToDisk() {
      var saveFile = ''
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
        if (this.$store.state.gameLang)
          this.saveToDisk(`${this.$root.gameName}.${(i == 1 ? 'save' : 'saves')}`, saveFile)
        else
          this.saveToDisk(`${this.$root.gameName}.${(i == 1 ? 'save' : 'saves')}`, saveFile)
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
        if (this.$store.state.gameLang)
          this.saveToDisk(`${this.$root.gameName}.saves`, saveFile)
        else
          this.saveToDisk(`${this.$root.gameName}.saves`, saveFile)
      }
      else {
        this.$store.state.gameLang 
          ? iziToast.info({message: 'There are no saves'})
          : iziToast.info({message: 'Сохранения отсутствуют'})
      }
    },
    // Сохранение на диск
    saveToDisk(filename, data, mime, bom) {
        var blobData = (typeof bom !== 'undefined') ? [bom, data] : [data]
        var blob = new Blob(blobData, {type: mime || 'application/octet-stream'});
        if (typeof window.navigator.msSaveBlob !== 'undefined') {
            window.navigator.msSaveBlob(blob, filename);
        }
        else {
            var blobURL = (window.URL && window.URL.createObjectURL) ? window.URL.createObjectURL(blob) : window.webkitURL.createObjectURL(blob);
            var tempLink = document.createElement('a');
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
    },
    // Для выбора файлов на загрузку
    chooseFiles() {
      document.getElementById("saveUpload").click()
    },
    // Загрузка файлов с диска пользователя
    loadFromDisk(event){
      // Файлы
      var files = event.target.files 
      // Если файлов несколько, обрабатываем каждый
      for (var file of files) {
        // Процесс чтения данных из файла (нужен для FileReader, т.е он асинхронный)
        var processFile = new Promise((resolve, reject) => {
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
          if (result.indexOf('cipherData') > 0) {
            // Функция преобразования в ArrayBuffer и BufferView, завращаются два этих представления
            let str2ab = function(str) {
              var data = new Object();
              data.buf = new ArrayBuffer(str.length);
              data.bufView = new Uint8Array(data.buf);
              for (var i = 0, strLen = str.length; i < strLen; i++) {
                data.bufView[i] = str.charCodeAt(i);
              }
              return data;
            };
            // Функция определения содержится ли в файле больше одного сохранения
            let detectMultiSave = function(str, substr) {
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
            for (var i = 0; i < savesNumber; i++) {
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
              this.savesList.unshift({ 
                saveName: saveHeaderElem[0], 
                saveTime: saveHeaderElem[1], 
                saveID: saveHeaderElem[2], 
                saveGameVersion: saveHeaderElem[3]
              })
            }
          } else {
          this.$store.state.gameLang 
            ? iziToast.warning({message: 'This file does not contain any save data', position: 'bottomCenter', icon: 'fas fa-exclamation-triangle', backgroundColor: 'rgb(255, 102, 102)'})
            : iziToast.warning({message: 'В данном файле не содержится данные сохранения', position: 'bottomCenter', icon: 'fas fa-exclamation-triangle', backgroundColor: 'rgb(255, 102, 102)'})
          }
        }).then(() => {
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
      await resetState()
      await localStorage.removeItem(`vuex`);
      await location.reload()
    },
    autoCloseDrawer(){
      if (this.$store.state.isOpenSavesDrawer) this.$store.state.isOpenSavesDrawer = false;
    },
    // Записывает изменения стейта из v-model
    drawerShowState(isShow){
      if (!isShow) this.$store.commit('updateStores')
    },
  },
  components: {
    savesListComp,
    'virtual-list': VirtualList
  },
}
</script>

<style scoped>

.v-navigation-drawer {
  background: var(--v-navigation-drawer--background) !important;
  border-left: var(--v-navigation-drawer--border-left) !important;
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

.delete-all-saves-btn {
  margin-right: 15px;
  background: transparent !important;
}

.save-all-btn {
  background: transparent !important;
}

.load-save-all-btn {
  margin-right: 14px;
  background: transparent !important;
}

.restart-game-btn {
  margin-right: 10px;
  background: transparent !important;
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