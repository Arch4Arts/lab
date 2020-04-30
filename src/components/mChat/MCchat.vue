<template>
<div>
  <FloatingChatButton :unreadMessagesCount="getUnreadMessagesCount" />
  <mChatFrame
    :mChatData="mChatData"
    :chatList="getChatList"
  />
</div>

</template>

<script>
import mChatFrame from './mChatFrame.vue'
import FloatingChatButton from './FloatingChatButton.vue'

export default {
  name: 'MC_chat', // Экземпляр главного героя
  data() {
    return {

    }
  },
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
  components: {
    mChatFrame,
    FloatingChatButton
  }
}
</script>

<style>

</style>