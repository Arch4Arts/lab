<template>
  <div>
    <!-- Иконка открывающая чат -->
    <div class="launcher hidden-sm-and-down" @click.prevent="$store.state.mChat.show ? closeChat() : openChat()">
      <!-- Элемент показывающий кол-во сообщений рядом с эконкой -->
      <v-badge
        :content="unreadMessagesCount"
        :value="unreadMessagesCount"
        overlap
      >
        <v-btn text large fab icon><v-icon>fas fa-mobile-android-alt</v-icon></v-btn>
      </v-badge>
      <!-- <div v-if="unreadMessagesCount > 0 && !$store.state.mChat.show" class="new-msg-count">
        {{ unreadMessagesCount }}
      </div> -->
    </div>
  </div>
</template>
<script>

export default {
  props: {
    unreadMessagesCount: {
      type: Number,
      required: true,
    }
  },
  methods: {
    openChat() {
      this.$store.commit('mChatShow');
      console.log(this.unreadMessagesCount)
    },
    closeChat() {
      this.$store.commit('mChatShow');
    },
  }
}
</script>

<style lang='scss' scoped>

* { // Перезисываем глобальный класс, для badge
  --v-primary-base: var(--important-modal__header--background);
}

.v-badge__badge {
  color: var(--h1--color) !important;
}

.v-btn {
  background: transparent !important;
  &:hover {
    background: transparent !important;
  }
}


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
