<template>

        <!-- ENGLISH -->

        <section v-if="$store.state.lang">

        <v-expansion-panel-content class="head_element">
        <template v-slot:header>
        <div><h3>Personalization of characters</h3></div>
        </template>

        <v-card class="bg_element">
        <v-card-text class="font-color">
        <v-expansion-panel class="bg_element">
        <v-expansion-panel-content class="head_element" v-for="(character, i) in characters" :key="i" hide-actions>
        <!-- EN АВАТАР В ШАПКЕ  --> 
        <template v-slot:header>
          <v-layout align-center row spacer>
            <v-flex xs4 sm2 md1>
              <v-avatar size="36px" >
                <img v-if="character.avatar" :src="character.avatar" alt="Avatar">
                <v-icon v-else :color="character.color" v-text="character.icon"></v-icon>
              </v-avatar>
            </v-flex>
        <!-- EN ИМЯ В ШАПКЕ -->
            <v-flex sm5 md3 hidden-xs-only>
              <strong v-html="character.name"></strong>
              <span v-if="character.total" class="grey--text">
                &nbsp;({{ character.total }})
              </span>
            </v-flex>
        <!-- EN КТО ЭТО? В ШАПКЕ -->
            <v-flex no-wrap xs5 sm3>
              <strong v-html="character.title"></strong>
            </v-flex>
        <!-- EN ЦИТАТА В ШАПКЕ -->
            <v-flex v-if="character.quote" class="grey--text" ellipsis hidden-sm-and-down>
              &mdash;
              {{ character.quote }}
            </v-flex>
          </v-layout>

        </template>

        <v-card class="bg_element">
        <v-divider></v-divider>
            <v-card-text>
            <v-layout align-start row>
            <!-- EN ЦИТАТА В БЛОКЕ -->
            <v-flex xs12 md6>
            <p v-if="character.Declination == 'mc'" :style="{'color': $store.state.mcColor}"> {{ character.quote }} </p>
            <p v-if="character.Declination == 'sister'" :style="{'color': $store.state.sisterColor}"> {{ character.quote }} </p>
            </v-flex>
            <!-- EN ВЫБОР ЦВЕТА ЦИТАТЫ (РЕПЛИК) -->
            <v-flex d-flex lg1 md1 sm1 xs1>
                <color-picker :change="mcUpdateColor" :extColor="this.$root.convertColor(this.$store.state.mcColor)"></color-picker>
            </v-flex>
            </v-layout>
            <!-- EN ЗАПОЛНЕНИЕ ИМЕНИ -->
            <v-form ref="form" v-model="validation" lazy-validation>
                <v-flex sm5 md5>
                <v-text-field v-if="character.Declination == 'mc'" v-model="mc" :rules="nameRules" label="Name" color="grey lighten-2" required></v-text-field>
                <v-text-field v-if="character.Declination == 'sister'" v-model="sister" :rules="nameRules" label="Name" color="grey lighten-2" required></v-text-field>  <!-- ИМЯ -->
                </v-flex>
            </v-form>

            </v-card-text>
        </v-card>
        </v-expansion-panel-content>
        </v-expansion-panel>
        </v-card-text>
        </v-card>  
        </v-expansion-panel-content>
        <br>
        <v-btn color="red lighten-1" @click="startGame('en')">Start game</v-btn>

        </section>

        <!-- RUSSIAN -->

        <section v-else>

        <v-expansion-panel class="bg_element">
        <v-expansion-panel-content class="head_element">
        <!-- АВАТАР В ШАПКЕ -->
        <template v-slot:header>
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
            <v-flex no-wrap xs5 sm3>
              <strong v-html="character_ru.title"></strong>
            </v-flex>
        <!-- ЦИТАТА В ШАПКЕ -->
            <v-flex v-if="character_ru.quote" class="grey--text" ellipsis hidden-sm-and-down>
              &mdash;
              {{ character_ru.quote }}
            </v-flex>
          </v-layout>

        </template>

        <v-card class="bg_element">
        <v-divider></v-divider>
            <v-card-text class="font-color">
            <v-layout align-start row>
            <!-- ЦИТАТА В БЛОКЕ -->
            <v-flex xs12 md6>
            <p :style="{'color': $store.state.mcColor}"> {{ character_ru.quote }} </p>
            </v-flex>
            <!-- ВЫБОР ЦВЕТА ЦИТАТЫ (РЕПЛИК) -->
            <v-flex d-flex lg1 md1 sm1 xs1>
                <color-picker :change="mcUpdateColor" :extColor="this.$root.convertColor(this.$store.state.mcColor)"></color-picker>
            </v-flex>
            </v-layout>
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

                <v-checkbox color="grey lighten-2" v-model="character_ru.manualDeclination" dark :label="'Просклонять вручную'"></v-checkbox>
                <!-- ПРОСКЛОНЯТЬ ВРУЧНУЮ -->
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
        </section>
</template>

<script>
import ColorPicker from "../ColorPicker.vue"
import RussianName from "../Name.js"

export default {
    data(){
        return {
     validation: true,
     nameRules_ru: [
        v => !!v || 'Напишите имя персонажа',
      ],
     nameRules: [
        v => !!v || 'Write the name of the character',
      ],
     character: {
          avatar:      'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
          name:         this.$store.state.mcName,
          title:       'Main character',
          quote:       'My name is Arthur. nice to meet you.',
          changeColor:  this.$root.mcUpdateColor,
          color:        this.$root.convertColor(this.$store.state.mcColor),
          Im:           this.$store.state.mcName,
        },
     character_ru: {
          avatar:      'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
          name:         this.$store.state.mcIm,
          title:       'Главный герой',
          quote:       'Меня зовут Артур , приятно познакомиться',
          changeColor:  this.$root.mcUpdateColor,
          color:        this.$root.convertColor(this.$store.state.mcColor),
          manualDeclination: false,
          Im:           this.$store.state.mcIm,
          Rod:          this.$store.state.mcRod,
          Dat:          this.$store.state.mcDat,
          Vin:          this.$store.state.mcVin,
          Tvor:         this.$store.state.mcTvor,
          Pred:         this.$store.state.mcPred,
        },
      }
    },
    computed: {
      // АНГЛИЙСКАЯ ВЕРСИЯ 
      mc: {
        get: function () {
          return this.$store.state.mcName;
        },
        set: function (text) {
          this.$store.state.mcName = text;
          this.character.name = this.$store.state.mcName
          this.character.Im = this.$store.state.mcName
          this.$store.commit('saveCharNames', 'en')
        }
      },
      // ДЛЯ РУССКОЙ ВЕРСИИ С ФУНКЦИЕЙ СКЛОНЕНИЯ ИМЁН
      Declination: {
        get: function () {
          return this.$store.state.mcIm;
        },
        set: function (text) {
          this.$store.state.mcIm = text;
          var name = new RussianName(this.$store.state.mcIm); // Склоняем
          // Записываем слоненные значение в Store
          this.$store.state.mcRod = name.fullName(name.gcaseRod)
          this.$store.state.mcDat = name.fullName(name.gcaseDat)
          this.$store.state.mcVin = name.fullName(name.gcaseVin)
          this.$store.state.mcTvor = name.fullName(name.gcaseTvor)
          this.$store.state.mcPred = name.fullName(name.gcasePred)
          // Обновляем данные в characters_ru, для реактивность на странице
          this.character_ru.name = name.fullName(name.gcaseIm)
          this.character_ru.Im = name.fullName(name.gcaseIm)
          this.character_ru.Rod = name.fullName(name.gcaseRod)
          this.character_ru.Dat = name.fullName(name.gcaseDat)
          this.character_ru.Vin = name.fullName(name.gcaseVin)
          this.character_ru.Tvor = name.fullName(name.gcaseTvor)
          this.character_ru.Pred = name.fullName(name.gcasePred)
          this.$store.commit('saveCharNames', 'ru')
        }
    },
    },
    methods: {
    mcUpdateColor(event) { // Обновляет цвет ColorPicker'ом
      // console.log('2' + event.color)
      this.color = event.color;
      this.$store.state.mcColor = this.color;
      this.$store.commit('saveColorsChar');
    },
    },
    components: {
        ColorPicker,
    }
}
</script>

<style scoped>

</style>