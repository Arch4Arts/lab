<template>
  <div :style="{background: backgroundColor}">
    <!-- ГОТОВЫЙ КОМПОНЕНТ С ИКОНКОЙ ЧАТА И САМИМ ЧАТОМ ДЛЯ ИМПОРТА В ДРУГИЕ МОДУЛИ -->
    <beautiful-chat 
      :alwaysScrollToBottom="alwaysScrollToBottom"
      :colors="colors"
      :messageList="messageList"
      :messageStyling="messageStyling"
      :onMessageWasSent="onMessageWasSent"
      :participants="participants"
      :showEmoji="true"
      :showFile="true"
      :showTypingIndicator="showTypingIndicator"
      :titleImageUrl="titleImageUrl"
      @onType="handleOnType"
    />
  </div>
</template>

<script>
import messageHistory from './messageHistory'
// import chatParticipants from './chatProfiles'
import availableColors from './colors'

export default {
  name: 'App',
  data() {
    return {
      participants: this.$store.state.chatUsers,
      titleImageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png',
      messageList: messageHistory,
      // newMessagesCount: 0,
      // isChatOpen: false,
      showTypingIndicator: '',
      colors: null,
      availableColors,
      chosenColor: null,
      alwaysScrollToBottom: false,
      messageStyling: true,
      userIsTyping: false
    }
  },
  created() {
    this.setColor('blue')
  },
  methods: {
    sendMessage(text) {
      if (text.length > 0) {
        this.$store.state.chat.newMessagesCount = this.isChatOpen ? this.$store.state.chat.newMessagesCount : this.$store.state.chat.newMessagesCount += 1
        this.onMessageWasSent({
          author: 'support',
          type: 'text',
          data: { text }
        })
      }
    },
    handleTyping(text) {
      this.showTypingIndicator =
        text.length > 0
          ? this.participants[this.participants.length - 1].id
          : ''
    },
    onMessageWasSent(message) {
      this.messageList = [...this.messageList, message]
    },
    setColor(color) {
      this.colors = this.availableColors[color]
      this.chosenColor = color
    },
    showStylingInfo() {
      this.$modal.show('dialog', {
        title: 'Info',
        text:
          'You can use *word* to <strong>boldify</strong>, /word/ to <em>emphasize</em>, _word_ to <u>underline</u>, `code` to <code>write = code;</code>, ~this~ to <del>delete</del> and ^sup^ or ¡sub¡ to write <sup>sup</sup> and <sub>sub</sub>'
      })
    },
    messageStylingToggled(e) {
      this.messageStyling = e.target.checked
    },
    handleOnType() {
      this.$root.$emit('onType')
      this.userIsTyping = true
    }
  },
  computed: {
    linkColor() {
      return this.chosenColor === 'dark'
        ? this.colors.sentMessage.text
        : this.colors.launcher.bg
    },
    backgroundColor() {
      return this.chosenColor === 'dark' ? this.colors.messageList.bg : '#fff'
    }
  }
}
</script>

<style>

</style>