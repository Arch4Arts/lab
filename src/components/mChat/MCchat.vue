<template>
<div>
  <FloatingChatButton :unreadMessagesCount="getUnreadMessagesCount" />
  <mChatFrame
    :mChatData="mChatData"
    :chatList="getChatList"
    @onType="$emit('onType')"
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
      return this.$store.state.mChat.сurrentChatList_MC;
    },
    getUnreadMessagesCount(){
      return this.$store.state.mChat.newMessagesCount_MC;
    }
  },
  methods: {
    handleOnType() {
      this.$root.$emit('onType')
      this.userIsTyping = true
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