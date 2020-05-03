<template>
<section>

<section v-if="$store.state.gameLang">
<br><br>
  <h1>prologue</h1>
  <h2>prologue</h2>
  <h3>prologue</h3>
  <h4>prologue</h4>
  <p>five days Later, after the attack, "virtuoso", I looked fit as a fiddle. Felt really lousy, but the main thing - appearance. Especially if you Amateru and constantly on mind have tens of, sometimes hundreds of, and sometimes and thousands of people.</p>
  <p>- Are you sure you're okay? - asked with suspicion Atarashiki.</p>
  <p>We just video chatted. More precisely, already had to communicate.</p>
  <p>- <mc>I'm telling you for the fourth time - everything is fine. Look at me</mc>, - I spread my hands to the sides. - <mc>Does it look like there's something wrong with me?</mc></p>
  <p> I don't Know...  the old woman didn't give up. - I don't like that bruise over your left eye.</p>
  <p>- <mc>What bruise?</mc> - I did not understand, touching first the left eyebrow, then rubbing his forehead in that place. And when he looked at his hand, he rubbed his forehead again.</p>
  <p> isn't that a bruise?  atarashiki Asked. - Shinji! Are you walking around in front of people with dirty faces?!</p>
  <p>- <mc>Well you know you have this problem?</mc> I said a little shyly.</p>
  <p>And the truth is embarrassing. It should have been smeared with soot.</p>
  <p>- You Amateru, you can't flaunt mud on your face!</p>
  <p>- <mc>Enough already!</mc> I raised my voice. - Now I understand why young obaldui run anywhere, just less often to see relatives. <mc>You are, you are... I know I'm Amateru without you.</mc></p>
{{ this.$store.state.mcIm }}
<mcSettings/>
</section>

<section v-else>
<br><br>
  <mChatTestPage />
<br><br>
  <v-btn @click="test()"></v-btn>
  <vue-draggable-resizable>
  <p>You can drag me around and resize me as you wish.</p>
</vue-draggable-resizable>
  <test :width="320" :height="700" />
  <!-- <test2 :height="700" /> -->
  
  <h1>Пролог</h1>
  <h2>Пролог</h2>
  <h3>Пролог</h3>
  <h4>Пролог</h4>
  <p>Спустя пять дней после нападения "виртуоза", я выглядел как огурчик. Чувствовал себя, правда, паршиво, но главное - внешний вид. Особенно если ты Аматэру и постоянно на виду у десятков, иногда сотен, а порой и тысяч человек.</p>
  <p>- С тобой точно всё в порядке? - спросила с подозрением Атарашики.</p>
  <p>Мы с ней как раз по видеосвязи общались. Точнее, уже заканчивали общаться.</p>
  <p>- <mc>Я тебе в четвёртый раз говорю - всё прекрасно. Глянь на меня</mc>, - развёл я руки в стороны. - <mc>Разве похоже, что со мной что-то не так?</mc></p>
  <p>- Даже не знаю... - не сдавалась старуха. - Мне вот не нравится тот синяк у тебя над левым глазом.</p>
  <p>- <mc>Какой синяк?</mc> - не понял я, дотронувшись сначала до левой брови, потом потерев лоб в том месте. А когда глянул на руку, потёр лоб ещё раз.</p>
  <p>- Это что, не синяк? - спросила Атарашики. - Синдзи! Ты что, ходишь на глазах у людей с чумазым лицом?!</p>
  <p>- <mc>Ну бывает, что ты взъелась?</mc> - произнёс я немного стыдливо.</p>
  <p>И правда, неудобно вышло. Это ведь надо было в саже измазаться.</p>
  <p>- Ты Аматэру, ты не можешь щеголять с грязью на лице!</p>
  <p>- <mc>Хватит уже!</mc> - повысил я голос. - Теперь понятно, почему молодые обалдуи бегут куда угодно, лишь бы пореже видеть родню. <mc>Ты - то, ты - это... Я и без тебя знаю, что я Аматэру.</mc></p>
{{ this.$store.state.mcIm }}
<mcSettings/>

</section>

</section>
</template>

<script>
import mc from '../../components/Chars/CharStyles/mc'
import sister from '../../components/Chars/CharStyles/sister'
import mcSettings from '../../components/Chars/CharSettings/mcSettings'
import mChatTestPage from '../../components/mChat/TestPage'
import test from './test.vue'
import test2 from '../../assets/Samsung Galaxy S8 Arctic Silver.svg'

export default {
  components: {
    mc,
    sister,
    mcSettings,
    mChatTestPage,
    test,
    test2
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>