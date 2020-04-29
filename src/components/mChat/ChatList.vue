<template>
<v-card class="chat-list">
  <!-- шапка -->
  <v-toolbar class="chat-list__bar" dark height="50" flat>
    <!-- Декоративная кнопка -->
    <v-app-bar-nav-icon class="chat-list__bar__nav-btn"></v-app-bar-nav-icon>
    <!-- <v-toolbar-title>Inbox</v-toolbar-title> -->
    <v-spacer>
      <v-toolbar-title class="chat-list__bar__title"> 
        Libgram
      </v-toolbar-title>
    </v-spacer>
    <!-- Меню выбора темы -->
    <v-menu open-on-hover offset-y class="chat-list__palette-menu">
      <template v-slot:activator="{ on }">
        <v-btn class="chat-list__bar__palette-btn" icon v-on="on">
          <v-icon size="20"> fas fa-palette </v-icon>
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
    <!-- Декоративная кнопка -->
    <v-btn class="chat-list__bar__search_btn" icon>
      <v-icon size="20"> fas fa-search </v-icon>
    </v-btn>
  </v-toolbar>

  <!-- Список контактов -->
  <v-list two-line class="chat-list__vlist">
    <template v-for="chat in getChatList">
      <!-- Контакт -->
      <v-list-item
        class="chat-list__vlist-item chat-list__palette-menu--hover"
        :key="chat.chatID"
        @click="openSelectedChat(chat.chatID, chat.name, chat.unreadMessageCount)">
        <!-- Аватар -->
        <v-list-item-avatar size="52">
          <img :class="{ contacts_page__vlist__avatar_badge: chat.unreadMessageCount > 0 }" :src="chat.avatar">
        </v-list-item-avatar>

        <!-- Основной блок с информацией -->
        <v-list-item-content>
          <!-- Имя контакта -->
          <v-list-item-title class="chat-list__vlist--contact-title">
            {{ chat.name }}
          </v-list-item-title>
          <!-- Текст последнего сообщения -->
          <v-list-item-subtitle v-if="chat.messagesHistory.type === 'text' || chat.messagesHistory.type === 'system'" 
            class="chat-list__vlist--contact-subtitle"
            v-html="chat.messagesHistory.data.text"
          > 
          </v-list-item-subtitle>
          <!-- Смайлик -->
          <v-list-item-subtitle v-else-if="chat.messagesHistory.type === 'emoji'" class="ml-2"> 
            <img width="28" :src="chat.messagesHistory.data.src" />
          </v-list-item-subtitle>
          <!-- Иконка фото/видео контента в сообщении -->
          <v-list-item-subtitle v-else class=""> 
            <v-icon class="chat-list__vlist--contact-subtitle-icon">fas fa-photo-video</v-icon>
          </v-list-item-subtitle>
        </v-list-item-content>

        <!-- Кол-во непрочитанных сообщений -->
        <v-list-item-action class="text-no-wrap">
          <div v-if="chat.unreadMessageCount > 0" class="chat-list__vlist--contact-badge">
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
import { markdown } from './message type/drawdown'

export default {
  props: {
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
      var chatData = JSON.parse(JSON.stringify(this.mChatData)); // История всех чатов
      for (let chat of chatData.chatList) { // Перебираем для каждого чата
        if (chat.chatID === selectedChatID) { // Если это тот кто был выбран
          // Отниманием кол-во непричитанных сообщений у контакта из общего счётчика
          this.$store.state.mChat.newMessagesCount -= chat.unreadMessageCount
        }
      }
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

.chat-list__bar {
  position: relative;
  background: var(--chat-list__bar--background) !important;
  box-shadow: 0px -2px 4px black; // Маленькая тень
  z-index: 1;
}

.chat-list__bar__title {
  color: var(--chat-list__vlist--contact-title--color) !important;
}

.chat-list__bar__nav-btn.v-btn {
  color: var(--chat-list__bar__nav-btn--color) !important;
  background: var(--chat-list__v-btn--background) !important;
  &:hover {
    background: var(--chat-list__v-btn--background) !important;
  }
}

.chat-list__bar__palette-btn.v-btn  {
  color: var(--chat-list__bar__palette-btn--color) !important;
  background: var(--chat-list__v-btn--background) !important;
  &:hover {
    background: var(--chat-list__v-btn--background) !important;
  }
}

.chat-list__bar__search_btn.v-btn  {
  color: var(--chat-list__bar__search_btn--color) !important;
  background: var(--chat-list__v-btn--background) !important;
  &:hover {
    background: var(--chat-list__v-btn--background) !important;
  }
}

.chat-list__vlist {
  background: var(--chat-list__vlist--background) !important;
  padding: 0px 0px 0px 0px !important;
}

.chat-list__vlist-item {
  background: var(--chat-list__vlist-item--background) !important;   
  padding: 0px 12px 0px 8px !important;  
}

.chat-list__vlist--contact-title {
  color: var(--chat-list__vlist--contact-title--color) !important;
  font-weight: var(--chat-list__vlist--contact-title--font-weight) !important;
}

.chat-list__vlist--contact-subtitle {
  color: var(--chat-list__vlist--contact-subtitle--color) !important;
  p {
    white-space: nowrap !important;
    text-overflow: ellipsis !important;
    overflow: hidden !important;
  }
}

.chat-list__vlist--contact-subtitle-icon {
  color: var(--chat-list__vlist--contact-subtitle-icon--color) !important;
}

.chat-list__vlist--contact-badge {
  align-items: center;
  display: inline-flex;
  justify-content: center;
  color: var(--chat-list__vlist--contact-badge--color) !important;
  background-color: var(--chat-list__vlist--contact-badge--background) !important;
  font-size: var(--chat-list__vlist--contact-badge--font-size) !important;
  font-weight: var(--chat-list__vlist--contact-badge--font-weight) !important;
  border-radius: var(--chat-list__vlist--contact-badge--border-radius) !important;
  width: var(--chat-list__vlist--contact-badge--width) !important;
  height: var(--chat-list__vlist--contact-badge--height) !important;
}



.contacts_page__vlist__avatar_badge {
  width: 54px;
  border: var(--contacts_page__vlist__avatar_badge--border) !important;
  box-shadow: var(--contacts_page__vlist__avatar_badge--box-shadow) !important;
}

.chat-list__palette-menu--hover:hover {
  background: var(--chat-list__palette-menu--hover--background) !important;
}

.chat-list__palette-menu {
  background: var(--chat-list__palette-menu--background) !important;
}

.chat-list__palette-menu-font {
  color: var(--chat-list__palette-menu-font--color) !important;
}

</style>


