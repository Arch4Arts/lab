<template>
<v-card class="chat-list" :style="{ width: `${width}px`, height: `${height}px` }">
  <!-- шапка -->
  <v-toolbar class="chat-list__bar" dark dense flat :height="`${calcHeightToolbar}px`">
    <!-- Декоративная кнопка -->
    <v-btn class="chat-list__bar__nav-btn" icon>
      <a-icon class="chat-list__bar__nav-btn__icon" :icon="['far', 'bars']" />
    </v-btn>

    <!-- Название приложения -->
    <v-spacer />
      <v-toolbar-title class="chat-list__bar__title"> 
        Libgram
      </v-toolbar-title>
    <v-spacer />

    <!-- Меню выбора темы -->
    <v-menu open-on-hover offset-y class="chat-list__palette-menu">
      <template v-slot:activator="{ on }">
        <v-btn class="chat-list__bar__palette-btn" icon v-on="on">
          <a-icon class="chat-list__bar__palette-btn__icon" :icon="['fas', 'palette']" />
        </v-btn>
      </template>
      <v-list class="chat-list__palette-menu">
        <v-list-item
          class="chat-list__palette-menu--hover"
          v-for="(ThemesList, index) in $store.state.mChat.themesList"
          :key="index"
          @click="setSelectedTheme(ThemesList.themeName)"
        >
          <v-list-item-title class="chat-list__palette-menu-font">{{ ThemesList.themeName }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-toolbar>
  <!-- Пространство под шапкой (чтобы туда не уходил список чатов) -->
  <!-- <div :style="{ height: `${calcHeightToolbar}px` }" /> -->
  <!-- Список контактов -->
  <v-list two-line class="chat-list__vlist">
    <template v-for="chat in getChatList">
      <!-- Контакт -->
      <v-list-item
        class="chat-list__vlist-item"
        :key="chat.chatID"
        :disabled="chat.isDisabled"
        :class="{ 'chat-list__vlist-item__disabled': chat.isDisabled }"
        @click="setSelectedChat(chat.chatID, chat.chatName, chat.chatAvatar, chat.isGroupChat)">
        <!-- Аватар -->
        <v-list-item-avatar class="chat-list__vlist--chat__avatar" :class="{ 'chat-list__vlist--chat__avatar__badge': chat.unreadMessageCount > 0 }">
          <img :src="chat.chatAvatar">
        </v-list-item-avatar>

        <!-- Основной блок с информацией -->
        <v-list-item-content>
          <!-- Имя контакта -->
          <v-list-item-title class="chat-list__vlist--chat__title">
            <div>{{ chat.chatName }}</div>
          </v-list-item-title>
          <!-- Текст последнего сообщения -->
          <v-list-item-subtitle v-if="chat.chatHistory.type === 'text'" class="chat-list__vlist--chat__subtitle-text"> 
            <div v-html="getFormatMessage(chat.chatHistory.data.text)" />
          </v-list-item-subtitle>
          <!-- Смайлик -->
          <v-list-item-subtitle v-else-if="chat.chatHistory.type === 'emoji'"> 
            <div v-html="getTwemoji(chat.chatHistory.data.emoji)" />
          </v-list-item-subtitle>
          <!-- Иконка фото/видео контента в сообщении -->
          <v-list-item-subtitle v-else-if="chat.chatHistory.type === 'image'"> 
            <a-icon class="chat-list__vlist--chat__subtitle-attachement-icon" :icon="['fas', 'file-image']"></a-icon>
          </v-list-item-subtitle>
          <v-list-item-subtitle v-else-if="chat.chatHistory.type === 'video'"> 
            <a-icon class="chat-list__vlist--chat__subtitle-attachement-icon" :icon="['fas', 'file-video']"></a-icon>
          </v-list-item-subtitle>
          <v-list-item-subtitle v-else-if="chat.chatHistory.type === 'audio'"> 
            <a-icon class="chat-list__vlist--chat__subtitle-attachement-icon" :icon="['fas', 'file-audio']"></a-icon>
          </v-list-item-subtitle>
        </v-list-item-content>

        <!-- Кол-во непрочитанных сообщений -->
        <v-list-item-action class="text-no-wrap">
          <div v-if="chat.unreadMessageCount > 0" class="chat-list__vlist--chat__badge">
            {{ chat.unreadMessageCount }}
          </div>
        </v-list-item-action>
      </v-list-item>
    </template>
  </v-list>
</v-card>
</template>

<script>
import updateTheme from '../../styles/updateTheme';
import { markdown } from './messages/drawdown'
import twemoji from 'twemoji'

const cloneDeep = require('lodash.clonedeep');

export default {
  data () {
    return {
      ChatListCache: ''
    }
  },
  props: {
    width: [Number, String],
    height: [Number, String],
    calcHeightToolbar: [Number, String],
    
    chatList: {
      type: Array,
      required: true,
    },
    charProfiles: {
      type: Array,
      required: true
    },
    // userChatIDList: {
    //   type: Array,
    //   required: true,
    // },
    userChatTheme: {
      type: String
    } 
  },
  computed: {
    getChatList() {
      let chatList = cloneDeep(this.chatList);
      chatList = this.getChatInfo(chatList);
      chatList = this.getChatLastMessage(chatList);
      return chatList;
    },
  },
  methods: {
    getChatInfo(chatList) {
      const charProfiles = this.charProfiles;
      for (const chat of chatList) {
        if (chat.isGroupChat === false) {
          charProfiles.find(char => {
            if (char.charID === chat.chatID) {
              // Если используется псевдоним
              chat.chatName = char.isAlias ? char.aliasName : char.name
            }
          })
        }
      }
      return chatList
    },
    getChatLastMessage(chatList) {
      for (const chat of chatList) {
        for (let i = chat.chatHistory.length - 1; i >= 0; i--) {
          if (chat.chatHistory[i].type !== 'suggestion') {
            chat.chatHistory = chat.chatHistory[i];
            break;
          }
        }
      }
      return chatList
    },
    setSelectedChat(selectedChatID) {
      this.$store.state.mChat.selectedChatID = selectedChatID
      this.$store.commit('mChat/showChatList', false);
    },
    setSelectedTheme(select) {
      this.$store.state.mChatMeta.MC.userChatTheme = select;
      this.$store.commit('updateStore');
      updateTheme('mChat');
    },
    getFormatMessage(message) { 
      const exceptionList = [
        '<p>',
        '<b>',
        '<i>',
        '<img'
      ];

      function checkMessageWasFormatted(exception) {
        return message.includes(exception);
      }
      // Было ли сообщение отформитированно ранее (Для предотвращения повторной обработки после перерендера)
      if (exceptionList.some(checkMessageWasFormatted) === false) {
        message = markdown(message) // Применение форматирования к тексту, демо: https://markdown-it.github.io
        message = twemoji.parse(message, {
          base: 'assets/img/',              // default MaxCDN
          ext: ".svg",                      // default ".png"
          className: "chat-list__vlist--chat__subtitle-text__emoji", // default "emoji"
          folder: "twemoji"
        })
        return message        
      }
      // Если да, оставляем как есть
      else return message
    },
    getTwemoji(message) { 
      const exceptionList = [
        '<p>',
        '<img'
      ];

      function checkEmojiWasGet(exception) {
        return message.includes(exception);
      }
      // Было ли сообщение отформитированно ранее (Для предотвращения повторной обработки после перерендера)
      if (exceptionList.some(checkEmojiWasGet) === false) {
        message = twemoji.parse(message, {
          base: 'assets/img/',            // default MaxCDN
          ext: ".svg",                    // default ".png"
          className: "chat-list__vlist--chat__subtitle-emoji",     // default "emoji"
          folder: "twemoji"
        })
        return message        
      }
      // Если да, оставляем как есть
      else return message
    }
  },
}
</script>

<style lang='scss'>

.chat-list.v-card {
  background: var(--chat-list--background) !important;
}

.chat-list__bar  {
  display: flex;
  flex-direction: column;
  justify-content: center;

  // position: fixed;
  position: relative;
  height: 6%;
  // width: calc(100% - 6.24%);

  background: var(--chat-list__bar--background) !important;
  box-shadow: 0px -1px 4px black; // Маленькая тень
  z-index: 1;  
}

.chat-list__bar__title {
  font-size: var(--vbtn-icon--fontSize) !important;
  color: var(--chat-list__vlist--chat__title--color) !important;
}

.chat-list__bar__nav-btn.v-btn {
  width: var(--vbtn--size) !important;
  height: var(--vbtn--size) !important;
  color: var(--chat-list__bar__nav-btn--color) !important;
  background: var(--chat-list__v-btn--background) !important;
  &:hover {
    background: var(--chat-list__v-btn--background) !important;
  }
}

.chat-list__bar__nav-btn__icon {
  font-size: var(--vbtn-icon--fontSize) !important;
}

.chat-list__bar__palette-btn.v-btn  {
  width: var(--vbtn--size) !important;
  height: var(--vbtn--size) !important;
  color: var(--chat-list__bar__palette-btn--color) !important;
  background: var(--chat-list__v-btn--background) !important;
  &:hover {
    background: var(--chat-list__v-btn--background) !important;
  }
}

.chat-list__bar__palette-btn__icon {
  font-size: var(--vbtn-icon--fontSize) !important;
}

.chat-list__vlist {
  background: var(--chat-list__vlist--background) !important;
  padding: 0px 0px 0px 0px !important;
}

.chat-list__vlist-item {
  background: var(--chat-list__vlist-item--background) !important;
  height: calc(var(--mChatHeight) / 100 * 12.7) !important;
  padding: 0px 3.3% 0px 2.5% !important;  
  &:hover {
    background: var(--chat-list__palette-menu--hover--background) !important;
  }
  &__disabled {
    opacity: .7;
  }
}

.chat-list__vlist--chat__avatar {
  width: calc(var(--mChatWidth) / 100 * 17) !important;
  height: calc(var(--mChatWidth) / 100 * 17) !important;
  margin-top: 5.4% !important;
  margin-right: 5.4% !important;
  margin-bottom: 5.4% !important;
  margin-left: 0px !important;
}

.chat-list__vlist--chat__title {
  font-size: 0.9em !important;
  font-weight: var(--chat-list__vlist--chat__title--font-weight) !important;  
  color: var(--chat-list__vlist--chat__title--color) !important;
  div {
    margin-bottom: 0px !important;
    white-space: nowrap !important;
    text-overflow: ellipsis !important;
    overflow: hidden !important;
  }
}

.chat-list__vlist--chat__subtitle-text {
  font-size: 0.8em !important;
  margin-bottom: 3%;
  color: var(--chat-list__vlist--chat__subtitle--color) !important;
  p {
    margin-bottom: 0px !important;
    white-space: nowrap !important;
    text-overflow: ellipsis !important;
    overflow: hidden !important;
  }
  &__emoji {
    height: calc(var(--mChatWidth) / 100 * 6);
    vertical-align: -.2em;
    padding: 0 .05em 0 .1em;
  }
}

.chat-list__vlist--chat__subtitle-emoji {
  height: calc(var(--mChatWidth) / 100 * 9);
}

.chat-list__vlist--chat__subtitle-attachement-icon {
  font-size: 2em !important;
  margin-bottom: 2.7%;
  color: var(--chat-list__vlist--chat__subtitle-icon--color) !important;
}

.chat-list__vlist--chat__subtitle-emoji-preview {
  width: 2em;
}

.chat-list__vlist--chat__badge {
  align-items: center;
  display: inline-flex;
  justify-content: center;
  color: var(--chat-list__vlist--chat__badge--color) !important;
  background-color: var(--chat-list__vlist--chat__badge--background) !important;
  font-size: var(--chat-list__vlist--chat__badge--font-size) !important;
  font-weight: var(--chat-list__vlist--chat__badge--font-weight) !important;
  border-radius: var(--chat-list__vlist--chat__badge--border-radius) !important;
  width: var(--chat-list__vlist--chat__badge--width) !important;
  height: var(--chat-list__vlist--chat__badge--height) !important;
}

.chat-list__palette-menu--hover:hover {
  background: var(--chat-list__palette-menu--hover--background) !important;
}

.chat-list__palette-menu {
  background: var(--chat-list__palette-menu--background) !important;
}

.chat-list__palette-menu-font {
  font-size: 1em !important;
  color: var(--chat-list__palette-menu-font--color) !important;
}

@import '~vuetify/src/styles/styles.sass';
@media #{map-get($display-breakpoints, 'xs-only')} {
  .chat-list__bar  {
    width: 100%;
  }
}

</style>


