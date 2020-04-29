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
    getUnreadMessagesCount(){
      return this.$store.state.mChatData.MC.newMessagesCount;
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