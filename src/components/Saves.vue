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
      <v-flex xs12 sm12 md12 class="input-area">
        <v-text-field dark
          class="save-name__input"
          color="grey lighten-2"
          autofocus
          :placeholder="($store.state.gameLang) ? defaultSaveName : defaultSaveName_ru"
          @keyup.enter="saveGame()"
          v-model="saveNameInput"
        ></v-text-field>
        <!-- КНОПКА: СОХРАНИТЬ + ПОДСКАЗКА -->
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn class="save-name__btn saves-v-btns" v-on="on" @click="saveGame()" icon>
              <v-icon color="rgb(126, 193, 255)"> fas fa-download </v-icon>
            </v-btn>
          </template>
            <span v-if="$store.state.gameLang">New save</span>
            <span v-else>Новое сохранение</span>
        </v-tooltip>
      </v-flex>

      <!-- СПИСОК СОХРАНЕНИЙ -->
      <v-list two-line subheader>
      <v-list-item-group v-model="ListSelectedSaves" multiple>
      <!-- A pull-down refresh saves list -->
      <div class="scroll-area--border">
      <pull-to 
        @infinite-scroll="loadMoreSaves" 
        :is-top-bounce="false" 
        :is-bottom-bounce="false" 
        v-if="this.$store.state.isOpenSavesDrawer"
      >
      <!-- Список сохранений -->
      <div class="scroll-area"> 
        <!-- Если нет сохранений -->
        <div v-if="$store.state.gameLang" v-show="numberSavesIDB == 0" class="text-center"><v-divider/><br>No saves<br><br></div>
        <div v-else v-show="numberSavesIDB == 0" class="text-center"><v-divider/><br>Сохранения отсутствуют<br><br></div>
        
        <!-- Сохранение -->
        <v-list-item
          v-for="save in savesList"
          :key="save.saveID"
          :value="`${save.saveName},${save.saveTime},${save.saveID},${save.saveGameVer}`"
        >
        <!-- Информация о имени и времени -->
          <v-list-item-content>
            <v-list-item-title>{{ save.saveName }}</v-list-item-title>
            <v-list-item-subtitle>{{ save.saveTime }}</v-list-item-subtitle>
          </v-list-item-content>
          <!-- КНОПКИ WRITE/LOAD/DELETE -->
          <v-list-item-action 
            v-for="(icon ,i) in vForBtns" 
            :key="'icon-id_' + i"
          >
            <!-- EN WRITE/LOAD/DELETE-->
            <v-tooltip v-if="$store.state.gameLang" bottom>
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" icon
                @click="
                  (icon == 'fas fa-trash') 
                  ? 
                  deleteSave(save.saveName, save.saveTime, save.saveID, save.saveGameVer) 
                  : 
                    (icon == 'fas fa-download') 
                    ? 
                    overwriteSave(save.saveName, save.saveTime, save.saveID, save.saveGameVer) 
                    : 
                    loadSave(save.saveName, save.saveTime, save.saveID, save.saveGameVer)"
                > 
                  <v-icon :color="(icon == 'fas fa-download') ? 'rgb(126, 193, 255)' : (icon == 'fas fa-upload') ? 'rgb(255, 254, 173)' : 'rgb(255, 102, 102)'"> {{ icon }} </v-icon>
                </v-btn>
              </template>
                <span v-if="icon == 'fas fa-download'">Overwrite</span>
                <span v-if="icon == 'fas fa-upload'">Load</span>
                <span v-if="icon == 'fas fa-trash'">Delete</span>
            </v-tooltip>
            <!-- RU СОХРАНИТЬ/ЗАГРУЗИТЬ/УДАЛИТЬ -->
            <v-tooltip v-else bottom>
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" icon
                class="saves-v-btns"
                @click="
                  (icon == 'fas fa-trash') 
                  ? 
                  deleteSave(save.saveName, save.saveTime, save.saveID, save.saveGameVer) 
                  : 
                    (icon == 'fas fa-download') 
                    ? 
                    overwriteSave(save.saveName, save.saveTime, save.saveID, save.saveGameVer) 
                    : 
                    loadSave(save.saveName, save.saveTime, save.saveID, save.saveGameVer)"
                > 
                  <v-icon :color="(icon == 'fas fa-download') ? 'rgb(126, 193, 255)' : (icon == 'fas fa-upload') ? 'rgb(255, 254, 173)' : 'rgb(255, 102, 102)'"> {{ icon }} </v-icon>
                </v-btn>
              </template>
                <span v-if="icon == 'fas fa-download'">Перезаписать</span>
                <span v-if="icon == 'fas fa-upload'">Загрузить</span>
                <span v-if="icon == 'fas fa-trash'">Удалить</span>
            </v-tooltip>
          </v-list-item-action>
        </v-list-item>
        <!-- Анимация прогрузки новых сохранений -->
        <div v-if="savesList.length < numberSavesIDB" class="text-center pa-2">
          <v-progress-circular indeterminate size="28" />
        </div>
        <!-- Конец списка сохранений -->
        <!-- <div v-if="numberSavesIDB > 10" class="text-center pa-2">
          <blockquote v-if="$store.state.gameLang" class="blockquote">End of list</blockquote>
          <blockquote v-else class="blockquote">Конец списка</blockquote>
        </div> -->

      </div>
      </pull-to>
      </div>
      </v-list-item-group>
      </v-list>
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
          <v-btn class="saves-v-btns" @click="prepareDataSaveToDisk()" v-on="on" icon>
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

import WebCrypto from '../components/WebCrypto'; // Модуль для шифрования и дешифрования сохранений
import localforage from 'localforage';
import { resetState }  from '../stores/store';
import store from '../stores/store';

import PullTo from 'vue-pull-to';

import iziToast from 'izitoast/dist/js/iziToast.min.js';

import updateAllThemes from '../styles/updateAllThemes';

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
  theme: 'light'
});

export default {
  data: () => ({
    showModalRestart: false, // Для показа модального окна, меняется при нажатия на кнопку и появляется диалог
    showModalDelSavesAll: false, // Для показа модального окна, меняется при нажатия на кнопку и появляется диалог

    // IsSaveExist: -1, // Есть ли сейвы
    isEndSaveList: false, // Достигнут ли конец списка
    savesNumber: 0, // Кол-во сейвов

    vForBtns: ['fas fa-download','fas fa-upload','fas fa-trash'],

    ListSelectedSaves: [],

    saveNameInput: '', // Поле ввода сохранения
    defaultSaveName: 'New save', // Placeholder поля ввода
    defaultSaveName_ru: 'Новое сохранение',

    savesList: [], // Рабочий список отсортированных сохранений
    savesHeaderIDB: [], // Список сохранений, для сортировки
    savesHeaderIDBSorted: [], // Отсортированные сохранения (по дате Unix)
    numberSavesIDB: 0, //  Кол-во сохранений в БД
    startNumberSavesRender: 12, // Сколько показываются сохранений при первой отрисовке
  }),
  created: async function () {
    this.savesHeaderIDB = await localforage.keys().then(keysList => this.savesHeaderIDB = keysList); // все ключи из IndexedDB
    this.numberSavesIDB = await localforage.length().then(lf_length => this.numberSavesIDB = lf_length); // Кол-во сохранений в IndexedDB
    var saves = [];
    // (this.numberSavesIDB > 0) ? this.IsSaveExist = 1 : this.IsSaveExist = 0 // Проверка на наличие сейвов
    if (this.numberSavesIDB > 0) {
      for (let i = 0; i < this.numberSavesIDB; i++) { // Преобразуем строку в объект для сортировки
        var saveHeader = this.savesHeaderIDB[i].split(',');
        this.savesHeaderIDBSorted.push({saveName: saveHeader[0],saveTime: saveHeader[1],saveID: saveHeader[2],saveGameVer: saveHeader[3]}); 
      }
      this.savesHeaderIDBSorted.sort(this.sortBy('saveID')); // сортируем
      this.savesList = this.savesHeaderIDBSorted.slice(0, this.startNumberSavesRender); // копируем диапазон от сортированного массива в массив для первичной отрисовки
    }
    this.savesNumber = this.numberSavesIDB;
  },
  methods:{
    // Обновляет кол-во сохранений, при новом сохранении, или удалении и т.д.
    async updateNumberSavesIDB(){
      this.numberSavesIDB = await localforage.length().then(lf_length => this.numberSavesIDB = lf_length); // Кол-во сохранений в IndexedDB
    },
    // Подгружает сихранений при прокрутке вниз
    loadMoreSaves() {
      this.updateNumberSavesIDB();
      // console.log(`В базе: ${this.numberSavesIDB}, в списке: ${this.savesList.length}`)
      if (this.savesList.length < this.numberSavesIDB) {
        let newElements = this.savesHeaderIDBSorted.slice(this.savesList.length, this.savesList.length + 9); // Копируем часть отсортированного массива в newElements
        this.savesList = this.savesList.concat(newElements); // Склеиваем список сохранений и скопированную часть массива 
        // (this.savesList.length === this.numberSavesIDB) ? this.isEndSaveList = true : this.isEndSaveList = false 
      }
    },
    // Сортировка по...
    sortBy(key) { // (убыванию) desc <, asc (возрастанию) >
      return (a, b) => (a[key] < b[key]) ? 1 : ((b[key] < a[key]) ? -1 : 0);
    },
    // Сохранение игры
    async saveGame(){
      try {
        var name = this.saveNameInput // Копируем значение
        this.saveNameInput = '' // И очищаем поле ввода
        if (name === '') // Проверка введенно ли имя сохранения, если нет, назначаем стандартное
          (this.$store.state.gameLang) ? name = 'New Save' : name = 'Новое сохранение'

        this.$store.state.saveName = name; // Имя
        this.$store.state.saveTime = dayjs().format("DD.MM.YYYY - HH:mm"); // Время сохранения

        this.$store.state.saveID = dayjs().format("x"); // миллисекунды с начала эпохи Unix
        this.$store.state.saveGameVer = this.$store.state.gameVersion; // Версия игры на момент сохранения

        // Объединяем все данные в один заголовок
        var saveHeader = `${this.$store.state.saveName},${this.$store.state.saveTime},${this.$store.state.saveID},${this.$store.state.saveGameVer}`;
        // Шифруем
        await WebCrypto(saveHeader, JSON.stringify(this.$store.state))
        // Оповещение
        this.$store.state.gameLang 
          ? iziToast.info({message: 'Game successfully saved', position: 'bottomCenter'})
          : iziToast.info({message: 'Игра успешно сохранена', position: 'bottomCenter'})
        // Добавляем новоё сохранение в отображаемый список
        this.savesList.unshift({ 
          saveName: this.$store.state.saveName, 
          saveTime: this.$store.state.saveTime, 
          saveID: this.$store.state.saveID, 
          saveGameVer: this.$store.state.saveGameVer
        })
        this.savesList.sort(this.sortBy('saveID'));
        this.updateNumberSavesIDB()
      }
      catch(error) {
        this.$root.errNotify(error)
      }
    },
    // Перезапись сохранения
    async overwriteSave(saveName, saveTime, saveID, saveGameVer){
      try {
        this.$store.state.saveTime = dayjs().format("DD.MM.YYYY - HH:mm"); // Обновляем время сохранения
        this.$store.state.saveID = dayjs().format("x");// миллисекунды с начала эпохи Unix
        
        // Объединяем все данные в один заголовок
        var saveHeader = `${saveName},${this.$store.state.saveTime},${this.$store.state.saveID},${this.$store.state.gameVersion}`;
        await WebCrypto(saveHeader, JSON.stringify(this.$store.state)) // Добавем новый за место старого (удалённого)
        // Оповещение
        this.$store.state.gameLang 
          ? iziToast.info({message: 'Saving successfully overwritten', position: 'bottomCenter'})
          : iziToast.info({message: 'Сохранение успешно перезаписано', position: 'bottomCenter'})
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
        localforage.removeItem(`${saveName},${saveTime},${saveID},${saveGameVer}`)
      }
      catch(error) {
        this.$root.errNotify(error)
      }
    },
    // Загрузка сохранения
    async loadSave(saveName, saveTime, saveID, saveGameVer){
      try {
        // Заменяем store
        await this.$store.replaceState(await WebCrypto(`${saveName},${saveTime},${saveID},${saveGameVer}`));
        // Перерисовываем компоненты плееров для применянения настроек звука
        this.$store.state.reRender_mChatPlayersVolume += 1;
        // Фиксируем новые переменные
        this.$store.commit('updateStores');
        // Обновляем темы
        updateAllThemes()
        // Очистка списка выбранных сохранеий (т.к они выбираются при нажатии кнопок: Перезаписи и Загрузки сохранения)
        this.ListSelectedSaves = [];
        // Оповещение
        this.$store.state.gameLang 
          ? iziToast.info({message: 'Game loaded successfully', position: 'bottomCenter', backgroundColor: 'rgb(255, 254, 173)'})
          : iziToast.info({message: 'Игра загружена успешно', position: 'bottomCenter', backgroundColor: 'rgb(255, 254, 173)'})
      }
      catch(error) {
        this.$root.errNotify(error)
      }
    },
    // Удаление сохранения
    deleteSave(saveName, saveTime, saveID, saveGameVer) {
      try {
        // Удаляем
        localforage.removeItem(`${saveName},${saveTime},${saveID},${saveGameVer}`)
        // Оповещенеие
        this.$store.state.gameLang 
          ? iziToast.info({message: 'Saving has been deleted!', position: 'bottomCenter', backgroundColor: 'rgb(255, 102, 102)', icon: 'fas fa-exclamation-triangle'})
          : iziToast.info({message: 'Сохранение было удалено!', position: 'bottomCenter', backgroundColor: 'rgb(255, 102, 102)', icon: 'fas fa-exclamation-triangle'})
        // Находим в отображаемом списке удалённое сохранение
        let indexDeletedSave = this.savesList.findIndex(function(item) {
          return (item.saveID === saveID)
        })
        // Удаляем из списка
        this.savesList.splice(indexDeletedSave, 1);
        // Стал ли список пустым?
        // Обновляем кол-во сохранение в БД
        this.updateNumberSavesIDB()
      }
      catch(error) {
        this.$root.errNotify(error)
      }
    },
    // Удаление всех сохранений
    async DeleteAllSaves(){
      try {
        // Очистка хранилища
        await localforage.clear()
        // Оповещение
        this.$store.state.gameLang 
          ? iziToast.warning({message: 'All saves have been deleted!', position: 'bottomCenter', icon: 'fas fa-exclamation-triangle', backgroundColor: 'rgb(255, 102, 102)'})
          : iziToast.warning({message: 'Всё сохранения были удалены!', position: 'bottomCenter', icon: 'fas fa-exclamation-triangle', backgroundColor: 'rgb(255, 102, 102)'})
        // Закрываем модальное окно
        this.showModalDelSavesAll = false
        // Обнуляем список сохранений (перерисовываем список)
        this.savesList = []
        this.updateNumberSavesIDB()
      }
      catch(error) {
        this.$root.errNotify(error)
      }
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
          this.saveToDisk(`${this.$store.state.gameName}.${(i == 1 ? 'save' : 'saves')}`, saveFile)
        else
          this.saveToDisk(`${this.$store.state.gameName}.${(i == 1 ? 'save' : 'saves')}`, saveFile)
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
          this.saveToDisk(`${this.$store.state.gameName}.saves`, saveFile)
        else
          this.saveToDisk(`${this.$store.state.gameName}.saves`, saveFile)
      }
      else {
        this.$store.state.gameLang 
          ? iziToast.info({message: 'There are no saves', position: 'bottomCenter'})
          : iziToast.info({message: 'Сохранения отсутствуют', position: 'bottomCenter'})
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
                saveGameVer: saveHeaderElem[3]
              })
            }
          } else {
          this.$store.state.gameLang 
            ? iziToast.warning({message: 'This file does not contain any save data', position: 'bottomCenter', icon: 'fas fa-exclamation-triangle', backgroundColor: 'rgb(255, 102, 102)'})
            : iziToast.warning({message: 'В данном файле не содержится данные сохранения', position: 'bottomCenter', icon: 'fas fa-exclamation-triangle', backgroundColor: 'rgb(255, 102, 102)'})
          }
        }).then(() => {
            // Сортируем
            this.savesList.sort(this.sortBy('saveID'));
            this.updateNumberSavesIDB()
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
    // Записывает изменения стейта из v-model
    drawerShowState(isShow){
      if (!isShow) this.$store.commit('updateStores')
    },
  },
  components: {
    PullTo
  },
}
</script>

<style>

.v-navigation-drawer {
  background: var(--v-navigation-drawer--background) !important;
  border-left: var(--v-navigation-drawer--border-left) !important;
}

.IsSaveExist {
  position: absolute;
}

.vue-pull-to-wrapper > .scroll-container[data-v-81faaf1a]::-webkit-scrollbar { 
  display: none;  /* Safari and Chrome */
  width: 0px;  /* ширина scrollbar'a */
}

.vue-pull-to-wrapper > .scroll-container[data-v-81faaf1a] { 
  -ms-overflow-style: none;  /* IE 10+ */
  scrollbar-width: none; /* Firefox */
}

.scroll-area {
  width: inherit;
  height: 75vh;
}

.scroll-area--border {
  border-top: 2px solid #3B4252;
  border-bottom: 2px solid #3B4252;
}

.saves-loading {
  width: inherit;
  height: 75vh;
}

.saves-v-btns {
  background: transparent !important;
}

.delete-all-saves-btn {
  margin-right: 15px;
}

.load-save-all-btn {
  margin-right: 14px;
}

.restart-game-btn {
  margin-right: 10px;
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
  background: var(--saves--v-list--background) !important;
}



@media (max-width: 450px) {
  .save-name__input {
    width: 100%;
    margin-left: 4px; 
  }

  .save-name__btn {
    margin-right: 4px;
  }

  .scroll-area {
    width: inherit;
    height: calc(100vh - 200px);
  }
}

</style>