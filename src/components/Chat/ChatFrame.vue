<template>
  <div class="smartphone" :class="{opened: $store.state.chat.isChatOpen, closed: !$store.state.chat.isChatOpen}">
    <img src="../../assets/Samsung Galaxy S7 Black.png" class="smartphone">
    <img src="../../assets/Samsung Galaxy S7 Black_bottom.png" class="smartphone close-area" @click.prevent="closeChat()">
    <Chat-users-list class="vlist" v-if="$store.state.chat.UserListShow"></Chat-users-list>
    <div v-if="!$store.state.chat.UserListShow" class="sc-chat-window">
      <!-- <UserList 
        v-if="showUserList"
        :participants="participants"
      /> -->
      <v-toolbar color="cyan" dark height="50" flat>
        <v-btn icon @click="backToUserList()">
          <v-icon size="18"> fas fa-arrow-left </v-icon>
        </v-btn>
        <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
        <v-toolbar-title> 
        <!-- ЗАГОЛОВОК ЧАТА преобразует tailor в Tailor -->
          {{ this.$store.state.chat.ContactOnClikedName }} 
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon size="18"> fas fa-phone </v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon size="18"> fas fa-video </v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon size="18"> fas fa-ellipsis-v </v-icon>
        </v-btn>
      </v-toolbar>
      <MessageList
        :messages="messageList"
        :participants="participants"
        :showTypingIndicator="showTypingIndicator"
        :colors="colors"
        :alwaysScrollToBottom="alwaysScrollToBottom"
        :messageStyling="messageStyling"
        @scrollToTop="$emit('scrollToTop')"
      />
      <UserInput
        :onSubmit="onSubmitSuggestion"
        :suggestions="getSuggestions()"
        :placeholder="placeholder"
        :colors="colors" />
     </div>
  </div>
</template>

<script>
import MessageList from './MessageList.vue'
import UserInput from './UserInput.vue'
// import UserList from './UserList.vue'

import ChatUsersList from './ChatUsersList'

export default {
  components: {
    MessageList,
    UserInput,
    // UserList,
    ChatUsersList
  },
  props: {
    participants: {
      type: Array,
      required: true
    },
    // onUserInputSubmit: {
    //   type: Function,
    //   required: true
    // },
    // onClose: {
    //   type: Function,
    //   required: true
    // },
    // messageList: {
    //   type: Array,
    //   default: () => []
    // },
    // isOpen: {
    //   type: Boolean,
    //   default: () => false
    // },
    placeholder: {
      type: String,
      default: 'Write a reply'
    },
    showTypingIndicator: {
      type: String,
      required: true
    },
    colors: {
      type: Object,
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
      this.$store.state.chat.UserListShow // обновляет список сообщений при каждом открытии и закрытии списка пользователей

      let messages;
      var users = this.$store.state.chatUsers;
      var selectedUser = this.$store.state.chat.ContactOnClikedID
      for (let user of users) { // Перебираем для каждого пользователя
        if (user.id === selectedUser) {
          user.unreadMSGCount = 0 // Сбрасываем индивидуальный счётчик непрочитанных сообщений контакта
          console.log(user.messagesHistory.length)
          return messages = user.messagesHistory
        }
      }
    }
  },
  methods: {
    onSubmitSuggestion(suggestion){ // Импорт для userInput (Suggestions)
      // this.messageList = [...this.messageList, message]
      var users = this.$store.state.chatUsers; // Не копируем массив, чтобы изменять оригинал
      var selectedUser = this.$store.state.chat.ContactOnClikedID
      for (let user of users) { // Перебираем для каждого пользователя
        if (user.id === selectedUser) {
          // если отправляемый suggestion автономен, то нужно удалить его запись из истории, и добавить уже в виде ответа от ME
          if (user.messagesHistory[user.messagesHistory.length - 1].type === 'suggestion') user.messagesHistory.splice([user.messagesHistory.length - 1], 1)
          // В противном случае просто отправить ответ от ME, т.к suggestion был привязан к THEM
          user.messagesHistory = [...user.messagesHistory, suggestion]
        }
      }
    },
    getSuggestions(){
      return this.messageList.length > 0 ? this.messageList[this.messageList.length - 1].suggestions : []
    },
    closeChat() {
      this.$store.state.chat.isChatOpen = false
      this.$store.state.chat.newMessagesCount = 0
    },
    backToUserList(){
      this.$store.state.chat.UserListShow = !this.$store.state.chat.UserListShow
    }
  }
}
</script>
<style scoped>

.smartphone {
  transition: 0.3s ease-in-out;
  width: 370px;
  position: fixed;
  right: 25px;
  bottom: 0px;
  box-sizing: border-box;
}
.smartphone.close-area {
  cursor: pointer;
}
.smartphone.closed {
  opacity: 0;
  visibility: hidden;
  bottom: 90px;
}

.vlist {
  width: 340px;
  height: calc(100% - 120px);
  max-height: 595px;
  position: fixed;
  right: 39px;
  bottom: 70px;
  box-sizing: border-box;
  overflow-y: auto;
}

.sc-chat-window {
  width: 340px;
  height: calc(100% - 120px);
  max-height: 595px;
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

.sc-chat-window.closed {
  opacity: 0;
  visibility: hidden;
  bottom: 90px;
}

.sc-message--me {
  text-align: right;
}
.sc-message--them {
  text-align: left;
}

@media (max-width: 450px) {
  .vlist {
    width: 100%;
    height: 100%;
    max-height: 100%;
    right: 0px;
    bottom: 0px;
  }

  .sc-chat-window {
    width: 100%;
    height: 100%;
    max-height: 100%;
    right: 0px;
    bottom: 0px;
    border-radius: 0px;
  }

  .sc-chat-window {
    transition: 0.1s ease-in-out;
  }
  
  .sc-chat-window.closed {
    bottom: 0px;
  }
}
</style>
