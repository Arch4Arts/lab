<template>
  <mChat
    :unreadMessagesCount="getUnreadMessagesCount"

    :chatData="getChatData"
    :chatList="getChatList"
    :charProfiles="getCharProfiles"
    :userChatIDList="getUserChatIDList"
    :userChatTheme="getUserChatTheme"
  />
</template>

<script>
import mChat from '../../mChat/mChat'

export default {
  name: 'MCChat', // Экземпляр главного героя
  computed: {
    getChatList() {
      return this.$store.state.mChatList.MC;
    },
    getChatData() {
      const chatList = this.getChatList;
      const selectedChatID = this.$store.state.mChat.selectedChatID
      for (const chat of chatList) { // Перебираем для каждого пользователя
        if (chat.chatID === selectedChatID) {
          return chat;
        }
      }
    },
    getCharProfiles() {
      return this.$store.state.mChatCharProfiles;
    },
    getUserChatIDList() {
      return this.$store.state.mChatMeta.MC.userChatIDList;
    },
    getUserChatTheme() {
      return this.$store.state.mChatMeta.MC.userChatTheme;
    },
    getUnreadMessagesCount() {
      const chatList = this.getChatList;
      const userChatIDList = this.getUserChatIDList;
      let totalUnreadMessages = 0;
      for (const chatID of userChatIDList) {
        for (const chat of chatList) {
          if (chatID === chat.chatID) {
            totalUnreadMessages += chat.unreadMessageCount;
          }
        }
      }
      return totalUnreadMessages;
    }
  },
  components: {
    mChat,
  }
}
</script>