<template>
<section :id="parentBlockNameID">
  <!-- Панель -->
  <v-expansion-panels id="layout" >

  <v-expansion-panel >
  <!-- АВАТАР В ШАПКЕ -->
  <v-expansion-panel-header >
    <v-layout align-center row spacer>
      <v-flex xs4 sm2 md1>
        <v-avatar size="36px" >
          <img v-if="character_ru.avatar" :src="character_ru.avatar" alt="Avatar">
          <v-icon v-else :color="character_ru.color" v-text="character_ru.icon"></v-icon>
        </v-avatar>
      </v-flex>
      <!-- ИМЯ В ШАПКЕ -->
      <v-flex sm5 md3 hidden-xs-only>
        <strong v-html="character_ru.name"></strong>
        <span v-if="character_ru.total" class="grey--text">
          &nbsp;({{ character_ru.total }})
        </span>
      </v-flex>
      <!-- КТО ЭТО? В ШАПКЕ -->
      <v-flex text-no-wrap xs5 sm3>
        <strong v-html="character_ru.title"></strong>
      </v-flex>
      <!-- ЦИТАТА В ШАПКЕ -->
      <v-flex v-if="character_ru.quote" class="grey--text" ellipsis hidden-sm-and-down>
        &mdash;
        {{ character_ru.quote }}
      </v-flex>
    </v-layout>

  </v-expansion-panel-header>

  <v-expansion-panel-content>
  <v-card elevation='0'>
  <v-divider></v-divider>
      <v-card-text>
      <p :style="{'color': $store.state.chars.mcColor}"> {{ character_ru.quote }} </p>
      <!-- ВЫБОР ЦВЕТА ЦИТАТЫ (РЕПЛИК) -->
      <!-- Смена цвета (слушает событий colorChange в компоненте) -->
      <color-picker 
        @colorChange="applyColorChange" 
        :currentColor="$store.state.chars.mcColor"
        :parentBlockNameID="parentBlockNameID"
      />
      <!-- ЗАПОЛНЕНИЕ ИМЕНИ -->
      <v-form ref="form" v-model="validation" lazy-validation>
        <v-flex sm5 md5>
        <v-text-field v-model="Declination" :rules="nameRules_ru" label="Имя" dark color="grey lighten-2" required></v-text-field>  <!-- ИМЯ -->
        <br/>  
        <!-- КАК БЫЛО ПРОСКЛОНЕНО -->
        <blockquote class="blockquote">Вот сидит на стуле <b> {{ character_ru.Im }}. </b>
        <br>Кто б мы были без <b> {{ character_ru.Rod }}? </b>
        <br>Подарите что-нибудь <b> {{ character_ru.Dat }}! </b>
        <br><b> {{character_ru.Vin }} </b> нужно поздравить.
        <br><b> {{ character_ru.Tvor }} </b> все гордятся.
        <br/>Не забывайте о <b>{{ character_ru.Pred }}</b>
        </blockquote>
        <!-- ПРОСКЛОНЯТЬ ВРУЧНУЮ -->
        <v-checkbox color="grey lighten-2" v-model="character_ru.manualDeclination" dark :label="'Просклонять вручную'"></v-checkbox>
        <v-text-field v-model="character_ru.Rod" :disabled="!character_ru.manualDeclination" :rules="nameRules_ru" label="Родительный (кого, чего?)" dark color="grey lighten-2" required></v-text-field>
        <v-text-field v-model="character_ru.Dat" :disabled="!character_ru.manualDeclination" :rules="nameRules_ru" label="Дательный (кому, чему?	)" dark color="grey lighten-2" required></v-text-field>
        <v-text-field v-model="character_ru.Vin" :disabled="!character_ru.manualDeclination" :rules="nameRules_ru" label="Винительный (кого, что?)" dark color="grey lighten-2" required></v-text-field>
        <v-text-field v-model="character_ru.Tvor" :disabled="!character_ru.manualDeclination" :rules="nameRules_ru" label="Творительный (кем, чем?)" dark color="grey lighten-2" required></v-text-field>
        <v-text-field v-model="character_ru.Pred" :disabled="!character_ru.manualDeclination" :rules="nameRules_ru" label="Предложный (о ком, о чём?)" dark color="grey lighten-2" required></v-text-field>
        </v-flex>
      </v-form>

      </v-card-text>
  </v-card>
  </v-expansion-panel-content>
  </v-expansion-panel>

  </v-expansion-panels>
</section>
</template>

<script>
import ColorPicker from "./ColorPicker"
// import ColorPicker from "../ColorPicker.vue"
import RussianName from "./DeclensionRussianNames.js"

export default {
  data(){
  return {
    validation: true,
    parentBlockNameID: 'container',
    nameRules_ru: [
      v => !!v || 'Напишите имя персонажа',
    ],
    nameRules: [
      v => !!v || 'Write the name of the character',
    ],
    character: {
        avatar:      'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
        name:         this.$store.state.chars.mcName,
        title:       'Main character',
        quote:       'My name is Arthur. nice to meet you.',
        changeColor:  this.$root.mcUpdateColor,
        color:        this.$store.state.chars.mcColor,
        Im:           this.$store.state.chars.mcName,
      },
    character_ru: {
        avatar:      'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
        name:         this.$store.state.chars.mcIm,
        title:       'Главный герой',
        quote:       'Меня зовут Артур , приятно познакомиться',
        changeColor:  this.$root.mcUpdateColor,
        color:        this.$store.state.chars.mcColor,
        manualDeclination: false,
        Im:           this.$store.state.chars.mcIm,
        Rod:          this.$store.state.chars.mcRod,
        Dat:          this.$store.state.chars.mcDat,
        Vin:          this.$store.state.chars.mcVin,
        Tvor:         this.$store.state.chars.mcTvor,
        Pred:         this.$store.state.chars.mcPred,
      },
    }
  },
  computed: {
    // АНГЛИЙСКАЯ ВЕРСИЯ 
    mc: {
      get: function () {
        return this.$store.state.chars.mcName;
      },
      set: function (text) {
        this.$store.state.chars.mcName = text;
        this.character.name = this.$store.state.chars.mcName
        this.character.Im = this.$store.state.chars.mcName
        this.$store.commit('saveCharsName', 'en')
      }
    },
    // ДЛЯ РУССКОЙ ВЕРСИИ С ФУНКЦИЕЙ СКЛОНЕНИЯ ИМЁН
    Declination: {
      get: function () {
        return this.$store.state.chars.mcIm;
      },
      set: function (text) {
        if (text.length > 0) {
          this.$store.state.chars.mcIm = text;
          var name = new RussianName(this.$store.state.chars.mcIm); // Склоняем
          // Записываем слоненные значение в Store
          this.$store.state.chars.mcRod = name.fullName(name.gcaseRod)
          this.$store.state.chars.mcDat = name.fullName(name.gcaseDat)
          this.$store.state.chars.mcVin = name.fullName(name.gcaseVin)
          this.$store.state.chars.mcTvor = name.fullName(name.gcaseTvor)
          this.$store.state.chars.mcPred = name.fullName(name.gcasePred)
          // Обновляем данные в characters_ru, для реактивность на странице
          this.character_ru.name = name.fullName(name.gcaseIm)
          this.character_ru.Im = name.fullName(name.gcaseIm)
          this.character_ru.Rod = name.fullName(name.gcaseRod)
          this.character_ru.Dat = name.fullName(name.gcaseDat)
          this.character_ru.Vin = name.fullName(name.gcaseVin)
          this.character_ru.Tvor = name.fullName(name.gcaseTvor)
          this.character_ru.Pred = name.fullName(name.gcasePred)
          this.$store.commit('saveCharsName', 'ru')
        }
      }
  },
  },
  methods: {
    applyColorChange(color){ // Обработчик сообытия из дочернего элемента (ColorPicker)
      this.color = color
      this.$store.state.chars.mcColor = this.color;
      this.$store.commit('saveColorChars');
    }
  },
  components: {
      ColorPicker,
  }
}
</script>

<style scoped>

.v-card {
  background: var(--Page--background) !important;
}

#layout {
  z-index: 0;
}

</style>