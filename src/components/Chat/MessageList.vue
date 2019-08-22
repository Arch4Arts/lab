<template>
<div class="message-list" ref="scrollList" @scroll="handleScroll">
  <virtual-list class="message-list v-list" ref="scrollList" :size="65" :remain="12">
  <!-- <RecycleScroller :items="messages" :item-size="1" key-field="idx"> -->
    <Message v-for="(message, idx) in messages" :message="message" :chatImageUrl="chatImageUrl(message.author)" :authorName="authorName(message.author)" :key="idx" :messageStyling="messageStyling" />
    <Suggestions :suggestions="getSuggestions()" v-on:sendSuggestion="_submitSuggestion"/>
  <!-- </RecycleScroller> -->
  </virtual-list>
    <UserInput /> 
  <!-- <Message v-show="showTypingIndicator !== ''" :message="{author: showTypingIndicator, type: 'typing'}" :chatImageUrl="chatImageUrl(showTypingIndicator)" :colors="colors" :messageStyling="messageStyling" /> -->
</div>

</template>
<script>
import chatIcon from './assets/user-default-avatar.svg'

import Message from './Message.vue'
import UserInput from './UserInput.vue'
import Suggestions from './Suggestions.vue'

import virtualList from 'vue-virtual-scroll-list'

export default {
  components: {
    Message,
    UserInput,
    Suggestions
  },
  props: {
    participants: {
      type: Array,
      required: true
    },
    messages: {
      type: Array,
      required: true
    },
    showTypingIndicator: {
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
      var users = this.$store.state.chatUsers; // Не копируем массив, чтобы изменять оригинал
      var selectedUser = this.$store.state.chat.ContactOnClikedID
      for (let user of users) { // Перебираем для каждого пользователя
        if (user.id === selectedUser) {
          // если отправляемый suggestion автономен, то нужно удалить его запись из истории, и добавить уже в виде ответа от ME
          if (user.messagesHistory[user.messagesHistory.length - 1].type === 'suggestion') user.messagesHistory.splice([user.messagesHistory.length - 1], 1)
          // В противном случае просто отправить ответ от ME, т.к suggestion был привязан к THEM
          user.messagesHistory = [...user.messagesHistory, suggestion]
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
      const profile = this.participants.find(profile => profile.id === author)

      // A profile may not be found for system messages or messages by 'me'
      return profile || {imageUrl: '', name: ''}
    },
    chatImageUrl(author) {
      return this.profile(author).imageUrl
    },
    authorName(author) {
      return this.profile(author).name
    }
  },
  computed: {
    defaultChatIcon() {
      return chatIcon
    }
  },
  mounted () {
    this._scrollDown()
  },
  updated () {
    if (this.shouldScrollToBottom())
      this.$nextTick(this._scrollDown())
  }
}
</script>

<style lang="scss" scoped>

.message-list {
  height: 100%;
  overflow-y: auto;
  background-size: 100%;
  -ms-overflow-style: none;  /* IE 10+ */
  scrollbar-width: none;  /* Firefox */
}

.v-list {
  max-height: 485px;
}

.message-list {
	background: var(--message-list--background-color) !important;
}

.message-list::-webkit-scrollbar { 
    display: none;  /* Safari and Chrome */
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
