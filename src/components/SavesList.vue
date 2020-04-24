<template>
<v-card dark elevation="0">
  <!-- Ввод имени сохранения + кнопка -->
  <v-flex xs12 sm12 md12 class="input-area">
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
        :value="`${save.saveName},${save.saveTime},${save.saveID},${save.saveGameVersion}`"
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
                deleteSave(save.saveName, save.saveTime, save.saveID, save.saveGameVersion) 
                : 
                  (icon == 'fas fa-download') 
                  ? 
                  overwriteSave(save.saveName, save.saveTime, save.saveID, save.saveGameVersion) 
                  : 
                  loadSave(save.saveName, save.saveTime, save.saveID, save.saveGameVersion)"
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
                deleteSave(save.saveName, save.saveTime, save.saveID, save.saveGameVersion) 
                : 
                  (icon == 'fas fa-download') 
                  ? 
                  overwriteSave(save.saveName, save.saveTime, save.saveID, save.saveGameVersion) 
                  : 
                  loadSave(save.saveName, save.saveTime, save.saveID, save.saveGameVersion)"
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

    </div>
    </pull-to>
    </div>
    </v-list-item-group>
  </v-list>
</v-card>
</template>

<script>
export default {
  props: {

  }
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