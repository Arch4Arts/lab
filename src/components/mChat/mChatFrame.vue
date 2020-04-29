<template>
  <!-- текстура смартфона -->
  <div class="smartphone-texture" :class="{ opened: $store.state.mChat.show, closed: !$store.state.mChat.show }">
    <!-- Текстура поделена на 2 части основную и нижнюю -->
    <img src="../../assets/Samsung Galaxy S7 Black.png" class="smartphone-texture">
    <img src="../../assets/Samsung Galaxy S7 Black_bottom.png" class="smartphone-texture close-area" @click.prevent="closeChat()">
    <!-- Страница со списком чатов -->
    <ChatList
      class="chat-list" 
      v-if="$store.state.mChat.chatListShow"

      :chatList="chatList"
      :mChatData="mChatData"
    />
    <!-- Конкретный чат -->
    <div v-if="!$store.state.mChat.chatListShow" class="chat-window">
      <!-- Шапка -->
      <MessageListToolbar />
      <!-- Область прокрутки с сообщениями -->
      <MessageList
        :messages="getMessageList"
        :mChatData="mChatData"
      />
      <!-- Декоративная панель ввода -->
      <MessageListInput v-if="$store.state.mChat.showDecorativeInputPanel" /> 
     </div>
  </div>
</template>

<script>
import MessageListToolbar from './MessageListToolbar.vue'
import MessageListInput from './MessageListInput.vue'
import MessageList from './MessageList.vue'

import ChatList from './ChatList'

export default {
  props: {    
    mChatData: {
      type: Array,
      required: true,
    },    
    chatList: {
      type: Array,
      required: true
    },
  },
  computed: {
    getMessageList() {
      this.$store.state.mChat.chatListShow // обновляет список сообщений при каждом открытии и закрытии списка пользователей
      
      let messages;
      var chatData = this.mChatData;
      var selectedChat = this.$store.state.mChat.selectedChatID
      console.log(selectedChat)
      for (let i in chatData) { // Перебираем для каждого пользователя
        if (chatData[i].chatID === selectedChat) {
          chatData[i].unreadMessageCount = 0 // Сбрасываем индивидуальный счётчик непрочитанных сообщений контакта
          return messages = chatData[i].messagesHistory
        }
      }
    },
  },
  methods: {
    closeChat() {
      this.$store.commit('mChatShow');
    },
  },
  components: {
    MessageListToolbar,
    MessageListInput,    
    ChatList,
    MessageList,
  },
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

.chat-list {
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
  .chat-list {
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
