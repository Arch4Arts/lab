<template>
  <section>
  <v-form>
    <v-autocomplete
      v-model="selectedContactID"
      :items="getContactIDList"
      chips
      label="contactID"
      hide-details
      hide-no-data
      hide-selected
    ></v-autocomplete>
    <br>
    <v-autocomplete
      v-model="selectedChatID"
      :items="getChatIDList"
      chips
      label="ChatID"
      hide-details
      hide-no-data
      hide-selected
    ></v-autocomplete>
  </v-form>
 
  <br>
  Chat NewMSGNumber: {{ $store.state.mChat.newMessagesCount }}
  <br><br>
  <v-btn @click='sendMessage(selectedChatID, selectedContactID, "text", { text: "lorum!" })'>short text...</v-btn>
  <v-btn @click='sendMessage(selectedChatID, selectedContactID, "text", { text: "Lorum **ipsum** orom!" })'>text...</v-btn>
  <v-btn @click='sendMessage(selectedChatID, selectedContactID, "text", { text: "Ipsum **_lorom odno_** id narokomoron is naruch begin end" })'>long text...</v-btn>
  <v-btn @click='sendMessage(selectedChatID, selectedContactID, "image", { src: require("../../media/img/2.gif") })'>image gif...</v-btn>
  <v-btn @click='sendMessage(selectedChatID, selectedContactID, "video", { src: require("../../media/video/Carmelita.mp4") })'>video...</v-btn>
  <v-btn @click='sendMessage(selectedChatID, selectedContactID, "audio", { src: require("../../media/audio/test.mp3") })'>audio..</v-btn>
  <v-btn @click='sendMessage(selectedChatID, selectedContactID, "emoji", { src: require("../../media/img/smiling-face.png") })'>emoji..</v-btn>
  <v-btn @click='sendMessage(selectedChatID, selectedContactID, "suggestion", { suggestions: ["no", "Yes"] })'>suggetions</v-btn>
  <br>
  <v-btn text @click="addContactToChatList('mc')">Добавить mc в контакты</v-btn>
  <br><br>
  <v-btn @click="genUID()">Gen UID</v-btn>
  {{ uniqid }}  
  </section>
</template>

<script>
import { sendMessage, addContactToChatList } from './mChatFunctions.js'

export default {
  data(){
    return {
      selectedContactID: '',
      selectedChatID: '',
      uniqid: '',

      sendMessage: sendMessage,
      addContactToChatList: addContactToChatList,
    }
  },
  computed: {
    getContactIDList() {
      let ContactIDList = [];
      var users = this.$store.state.mChatData.MC;
      for (let user of users) { // Перебираем для каждого пользователя
        ContactIDList.push(user.contactID)
      }
      return ContactIDList
    },
    getChatIDList() {
      let ChatIDList = [];
      var users = this.$store.state.mChatData.MC;
      for (let user of users) { // Перебираем для каждого пользователя
        ChatIDList.push(user.chatID)
      }
      return ChatIDList
    }
  },
  methods: {
    genUID(){
      var uniqid = require('uniqid');
      this.uniqid = uniqid()
    }
  }
}
</script>

<style scoped>

</style>