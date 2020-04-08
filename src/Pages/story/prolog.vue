<template>
<section>

<section v-if="$store.state.gameLang">
<v-btn @click='$root.sendMessage("mc_support", "support", "text", { text: "lorum!"})'>Support short text...</v-btn>
<v-btn @click='$root.sendMessage("mc_support", "support", "text", { text: "Lorum ipsum orom!"})'>Support text...</v-btn>

<v-btn @click='$root.sendMessage("mc_support", "support", "text", { text: "Ipsum lorom odno id narokomoron is naruch begin end" })'>Support long text...</v-btn>
<v-btn @click='$root.sendMessage("mc_support", "support", "image", { src: require("../../Media/img/2.gif") })'>Support image gif...</v-btn>
<v-btn @click='$root.sendMessage("mc_support", "support", "video", { src: require("../../Media/video/Carmelita.mp4") })'>Support video...</v-btn>
<v-btn @click='$root.sendMessage("mc_support", "support", "audio", { src: require("../../Media/audio/Achievements.mp3") })'>Support audio..</v-btn>
<v-btn @click='$root.sendMessage("mc_support", "support", "emoji", { src: require("../../Media/img/smiling-face.png") })'>Support emoji..</v-btn>
<v-btn @click='$root.sendMessage("mc_support", "support", "suggestion", undefined, ["no", "Yes"])'>Support suggestion...</v-btn>
<v-btn @click="$root.addContactToChatList('mc')">Add mc to contacts</v-btn>
<br><br>
  <h1>prologue</h1>
  <h2>prologue</h2>
  <h3>prologue</h3>
  <h4>prologue</h4>
  <p>five days Later, after the attack, "virtuoso", I looked fit as a fiddle. Felt really lousy, but the main thing - appearance. Especially if you Amateru and constantly on mind have tens of, sometimes hundreds of, and sometimes and thousands of people.</p>
  <p>- Are you sure you're okay? - asked with suspicion Atarashiki.</p>
  <p>We just video chatted. More precisely, already had to communicate.</p>
  <p>- <MC>I'm telling you for the fourth time - everything is fine. Look at me</MC>, - I spread my hands to the sides. - <MC>Does it look like there's something wrong with me?</MC></p>
  <p> I don't Know...  the old woman didn't give up. - I don't like that bruise over your left eye.</p>
  <p>- <MC>What bruise?</MC> - I did not understand, touching first the left eyebrow, then rubbing his forehead in that place. And when he looked at his hand, he rubbed his forehead again.</p>
  <p> isn't that a bruise?  atarashiki Asked. - Shinji! Are you walking around in front of people with dirty faces?!</p>
  <p>- <MC>Well you know you have this problem?</MC> I said a little shyly.</p>
  <p>And the truth is embarrassing. It should have been smeared with soot.</p>
  <p>- You Amateru, you can't flaunt mud on your face!</p>
  <p>- <MC>Enough already!</MC> I raised my voice. - Now I understand why young obaldui run anywhere, just less often to see relatives. <MC>You are, you are... I know I'm Amateru without you.</MC></p>
{{ this.$store.state.mcIm }}
<mcSettings/>
</section>

<section v-else>
<br><br>
<v-card>
<v-card-text>
          <v-text-field
            v-model="mChatHistory_ChatID"
            placeholder="mc_support"
            label="mChatHistory_ChatID"
          ></v-text-field>
          <v-text-field
            v-model="author"
            placeholder="support"
            label="author"
          ></v-text-field>
  </v-card-text>
 </v-card>
<v-btn @click='$root.sendMessage("mc_support", "support", "text", { text: "lorum!" })'>Support short text...</v-btn>
<v-btn @click='$root.sendMessage("mc_support", "support", "text", { text: "Lorum ipsum orom!" })'>Support text...</v-btn>
<v-btn @click='$root.sendMessage("mc_support", "support", "text", { text: "Ipsum lorom odno id narokomoron is naruch begin end" })'>Support long text...</v-btn>
<v-btn @click='$root.sendMessage("mc_support", "support", "image", { src: require("../../Media/img/2.gif") })'>Support image gif...</v-btn>
<v-btn @click='$root.sendMessage("mc_support", "support", "video", { src: require("../../Media/video/Carmelita.mp4") })'>Support video...</v-btn>
<v-btn @click='$root.sendMessage("mc_support", "support", "audio", { src: require("../../Media/audio/Achievements.mp3") })'>Support audio..</v-btn>
<v-btn @click='$root.sendMessage("mc_support", "support", "emoji", { src: require("../../Media/img/smiling-face.png") })'>Support emoji..</v-btn>
<v-btn @click='$root.sendMessage("mc_support", "support", "suggestion", undefined, ["no", "Yes"])'>Support suggetion...</v-btn>
<v-btn text @click="$root.addContactToChatList('mc')">Добавить mc в контакты</v-btn>
<br><br>
  <h1>Пролог</h1>
  <h2>Пролог</h2>
  <h3>Пролог</h3>
  <h4>Пролог</h4>
  <p>Спустя пять дней после нападения "виртуоза", я выглядел как огурчик. Чувствовал себя, правда, паршиво, но главное - внешний вид. Особенно если ты Аматэру и постоянно на виду у десятков, иногда сотен, а порой и тысяч человек.</p>
  <p>- С тобой точно всё в порядке? - спросила с подозрением Атарашики.</p>
  <p>Мы с ней как раз по видеосвязи общались. Точнее, уже заканчивали общаться.</p>
  <p>- <MC>Я тебе в четвёртый раз говорю - всё прекрасно. Глянь на меня</MC>, - развёл я руки в стороны. - <MC>Разве похоже, что со мной что-то не так?</MC></p>
  <p>- Даже не знаю... - не сдавалась старуха. - Мне вот не нравится тот синяк у тебя над левым глазом.</p>
  <p>- <MC>Какой синяк?</MC> - не понял я, дотронувшись сначала до левой брови, потом потерев лоб в том месте. А когда глянул на руку, потёр лоб ещё раз.</p>
  <p>- Это что, не синяк? - спросила Атарашики. - Синдзи! Ты что, ходишь на глазах у людей с чумазым лицом?!</p>
  <p>- <MC>Ну бывает, что ты взъелась?</MC> - произнёс я немного стыдливо.</p>
  <p>И правда, неудобно вышло. Это ведь надо было в саже измазаться.</p>
  <p>- Ты Аматэру, ты не можешь щеголять с грязью на лице!</p>
  <p>- <MC>Хватит уже!</MC> - повысил я голос. - Теперь понятно, почему молодые обалдуи бегут куда угодно, лишь бы пореже видеть родню. <MC>Ты - то, ты - это... Я и без тебя знаю, что я Аматэру.</MC></p>
{{ this.$store.state.mcIm }}
<mcSettings/>

</section>

</section>
</template>

<script>
import MC from '../../components/CharStyles/MC'
import Sister from '../../components/CharStyles/Sister'
import mcSettings from '../../components/CharSettings/mcSettings'
import PullTo from 'vue-pull-to'

export default {
    data(){
        return {
            author: '',
            mChatHistory_ChatID: '',
        }
    },
    components: {
        MC,
        Sister,
        mcSettings,
        PullTo,
    },
    methods: {
    }
}
</script>

<style>

</style>