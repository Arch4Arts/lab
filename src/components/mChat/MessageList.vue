<template>
<div>
  <!-- Зона прокрутки -->
  <virtual-list
    class="message-list" 
    ref="mChatMessageList"

    :size="65"
    :keeps="30"

    data-key="uid"
    :data-sources="messages"
    :data-component="itemComponent"
    :extra-props="{ mChatData: mChatData }"
  />
</div>
</template>

<script>
import Message from './Message.vue'

import eventBus from '../../js/initEventBus'

import VirtualList from 'vue-virtual-scroll-list'

export default {
  data () {
    return {
      itemComponent: Message,
    }
  },
  props: {
    messages: {
      type: Array,
      required: true
    },    
    contactList: {
      type: Array,
      required: true
    },
    mChatData: {
      type: Array,
      required: true,
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
  mounted(){
    this.$refs.mChatMessageList.scrollToBottom()
    eventBus.$on('mChatMessageWasSent', this.$refs.mChatMessageList.scrollToBottom);
  },
  beforeDestroy(){
    eventBus.$off('mChatMessageWasSent')
  },
  components: {
    Message,
    'virtual-list': VirtualList
  },
}
</script>

<style lang="scss" scoped>

.v-btn {
  background: var(--message-list__v-btn--background) !important;
}

.message-list {
  max-height: 485px;
  overflow-y: auto;
  background-size: 100%;
  -ms-overflow-style: none;  /* IE 10+ */
  scrollbar-width: none;  /* Firefox */

  background: var(--message-list--background) !important;

  &::-webkit-scrollbar {
  display: none;  /* Safari and Chrome */  
  }
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
