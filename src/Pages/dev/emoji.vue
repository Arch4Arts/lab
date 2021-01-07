<template>
  <div>
    <h2>Emoji debug</h2>
    <div v-html="emojiText"/>
    <v-btn @click="test()">Convert to twemoji</v-btn>
  </div>
</template>

<script>
import twemoji from 'twemoji'

export default {
  data() {
    return {
      emojiText: 'I 😄 emoji! and 😅 & ❤️',
    }
  },
  methods: {
    test(){
      // console.log(twemoji.parse(emojiText, { callback: twemojiCode => { twemojiCode } }))
      console.log(twemoji.parse(this.emojiText, {
        base: 'assets/img/',         // default MaxCDN
        ext: ".svg",          // default ".png"
        className: "emoji-test",    // default "emoji"
        folder: "twemoji"       // in case it's specified
      }))
      this.emojiText = twemoji.parse(this.emojiText, {
        base: 'assets/img/',         // default MaxCDN
        ext: ".svg",          // default ".png"
        className: "emoji-test",    // default "emoji"
        folder: "twemoji"       // in case it's specified
      })
    },
  }
}
</script>

<style>

.emoji-test {
  height: 24px;
}

</style>