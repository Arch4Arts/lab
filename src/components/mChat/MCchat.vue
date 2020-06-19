<template>
<div v-click-outside="vConfig">
  <FloatingChatButton :unreadMessagesCount="getUnreadMessagesCount" />
  <mChatFrame
    :mChatData="mChatData"
    :chatList="getChatList"
    :messageList="getMessageList"
  />
</div>
</template>

<script>
import mChatFrame from './mChatFrame.vue'
import FloatingChatButton from './FloatingChatButton.vue'

import { mChatNotify } from '../../js/notificationSystem'
import { soundPlay } from '../../js/gameSound'
import { markdown } from './messages/drawdown'
import twemoji from 'twemoji'

import eventBus from '../../js/eventBus.js'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
Vue.component('a-icon', FontAwesomeIcon)
import Vue from 'vue/dist/vue.js';

export default {
  name: 'MC_chat', // Экземпляр главного героя
  data () {
    return {
      vConfig: {
        handler: this.closeChat, // Обработчик
        middleware: this.middleware, // Промежуточный слой проверки объекта попавшего под клик
        isActive: true,
      },
    }
  },
  computed: {
    mChatData(){
      return this.$store.state.mChatData.MC;
    },
    getChatList(){
      return this.$store.state.mChatData.MC.сurrentChatList;
    },
    getMessageList() {
      this.$store.state.mChat.chatListShow // обновляет список сообщений при каждом открытии и закрытии списка пользователей

      let chatData = this.mChatData;
      let selectedChat = this.$store.state.mChat.selectedChatID
      for (let i in chatData.chatList) { // Перебираем для каждого пользователя
        if (chatData.chatList[i].chatID === selectedChat) {
          // Сбрасывает счётчик сообщений текущего выбранного чата, только если чат отображается
          if (this.$store.state.mChat.show) chatData.chatList[i].unreadMessageCount = 0 // Сбрасываем индивидуальный счётчик непрочитанных сообщений контакта
          eventBus.emit('mChatScrollToBottom');
          return chatData.chatList[i].messagesHistory
        }
      }
    },
    getUnreadMessagesCount() {
      let totalUnreadMessages = 0;
      for (let chatID of this.getChatList) { // Перебираем сurrentChatList
        for (let i in this.mChatData.chatList) { // Перебираем все чаты
          if (chatID === this.mChatData.chatList[i].chatID) {
            totalUnreadMessages += this.mChatData.chatList[i].unreadMessageCount;
          }
        }
      }
      return totalUnreadMessages;
    }
  },
  methods: {
    closeChat(){
      // Если чат отображается и включена настройка по его закрытию кликом снаружи
      if (this.$store.state.mChat.show && this.$store.state.mChat.closeChatOnClickedOutside) 
        this.$store.commit('mChatShow');
    },
    middleware (event) {
      if (this.$store.state.mChat.show) { // Только при открытом чате
        // console.log(event.target)
        // Промежуточный слой проверки целевого объекта попавшего под клик
        // Выполнит handler (closeChat) если нет ни одного совпадения в списке исключений
        let exceptionList = [
          'palette-menu',
          'viewer',
          'test-chat'
        ];

        // Проверяет содержится ли целевой класс в списке исключений
        function checkClickTarget(exception){
          if (typeof event.target.className === 'string')
            return event.target.className.includes(exception);
        }
        // true, если нет ни одного совпадения
        return exceptionList.some(checkClickTarget) === false        
      }
    },
    sendNotify(message){
      if (!this.$store.state.mChat.show) {
        let chatData = this.mChatData;

        function getChatData(messageAuthor) {
          for (let i in chatData.charProfiles) {
            if (messageAuthor === chatData.charProfiles[i].charID) 
              // Если используется псевдоним
              if (chatData.charProfiles[i].isAlias) {
                message.name = chatData.charProfiles[i].aliasName;
                message.avatar = chatData.charProfiles[i].avatar;    
              }
              else {
                message.name = chatData.charProfiles[i].name;
                message.avatar = chatData.charProfiles[i].avatar;                
              }
          }
        }
        getChatData(message.author);
        
        // izitoast отображает коккретно только стандартный html элементы
        // Для использования vue компонентов и прочих пакетов нужно обработать их вручную через Render и получить конечный html код 
        // I assume that you mean, you inserted those elements into the DOM. 
        // However, Once a component is running, the template is handled internally by the virtualDOM - Vue is not parsing the DOM anymore. 
        // So when you add vue-related markup into the DOM, Vue has no way of seeing and parsing this.
        function vueRender(html){
          let el = Vue.compile(html)
          el = new Vue({
            render: el.render,
            staticRenderFns: el.staticRenderFns
          }).$mount()
          return el.$el.outerHTML
        }

        if (message.type == 'text') {
          message.content = markdown(message.data.text) // Применение форматирования к тексту, демо: https://markdown-it.github.io
          message.content = twemoji.parse(message.content, {
            base: 'assets/img/',                                          // default MaxCDN
            ext: ".svg",                                                  // default ".png"
            className: "mchat-notify__message-container__message__emoji", // default "emoji"
            folder: "twemoji"
          })
        } else if (message.type == 'emoji') {
          message.content = twemoji.parse(message.data.emoji, {
            base: 'assets/img/',                                          // default MaxCDN
            ext: ".svg",                                                  // default ".png"
            folder: "twemoji"
          })
        } else if (message.type == 'image') {
          message.content = vueRender(`<a-icon class="mchat-notify__message-container__message__image" :icon="['fas', 'file-image']"></a-icon>`)
        } else if (message.type == 'video') {
          message.content = vueRender(`<a-icon class="mchat-notify__message-container__message__image" :icon="['fas', 'file-video']"></a-icon>`)
        } else if (message.type == 'audio') {
          message.content = vueRender(`<a-icon class="mchat-notify__message-container__message__image" :icon="['fas', 'file-audio']"></a-icon>`)
        }
        // * если Suggestions, system и прочие не перечисленные выше типы, то отправка не происходит.

        if (message.content != undefined) {
          let template = `
            <div class="mchat-notify__container">
              <div>
                <img class="mchat-notify__avatar" src="${message.avatar}" />
              </div>
              <div class="mchat-notify__message-container">
                <div class="mchat-notify__message-container__title">
                  ${message.name}
                </div>
                <div class="mchat-notify__message-container__message">
                  ${message.content}
                </div>            
              </div>
            </div>
          `
          mChatNotify({ message: template, chatID: message.author, chatAvatar: message.avatar })
          if (this.$store.state.sound.smartphoneSoundEnable)
            soundPlay(this.$store.state.sound.smartphoneSound, this.$store.state.sound.smartphoneVolume)
        }        
      }

    }
  },
  mounted(){
    eventBus.on('mChatMessageWasSent_Notify', this.sendNotify);
  },
  beforeDestroy(){
    eventBus.off('mChatMessageWasSent_Notify');
  },
  components: {
    mChatFrame,
    FloatingChatButton,
  }
}
</script>

<style lang='scss' scoped>

</style>