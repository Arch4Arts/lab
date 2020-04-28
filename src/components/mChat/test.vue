<template>
<div>
  <message :source="source" :mChatData="mChatData" />
  <Suggestions :suggestions="getSuggestions()" @sendSuggestion="_submitSuggestion"/>  
</div>
</template>

<script>
import Message from './Message.vue'
import Suggestions from './Suggestions.vue'

export default {
  props: {
    source: { 
      type: Object,
      required: true,
    },
    mChatData: {
      type: Array,
      required: true,
    },  
  },
  methods: {
    onSubmitSuggestion(suggestion){ 
      var chatData = this.mChatData; // присваиваем ссылку, чтобы изменять оригинал
      var selectedUser = this.$store.state.mChat.selectedContactID // В какой чат отправлять
      for (let chat of chatData) { // Перебираем для каждого пользователя
        if (chat.contactID === selectedUser) {
          // если отправляемый suggestion автономен(т.е с type = suggestion), то нужно удалить его запись из истории, и добавить уже в виде ответа от From_me
          if (chat.messagesHistory[chat.messagesHistory.length - 1].type === 'suggestion') 
            chat.messagesHistory.splice([chat.messagesHistory.length - 1], 1)
          // В противном случае просто отправить ответ от From_me, т.к suggestion был привязан к From_them
          chat.messagesHistory = [...chat.messagesHistory, suggestion]
          this.$store.commit('updateStores');
        }
      }
    },
    getSuggestions(){
      this.source.suggestions
    },
    _submitSuggestion(suggestion) {
      let uniqid = require('uniqid');
      this.onSubmitSuggestion({uid: uniqid(), type: 'text', author: 'me', data: { text: suggestion }})
    },
  },
  components: {
    Message,
    Suggestions,
  },
}
</script>

<style>

</style>