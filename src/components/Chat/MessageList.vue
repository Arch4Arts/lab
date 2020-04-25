<template>
<div class="message-list" ref="scrollList" @scroll="handleScroll">
  <!-- Зона прокрутки -->
  <virtual-list
    :size="65"
    :keeps="30"

    data-key="uid"
    :data-sources="messages"
    :data-component="itemComponent"
  />
  <!-- Варианты ответов -->
  <Suggestions :suggestions="getSuggestions()" v-on:sendSuggestion="_submitSuggestion"/>
</div>
</template>

<script>
import chatIcon from './assets/user-default-avatar.svg'

import Message from './Message.vue'
import Suggestions from './Suggestions.vue'

import VirtualList from 'vue-virtual-scroll-list'

export default {
  data () {
    return {
      itemComponent: Message,
    }
  },
  components: {
    Message,
    Suggestions,
  },
  props: {
    contacts: {
      type: Array,
      required: true
    },
    messages: {
      type: Array,
      required: true
    },
    mChat_TypingIndicatorEnable: {
      type: String,
      required: true
    },
    alwaysScrollToBottom: {
      type: Boolean,
      required: true
    },
    messageStyling: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    onSubmitSuggestion(suggestion){ // Импорт для userInput (Suggestions)
      // this.messageList = [...this.messageList, message]
      var users = this.$store.state.mChatData; // Не копируем массив, чтобы изменять оригинал
      var selectedUser = this.$store.state.mChat.mChat_ContactClikedID
      for (let user of users) { // Перебираем для каждого пользователя
        if (user.mChatData_ContactID === selectedUser) {
          // если отправляемый suggestion автономен, то нужно удалить его запись из истории, и добавить уже в виде ответа от ME
          if (user.mChatData_MsgHistory[user.mChatData_MsgHistory.length - 1].type === 'suggestion') user.mChatData_MsgHistory.splice([user.mChatData_MsgHistory.length - 1], 1)
          // В противном случае просто отправить ответ от ME, т.к suggestion был привязан к THEM
          user.mChatData_MsgHistory = [...user.mChatData_MsgHistory, suggestion]
          this.$store.commit('updateStores');
        }
      }
    },
    getSuggestions(){
      return this.messages.length > 0 ? this.messages[this.messages.length - 1].suggestions : []
    },
    _submitSuggestion(suggestion) {
      this.onSubmitSuggestion({author: 'me', type: 'text', data: { text: suggestion }})
    },
    _scrollDown () {
      this.$refs.scrollList.scrollTop = this.$refs.scrollList.scrollHeight
    },
    handleScroll (e) {
        if (e.target.scrollTop === 0) {
            this.$emit('scrollToTop')
        }
    },
    shouldScrollToBottom() {
      return this.alwaysScrollToBottom || (this.$refs.scrollList.scrollTop > this.$refs.scrollList.scrollHeight - 600)
    },
    profile(author) {
      const profile = this.contacts.find(profile => profile.mChatData_ContactID === author)

      // A profile may not be found for system messages or messages by 'me'
      return profile || {mChatData_AvatarImg: '', mChatData_ContactName: ''}
    },
    chatImageUrl(author) {
      return this.profile(author).mChatData_AvatarImg
    },
    authorName(author) {
      return this.profile(author).mChatData_ContactName
    }
  },
  computed: {
    defaultChatIcon() {
      return chatIcon
    }
  },
  mounted () {
    // console.log(this.messages)
    this._scrollDown()
  },
  updated () {
    if (this.shouldScrollToBottom())
      this.$nextTick(this._scrollDown())
  }
}
</script>

<style lang="scss" scoped>

.v-btn {
  background: var(--message-list__v-btn--background) !important;
}

.message-list {
  height: 100%;
  overflow-y: auto;
  background-size: 100%;
  -ms-overflow-style: none;  /* IE 10+ */
  scrollbar-width: none;  /* Firefox */

  background: var(--message-list--background) !important;

  &::-webkit-scrollbar {
  display: none;  /* Safari and Chrome */  
  }
}

.v-list {
  /* max-height: 485px; */
}

.bar {
  background-color: var(--message-list--bar--background-color) !important;
  z-index: 4;
}

.bar__title {
  color:  var(--message-list--bar__title--color) !important;
  font-weight: var(--message-list--bar__title--font-weight) !important;  
}

.bar__back-btn {
  color: var(--message-list--bar__back-btn--color) !important;
}

.bar__phone-btn {
  color: var(--message-list--bar__phone-btn--color) !important;
}

.bar__video-btn {
  color: var(--message-list--bar__video-btn--color) !important;
  background-color: transparent !important;
}

.bar__ellipsis-btn {
  color: var(--message-list--bar__ellipsis-btn--color) !important;
}

@media (max-width: 450px) {

  .message-list {
    width: 100%;
  }
  .v-list {
    max-height: calc(100% - 60px);
  }
}
</style>
