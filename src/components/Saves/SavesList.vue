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
    <v-list-item-action class="position-btns">
      <!-- Перезаписать-->
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon
            class="overwrite-btn"
            @click="overwriteSave(source.saveName, source.saveTime, source.saveID, source.saveGameVersion)"> 
            <v-icon>fas fa-download</v-icon>
          </v-btn>
        </template>
          <span v-if="$store.state.gameLang">Overwrite</span>
          <span v-else>Перезаписать</span>
      </v-tooltip>
      <!-- Загрузить -->
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon
            class="load-btn"
            @click="loadSave(source.saveName, source.saveTime, source.saveID, source.saveGameVersion)"> 
            <v-icon>fas fa-upload</v-icon>
          </v-btn>
        </template>
          <span v-if="$store.state.gameLang">Load</span>
          <span v-else>Загрузить</span>
      </v-tooltip>
      <!-- Удалить -->
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon
            class="delete-btn"
            @click="deleteSave(source.saveName, source.saveTime, source.saveID, source.saveGameVersion)"> 
            <v-icon>fas fa-trash</v-icon>
          </v-btn>
        </template>
          <span v-if="$store.state.gameLang">Delete</span>
          <span v-else>Удалить</span>
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

.position-btns {
  display: inline;
}

.overwrite-btn {
  color: rgb(126, 193, 255) !important;
  background: transparent !important;
}

.load-btn {
  color: rgb(255, 254, 173) !important;
  background: transparent !important;
}

.delete-btn {
  margin-left: 15px;
  color: rgb(255, 102, 102) !important;
  background: transparent !important;
}

</style>