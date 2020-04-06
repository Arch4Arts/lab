<template>
<div class="message-list" ref="scrollList" @scroll="handleScroll">

      <v-toolbar class="bar" dark height="50" flat>
        <v-btn class="bar__back-btn v-btn--hover" icon @click="backToUserList()">
          <v-icon size="18"> fas fa-arrow-left </v-icon>
        </v-btn>
        <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
        <v-spacer/>
        <v-toolbar-title class="bar__title"> 
        <!-- ЗАГОЛОВОК ЧАТА преобразует tailor в Tailor -->
          {{ this.$store.state.mChat.mChat_ContactClikedName }} 
        </v-toolbar-title>
        <v-spacer/>
        <v-btn class="bar__phone-btn v-btn--hover" icon>
          <v-icon size="18"> fas fa-phone </v-icon>
        </v-btn>
        <!-- <v-btn v-if="$store.state.mChat.mChat_CurrentTheme_MC !== $store.state.mChat.mChat_ThemesList[0].title" class="bar__video-btn v-btn--hover" icon>
          <v-icon size="18"> fas fa-video </v-icon>
        </v-btn>
        <v-btn v-if="$store.state.mChat.mChat_CurrentTheme_MC !== $store.state.mChat.mChat_ThemesList[0].title" class="bar__ellipsis-btn v-btn--hover" icon>
          <v-icon size="18"> fas fa-ellipsis-v </v-icon>
        </v-btn> -->
      </v-toolbar>

  <virtual-list class="message-list v-list" ref="scrollList" :size="65" :remain="12">
  <!-- <RecycleScroller :items="messages" :item-size="1" key-field="idx"> -->
    <Message v-for="(message, idx) in messages" :message="message" :chatImageUrl="chatImageUrl(message.author)" :authorName="authorName(message.author)" :key="idx" :messageStyling="messageStyling" />
    <Suggestions :suggestions="getSuggestions()" v-on:sendSuggestion="_submitSuggestion"/>
  <!-- </RecycleScroller> -->
  </virtual-list>
    <UserInput /> 
  <!-- <Message v-show="showmChat_TypingIndicatorEnable !== ''" :message="{author: showmChat_TypingIndicatorEnable, type: 'typing'}" :chatImageUrl="chatImageUrl(showmChat_TypingIndicatorEnable)" :colors="colors" :messageStyling="messageStyling" /> -->
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
    contacts: {
      type: Array,
      required: true
    },
    messages: {
      type: Array,
      required: true
    },
    showmChat_TypingIndicatorEnable: {
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
      var users = this.$store.state.mChatHistory; // Не копируем массив, чтобы изменять оригинал
      var selectedUser = this.$store.state.mChat.mChat_ContactClikedID
      for (let user of users) { // Перебираем для каждого пользователя
        if (user.mChatHistory_ContactID === selectedUser) {
          // если отправляемый suggestion автономен, то нужно удалить его запись из истории, и добавить уже в виде ответа от ME
          if (user.mChatHistory_MsgHistory[user.mChatHistory_MsgHistory.length - 1].type === 'suggestion') user.mChatHistory_MsgHistory.splice([user.mChatHistory_MsgHistory.length - 1], 1)
          // В противном случае просто отправить ответ от ME, т.к suggestion был привязан к THEM
          user.mChatHistory_MsgHistory = [...user.mChatHistory_MsgHistory, suggestion]
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
    backToUserList(){
      this.$store.state.mChat.mChat_ContactsPage = !this.$store.state.mChat.mChat_ContactsPage
      this.$store.commit('updateStores');
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
      const profile = this.contacts.find(profile => profile.mChatHistory_ContactID === author)

      // A profile may not be found for system messages or messages by 'me'
      return profile || {mChatHistory_AvatarImg: '', mChatHistory_ContactName: ''}
    },
    chatImageUrl(author) {
      return this.profile(author).mChatHistory_AvatarImg
    },
    authorName(author) {
      return this.profile(author).mChatHistory_ContactName
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
	background: var(--message-list--background) !important;
}

.message-list::-webkit-scrollbar { 
    display: none;  /* Safari and Chrome */
}

.bar {
  background-color: var(--bar--background-color) !important;
}

.bar__title {
    color:  var(--bar__title--color) !important;
    font-weight: var(--bar__title--font-weight) !important;  
}

.bar__back-btn {
    color: var(--bar__back-btn--color) !important;
}

.bar__phone-btn {
    color: var(--bar__phone-btn--color) !important;
}

.bar__video-btn {
    color: var(--bar__video-btn--color) !important;
}

.bar__ellipsis-btn {
    color: var(--bar__ellipsis-btn--color) !important;
}

.v-btn--hover:hover {
  background-color: transparent !important;
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
