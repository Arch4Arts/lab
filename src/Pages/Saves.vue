<template>
    <v-app>
    <v-layout class="BG-v-layout" justify-center>
        <v-flex md8 class="Page" style="padding: 0px">
          <div>
            <v-card dark elevation="0">
            <v-list two-line subheader class="bg_element">
              <v-list-tile>
                <v-list-tile-content>  
                <!-- ТЕКСТОВОЕ ПОЛЕ ДЛЯ ВВОДА ИМЕНИ СЕЙВА -->
                  <v-text-field dark
                    class="textfield"
                    color="grey lighten-2"
                    :placeholder="($store.state.lang) ? defaultName : defaultName_ru"
                    v-model="saveName"
                    @keyup.enter="saveGame(saveName)"
                    label=""
                  ></v-text-field>

                </v-list-tile-content>
                <!-- КНОПКА: СОХРАНИТЬ + ПОДСКАЗКА -->
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn class="save-btn-right" v-on="on" @click="saveGame(saveName)" icon ripple>
                        <v-icon color="rgb(126, 193, 255)"> fas fa-download </v-icon>
                      </v-btn>
                    </template>
                      <span v-if="$store.state.lang" class="tip">New save</span>
                      <span v-else class="tip">Новое сохранение</span>
                  </v-tooltip>

              </v-list-tile>

                <div v-if="$store.state.lang" v-show="saveCount == 0" class="text-xs-center"><v-divider/><br>No saves<br><br><v-divider/></div>
                <div v-else v-show="saveCount == 0" class="text-xs-center"><v-divider/><br>Сохранения отсутствуют<br><br><v-divider/></div>
                <v-divider v-show="saveCount == 1"/>

              <!-- СПИСОК СОХРАНЕНИЙ -->
              <v-list-tile
                v-for="save in SaveList"
                :key="save.saveID"
                @click="Empty(save.saveID)"
              >
                <v-list-tile-content>
                  <v-list-tile-title>{{ save.saveName }}</v-list-tile-title>
                  <v-list-tile-sub-title>{{ save.saveTime }}</v-list-tile-sub-title>
                </v-list-tile-content>
                <!-- КНОПКИ WRITE/LOAD/DELETE -->
                <v-list-tile-action class="btns" v-for="(icon ,i) in icons" :key="'icon-id_' + i">

                  <v-tooltip v-if="$store.state.lang" bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn class="btns" v-on="on" icon
                      @click="(icon == 'fas fa-trash') ? deleteSave(save.saveID) : (icon == 'fas fa-download') ? overwriteSave(save.saveID) : loadSave(save.saveID)"
                      > 
                        <v-icon :color="(icon == 'fas fa-download') ? 'rgb(126, 193, 255)' : (icon == 'fas fa-upload') ? 'rgb(255, 254, 173)' : 'rgb(255, 102, 102)'"> {{ icon }} </v-icon>
                      </v-btn>
                    </template>
                      <span v-if="icon == 'fas fa-download'" class="tip">Overwrite</span>
                      <span v-if="icon == 'fas fa-upload'" class="tip">Load</span>
                      <span v-if="icon == 'fas fa-trash'" class="tip">Delete</span>
                  </v-tooltip>

                  <v-tooltip v-else bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn class="btns" v-on="on" icon
                      @click="(icon == 'fas fa-trash') ? deleteSave(save.saveID) : (icon == 'fas fa-download') ? overwriteSave(save.saveID) : loadSave(save.saveID)"
                      > 
                        <v-icon :color="(icon == 'fas fa-download') ? 'rgb(126, 193, 255)' : (icon == 'fas fa-upload') ? 'rgb(255, 254, 173)' : 'rgb(255, 102, 102)'"> {{ icon }} </v-icon>
                      </v-btn>
                    </template>
                      <span v-if="icon == 'fas fa-download'" class="tip">Перезаписать</span>
                      <span v-if="icon == 'fas fa-upload'" class="tip">Загрузить</span>
                      <span v-if="icon == 'fas fa-trash'" class="tip">Удалить</span>
                  </v-tooltip>
                </v-list-tile-action>
              </v-list-tile>
              <v-divider/>
            </v-list>
          </v-card>
          </div>
            <!-- СОХР НА ДИСК / ЗАГР С ДИСКА / ПЕРЕЗАПУСК / УДАЛЕНИЕ ВСЕХ СОХРАНЕНИЙ -->
            <div class="text-xs-right">
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn @click="" v-on="on" icon ripple>
                  <v-icon color="rgb(126, 193, 255)"> fas fa-hdd </v-icon>
                </v-btn>
              </template>
                <span v-if="$store.state.lang" class="tip">Save saves to disk</span>
                <span v-else class="tip">Сохранить сохранения на диск</span>
            </v-tooltip>

            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn @click="" v-on="on" icon ripple>
                  <v-icon color="rgb(255, 254, 173)"> far fa-hdd </v-icon>
                </v-btn>
              </template>
                <span v-if="$store.state.lang" class="tip">To load the save from disk</span>
                <span v-else class="tip">Загрузить сохранения с диска</span>
            </v-tooltip>

            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn @click="restart = !restart" v-on="on" icon ripple>
                  <v-icon color="rgb(255, 102, 102)"> fas fa-power-off </v-icon>
                </v-btn>
              </template>
                <span v-if="$store.state.lang" class="tip">Restart game</span>
                <span v-else class="tip">Перезапуск игры</span>
            </v-tooltip>

            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn @click="deleteAll = !deleteAll" :disabled="(saveCount > 0) ? false : true" v-on="on" icon ripple>
                  <v-icon color="rgb(255, 102, 102)"> fas fa-trash-alt </v-icon>
                </v-btn>
              </template>
                <span v-if="$store.state.lang" class="tip">Delete all saves</span>
                <span v-else class="tip">Удаление всех сохранений</span>
            </v-tooltip>
            </div>

            <!-- ДИАЛОГ ПОДТВЕРЖДЕНИЯ УДАЛЕНИЯ ВСЕХ СОХРАНЕНИЙ -->
            <v-dialog v-model="deleteAll" persistent dark width="230">
               <v-card class="text-xs-center">
                 <section v-if="$store.state.lang">
                  <v-card-title class="headline dark red"> Delete all saves </v-card-title>
                    <v-card-text> 
                      <b>This operation will delete all current saves!</b>
                      <br>
                      Are you sure you want to continue?
                    </v-card-text>
                 </section>
                 <section v-else>
                  <v-card-title class="headline dark red"> Удаление всех сохранений </v-card-title>
                    <v-card-text> 
                      <b>Данная операция удалит все текущие сохранения!</b>
                      <br>
                      Вы уверены, что хотите продолжить?
                    </v-card-text>
                 </section>
                  <v-card-actions>
                    <v-layout align-center justify-center>
                        <section v-if="$store.state.lang">
                          <v-btn dark flat @click="DeleteAllSaves()"> Yes </v-btn>
                          <v-btn dark flat @click="deleteAll = !deleteAll"> No </v-btn>
                        </section>
                        <section v-else>
                          <v-btn dark flat @click="DeleteAllSaves()"> Да </v-btn>
                          <v-btn dark flat @click="deleteAll = !deleteAll"> Нет </v-btn>
                        </section>
                    </v-layout>
                  </v-card-actions>
              </v-card>
            </v-dialog>
            <!-- ОКНО С ПОДТВЕРЖДЕНИЕМ ПЕРЕЗАПУСКА ИГРЫ-->
            <v-dialog v-model="restart" persistent dark width="230">
               <v-card class="text-xs-center">
                 <section v-if="$store.state.lang">
                  <v-card-title class="headline dark red"> Restart game </v-card-title>
                    <v-card-text> 
                      <b>When you restart the game, all current progress will be lost!</b>
                      <br>
                      Are you sure you want to continue?
                    </v-card-text>
                 </section>
                 <section v-else>
                  <v-card-title class="headline dark red"> Перезапуск игры </v-card-title>
                    <v-card-text> 
                      <b>При перезапуске игры, будeт потерян весь текущий прогресс!</b>
                      <br>
                      Вы уверены, что хотите продолжить?
                    </v-card-text>
                 </section>
                  <v-card-actions>
                    <v-layout align-center justify-center>
                        <section v-if="$store.state.lang">
                          <v-btn dark flat @click="restartGame()"> Yes </v-btn>
                          <v-btn dark flat @click="restart = !restart"> No </v-btn>
                        </section>
                        <section v-else>
                          <v-btn dark flat @click="restartGame()"> Да </v-btn>
                          <v-btn dark flat @click="restart = !restart"> Нет </v-btn>
                        </section>
                    </v-layout>
                  </v-card-actions>
              </v-card>
            </v-dialog>
        </v-flex>
    </v-layout>
    </v-app>
</template>

<script>
import moment from 'moment' // библиотека для работы с временем
import { resetState }  from '../stores/store'

const _ = require('lodash'); // Библиотека для упрощения работы со строками, таблицами и т д.

var CryptoJS = require("crypto-js");

import iziToast from 'izitoast/dist/js/iziToast.min.js';

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
        saveCount: 0,
        icons: ['fas fa-download','fas fa-upload','fas fa-trash'],
        defaultName: 'New save',
        defaultName_ru: 'Новое сохранение',
        saveName: '',
        saves: [],
    }),
  computed: {
    SaveList: {
      get() {
        var Keys = Object.keys(localStorage) // все ключи из localStorage
        var listSaves = [] // массив с ключами сохранений
        var saves = []
        for (let i = 0; i < localStorage.length; i++) {
          if (Keys[i].includes('save-')) listSaves.push(Keys[i]); // Если найден ключ с сохранением, записываем в массив Keys
        }
        (listSaves.length > 0) ? this.saveCount = 1 : this.saveCount = 0 // Проверка на наличие сейвов
        if (this.saveCount === 1) {
        for (let i = 0; i < listSaves.length; i++) {
          if (listSaves.length > 0) this.saves.push(
            JSON.parse(CryptoJS.AES.decrypt(
              localStorage.getItem(listSaves[i]).toString(), this.keyGen(listSaves[i])).toString(CryptoJS.enc.Utf8)))
        }}

        return _.orderBy(this.saves, 'saveTime', 'desc')
      },
  }
  },
  methods:{
    keyGen(saveName){ // Генерация уникального ключа на основе saveID
        var salt = '3F4428472B4B6250';
        return CryptoJS.PBKDF2(saveName, salt, { keySize: 256 / 32 , iterations: 1}).toString();
    },
    saveGame(name){
      if (name === '') // Проверка введенно ли имя сохранения, если нет, назначаем стандартное
        (this.$store.state.lang) ? name = 'New Save' : name = 'Новое сохранение'
      this.$store.state.saveName = name;
      this.$store.state.saveTime = moment().format("DD.MM.YYYY - kk:mm"); // Время сохранения
      var newSaveID = _.random (0, 999999); // генерация ID
      this.$store.state.saveID = newSaveID;
      localStorage.setItem(
        `save-${newSaveID}`, //ID
        CryptoJS.AES.encrypt( // Шифрование и генерация уникального ключа
          JSON.stringify(this.$store.state), this.keyGen(`save-${newSaveID}`)))
      this.$store.state.lang 
      ? iziToast.info({message: 'Game successfully saved', position: 'bottomCenter'})
      : iziToast.info({message: 'Игра успешно сохранена', position: 'bottomCenter'})
      this.saves = [] // Обновляет список сохранений
    },
    overwriteSave(saveID){
      this.$store.state.saveTime = moment().format("DD.MM.YYYY - kk:mm"); // Обновляем время сохранения
      this.$store.state.saveName = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem(`save-${saveID}`).toString(), this.keyGen(`save-${saveID}`)).toString(CryptoJS.enc.Utf8)).saveName
      this.$store.state.saveID = saveID
      localStorage.setItem(
        `save-${saveID}`, CryptoJS.AES.encrypt(
          JSON.stringify(this.$store.state), this.keyGen(`save-${saveID}`)))
      this.$store.state.lang 
        ? iziToast.info({message: 'Saving successfully overwritten', position: 'bottomCenter'})
        : iziToast.info({message: 'Сохранение успешно перезаписано', position: 'bottomCenter'})
      this.saves = [] // Обновляет список сохранений
    },
    loadSave(saveID){
      this.$store.replaceState(
        JSON.parse(CryptoJS.AES.decrypt(
          localStorage.getItem(
            `save-${saveID}`).toString(), this.keyGen(`save-${saveID}`)).toString(CryptoJS.enc.Utf8)));
        this.$store.state.lang 
        ? iziToast.info({message: 'Game loaded successfully', position: 'bottomCenter', backgroundColor: 'rgb(255, 254, 173)'})
        : iziToast.info({message: 'Игра загружена успешно', position: 'bottomCenter', backgroundColor: 'rgb(255, 254, 173)'})
    },
    deleteSave(saveID) {
      localStorage.removeItem(`save-${saveID}`) // Удаление сейва
      this.saves = [] // Обновляет список сохранений
      this.$store.state.lang 
      ? iziToast.info({message: 'Saving has been deleted!', position: 'bottomCenter', backgroundColor: 'rgb(255, 102, 102)', icon: 'fas fa-exclamation-triangle'})
      : iziToast.info({message: 'Сохранение было удалено!', position: 'bottomCenter', backgroundColor: 'rgb(255, 102, 102)', icon: 'fas fa-exclamation-triangle'})
    },
    DeleteAllSaves(){
      var Keys = Object.keys(localStorage) // все ключи из localStorage
      var listSaves = [] // массив с ключами сохранений
      for (let i = 0; i < localStorage.length; i++) {
        if (Keys[i].includes('save')) listSaves.push(Keys[i]); // Если найден ключ с сохранением, записываем в массив Keys
      }
      for (let i = 0; i < listSaves.length; i++) {
        if (listSaves.length > 0) localStorage.removeItem(listSaves[i])
      }
      this.$store.state.lang 
      ? iziToast.warning({message: 'All saves have been deleted!', position: 'bottomCenter', icon: 'fas fa-exclamation-triangle', backgroundColor: 'rgb(255, 102, 102)'})
      : iziToast.warning({message: 'Всё сохранения были удалены!', position: 'bottomCenter', icon: 'fas fa-exclamation-triangle', backgroundColor: 'rgb(255, 102, 102)'})
      this.deleteAll = false
      this.saves = [] // Обновляет список сохранений
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

<style scoped>

.tip {
  color: rgb(255, 102, 102);
  color: #E0E0E0;
  font-size: 12pt;
}

.textfield {
  width: 75%;
  margin-left: 25%; 
  /* margin-right: 20%; */
}

.btns {
  min-width: 40px;
}

.color-btn {
  color: red;
}

.save-btn-right {
  margin-right: 77px;
}

@media (max-width: 450px) {
  .textfield {
    width: 100%;
    margin-left: 0px; 
  }

  .save-btn-right {
    margin-right: 0px;
  }
}

</style>