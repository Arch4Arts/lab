<template>
<div>
  <FloatingChatButton :unreadMessagesCount="getUnreadMessagesCount" />
  <mChatFrame
    :mChatData="mChatData"
    :chatList="getChatList"
    :messageList="getMessageList"
    v-click-outside="vConfig"
  />
</div>
</template>

<script>
import mChatFrame from './mChatFrame.vue'
import FloatingChatButton from './FloatingChatButton.vue'

import eventBus from '../../js/eventBus.js'

export default {
  name: 'MC_chat', // Экземпляр главного героя
  data () {
    return {
      vConfig: {
        handler: this.closeChat, // Обработчик
        middleware: this.middleware, // Промежуточный слой проверки объекта попавшего под клик
        isActive: true
      }
    }
  },
  computed: {
    mChatData(){
      return this.$store.state.mChatData.MC;
    },
    getChatList(){
      return this.$store.state.mChatData.MC.сurrentChatList;
    },
    getMessageList() {
      this.$store.state.mChat.chatListShow // обновляет список сообщений при каждом открытии и закрытии списка пользователей

      var chatData = this.mChatData;
      var selectedChat = this.$store.state.mChat.selectedChatID
      for (let i in chatData.chatList) { // Перебираем для каждого пользователя
        if (chatData.chatList[i].chatID === selectedChat) {
          // Сбрасывает счётчик сообщений текущего выбранного чата, только если чат отображается
          if (this.$store.state.mChat.show) chatData.chatList[i].unreadMessageCount = 0 // Сбрасываем индивидуальный счётчик непрочитанных сообщений контакта
          eventBus.emit('mChatScrollToBottom');
          return chatData.chatList[i].messagesHistory
        }
      }
    },
    getUnreadMessagesCount() {
      let totalUnreadMessages = 0;
      for (let chatID of this.getChatList) { // Перебираем сurrentChatList
        for (let i in this.mChatData.chatList) { // Перебираем все чаты
          if (chatID === this.mChatData.chatList[i].chatID) {
            totalUnreadMessages += this.mChatData.chatList[i].unreadMessageCount;
          }
        }
      }
      return totalUnreadMessages;
    }
  },
  methods: {
    closeChat(){
      // Если чат отображается и включена настройка по его закрытию кликом снаружи
      if (this.$store.state.mChat.show && this.$store.state.mChat.closeChatOnClickedOutside) 
        this.$store.commit('mChatShow');
    },
    middleware (event) {
      if (this.$store.state.mChat.show) { // Только при открытом чате
        console.log(event.target)
        // Промежуточный слой проверки целевого объекта попавшего под клик
        // Выполнит handler (closeChat) если нет ни одного совпадения в списке исключений
        let exceptionList = [
          'palette-menu',
          'viewer'
        ];

        // Проверяет содержится ли целевой класс в списке исключений
        function checkClickTarget(exception){
          if (typeof event.target.className === 'string')
            return event.target.className.includes(exception);
        }
        // true, если нет ни одного совпадения
        return exceptionList.some(checkClickTarget) === false        
      }
    }
  },
  components: {
    mChatFrame,
    FloatingChatButton
  }
}
</script>

<style scoped>

</style>