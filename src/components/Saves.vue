<template>
    <!-- <v-app> -->
    <v-navigation-drawer
      v-model="$store.state.isOpenSavesDrawer"
      temporary
      right
      app
      touchless
      dark
      width="700"
    >
    <v-layout justify-center>
        <v-flex md12 class="Page" style="padding: 0px; height: 100vh;">
          <div>
            <v-card dark elevation="0">
            <v-list two-line subheader class="v-list-bg">
              <v-list-item>
                <v-list-item-content>  
                <!-- ТЕКСТОВОЕ ПОЛЕ ДЛЯ ВВОДА ИМЕНИ СЕЙВА -->
                  <v-flex xs12 sm12 md12>
                  <v-text-field dark
                    class="textfield"
                    color="grey lighten-2"
                    :placeholder="($store.state.gameLang) ? defaultSaveName : defaultSaveName_ru"
                    @keyup.enter="saveGame()"
                    id="saveNameArea"
                  ></v-text-field>
                  </v-flex>

                </v-list-item-content>
                <!-- КНОПКА: СОХРАНИТЬ + ПОДСКАЗКА -->
                  <v-tooltip color="v-tooltip" bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn class="save-btn-right" v-on="on" @click="saveGame()" icon>
                        <v-icon color="rgb(126, 193, 255)"> fas fa-download </v-icon>
                      </v-btn>
                    </template>
                      <span v-if="$store.state.gameLang" class="tip">New save</span>
                      <span v-else class="tip">Новое сохранение</span>
                  </v-tooltip>

              </v-list-item>

              <!-- СПИСОК СОХРАНЕНИЙ -->
                <pull-to @infinite-scroll="loadMore" :is-top-bounce="false" :is-bottom-bounce="false" v-if="this.$store.state.isOpenSavesDrawer">
                <div class="scroll-area"> 

                <div v-if="$store.state.gameLang" v-show="saveExist == 0" class="text-center"><v-divider/><br>No saves<br><br></div>
                <div v-else v-show="saveExist == 0" class="text-center"><v-divider/><br>Сохранения отсутствуют<br><br></div>
                <v-divider v-show="saveExist == 1"/>
                
                  <v-list-item
                    v-for="save in saves"
                    :key="save.saveID"
                    @click="Empty(save.saveID)"
                  >
                  <v-list-item-content>
                    <v-list-item-title>{{ save.saveName }}</v-list-item-title>
                    <v-list-item-subtitle>{{ save.saveTime }}</v-list-item-subtitle>
                  </v-list-item-content>
                  <!-- КНОПКИ WRITE/LOAD/DELETE -->
                  <v-list-item-action v-for="(icon ,i) in icons" :key="'icon-id_' + i">

                    <v-tooltip color="v-tooltip" v-if="$store.state.gameLang" bottom>
                      <template v-slot:activator="{ on }">
                        <v-btn v-on="on" icon
                        @click="(icon == 'fas fa-trash') ? deleteSave(save.saveName, save.saveTime, save.saveID) : (icon == 'fas fa-download') ? overwriteSave(save.saveName, save.saveTime, save.saveID) : loadSave(save.saveName, save.saveTime, save.saveID)"
                        > 
                          <v-icon :color="(icon == 'fas fa-download') ? 'rgb(126, 193, 255)' : (icon == 'fas fa-upload') ? 'rgb(255, 254, 173)' : 'rgb(255, 102, 102)'"> {{ icon }} </v-icon>
                        </v-btn>
                      </template>
                        <span v-if="icon == 'fas fa-download'" class="tip">Overwrite</span>
                        <span v-if="icon == 'fas fa-upload'" class="tip">Load</span>
                        <span v-if="icon == 'fas fa-trash'" class="tip">Delete</span>
                    </v-tooltip>

                    <v-tooltip color="v-tooltip" v-else bottom>
                      <template v-slot:activator="{ on }">
                        <v-btn v-on="on" icon
                        @click="(icon == 'fas fa-trash') ? deleteSave(save.saveName, save.saveTime, save.saveID) : (icon == 'fas fa-download') ? overwriteSave(save.saveName, save.saveTime, save.saveID) : loadSave(save.saveName, save.saveTime, save.saveID)"
                        > 
                          <v-icon :color="(icon == 'fas fa-download') ? 'rgb(126, 193, 255)' : (icon == 'fas fa-upload') ? 'rgb(255, 254, 173)' : 'rgb(255, 102, 102)'"> {{ icon }} </v-icon>
                        </v-btn>
                      </template>
                        <span v-if="icon == 'fas fa-download'" class="tip">Перезаписать</span>
                        <span v-if="icon == 'fas fa-upload'" class="tip">Загрузить</span>
                        <span v-if="icon == 'fas fa-trash'" class="tip">Удалить</span>
                    </v-tooltip>
                  </v-list-item-action>
                </v-list-item>

                <div v-if="!endOfsaveList && saveExist === 1 && saveCount > 11" class="text-center pa-2">
                  <v-progress-circular indeterminate size="28" />
                </div>
                <div v-if="endOfsaveList && saveExist === 1" class="text-center pa-2">
                  <blockquote v-if="$store.state.gameLang" class="blockquote">End of list</blockquote>
                  <blockquote v-else class="blockquote">Конец списка</blockquote>
                </div>

              </div>
              </pull-to>

              <v-divider/>
            </v-list>
          </v-card>
          </div>
            <!-- СОХР НА ДИСК / ЗАГР С ДИСКА / ПЕРЕЗАПУСК / УДАЛЕНИЕ ВСЕХ СОХРАНЕНИЙ -->
            <div class="text-right">
            <v-tooltip color="v-tooltip" top>
              <template v-slot:activator="{ on }">
                <v-btn @click="" v-on="on" icon>
                  <v-icon color="rgb(126, 193, 255)"> fas fa-hdd </v-icon>
                </v-btn>
              </template>
                <span v-if="$store.state.gameLang" class="tip">Save saves to disk</span>
                <span v-else class="tip">Сохранить сохранения на диск</span>
            </v-tooltip>

            <v-tooltip color="v-tooltip" top>
              <template v-slot:activator="{ on }">
                <v-btn @click="" v-on="on" icon>
                  <v-icon color="rgb(255, 254, 173)"> far fa-hdd </v-icon>
                </v-btn>
              </template>
                <span v-if="$store.state.gameLang" class="tip">To load the save from disk</span>
                <span v-else class="tip">Загрузить сохранения с диска</span>
            </v-tooltip>

            <v-tooltip color="v-tooltip" top>
              <template v-slot:activator="{ on }">
                <v-btn @click="restart = !restart" v-on="on" icon>
                  <v-icon color="rgb(255, 102, 102)"> fas fa-power-off </v-icon>
                </v-btn>
              </template>
                <span v-if="$store.state.gameLang" class="tip">Restart game</span>
                <span v-else class="tip">Перезапуск игры</span>
            </v-tooltip>

            <v-tooltip color="v-tooltip" top>
              <template v-slot:activator="{ on }">
                <v-btn @click="deleteAll = !deleteAll" :disabled="(saveExist > 0) ? false : true" v-on="on" icon>
                  <v-icon color="rgb(255, 102, 102)"> fas fa-trash-alt </v-icon>
                </v-btn>
              </template>
                <span v-if="$store.state.gameLang" class="tip">Delete all saves</span>
                <span v-else class="tip">Удаление всех сохранений</span>
            </v-tooltip>
            <br>
            <v-tooltip color="v-tooltip" top>
              <template v-slot:activator="{ on }">
                <div v-if="$store.state.gameLang" class="text-center" v-on="on">Number of saves: {{saveCount}}</div>
                <div v-else class="text-center" v-on="on">Кол-во сохранений: {{saveCount}}</div>
              </template>
                <span v-if="$store.state.gameLang">A large number of saves can cause performance degradation.</span>
                <span v-else>Большое количество сохранений могут вызвать падение производительности.</span>
            </v-tooltip>
            </div>

            <!-- ДИАЛОГ ПОДТВЕРЖДЕНИЯ УДАЛЕНИЯ ВСЕХ СОХРАНЕНИЙ -->
            <v-dialog v-model="deleteAll" persistent dark width="230">
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
                          <v-btn dark text @click="deleteAll = !deleteAll"> No </v-btn>
                        </section>
                        <section v-else>
                          <v-btn dark text @click="DeleteAllSaves()"> Да </v-btn>
                          <v-btn dark text @click="deleteAll = !deleteAll"> Нет </v-btn>
                        </section>
                    </v-layout>
                  </v-card-actions>
              </v-card>
            </v-dialog>
            <!-- ОКНО С ПОДТВЕРЖДЕНИЕМ ПЕРЕЗАПУСКА ИГРЫ-->
            <v-dialog v-model="restart" persistent dark width="230">
               <v-card class="text-center">
                 <section v-if="$store.state.gameLang">
                  <v-card-title class="headline dark important-modal__header"> Restart game </v-card-title>
                    <v-card-text class="text--primary">
                      <br> 
                      <b>When you restart the game, all current progress will be lost!</b>
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
                          <v-btn dark text @click="restart = !restart"> No </v-btn>
                        </section>
                        <section v-else>
                          <v-btn dark text @click="restartGame()"> Да </v-btn>
                          <v-btn dark text @click="restart = !restart"> Нет </v-btn>
                        </section>
                    </v-layout>
                  </v-card-actions>
              </v-card>
            </v-dialog>
        </v-flex>
    </v-layout>
    </v-navigation-drawer>
    <!-- </v-app> -->
</template>

<script>
import dayjs from 'dayjs'; // библиотека для работы с временем
import advancedFormat from 'dayjs/plugin/advancedFormat'; // Плагин
dayjs.extend(advancedFormat);

import WebCrypto from '../components/WebCrypto'; // Модуль для шифрования и дешифрования сохранений
import { resetState }  from '../stores/store';
import store from '../stores/store';

// var CryptoJS = require("crypto-js");

import iziToast from 'izitoast/dist/js/iziToast.min.js';

import PullTo from 'vue-pull-to';

import localforage from 'localforage';

import updateAllThemes from '../Styles/updateAllThemes';

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
      restart: false,
      deleteAll: false,
      saveExist: -1, // Есть ли сейвы
      saveCount: 0, // Кол-во сейвов
      icons: ['fas fa-download','fas fa-upload','fas fa-trash'],
      defaultSaveName: 'New save',
      defaultSaveName_ru: 'Новое сохранение',
      saves: [],
      IDBsavesList: [],
      IDBsavesListSorted: [],
      IDBsaveslength: 0,
      savesListStartCount: 12,
      endOfsaveList: false,
  }),
  components: {
    PullTo
  },
  // asyncComputed: {
  //   SaveList: {
  //     async get() {
  //         var IDBsavesList = await localforage.keys().then(keysList => this.IDBsavesList = keysList); // все ключи из localStorage
  //         var length = await localforage.length().then(lf_length => this.length = lf_length);
  //         // var saves = [];
  //         (this.length > 0) ? this.saveExist = 1 : this.saveExist = 0 // Проверка на наличие сейвов
  //         if (this.saveExist === 1) {
  //         this.overlay = true
  //         for (let i = 0; i < length; i++) {
  //           var saveData = IDBsavesList[i].split(',')
  //           this.saves.push({saveName: saveData[0],saveTime: saveData[1],saveID: saveData[2]})
  //         }}
  //         this.saveCount = length
  //         this.overlay = false
  //         const sortBy = (key) => { // desc <, asc >
  //           return (a, b) => (a[key] < b[key]) ? 1 : ((b[key] < a[key]) ? -1 : 0);
  //         };

  //         return this.saves.concat().sort(sortBy('saveID'));
  //         // return _.orderBy(this.saves, 'saveID', 'desc')
  //     },
  // }
  // },
  created: async function () {
    this.IDBsavesList = await localforage.keys().then(keysList => this.IDBsavesList = keysList); // все ключи из IndexedDB
    this.IDBsaveslength = await localforage.length().then(lf_length => this.IDBsaveslength = lf_length); // Кол-во сохранений в IndexedDB
    var saves = [];
    (this.IDBsaveslength > 0) ? this.saveExist = 1 : this.saveExist = 0 // Проверка на наличие сейвов
    if (this.saveExist === 1) {
      for (let i = 0; i < this.IDBsaveslength; i++) { // Преобразуем строку в объект для сортировки
        var saveData = this.IDBsavesList[i].split(',');
        this.IDBsavesListSorted.push({saveName: saveData[0],saveTime: saveData[1],saveID: saveData[2]}); 
      }
      this.IDBsavesListSorted.sort(this.sortBy('saveID')); // сортируем
      this.saves = this.IDBsavesListSorted.slice(0, this.savesListStartCount); // копируем диапазон от сортированного массива в массив для первичной отрисовки
    }
    this.saveCount = this.IDBsaveslength;
    // return this.saves.sort(this.sortBy('saveTime'));
    // return _.orderBy(this.saves, 'saveTime', 'desc')
  },
  methods:{
    async updateIDB(){
      return this.IDBsaveslength = await localforage.length().then(lf_length => this.IDBsaveslength = lf_length); // Кол-во сохранений в IndexedDB
    },

    loadMore() {
      this.updateIDB();
      if (!this.endOfsaveList) {
        let newElements = this.IDBsavesListSorted.slice(this.saves.length, this.saves.length + 9); // Копируем часть отсортированного массива в newElements
        this.saves = this.saves.concat(newElements); // Склеиваем список сохранений и скопированную часть массива 
        (this.saves.length === this.IDBsaveslength) ? this.endOfsaveList = true : this.endOfsaveList = false 
      }
    },

    sortBy(key) { // desc <, asc >
      return (a, b) => (a[key] < b[key]) ? 1 : ((b[key] < a[key]) ? -1 : 0);
    },

    keyGen(saveName){ // Генерация уникального ключа на основе saveID
        var salt = '3F4428472B4B6250';
        return CryptoJS.PBKDF2(saveName, salt, { keySize: 256 / 32 , iterations: 1}).toString();
    },

    async saveGame(){
      try {
        var name = document.getElementById("saveNameArea").value // Копирует значение
        document.getElementById("saveNameArea").value = '' // И очищаем поле ввода
        if (name === '') // Проверка введенно ли имя сохранения, если нет, назначаем стандартное
          (this.$store.state.gameLang) ? name = 'New Save' : name = 'Новое сохранение'
        this.$store.state.saveName = name;
        this.$store.state.saveTime = dayjs().format("DD.MM.YYYY - HH:mm"); // Время сохранения
        // var newSaveID = (function random(min = 0, max = 999999) {
        //   var rand = min + Math.random() * (max + 1 - min);
        //   rand = Math.floor(rand);
        //   return rand;
        // }()); 
        this.$store.state.saveID = dayjs().format("x"); // milliseconds since the Unix Epoch

        var ID = `${this.$store.state.saveName},${this.$store.state.saveTime},${this.$store.state.saveID}`;
        await WebCrypto(ID, JSON.stringify(this.$store.state))
        this.$store.state.gameLang 
          ? iziToast.info({message: 'Game successfully saved', position: 'bottomCenter'})
          : iziToast.info({message: 'Игра успешно сохранена', position: 'bottomCenter'})

        this.saves.unshift({saveName: this.$store.state.saveName,saveTime: this.$store.state.saveTime,saveID: this.$store.state.saveID})
        this.saveExist = 1
        this.saves.sort(this.sortBy('saveID'));
        this.saveCount = this.saves.length
        // this.saves = []
        // this.$asyncComputed.SaveList.update()
      }
      catch(error) {
        this.$root.errNotify(error)
      }
    },

    async overwriteSave(saveName, saveTime, saveID){
      try {
        localforage.removeItem(`${saveName},${saveTime},${saveID}`) // Удаление сейва
        this.$store.state.saveTime = dayjs().format("DD.MM.YYYY - HH:mm"); // Обновляем время сохранения
        // var saveData = await WebCrypto(`${saveName},${saveTime},${saveID}`)
        // this.$store.state.saveName = saveData.saveName
        // this.$store.state.saveID = saveID
        this.$store.state.saveID = dayjs().format("x");
        await WebCrypto(`${saveName},${this.$store.state.saveTime},${this.$store.state.saveID}`, JSON.stringify(this.$store.state)) // Добавем новый за место старого (удалённого)
        this.$store.state.gameLang 
          ? iziToast.info({message: 'Saving successfully overwritten', position: 'bottomCenter'})
          : iziToast.info({message: 'Сохранение успешно перезаписано', position: 'bottomCenter'})

        this.saves.find(function(item) {
          if (item.saveID === saveID) {
            console.log(item.saveID)
            item.saveTime = dayjs().format("DD.MM.YYYY - HH:mm");
            item.saveID = store.state.saveID;
            console.log(item.saveID)
          }
        })
        this.saves.sort(this.sortBy('saveID'));
        // this.saves = []
        // this.$asyncComputed.SaveList.update()
      }
      catch(error) {
        this.$root.errNotify(error)
      }
    },

    async loadSave(saveName, saveTime, saveID){
      try {
        // console.log(`${saveName},${saveTime},${saveID}`)
        await this.$store.replaceState(await WebCrypto(`${saveName},${saveTime},${saveID}`));

        this.$store.commit('updateStores'); // Фиксируем новые переменные
        updateAllThemes()

        this.$store.state.gameLang 
          ? iziToast.info({message: 'Game loaded successfully', position: 'bottomCenter', backgroundColor: 'rgb(255, 254, 173)'})
          : iziToast.info({message: 'Игра загружена успешно', position: 'bottomCenter', backgroundColor: 'rgb(255, 254, 173)'})
      }
      catch(error) {
        this.$root.errNotify(error)
      }
    },

    deleteSave(saveName, saveTime, saveID) {
      try {
        localforage.removeItem(`${saveName},${saveTime},${saveID}`) // Удаление сейва
        this.$store.state.gameLang 
          ? iziToast.info({message: 'Saving has been deleted!', position: 'bottomCenter', backgroundColor: 'rgb(255, 102, 102)', icon: 'fas fa-exclamation-triangle'})
          : iziToast.info({message: 'Сохранение было удалено!', position: 'bottomCenter', backgroundColor: 'rgb(255, 102, 102)', icon: 'fas fa-exclamation-triangle'})

        let findIndex = this.saves.findIndex(function(item) {
          return (item.saveID === saveID)
        })
        this.saves.splice(findIndex, 1);
        (this.saves.length > 0) ? this.saves.sort(this.sortBy('saveID')) : this.saveExist = 0
        this.saveCount += -1
        this.updateIDB()
        // this.saves.splice(findIndex, 1)
        // this.saves = []
        // this.$asyncComputed.SaveList.update()
      }
      catch(error) {
        this.$root.errNotify(error)
      }
    },

    async DeleteAllSaves(){
      try {
        await localforage.clear()
        this.$store.state.gameLang 
          ? iziToast.warning({message: 'All saves have been deleted!', position: 'bottomCenter', icon: 'fas fa-exclamation-triangle', backgroundColor: 'rgb(255, 102, 102)'})
          : iziToast.warning({message: 'Всё сохранения были удалены!', position: 'bottomCenter', icon: 'fas fa-exclamation-triangle', backgroundColor: 'rgb(255, 102, 102)'})
        this.deleteAll = false
        this.saveExist = 0
        this.saves = []
        this.saveCount = this.saves.length
        // this.$asyncComputed.SaveList.update()
      }
      catch(error) {
        this.$root.errNotify(error)
      }
    },

    async restartGame(){
      this.$router.push('/')
      await resetState()
      await localStorage.removeItem(`vuex`);
      // this.$store.replaceState({})
      await location.reload()
    },
    
    Empty(saveID){} // Заглушка, для того, чтобы v-list выделялся при наведении @click
  }
}
</script>

<style>

.SaveExist {
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

.saves-loading {
  width: inherit;
  height: 75vh;
}

.tip {
  color: rgb(255, 102, 102);
  color: #E0E0E0;
  font-size: 12pt;
}

.textfield {
  /* width: 75%; */
  margin-left: 16%; 
  /* margin-right: 20%; */
}

.btns {
  /* min-width: 40px; */
  margin-right: 4px
}

.v-list-bg {
  background: var(--saves--v-list-bg--background) !important;
}

.save-btn-right {
  margin-right: 77px;
  margin-left: 4px
}

@media (max-width: 450px) {

  .textfield {
    width: 100%;
    margin-left: 0px; 
  }

  .save-btn-right {
    margin-right: 0px;
  }

  .scroll-area {
    width: inherit;
    height: calc(100vh - 200px);
  }
}

</style>