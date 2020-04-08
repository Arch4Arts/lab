<template>
<div class="message-list" ref="scrollList" @scroll="handleScroll">
      <!-- Верхняя панель с кнопками -->
      <v-toolbar class="bar" dark height="50" flat>
        <!-- Кнопка возвращения к списку контактов -->
        <v-btn class="bar__back-btn v-btn--hover" icon @click="backToContactsPage()">
          <v-icon size="18"> fas fa-arrow-left </v-icon>
        </v-btn>

        <v-spacer/>
        <!-- ЗАГОЛОВОК ЧАТА преобразует tailor в Tailor -->
        <v-toolbar-title class="bar__title"> 
          {{ this.$store.state.mChat.mChat_ContactClikedName }} 
        </v-toolbar-title>

        <v-spacer/>
        <!-- Декоративная кнопка -->
        <v-btn class="bar__phone-btn v-btn--hover" icon>
          <v-icon size="18"> fas fa-phone </v-icon>
        </v-btn>
      </v-toolbar>
  
  <!-- Зона прокрутки -->
  <virtual-list class="message-list v-list" ref="scrollList" :size="65" :remain="12">
  <!-- <RecycleScroller :items="messages" :item-size="1" key-field="idx"> -->
    <!-- Сообщение -->
    <Message v-for="(message, idx) in messages" :message="message" :chatImageUrl="chatImageUrl(message.author)" :authorName="authorName(message.author)" :key="idx" :messageStyling="messageStyling" />
    <!-- Выбор ответа -->
    <Suggestions :suggestions="getSuggestions()" v-on:sendSuggestion="_submitSuggestion"/>
  <!-- </RecycleScroller> -->
  </virtual-list>
  <!-- Декоративная панель ввода -->
  <UserInput /> 
  <!-- <Message v-show="mChat_TypingIndicatorEnable !== ''" :message="{author: mChat_TypingIndicatorEnable, type: 'typing'}" :chatImageUrl="chatImageUrl(mChat_TypingIndicatorEnable)" :colors="colors" :messageStyling="messageStyling" /> -->
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
    backToContactsPage(){
      this.$store.state.mChat.mChat_ContactsPageShow = !this.$store.state.mChat.mChat_ContactsPageShow
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
  background-color: var(--message-list--bar--background-color) !important;
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
}

.bar__ellipsis-btn {
    color: var(--message-list--bar__ellipsis-btn--color) !important;
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
