<template>
<div>
  <FloatingChatButton :unreadMessagesCount="getUnreadMessagesCount" />
  <mChatFrame
    :mChatData="mChatData"
    :chatList="getChatList"
    v-click-outside="closeChat"
  />
</div>
</template>

<script>
import mChatFrame from './mChatFrame.vue'
import FloatingChatButton from './FloatingChatButton.vue'

export default {
  name: 'MC_chat', // Экземпляр главного героя
  computed: {
    mChatData(){
      return this.$store.state.mChatData.MC;
    },
    getChatList(){
      return this.$store.state.mChatData.MC.сurrentChatList;
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
      if (this.$store.state.mChat.show && this.$store.state.mChat.closeChatOnClickedOutside) this.$store.commit('mChatShow');
    },
  },
  components: {
    mChatFrame,
    FloatingChatButton
  }
}
</script>

<style scoped>

</style>