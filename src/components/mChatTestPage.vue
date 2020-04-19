<template>
  <section>
  <v-form>
    <v-autocomplete
      v-model="selectedContactID"
      :items="ContactID"
      chips
      label="ContactID"
      hide-details
      hide-no-data
      hide-selected
    ></v-autocomplete>
    <br>
    <v-autocomplete
      v-model="selectedChatID"
      :items="ChatID"
      chips
      label="ChatID"
      hide-details
      hide-no-data
      hide-selected
    ></v-autocomplete>
  </v-form>
 
  <br>
  Chat NewMSGNumber: {{ $store.state.mChat.mChat_NewMessagesCount }}
  <br><br>
  <v-btn @click='sendMessage(selectedChatID, selectedContactID, "text", { text: "lorum!" })'>Support short text...</v-btn>
  <v-btn @click='sendMessage(selectedChatID, selectedContactID, "text", { text: "Lorum ipsum orom!" })'>Support text...</v-btn>
  <v-btn @click='sendMessage(selectedChatID, selectedContactID, "text", { text: "Ipsum lorom odno id narokomoron is naruch begin end" })'>Support long text...</v-btn>
  <v-btn @click='sendMessage(selectedChatID, selectedContactID, "image", { src: require("../Media/img/2.gif") })'>Support image gif...</v-btn>
  <v-btn @click='sendMessage(selectedChatID, selectedContactID, "video", { src: require("../Media/video/Carmelita.mp4") })'>Support video...</v-btn>
  <v-btn @click='sendMessage(selectedChatID, selectedContactID, "audio", { src: require("../Media/audio/test.mp3") })'>Support audio..</v-btn>
  <v-btn @click='sendMessage(selectedChatID, selectedContactID, "emoji", { src: require("../Media/img/smiling-face.png") })'>Support emoji..</v-btn>
  <v-btn @click='sendMessage(selectedChatID, selectedContactID, "suggestion", undefined, ["no", "Yes"])'>Support suggetion...</v-btn>
  <br>
  <v-btn text @click="addContactToChatList('mc')">Добавить mc в контакты</v-btn>
  <br><br>
  <v-btn @click="genUID()">Gen UID</v-btn>
  {{ uniqid }}  
  </section>
</template>

<script>
import { sendMessage, addContactToChatList } from './Chat/mChatFunctions.js'

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
    ContactID() {
      let ContactsIDList = [];
      var users = this.$store.state.mChatData;
      for (let user of users) { // Перебираем для каждого пользователя
        ContactsIDList.push(user.mChatData_ContactID)
      }
      return ContactsIDList
    },
    ChatID() {
      let ContactsIDList = [];
      var users = this.$store.state.mChatData;
      for (let user of users) { // Перебираем для каждого пользователя
        ContactsIDList.push(user.mChatData_ChatID)
      }
      return ContactsIDList
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