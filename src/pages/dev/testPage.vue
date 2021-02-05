<template>
<section>
  <br><br>
    <mChatTestPage />
  <br><br>
    <h1>Пролог</h1>
    <h2>Пролог</h2>
    <h3>Пролог</h3>
    <!-- {{ $t('message') }} -->


    <!-- <emoji /> -->

    <!-- <img src="assets/img/info-circle.svg" height="65" width="68"> -->
    <!-- <img src="@/assets/info-circle.svg" height="65" width="68"> -->
    <h4>Пролог</h4>
    <v-btn @click="toggleFullScreen123()">call error</v-btn>
    <v-btn @click="test()">Загрузить компонент</v-btn>
    <test-special :key="$store.state.reRender_SpecialComponents" />
    <wolf :key="$store.state.reRender_SpecialComponents" />
    <p>Мы с ней как раз по видеосвязи общались. Точнее, уже заканчивали общаться.</p>
    <p>- <mc>Я тебе в четвёртый раз говорю - всё прекрасно. Глянь на меня</mc>, - развёл я руки в стороны. - <mc>Разве похоже, что со мной что-то не так?</mc></p>
    {{  this.$store.state.mcIm  }}
  <mcSettings/>
</section>
</template>

<script>
import mc from '../../components/Chars/CharStyles/MC'
import sister from '../../components/Chars/CharStyles/Sister'
import mcSettings from '../../components/Chars/CharSettings/mcSettings'
import mChatTestPage from '../../components/mChat/TestPage'
import emoji from './emoji'

import eventBus from '../../js/eventBus.js'

export default {
  data() {
    return {
    }
  },
  components: {
    mc,
    sister,
    mcSettings,
    mChatTestPage,
    emoji,
  },
  methods: {
    test() {
      eventBus.emit('specialCheck', 123)
    },
  }
}
</script>

<style lang='scss' scoped>

</style>