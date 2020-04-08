<template>
  <!-- текстура смартфона -->
  <div class="smartphone-texture" :class="{ opened: $store.state.mChat.mChat_Show, closed: !$store.state.mChat.mChat_Show }">
    <!-- Текстура поделена на 2 части основную и нижнюю -->
    <img src="../../assets/Samsung Galaxy S7 Black.png" class="smartphone-texture">
    <img src="../../assets/Samsung Galaxy S7 Black_bottom.png" class="smartphone-texture close-area" @click.prevent="closeChat()">
    <!-- Страница с контактами -->
    <ContactsPage class="contacts-page" v-if="$store.state.mChat.mChat_ContactsPage"></ContactsPage>
    <!-- Чат с конкретным контактом -->
    <div v-if="!$store.state.mChat.mChat_ContactsPage" class="chat-window">
      <MessageList
        :messages="messageList"
        :contacts="contacts"
        :mChat_TypingIndicatorEnable="mChat_TypingIndicatorEnable"
        :alwaysScrollToBottom="alwaysScrollToBottom"
        :messageStyling="messageStyling"
        @scrollToTop="$emit('scrollToTop')"
      />
     </div>
  </div>
</template>

<script>
import MessageList from './MessageList.vue'
import UserInput from './UserInput.vue'
// import UserList from './UserList.vue'

import ContactsPage from './ContactsPage'

export default {
  components: {
    MessageList,
    UserInput,
    // UserList,
    ContactsPage
  },
  props: {
    contacts: {
      type: Array,
      required: true
    },
    mChat_TypingIndicatorEnable: {
      type: String,
      required: true
    },
    alwaysScrollToBottom: {
      type: Boolean,
      required: true
    },
    messageStyling: {
      type: Boolean,
      required: true
    },
    disableUserListToggle: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    messageList() {
      // let messages = this.messageList
      this.$store.state.mChat.mChat_ContactsPage // обновляет список сообщений при каждом открытии и закрытии списка пользователей

      let messages;
      var users = this.$store.state.mChatHistory;
      var selectedUser = this.$store.state.mChat.mChat_ContactClikedID
      for (let user of users) { // Перебираем для каждого пользователя
        if (user.mChatHistory_ContactID === selectedUser) {
          user.mChatHistory_unReadMsgCount = 0 // Сбрасываем индивидуальный счётчик непрочитанных сообщений контакта
          console.log(user.mChatHistory_MsgHistory.length)
          return messages = user.mChatHistory_MsgHistory
        }
      }
    }
  },
  methods: {
    onSubmitSuggestion(suggestion){ // Импорт для userInput (Suggestions)
      // this.messageList = [...this.messageList, message]
      var users = this.$store.state.mChatHistory; // Не копируем массив, чтобы изменять оригинал
      var selectedUser = this.$store.state.mChat.mChat_ContactClikedID
      for (let user of users) { // Перебираем для каждого пользователя
        if (user.mChatHistory_ContactID === selectedUser) {
          // если отправляемый suggestion автономен, то нужно удалить его запись из истории, и добавить уже в виде ответа от ME
          if (user.mChatHistory_MsgHistory[user.mChatHistory_MsgHistory.length - 1].type === 'suggestion') user.mChatHistory_MsgHistory.splice([user.mChatHistory_MsgHistory.length - 1], 1)
          // В противном случае просто отправить ответ от ME, т.к suggestion был привязан к THEM
          user.mChatHistory_MsgHistory = [...user.mChatHistory_MsgHistory, suggestion]
          this.$store.commit('updateStores');
        }
      }
    },
    getSuggestions(){
      return this.messageList.length > 0 ? this.messageList[this.messageList.length - 1].suggestions : []
    },
    closeChat() {
      this.$store.state.mChat.mChat_Show = false
      this.$store.state.mChat.mChat_NewMessagesCount = 0
      this.$store.commit('updateStores');
    },
  }
}
</script>
<style scoped>

.smartphone-texture {
  transition: 0.3s ease-in-out;
  width: 370px;
  position: fixed;
  right: 25px;
  bottom: 0px;
  box-sizing: border-box;
}

.smartphone-texture.close-area {
  cursor: pointer;
}

.smartphone-texture.closed {
  opacity: 0;
  visibility: hidden;
  bottom: 90px;
}

.contacts-page {
  width: 340px;
  height: calc(100% - 120px);
  max-height: 598px;
  position: fixed;
  right: 39px;
  bottom: 70px;
  box-sizing: border-box;
  overflow-y: auto;
}

.chat-window {
  width: 340px;
  height: calc(100% - 120px);
  max-height: 598px;
  position: fixed;
  right: 39px;
  bottom: 70px;
  box-sizing: border-box;
  /* box-shadow: 0px 7px 40px 2px rgba(148, 149, 150, 0.1); */
  /* background: white; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: 0.3s ease-in-out;
  /* border-radius: 20px; */
  font-family: 'Helvetica Neue', sans-serif;
  font-size: 11pt;
}

.chat-window.closed {
  opacity: 0;
  visibility: hidden;
  bottom: 90px;
}

@media (max-width: 450px) {
  .contacts-page {
    width: 100%;
    height: 100%;
    max-height: 100%;
    right: 0px;
    bottom: 0px;
  }

  .chat-window {
    width: 100%;
    height: 100%;
    max-height: 100%;
    right: 0px;
    bottom: 0px;
    border-radius: 0px;
  }

  .chat-window {
    transition: 0.1s ease-in-out;
  }
  
  .chat-window.closed {
    bottom: 0px;
  }
}
</style>
