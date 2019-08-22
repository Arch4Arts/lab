<template>
  <div>
    <!-- <div class="sc-launcher" :class="{opened: isOpen}" @click.prevent="isOpen ? close() : open()" :style="{backgroundColor: colors.launcher.bg}">
      <div v-if="newMessagesCount > 0 && !isOpen" class="sc-new-messsages-count">
        {{newMessagesCount}}
      </div> -->
    <div class="sc-launcher hidden-sm-and-down" @click.prevent="$store.state.chat.isChatOpen ? closeChat() : openChat()">
      <div v-if="$store.state.chat.newMessagesCount > 0 && !$store.state.chat.isChatOpen" class="sc-new-messsages-count">
        {{ $store.state.chat.newMessagesCount }}
      </div>
        <v-btn text large fab icon color="#E0E0E0"><v-icon>fas fa-mobile-android-alt</v-icon></v-btn>
      <!-- <img class="sc-open-icon" :src="icons.open.img"  :alt="icons.open.name" />
      <img class="sc-closed-icon" :src="icons.close.img"  :alt="icons.close.name" /> -->
    </div>
    <ChatFrame
      :messageList="messageList"
      :onUserInputSubmit="onMessageWasSent"
      :participants="participants"
      :showTypingIndicator="showTypingIndicator"
      :alwaysScrollToBottom="alwaysScrollToBottom"
      :messageStyling="messageStyling"
      :disableUserListToggle="disableUserListToggle"
      @scrollToTop="$emit('scrollToTop')"
      @onType="$emit('onType')"
    />
  </div>
</template>
<script>
import ChatFrame from './ChatFrame.vue'

export default {
  props: {
    // isOpen: {
    //   type: Boolean,
    //   required: true
    // },
    // open: {
    //   type: Function,
    //   required: true
    // },
    // close: {
    //   type: Function,
    //   required: true
    // },
    participants: {
      type: Array,
      required: true
    },
    // title: {
    //   type: String,
    //   default: () => ''
    // },
    // titleImageUrl: {
    //   type: String,
    //   default: () => ''
    // },
    onMessageWasSent: {
      type: Function,
      required: true
    },
    messageList: {
      type: Array,
      default: () => []
    },
    // newMessagesCount: {
    //   type: Number,
    //   default: () => 0
    // },
    showTypingIndicator: {
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
  // computed: {
  //   chatWindowTitle() {
  //     if (this.title !== '') {
  //       return this.title
  //     }

  //     if (this.participants.length === 0) {
  //       return 'You'
  //     } else if (this.participants.length > 1) {
  //       return 'You, ' + this.participants[0].name + ' & others'
  //     } else {
  //       return 'You & ' + this.participants[0].name
  //     }
  //   }
  // },
  methods: {
    openChat() {
      this.$store.state.chat.isChatOpen = true
      this.$store.state.chat.newMessagesCount = 0
      this.$store.commit('updateStores');
    },
    closeChat() {
      this.$store.state.chat.isChatOpen = false
      this.$store.commit('updateStores');
    },
  },
  components: {
    ChatFrame
  }
}
</script>
<style scoped>
.sc-launcher {
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
}

/* .sc-launcher:before {
  content: '';
  position: relative;
  display: block;
  width: 60px;
  height: 60px;  
  border-radius: 50%;
  transition: box-shadow 0.2s ease-in-out;
} */

/* .sc-launcher .sc-open-icon,
.sc-launcher .sc-closed-icon {
  width: 60px;
  height: 60px;
  position: fixed;
  right: 25px;
  bottom: 25px;
  transition: opacity 100ms ease-in-out, transform 100ms ease-in-out;
}

.sc-launcher .sc-closed-icon {
  transition: opacity 100ms ease-in-out, transform 100ms ease-in-out;
  width: 60px;
  height: 60px;
}

.sc-launcher .sc-open-icon {
  padding: 20px;
  box-sizing: border-box;
  opacity: 0;
}

.sc-launcher.opened .sc-open-icon {
  transform: rotate(-90deg);
  opacity: 1;
}

.sc-launcher.opened .sc-closed-icon {
  transform: rotate(-90deg);
  opacity: 0;
}

.sc-launcher.opened:before {
  box-shadow: 0px 0px 400px 250px rgba(148, 149, 150, 0.2);
}

.sc-launcher:hover {
  box-shadow: 0 0px 27px 1.5px rgba(0,0,0,0.2);
} */

.sc-new-messsages-count {
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
}
</style>
