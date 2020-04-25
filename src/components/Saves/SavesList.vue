<template>
<div>
  <v-list-item
    :key="source.saveID"
    :value="`${source.saveName},${source.saveTime},${source.saveID},${source.saveGameVersion}`"
  >
  <!-- Информация о имени и времени -->
    <v-list-item-content>
      <v-list-item-title>{{ source.saveName }}</v-list-item-title>
      <v-list-item-subtitle>{{ source.saveTime }}</v-list-item-subtitle>
    </v-list-item-content>
    <!-- КНОПКИ WRITE/LOAD/DELETE -->
    <v-list-item-action 
      v-for="(icon ,i) in saveLoadDelete_btnsIconList" 
      :key="`icon_${i}`">
      <!-- EN WRITE/LOAD/DELETE-->
      <v-tooltip v-if="$store.state.gameLang" bottom>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon
          class="saves-v-btns"
          @click="
            (icon == 'fas fa-trash') 
            ? 
            deleteSave(source.saveName, source.saveTime, source.saveID, source.saveGameVersion) 
            : 
              (icon == 'fas fa-download') 
              ? 
              overwriteSave(source.saveName, source.saveTime, source.saveID, source.saveGameVersion) 
              : 
              loadSave(source.saveName, source.saveTime, source.saveID, source.saveGameVersion)"
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
            deleteSave(source.saveName, source.saveTime, source.saveID, source.saveGameVersion) 
            : 
              (icon == 'fas fa-download') 
              ? 
              overwriteSave(source.saveName, source.saveTime, source.saveID, source.saveGameVersion) 
              : 
              loadSave(source.saveName, source.saveTime, source.saveID, source.saveGameVersion)"
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
</div>
</template>

<script>
export default {
  props: {
    source: {
      type: Object,
      default () {
        return {}
      }
    },
    saveLoadDelete_btnsIconList: {
      type: Array,
      required: true
    },
    overwriteSave: {
      type: Function,
      required: true
    },
    loadSave: {
      type: Function,
      required: true
    },
    deleteSave: {
      type: Function,
      required: true
    },
  },
  mounted(){
    console.log('savesList')
  }
}
</script>

<style lang="scss" scoped>

.saves-v-btns {
  background: transparent !important;
}

</style>