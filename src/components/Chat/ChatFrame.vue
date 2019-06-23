<template>
  <div class="smartphone" :class="{opened: $store.state.chat.isChatOpen, closed: !$store.state.chat.isChatOpen}">
    <img src="../../assets/Samsung Galaxy S7 Black.png" class="smartphone">
    <img src="../../assets/Samsung Galaxy S7 Black_bottom.png" class="smartphone close-area" @click.prevent="closeChat()">
    <!-- <Chat-Navigation class="vlist"></Chat-Navigation> -->
    <div class="sc-chat-window">
      <UserList 
        v-if="showUserList"
        :participants="participants"
      />
      <MessageList
        v-if="!showUserList"
        :messages="messages"
        :participants="participants"
        :showTypingIndicator="showTypingIndicator"
        :colors="colors"
        :alwaysScrollToBottom="alwaysScrollToBottom"
        :messageStyling="messageStyling"
        @scrollToTop="$emit('scrollToTop')"
      />
      <UserInput
        v-if="!showUserList"
        :showEmoji="showEmoji"
        :onSubmit="onUserInputSubmit"
        :suggestions="getSuggestions()"
        :showFile="showFile"
        :placeholder="placeholder"
        @onType="$emit('onType')"
        :colors="colors" />
     </div>
  </div>
</template>

<script>
import MessageList from './MessageList.vue'
import UserInput from './UserInput.vue'
import UserList from './UserList.vue'

import ChatNavigation from './ChatNavigation'

export default {
  components: {
    MessageList,
    UserInput,
    UserList,
    ChatNavigation
  },
  props: {
    showEmoji: {
      type: Boolean,
      default: false
    },
    showFile: { // Не трогать, для отображения иконки скрепки (прикрепить файл)
      type: Boolean,
      default: false
    },
    participants: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    titleImageUrl: {
      type: String,
      default: ''
    },
    onUserInputSubmit: {
      type: Function,
      required: true
    },
    // onClose: {
    //   type: Function,
    //   required: true
    // },
    messageList: {
      type: Array,
      default: () => []
    },
    // isOpen: {
    //   type: Boolean,
    //   default: () => false
    // },
    placeholder: {
      type: String,
      default: 'Write a reply'
    },
    showTypingIndicator: {
      type: String,
      required: true
    },
    colors: {
      type: Object,
      required: true
    },
    alwaysScrollToBottom: {
      type: Boolean,
      required: true
    },
    messageStyling: {
      type: Boolean,
      required: true
    },
    disableUserListToggle: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showUserList: false
    }
  },
  computed: {
    messages() {
      let messages = this.messageList

      return messages
    }
  },
  methods: {
    handleUserListToggle(showUserList) {
      this.showUserList = showUserList
    },
    getSuggestions(){
      return this.messages.length > 0 ? this.messages[this.messages.length - 1].suggestions : []
    },
    closeChat() {
      this.$store.state.chat.isChatOpen = false
    },
  }
}
</script>
<style scoped>

.smartphone {
  transition: 0.3s ease-in-out;
  width: 370px;
  position: fixed;
  right: 25px;
  bottom: 0px;
  box-sizing: border-box;
}
.smartphone.close-area {
  cursor: pointer;
}
.smartphone.closed {
  opacity: 0;
  visibility: hidden;
  bottom: 90px;
}

.vlist {
  width: 340px;
  height: calc(100% - 120px);
  max-height: 595px;
  position: fixed;
  right: 39px;
  bottom: 70px;
  box-sizing: border-box;
  overflow-y: auto;
}

.sc-chat-window {
  width: 340px;
  height: calc(100% - 120px);
  max-height: 595px;
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

.sc-chat-window.closed {
  opacity: 0;
  visibility: hidden;
  bottom: 90px;
}

.sc-message--me {
  text-align: right;
}
.sc-message--them {
  text-align: left;
}

@media (max-width: 450px) {
  .sc-chat-window {
    width: 100%;
    height: 100%;
    max-height: 100%;
    right: 0px;
    bottom: 0px;
    border-radius: 0px;
  }
  .sc-chat-window {
    transition: 0.1s ease-in-out;
  }
  .sc-chat-window.closed {
    bottom: 0px;
  }
}
</style>
