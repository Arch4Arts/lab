<template>
<v-card class="chat-list" :style="{ width: `${width - (width / 100 * 6.24)}px`, height: `${height - (height / 100 * 11.32)}px` }">
  <!-- шапка -->
  <v-toolbar class="chat-list__bar" dark dense flat>
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
          @click="chatThemes(ThemesList.themeName)"
        >
          <v-list-item-title class="chat-list__palette-menu-font">{{ ThemesList.themeName }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-toolbar>

  <div class="before-chat-list__bar" />
  <!-- Список контактов -->
  <v-list two-line class="chat-list__vlist">
    <template v-for="chat in getChatList">
      <!-- Контакт -->
      <v-list-item
        class="chat-list__vlist-item chat-list__palette-menu--hover"
        :key="chat.chatID"
        @click="openSelectedChat(chat.chatID, chat.name, chat.unreadMessageCount)">
        <!-- Аватар -->
        <v-list-item-avatar class="chat-list__vlist--chat__avatar" :class="{ 'chat-list__vlist--chat__avatar__badge': chat.unreadMessageCount > 0 }">
          <img :src="chat.avatar">
        </v-list-item-avatar>

        <!-- Основной блок с информацией -->
        <v-list-item-content>
          <!-- Имя контакта -->
          <v-list-item-title class="chat-list__vlist--chat__title">
            {{ chat.name }}
          </v-list-item-title>
          <!-- Текст последнего сообщения -->
          <v-list-item-subtitle v-if="chat.messagesHistory.type === 'text' || chat.messagesHistory.type === 'system'" 
            class="chat-list__vlist--chat__subtitle"
            v-html="chat.messagesHistory.data.text"
          > 
          </v-list-item-subtitle>
          <!-- Смайлик -->
          <v-list-item-subtitle v-else-if="chat.messagesHistory.type === 'emoji'" class="ml-2"> 
            <img width="28" :src="chat.messagesHistory.data.src" />
          </v-list-item-subtitle>
          <!-- Иконка фото/видео контента в сообщении -->
          <v-list-item-subtitle v-else class=""> 
            <a-icon class="chat-list__vlist--chat__subtitle-icon" :icon="['fas', 'photo-video']"></a-icon>
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
import updateThemes from '../../styles/updateThemes';
import { markdown } from './messages/drawdown'

export default {
  props: {
    width: [Number, String],
    height: [Number, String],
    chatList: {
      type: Array,
      required: true,
    },
    mChatData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    getChatList() {
      let сurrentChatList = this.chatList // Контакты в телефоне персонажа
      let chatData = JSON.parse(JSON.stringify(this.mChatData)); // Данные чатов
      let chatListData = [] // Список текущих чатов с информацией о контакте и последнем сообщении
      // Формируем список текущий чатов
      for (let i in сurrentChatList) { // Перебираем каждого в списке contacts
        for (let key in chatData.chatList) { // Перебирем всех
          if (chatData.chatList[key].chatID === сurrentChatList[i]) {
            chatData.chatList[key].messagesHistory.find(function(message) { 
              // Заменяем весь массив с сообщениями, на одно удовлетворяющее критерию
              if (message.type !== 'suggestion' && message.type === 'text') {
                message.data.text = markdown(message.data.text)
                chatData.chatList[key].messagesHistory = message
              }
              else if (message.type !== 'suggestion') chatData.chatList[key].messagesHistory = message
            })
            chatListData.push(chatData.chatList[key])
          }
        }
      }
      return this.getChatListData(chatListData)
    },
  },
  methods: {
    // Процесс определения имени, аватара чата
    getChatListData(chatListData){
      let chatData = JSON.parse(JSON.stringify(this.mChatData)); // Данные чатов
      let processedChatListData = [];
      // Процесс определения имени, аватара чата
      for (let i in chatListData) {
        // Если это групповой чат, определяем данные с самого чата
        if (chatListData[i].isGroupChat) {
          processedChatListData.push({
            chatID: chatListData[i].chatID,
            name: chatListData[i].groupChatName,
            avatar: chatListData[i].groupChatAvatar,
            unreadMessageCount: chatListData[i].unreadMessageCount,
            messagesHistory: chatListData[i].messagesHistory
          })
        }
        // Если нет, определяем данные из charProfiles
        else {
          let str = chatListData[i].chatID;
          // Извлекаем sister из mc_sister
          let getCharID = str.slice(str.indexOf('_') + 1, str.length)
          // Обрабатываем данные из профиля персонажа
          for (let key in chatData.charProfiles) {
            if (getCharID == chatData.charProfiles[key].charID) {
              // Если используется псевдоним
              if (chatData.charProfiles[key].isAlias) {
                chatListData[i].charName = chatData.charProfiles[key].aliasName;
                chatListData[i].charAvatar = chatData.charProfiles[key].avatar;    
              }
              else {
                chatListData[i].charName = chatData.charProfiles[key].name;
                chatListData[i].charAvatar = chatData.charProfiles[key].avatar;                
              }
            }
          }
          processedChatListData.push({
            chatID: chatListData[i].chatID,
            name: chatListData[i].charName,
            avatar: chatListData[i].charAvatar,
            unreadMessageCount: chatListData[i].unreadMessageCount,
            messagesHistory: chatListData[i].messagesHistory
          })
        }
      }
      return processedChatListData
    },
    openSelectedChat(selectedChatID, selectedContactName, unreadMessageCount){
      this.$store.state.mChat.selectedChatID = selectedChatID // Для MessageList
      this.$store.state.mChat.selectedContactName = selectedContactName // Для MessageListToolbar
      this.$store.commit('mChatListShow');
    },
    chatThemes(select){
      this.mChatData.currentSelectedTheme = select;
      this.$store.commit('updateStores');
      updateThemes()
    }
  },
}
</script>

<style lang="scss">

.chat-list.v-card {
  background: var(--chat-list--background) !important;
}

.before-chat-list__bar {
  height: 7.5%;
}

.chat-list__bar  {
  display: flex;
  flex-direction: column;
  justify-content: center;
  // position: relative;
  position: fixed;
  background: var(--chat-list__bar--background) !important;
  height: 7.5% !important;
  width: calc(100% - 6.24%);
  box-shadow: 0px -2px 4px black; // Маленькая тень
  z-index: 1;  
}

.chat-list__bar__title {
  font-size: 1.2em;
  color: var(--chat-list__vlist--chat__title--color) !important;
}

.chat-list__bar__nav-btn.v-btn {
  width: calc(var(--mChatWidth) / 100 * 13) !important;
  height: calc(var(--mChatHeigth) / 100 * 6) !important;
  color: var(--chat-list__bar__nav-btn--color) !important;
  background: var(--chat-list__v-btn--background) !important;
  &:hover {
    background: var(--chat-list__v-btn--background) !important;
  }
}

.chat-list__bar__nav-btn__icon {
  font-size: calc(var(--mChatFontSize) / 100 * 100) !important;
}

.chat-list__bar__palette-btn.v-btn  {
  width: calc(var(--mChatWidth) / 100 * 13) !important;
  height: calc(var(--mChatHeigth) / 100 * 6) !important;
  color: var(--chat-list__bar__palette-btn--color) !important;
  background: var(--chat-list__v-btn--background) !important;
  &:hover {
    background: var(--chat-list__v-btn--background) !important;
  }
}

.chat-list__bar__palette-btn__icon {
  font-size: calc(var(--mChatFontSize) / 100 * 100) !important;
}

.chat-list__vlist {
  background: var(--chat-list__vlist--background) !important;
  padding: 0px 0px 0px 0px !important;
}

.chat-list__vlist-item {
  background: var(--chat-list__vlist-item--background) !important;
  height: calc(var(--mChatHeigth) / 100 * 12.7) !important;
  padding: 0px 3.3% 0px 2.5% !important;  
}

.chat-list__vlist--chat__avatar {
  width: calc(var(--mChatWidth) / 100 * 15.3) !important;
  height: calc(var(--mChatWidth) / 100 * 15.3) !important;
  margin-top: 5.4% !important;
  margin-right: 5.4% !important;
  margin-bottom: 5.4% !important;
  margin-left: 0px !important;
}

.chat-list__vlist--chat__avatar__badge {
  // width: 54px !important;
  // border: var(--chat-list__vlist--chat__avatar__badge--border) !important;
  // box-shadow: var(--chat-list__vlist--chat__avatar__badge--box-shadow) !important;
}

.chat-list__vlist--chat__title {
  font-size: 0.850em !important;
  font-weight: var(--chat-list__vlist--chat__title--font-weight) !important;  
  color: var(--chat-list__vlist--chat__title--color) !important;
}

.chat-list__vlist--chat__subtitle {
  font-size: 0.750em !important;
  margin-bottom: 3%;
  color: var(--chat-list__vlist--chat__subtitle--color) !important;
  p {
    margin-bottom: 0px !important;
    white-space: nowrap !important;
    text-overflow: ellipsis !important;
    overflow: hidden !important;
  }
}

.chat-list__vlist--chat__subtitle-icon {
  font-size: 1.5em !important;
  margin-bottom: 2.7%;
  color: var(--chat-list__vlist--chat__subtitle-icon--color) !important;
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
  font-size: calc(var(--mChatFontSize) / 100 * 80) !important;
  color: var(--chat-list__palette-menu-font--color) !important;
}

</style>


