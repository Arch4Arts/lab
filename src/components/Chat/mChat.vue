<template>
  <div>
    <!-- ГОТОВЫЙ КОМПОНЕНТ С ИКОНКОЙ ЧАТА И САМИМ ЧАТОМ ДЛЯ ИМПОРТА В ДРУГИЕ МОДУЛИ -->
    <mobile-chat
      :alwaysScrollToBottom="alwaysScrollToBottom"
      :messageStyling="messageStyling"
      :onMessageWasSent="onMessageWasSent"
      :newMessagesCount="this.$store.state.mChat_NewMessagesCount"
      :contacts="contacts"
      :mChat_TypingIndicatorEnable="mChat_TypingIndicatorEnable"
      @onType="handleOnType"
    />
  </div>
</template>

<script>

export default {
  name: 'mChatApp',
  data() {
    return {
      contacts: this.$store.state.mChatData,
      mChat_TypingIndicatorEnable: '',
      alwaysScrollToBottom: true,
      messageStyling: false, // Не работает в независимости от этого ключа
      userIsTyping: false
    }
  },
  methods: {
    sendMessage(text) {
      if (text.length > 0) {
        this.$store.state.mChat.mChat_NewMessagesCount = this.mChat_Show ? this.$store.state.mChat.mChat_NewMessagesCount : this.$store.state.mChat.mChat_NewMessagesCount += 1
        this.onMessageWasSent({
          author: 'support',
          type: 'text',
          data: { text }
        })
      }
    },
    handleTyping(text) {
      this.mChat_TypingIndicatorEnable =
        text.length > 0
          ? this.contacts[this.contacts.length - 1].id
          : ''
    },
    onMessageWasSent(message) {
      this.messageList = [...this.messageList, message]
    },
    // showStylingInfo() {
    //   this.$modal.show('dialog', {
    //     title: 'Info',
    //     text:
    //       'You can use *word* to <strong>boldify</strong>, /word/ to <em>emphasize</em>, _word_ to <u>underline</u>, `code` to <code>write = code;</code>, ~this~ to <del>delete</del> and ^sup^ or ¡sub¡ to write <sup>sup</sup> and <sub>sub</sub>'
    //   })
    // },
    messageStylingToggled(e) {
      this.messageStyling = e.target.checked
    },
    handleOnType() {
      this.$root.$emit('onType')
      this.userIsTyping = true
    }
  },
}
</script>

<style>

</style>