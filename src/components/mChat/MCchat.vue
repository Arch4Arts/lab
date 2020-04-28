<template>
<div>
  <FloatingChatButton />
  <mChatFrame
    :mChatData="mChatData"
    :contactList="contactList"
    :onUserInputSubmit="onMessageWasSent"
    :alwaysScrollToBottom="alwaysScrollToBottom"
    :messageStyling="messageStyling"
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
      alwaysScrollToBottom: true,
      messageStyling: false, // Не работает в независимости от этого ключа
    }
  },
  computed: {
    mChatData(){
      return this.$store.state.mChatData.MC
    },
    contactList(){
      return this.$store.state.mChat.сurrentСontactList_MC
    }
  },
  methods: {
    onMessageWasSent(message) {
      this.messageList = [...this.messageList, message]
    },
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