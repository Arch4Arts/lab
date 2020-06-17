<i18n>
	{
		"en": {
      "tooltip__overwrite": "Overwrite",
      "tooltip__load": "Load",
      "tooltip__delete": "Delete"
		},
		"ru": {
      "tooltip__overwrite": "Перезаписать",
      "tooltip__load": "Загрузить",
      "tooltip__delete": "Удалить"
		}
	}
</i18n>

<template>
<div>
  <v-list-item
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
            <a-icon class="overwrite-btn__color" :icon="['fas', 'download']" /> 
          </v-btn>
        </template>
          <span>{{ $t('tooltip__overwrite') }}</span>
      </v-tooltip>
      <!-- Загрузить -->
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon
            class="load-btn"
            @click="loadSave(source.saveName, source.saveTime, source.saveID, source.saveGameVersion)"> 
            <a-icon class="load-btn__color" :icon="['fas', 'upload']" />
          </v-btn>
        </template>
          <span>{{ $t('tooltip__load') }}</span>
      </v-tooltip>
      <!-- Удалить -->
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon
            class="delete-btn"
            @click="deleteSave(source.saveName, source.saveTime, source.saveID, source.saveGameVersion)"> 
            <a-icon class="delete-btn__color" :icon="['fas', 'trash']" />
          </v-btn>
        </template>
          <span>{{ $t('tooltip__delete') }}</span>
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
  }
}
</script>

<style lang='scss' scoped>

.position-btns {
  display: inline;
}

.overwrite-btn {
  background: transparent !important;
  &__color {
    color: var(--savesList--overwrite-btn--color) !important;
  }
}

.load-btn {
  background: transparent !important;
  &__color {
    color: var(--savesList--load-btn--color) !important;
  }
}

.delete-btn {
  margin-left: 15px;
  background: transparent !important;
  &__color {
    color: var(--savesList--delete-btn--color) !important;
  }
}

</style>