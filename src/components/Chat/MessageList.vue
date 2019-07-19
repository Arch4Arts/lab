<template>
<div class="sc-message-list" ref="scrollList" :style="{backgroundColor: colors.messageList.bg}" @scroll="handleScroll">
  <virtual-list class="sc-message-list" ref="scrollList" :size="65" :remain="12">
  <!-- <RecycleScroller :items="messages" :item-size="1" key-field="idx"> -->
    <Message v-for="(message, idx) in messages" :message="message" :chatImageUrl="chatImageUrl(message.author)" :authorName="authorName(message.author)" :key="idx" :colors="colors" :messageStyling="messageStyling" />
  <!-- </RecycleScroller> -->
  </virtual-list>
  <!-- <Message v-show="showTypingIndicator !== ''" :message="{author: showTypingIndicator, type: 'typing'}" :chatImageUrl="chatImageUrl(showTypingIndicator)" :colors="colors" :messageStyling="messageStyling" /> -->
</div>

</template>
<script>
import Message from './Message.vue'
import chatIcon from './assets/user-default-avatar.svg'

import virtualList from 'vue-virtual-scroll-list'

export default {
  components: {
    Message
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
    }
  },
  methods: {
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

<style scoped>
.scroller {
  height: 100%;
}

.sc-message-list {
  height: 100%;
  overflow-y: auto;
  background-size: 100%;
  -ms-overflow-style: none;  /* IE 10+ */
  scrollbar-width: none;  /* Firefox */
}

.sc-message-list::-webkit-scrollbar { 
    display: none;  /* Safari and Chrome */
}
</style>
