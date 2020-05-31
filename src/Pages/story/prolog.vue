<template>
<section>
  <br><br>
    <mChatTestPage />
  <br><br>
    <h1>Пролог</h1>
    <h2>Пролог</h2>
    <h3>Пролог</h3>
    {{ $t('message') }}
    
    <!-- <div class="mchat-notify__container">
      <div>
        <img class="mchat-notify__avatar" src="${message.avatar}" />
      </div>
      <div class="mchat-notify__message-container">
        <div class="mchat-notify__message-container__title">
          ${message.name}
        </div>
        <div class="mchat-notify__message-container__message">
          ${message.data.text}
        </div>            
      </div>
    </div> -->

    <div v-html="text" />
    <v-btn @click="test()">emoji</v-btn>

    <!-- <img src="assets/img/info-circle.svg" height="65" width="68"> -->
    <!-- <img src="@/assets/info-circle.svg" height="65" width="68"> -->
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
  {{this.$store.state.mcIm}}
  <mcSettings/>
</section>
</template>

<script>
import mc from '../../components/Chars/CharStyles/mc'
import sister from '../../components/Chars/CharStyles/sister'
import mcSettings from '../../components/Chars/CharSettings/mcSettings'
import mChatTestPage from '../../components/mChat/TestPage'

import twemoji from 'twemoji'

export default {
  data() {
    return {
      text: 'I 😄 emoji! and 😅 & ❤️',
    }
  },
  components: {
    mc,
    sister,
    mcSettings,
    mChatTestPage,
  },
  methods: {
    test(){
      console.log(twemoji.parse(this.text, {
        base: 'assets/img/',         // default MaxCDN
        ext: ".svg",          // default ".png"
        className: "emoji-test",    // default "emoji"
        folder: "twemoji"       // in case it's specified
      }))
      this.text = twemoji.parse(this.text, {
        base: 'assets/img/',         // default MaxCDN
        ext: ".svg",          // default ".png"
        className: "emoji-test",    // default "emoji"
        folder: "twemoji"       // in case it's specified
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>