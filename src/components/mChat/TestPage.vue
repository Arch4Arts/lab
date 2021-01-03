<template>
  <section>
  <v-form>
    <v-autocomplete
      class="test-chat"
      v-model="selectedCharID"
      :items="getCharIDList"
      chips
      label="Char ID"
      hide-details
      hide-no-data
      hide-selected
    ></v-autocomplete>
    <br>
    <v-autocomplete
      class="test-chat"
      v-model="selectedChatID"
      :items="getChatIDList"
      chips
      label="Chat ID"
      hide-details
      hide-no-data
      hide-selected
    ></v-autocomplete>
  </v-form>
 
  <br>
  <br><br>
  <p>Send</p>
  <v-btn class="test-chat" 
    @click='sendMessage(selectedChatID, selectedCharID, "text", { text: "lorum! 😍" })'>short text...</v-btn>
  <v-btn class="test-chat" 
    @click='sendMessage(selectedChatID, selectedCharID, "text", { text: "Lorum 😍 **ipsum** orom!" })'>text...</v-btn>
  <v-btn class="test-chat" 
    @click='sendMessage(selectedChatID, selectedCharID, "text", { text: "Ipsum **_lorom odno_** id narokomoron 😍 is naruch begin end" })'>long text...</v-btn>
  <v-btn class="test-chat" 
    @click='sendMessage(selectedChatID, selectedCharID, "image", { src: require("../../media/img/2.gif") })'>image gif...</v-btn>
  <v-btn class="test-chat" 
    @click='sendMessage(selectedChatID, selectedCharID, "video", { src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", poster: require("../../media/img/video test preview.jpeg") })'>video...</v-btn>
  <v-btn class="test-chat" 
    @click='sendMessage(selectedChatID, selectedCharID, "audio", { src: require("../../media/audio/test.mp3") })'>audio..</v-btn>
  <v-btn class="test-chat" 
    @click='sendMessage(selectedChatID, selectedCharID, "emoji", { emoji: "😍" })'>emoji..</v-btn>
  <v-btn class="test-chat" 
    @click='sendMessage(selectedChatID, selectedCharID, "suggestion", { suggestions: ["no", "Yes"] })'>suggetions</v-btn>
    <v-btn class="test-chat" 
    @click='sendMessage(selectedChatID, selectedCharID, "system", { text: "SYS lorum" })'>system</v-btn>
  <br>
  <v-btn class="test-chat" text @click="addContactToChatList('mc_erza')">Добавить mc в контакты</v-btn>
  <br><br>
  <v-btn class="test-chat" @click="genUID()">Gen UID</v-btn>
  {{ uniqid }}  
  </section>
</template>

<script>
import { sendMessage, addContactToChatList } from './mChatFunctions.js'

export default {
  data(){
    return {
      selectedCharID: 'erza',
      selectedChatID: 'erza',
      uniqid: '',

      sendMessage: sendMessage,
      addContactToChatList: addContactToChatList,
    }
  },
  computed: {
    getCharIDList() {
      let CharIDList = [];
      let chars = this.$store.state.mChatCharProfiles;
      for (let char of chars) { // Перебираем для каждого пользователя
        CharIDList.push(char.charID)
      }
      return CharIDList
    },
    getChatIDList() {
      let chatIDList = [];
      let chatList = this.$store.state.mChatList.MC;
      for (let chat of chatList) { // Перебираем для каждого пользователя
        chatIDList.push(chat.chatID)
      }
      return chatIDList
    }
  },
  methods: {
    genUID(){
      let uniqid = require('uniqid');
      this.uniqid = uniqid()
    }
  }
}
</script>

<style lang='scss' scoped>

</style>