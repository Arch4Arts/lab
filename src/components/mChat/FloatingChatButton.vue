<template>
  <div>
    <!-- Иконка открывающая чат -->
    <div class="launcher hidden-sm-and-down" @click.prevent="$store.state.mChat.show ? closeChat() : openChat()">
      <!-- Элемент показывающий кол-во сообщений рядом с эконкой -->
      <div v-if="$store.state.mChat.newMessagesCount > 0 && !$store.state.mChat.show" class="new-msg-count">
        {{ $store.state.mChat.newMessagesCount }}
      </div>
      <v-btn text large fab icon color="#E0E0E0"><v-icon>fas fa-mobile-android-alt</v-icon></v-btn>
    </div>
    <mChatFrame
      :messageList="messageList"
      :onUserInputSubmit="onMessageWasSent"
      :contacts="contacts"
      :typingIndicatorEnable="typingIndicatorEnable"
      :alwaysScrollToBottom="alwaysScrollToBottom"
      :messageStyling="messageStyling"
      :disableUserListToggle="disableUserListToggle"
      @scrollToTop="$emit('scrollToTop')"
      @onType="$emit('onType')"
    />
  </div>
</template>
<script>
import mChatFrame from './mChatFrame.vue'

export default {
  props: {
    contacts: {
      type: Array,
      required: true
    },
    onMessageWasSent: {
      type: Function,
      required: true
    },
    messageList: {
      type: Array,
      default: () => []
    },
    typingIndicatorEnable: {
      type: String,
      default: () => ''
    },
    alwaysScrollToBottom: {
      type: Boolean,
      default: () => false
    },
    messageStyling: {
      type: Boolean,
      default: () => false
    },
    disableUserListToggle: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    openChat() {
      this.$store.state.mChat.show = true
      this.$store.commit('updateStores');
    },
    closeChat() {
      this.$store.state.mChat.show = false
      this.$store.commit('updateStores');
    },
  },
  components: {
    mChatFrame
  }
}
</script>
<style lang='scss' scoped>

.launcher {
  /* width: 60px;
  height: 60px;
  background-position: center;
  background-repeat: no-repeat; */
  position: fixed;
  right: 25px;
  bottom: 25px;
  /* border-radius: 50%;
  box-shadow: none; */
  transition: box-shadow 0.2s ease-in-out;
  cursor: pointer;
  .new-msg-count {
    position: absolute;
    top: 6px;
    left: 55px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    border-radius: 50%;
    width: 22px;
    height: 22px;
    background: #ff4646;
    color: white;
    text-align: center;
    margin: auto;
    font-size: 12px;
    font-weight: 500;
    /* Чтобы красный кружок не перекрывался выделением кнопки */
    z-index: 1;
  }
}

</style>
