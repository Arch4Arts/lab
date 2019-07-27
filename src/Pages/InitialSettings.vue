<template>
<v-app>
<v-layout v-if="$store.state.initialSettings" class="BG-v-layout" justify-center>
    <v-expansion-panel dark>
    <v-flex md8 text-center class="Page">

        <!-- ENGLISH -->

        <section v-if="$store.state.lang">

        <hr>
        <h1> Game settings </h1>
        <hr>
        <br>

        <v-expansion-panel-content class="head_element">
        <template v-slot:header>
        <div><h3> Notification sounds </h3></div>
        </template>

        <v-card class="bg_element">
        <v-card-text class="font-color">
        This game uses sound alerts for certain events, you can turn off the sound completely, or only selected ones, and adjust the volume
        <br>

        <v-btn color="grey lighten-2" outline dark @click="$root.achievementSound()"> <v-icon color="grey lighten-2" left>fas fa-play</v-icon> Getting achievement </v-btn>
        
        <v-switch v-model="$store.state.achievementSound" @click.stop="Switch('achievementSound')" color="grey lighten-2" dark :label="($store.state.achievementSound) ? 'ON' : 'OFF' "></v-switch>
        <v-slider v-model="$store.state.achievementVolume" min="0.0" max="1" step="0.1" :disabled="!$store.state.achievementSound" color="grey lighten-2" dark tick-size="3" ticks="always" append-icon="fas fa-volume-up" prepend-icon="fas fa-volume-down"></v-slider>
        
        <v-btn color="grey lighten-2" outline dark @click="$root.diarySound()"> <v-icon color="grey lighten-2" left>fas fa-play</v-icon> A new entry in the diary </v-btn>
        
        <v-switch v-model="$store.state.diarySound" @click.stop="Switch('diarySound')" color="grey lighten-2" dark :label="($store.state.diarySound) ? 'ON' : 'OFF' "></v-switch>
        <v-slider v-model="$store.state.diaryVolume" min="0.0" max="1" step="0.1" :disabled="!$store.state.diarySound" color="grey lighten-2" dark tick-size="3" ticks="always" append-icon="fas fa-volume-up" prepend-icon="fas fa-volume-down"></v-slider>
        
        <v-btn color="grey lighten-2" outline dark @click="$root.phoneSound()"> <v-icon color="grey lighten-2" left>fas fa-play</v-icon> A new message in the phone </v-btn>

        <v-switch v-model="$store.state.phoneSound" @click.stop="Switch('phoneSound')" color="grey lighten-2" dark :label="($store.state.phoneSound) ? 'ON' : 'OFF' "></v-switch>
        <v-slider v-model="$store.state.phoneVolume" min="0.0" max="1" step="0.1" :disabled="!$store.state.phoneSound" color="grey lighten-2" dark tick-size="3" ticks="always" append-icon="fas fa-volume-up" prepend-icon="fas fa-volume-down"></v-slider>
        
        </v-card-text>
        </v-card>
        </v-expansion-panel-content>

        <v-expansion-panel-content class="head_element">
        <template v-slot:header>
        <div><h3>Personalization of characters</h3></div>
        </template>

        <v-card class="bg_element">
        <v-card-text class="font-color">
         In this section, you can personalize characters, changing the name, and color of the replica.
        <p/>
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
            <v-flex text-no-wrap xs5 sm3>
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
                <color-picker :change="character.changeColor" :extColor="character.color"></color-picker>
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
        <hr>
        <h1> Настройки игры </h1>
        <hr>
        <br>

        <v-expansion-panel-content class="head_element">
        <template v-slot:header>
        <div><h3> Звуки уведомлений </h3></div>
        </template>

        <v-card class="bg_element">
        <v-card-text class="font-color">
        В данной игре используются звуковые оповещения при определённых событиях, вы можете отключить звук полностью, или только выбранные, а отрегулировать громкость
        <br>

        <v-btn color="grey lighten-2" outline dark @click="$root.achievementSound()"> <v-icon color="grey lighten-2" left>fas fa-play</v-icon> Получение достижения </v-btn>
        
        <v-switch v-model="$store.state.achievementSound" @click.stop="Switch('achievementSound')" color="grey lighten-2" dark :label="($store.state.achievementSound) ? 'ON' : 'OFF' "></v-switch>
        <v-slider v-model="$store.state.achievementVolume" min="0.0" max="1" step="0.1" :disabled="!$store.state.achievementSound" color="grey lighten-2" dark tick-size="3" ticks="always" append-icon="fas fa-volume-up" prepend-icon="fas fa-volume-down"></v-slider>
        
        <v-btn color="grey lighten-2" outline dark @click="$root.diarySound()"> <v-icon color="grey lighten-2" left>fas fa-play</v-icon> Новая запись в дневнике </v-btn>
        
        <v-switch v-model="$store.state.diarySound" @click.stop="Switch('diarySound')" color="grey lighten-2" dark :label="($store.state.diarySound) ? 'ON' : 'OFF' "></v-switch>
        <v-slider v-model="$store.state.diaryVolume" min="0.0" max="1" step="0.1" :disabled="!$store.state.diarySound" color="grey lighten-2" dark tick-size="3" ticks="always" append-icon="fas fa-volume-up" prepend-icon="fas fa-volume-down"></v-slider>
        
        <v-btn color="grey lighten-2" outline dark @click="$root.phoneSound()"> <v-icon color="grey lighten-2" left>fas fa-play</v-icon> Новое сообщение в телефоне </v-btn>

        <v-switch v-model="$store.state.phoneSound" @click.stop="Switch('phoneSound')" color="grey lighten-2" dark :label="($store.state.phoneSound) ? 'ON' : 'OFF' "></v-switch>
        <v-slider v-model="$store.state.phoneVolume" min="0.0" max="1" step="0.1" :disabled="!$store.state.phoneSound" color="grey lighten-2" dark tick-size="3" ticks="always" append-icon="fas fa-volume-up" prepend-icon="fas fa-volume-down"></v-slider>
        
        </v-card-text>
        </v-card>
        </v-expansion-panel-content>

        <v-expansion-panel-content class="head_element">
        <template v-slot:header>
        <div><h3>Персонализация персонажей</h3></div>
        </template>

        <v-card class="bg_element">
        <v-card-text class="font-color">
        В этом разделе вы можете персонализировать персонажей, изменив имя, и цвет реплики.

        Если введённое имя не склоняется должным образом, тогда просклоняйте имя персонажа вручную, отметив соотвествующий пункт.
        <p/>
        <v-expansion-panel class="bg_element">
        <v-expansion-panel-content class="head_element" v-for="(character, i) in characters_ru" :key="i" hide-actions>
        <!-- АВАТАР В ШАПКЕ -->
        <template v-slot:header>
          <v-layout align-center row spacer>
            <v-flex xs4 sm2 md1>
              <v-avatar size="36px" >
                <img v-if="character.avatar" :src="character.avatar" alt="Avatar">
                <v-icon v-else :color="character.color" v-text="character.icon"></v-icon>
              </v-avatar>
            </v-flex>
        <!-- ИМЯ В ШАПКЕ -->
            <v-flex sm5 md3 hidden-xs-only>
              <strong v-html="character.name"></strong>
              <span v-if="character.total" class="grey--text">
                &nbsp;({{ character.total }})
              </span>
            </v-flex>
        <!-- КТО ЭТО? В ШАПКЕ -->
            <v-flex text-no-wrap xs5 sm3>
              <strong v-html="character.title"></strong>
            </v-flex>
        <!-- ЦИТАТА В ШАПКЕ -->
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
            <!-- ЦИТАТА В БЛОКЕ -->
            <v-flex xs12 md6>
            <p v-if="character.Declination == 'mc'" :style="{'color': $store.state.mcColor}"> {{ character.quote }} </p>
            <p v-if="character.Declination == 'sister'" :style="{'color': $store.state.sisterColor}"> {{ character.quote }} </p>
            </v-flex>
            <!-- ВЫБОР ЦВЕТА ЦИТАТЫ (РЕПЛИК) -->
            <v-flex d-flex lg1 md1 sm1 xs1>
                <color-picker :change="character.changeColor" :extColor="character.color"></color-picker>
            </v-flex>
            </v-layout>
            <!-- ЗАПОЛНЕНИЕ ИМЕНИ -->
            <v-form ref="form" v-model="validation" lazy-validation>
                <v-flex sm5 md5>
                <v-text-field v-if="character.Declination == 'mc'" v-model="mcDeclination" :rules="nameRules_ru" label="Имя" color="grey lighten-2" required></v-text-field>
                <v-text-field v-if="character.Declination == 'sister'" v-model="sisterDeclination" :rules="nameRules_ru" label="Имя" color="grey lighten-2" required></v-text-field>  <!-- ИМЯ -->
                <br/>  
                <!-- КАК БЫЛО ПРОСКЛОНЕНО -->

			          <blockquote class="blockquote">Вот сидит на стуле <b> {{ character.Im }}. </b>
			          <br>Кто б мы были без <b> {{ character.Rod }}? </b>
			          <br>Подарите что-нибудь <b> {{ character.Dat }}! </b>
			          <br><b> {{character.Vin }} </b> нужно поздравить.
			          <br><b> {{ character.Tvor }} </b> все гордятся.
                <br/>Не забывайте о <b>{{ character.Pred }}</b>
                </blockquote>

                <v-checkbox color="grey lighten-2" v-model="character.manualDeclination" :label="'Просклонять вручную'"></v-checkbox>
                <!-- ПРОСКЛОНЯТЬ ВРУЧНУЮ -->
                <v-text-field v-model="character.Rod" :disabled="!character.manualDeclination" :rules="nameRules_ru" label="Родительный (кого, чего?)" color="grey lighten-2" required></v-text-field>
                <v-text-field v-model="character.Dat" :disabled="!character.manualDeclination" :rules="nameRules_ru" label="Дательный (кому, чему?	)" color="grey lighten-2" required></v-text-field>
                <v-text-field v-model="character.Vin" :disabled="!character.manualDeclination" :rules="nameRules_ru" label="Винительный (кого, что?)" color="grey lighten-2" required></v-text-field>
                <v-text-field v-model="character.Tvor" :disabled="!character.manualDeclination" :rules="nameRules_ru" label="Творительный (кем, чем?)" color="grey lighten-2" required></v-text-field>
                <v-text-field v-model="character.Pred" :disabled="!character.manualDeclination" :rules="nameRules_ru" label="Предложный (о ком, о чём?)" color="grey lighten-2" required></v-text-field>
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
        <v-btn color="red lighten-1" @click="startGame('ru')">Начать игру</v-btn>
        </section>

    </v-flex>
    </v-expansion-panel>
</v-layout>
</v-app>
</template>

<script>
import ColorPicker from "../components/ColorPicker"
import RussianName from "../components/Name.js"

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
     characters: [
        {
          avatar:      'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
          name:         this.$store.state.mcName,
          title:       'Main character',
          quote:       'My name is Arthur. nice to meet you.',
          changeColor:  this.$root.mcUpdateColor,
          color:        this.$root.convertColor(this.$store.state.mcColor),
          Declination: 'mc',
          Im:           this.$store.state.mcName,
        },
        {
          avatar:        'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
          name:           this.$store.state.sisterName,
          title:         'Sister',
          quote:         'My name is as something and I sister',
          changeColor:    this.$root.sisterUpdateColor,
          color:          this.$root.convertColor(this.$store.state.sisterColor),
          Declination:   'sister',
          Im:             this.$store.state.sisterName,
        },
      ],
     characters_ru: [
        {
          avatar:      'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
          name:         this.$store.state.mcIm,
          title:       'Главный герой',
          quote:       'Меня зовут Артур , приятно познакомиться',
          changeColor:  this.$root.mcUpdateColor,
          color:        this.$root.convertColor(this.$store.state.mcColor),
          Declination: 'mc',
          manualDeclination: false,
          Im:           this.$store.state.mcIm,
          Rod:          this.$store.state.mcRod,
          Dat:          this.$store.state.mcDat,
          Vin:          this.$store.state.mcVin,
          Tvor:         this.$store.state.mcTvor,
          Pred:         this.$store.state.mcPred,
        },
        {
          avatar:        'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
          name:           this.$store.state.sisterIm,
          title:         'Сестра',
          quote:         'Меня зовут как-то и я сестра',
          changeColor:    this.$root.sisterUpdateColor,
          color:          this.$root.convertColor(this.$store.state.sisterColor),
          Declination:   'sister',
          manualDeclination: false,
          Im:             this.$store.state.sisterIm,
          Rod:            this.$store.state.sisterRod,
          Dat:            this.$store.state.sisterDat,
          Vin:            this.$store.state.sisterVin,
          Tvor:           this.$store.state.sisterTvor,
          Pred:           this.$store.state.sisterPred,
        },
      ],
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
          this.characters[0].name = this.$store.state.mcName
          this.characters[0].Im = this.$store.state.mcName
        }
      },
      sister: {
        get: function () {
          return this.$store.state.sisterName;
        },
        set: function (text) {
          this.$store.state.sisterName = text;
          this.characters[1].name = this.$store.state.sisterName
          this.characters[1].Im = this.$store.state.sisterName
        }
      },
      // ДЛЯ РУССКОЙ ВЕРСИИ С ФУНКЦИЕЙ СКЛОНЕНИЯ ИМЁН
      mcDeclination: {
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
          this.characters_ru[0].name = name.fullName(name.gcaseIm)
          this.characters_ru[0].Im = name.fullName(name.gcaseIm)
          this.characters_ru[0].Rod = name.fullName(name.gcaseRod)
          this.characters_ru[0].Dat = name.fullName(name.gcaseDat)
          this.characters_ru[0].Vin = name.fullName(name.gcaseVin)
          this.characters_ru[0].Tvor = name.fullName(name.gcaseTvor)
          this.characters_ru[0].Pred = name.fullName(name.gcasePred)
        }
    },
     sisterDeclination: {
        get: function () {
          return this.$store.state.sisterIm;
        },
        set: function (text) {
          this.$store.state.sisterIm = text;
          var name = new RussianName(this.$store.state.sisterIm);  // Склоняем
          // Записываем слоненные значение в Store
          this.$store.state.sisterRod = name.fullName(name.gcaseRod)
          this.$store.state.sisterDat = name.fullName(name.gcaseDat)
          this.$store.state.sisterVin = name.fullName(name.gcaseVin)
          this.$store.state.sisterTvor = name.fullName(name.gcaseTvor)
          this.$store.state.sisterPred = name.fullName(name.gcasePred)
          // Обновляем данные в characters_ru, для реактивность на странице
          this.characters_ru[1].name = name.fullName(name.gcaseIm)
          this.characters_ru[1].Im = name.fullName(name.gcaseIm)
          this.characters_ru[1].Rod = name.fullName(name.gcaseRod)
          this.characters_ru[1].Dat = name.fullName(name.gcaseDat)
          this.characters_ru[1].Vin = name.fullName(name.gcaseVin)
          this.characters_ru[1].Tvor = name.fullName(name.gcaseTvor)
          this.characters_ru[1].Pred = name.fullName(name.gcasePred)
        }
    },
    },
    methods: {
        startGame(lang){ // Для сохранения всех настроек
            this.$router.push('/');
            this.$store.commit('Header'); // Включаем кнопки в шапке
            this.$store.commit('achievementVolume');
            this.$store.commit('diaryVolume');
            this.$store.commit('phoneVolume');
            if ( lang == 'ru' ) 
              this.$store.commit('saveCharNames', 'ru');
            else 
              this.$store.commit('saveCharNames', 'en');
        },
        Switch(Sound){
            this.$store.commit(Sound);
        },
    },
    components: {
        ColorPicker,
    }
}
</script>

<style scoped>

.font-light {
  font-style: italic;
}

</style>