<template>
<section>

<section v-if="$store.state.lang">
<mcSettings/>
</section>

<section v-else>
<br><br>
<v-card class="bg_elemen">
<v-card-text class="font-color">
          <v-text-field
            v-model="chatID"
            placeholder="mc_support"
            label="chatID"
          ></v-text-field>
          <v-text-field
            v-model="author"
            placeholder="support"
            label="author"
          ></v-text-field>
  </v-card-text>
 </v-card>
 <v-btn @click='$root.sendMessage("mc_support", "support", "text", { text: "Шлюха!" })'>Support short text...</v-btn>
<v-btn @click='$root.sendMessage("mc_support", "support", "text", { text: "Пиздец ты сиси шлюха" })'>Support text...</v-btn>
<v-btn @click='$root.sendMessage("mc_support", "support", "text", { text: "Хочешь получить в попку а шлюха? Будешь кончать как девочка!" })'>Support long text...</v-btn>
<v-btn @click='$root.sendMessage("mc_support", "support", "image", { src: require("../../Media/img/2.gif") })'>Support image gif...</v-btn>
<v-btn @click='$root.sendMessage("mc_support", "support", "video", { src: require("../../Media/video/Carmelita.mp4") })'>Support video...</v-btn>
<v-btn @click='$root.sendMessage("mc_support", "support", "audio", { src: require("../../Media/audio/Achievements.mp3") })'>Support audio..</v-btn>
<v-btn @click='$root.sendMessage("mc_support", "support", "emoji", { src: require("../../Media/img/smiling-face.png") })'>Support emoji..</v-btn>
<v-btn @click='$root.sendMessage("mc_support", "support", "suggestion", undefined, ["slut", "Yes, i sissy!"])'>Support suggetion...</v-btn>
<v-btn @click="$root.addContactToChatList('mc')">Добавить mc в контакты</v-btn>
<v-btn @click="df()">test</v-btn>
<br><br>
{{ this.$store.state.mcIm }}
<mcSettings/>
</section>

</section>
</template>

<script>
import MC from '../../components/CharStyles/MC'
import Sister from '../../components/CharStyles/Sister'
import mcSettings from '../../components/CharSettings/mcSettings'

export default {
    data(){
        return {
            author: '',
            chatID: ''
        }
    },
    components: {
        MC,
        Sister,
        mcSettings,
    },
}
</script>

<style scoped>

.bg_elemen {
  background: white
}

</style>