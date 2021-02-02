<template>
<div>
  <!-- Зона прокрутки -->
  <!-- // ! id НЕ МЕНЯТЬ! -->
  <virtual-list
    class="virtual-list"
    :style="{ 
      width: `${width}px`, 
      height: `${height}px`, 
      'padding-top': `${ToolbarHeight + 10}px`,
      // manual bottom border-radius
      'border-radius': (!$store.state.mChat.showDecorativeInputPanel) 
        ? 
          '0px 0px calc(var(--mChatWidth) / 100 * 6) calc(var(--mChatWidth) / 100 * 6)' 
        : 
          '0px 0px 0px 0px' 
    }"
    id="scrolling-techniques-4"
    ref="mChatMessageList"

    :keeps="30"

    data-key="uid"
    :data-sources="chatHistory"
    :data-component="messageComponent"
    :extra-props="{ 
      chatData: chatData,
      charProfiles: charProfiles
    }"
  />
</div>
</template>

<script>
import Message from './Message.vue'

import eventBus from '../../js/eventBus'

import VirtualList from 'vue-virtual-scroll-list'

export default {
  data () {
    return {
      messageComponent: Message,
    }
  },
  props: {
    chatData: {
      type: Object,
      required: true
    },
    charProfiles: {
      type: Array,
      required: true
    },
    width: [Number, String],
    height: [Number, String],
    ToolbarHeight: [Number, String],
  },
  computed: {
    chatHistory() {
      if (this.chatData.chatHistory) {
        if (this.$store.state.mChat.show) {
          this.chatData.unreadMessageCount = 0;
        }
        eventBus.emit('mChatScrollToBottom');
        return this.chatData.chatHistory;
      }
      this.$root.pushError(this.$t('loadErrorMessages'));
      return []
    }
  },
  mounted() {
    this.$refs.mChatMessageList.scrollToBottom()
    eventBus.on('mChatScrollToBottom', this.$refs.mChatMessageList.scrollToBottom);
    eventBus.on('mChatMessageWasSent', this.$refs.mChatMessageList.scrollToBottom);
  },
  beforeDestroy() {
    eventBus.off('mChatScrollToBottom')
    eventBus.off('mChatMessageWasSent')
  },
  components: {
    Message,
    'virtual-list': VirtualList
  },
}
</script>

<style lang='scss' scoped>

.virtual-list {
  // padding-top: 3%;
  padding-left: 1.5%;
  padding-right: 1.5%;
  // padding-bottom: 1%;
  // height: var(--mChatHeight);
  // min-height: var(--mChatHeight);
  overflow-y: auto;
  background: var(--message-list__virtual-list--background) !important;
}

@import '~vuetify/src/styles/styles.sass';
@media #{map-get($display-breakpoints, 'xs-only')} {
  .virtual-list {
    padding-top: 3%;
  }
}

</style>

<i18n>
	{
		"en": {
			"loadErrorMessages": "Failed to load messages"
		},
		"ru": {
			"loadErrorMessages": "Не удалось загрузить сообщения"
		}
	}
</i18n>
