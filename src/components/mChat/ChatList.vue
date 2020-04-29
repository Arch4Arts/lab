<template>
<v-card class="chat-list">
  <!-- шапка -->
  <v-toolbar class="chat-list__bar" dark height="50" flat>
    <!-- Декоративная кнопка -->
    <v-app-bar-nav-icon class="chat-list__bar__nav-btn"></v-app-bar-nav-icon>
    <!-- <v-toolbar-title>Inbox</v-toolbar-title> -->
    <v-spacer></v-spacer>
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
    <template v-for="chat in getChatListData">

      <!-- Контакт -->
      <v-list-item
        class="chat-list__vlist-item chat-list__palette-menu--hover"
        :key="chat.chatID"
        @click="openSelectedChat(chat.chatID, chat.contactName, chat.unreadMessageCount)">
        <!-- Аватар -->
        <v-list-item-avatar size="52">
          <img :class="{ contacts_page__vlist__avatar_badge: chat.unreadMessageCount > 0 }" :src="chat.avatar">
        </v-list-item-avatar>

        <!-- Основной блок с информацией -->
        <v-list-item-content>
          <!-- Имя контакта -->
          <v-list-item-title class="ml-2 chat-list__vlist--contact-title">
            {{ chat.contactName }}
          </v-list-item-title>
          <!-- Текст последнего сообщения -->
          <v-list-item-subtitle v-if="chat.messagesHistory.type === 'text' || chat.messagesHistory.type === 'system'" class="ml-2 chat-list__vlist--contact-subtitle"> 
            {{ chat.messagesHistory.data.text }} 
          </v-list-item-subtitle>
          <!-- Смайлик -->
          <v-list-item-subtitle v-else-if="chat.messagesHistory.type === 'emoji'" class="ml-2"> 
            <img width="28" :src="chat.messagesHistory.data.src" />
          </v-list-item-subtitle>
          <!-- Иконка фото/видео контента в сообщении -->
          <v-list-item-subtitle v-else class="ml-2"> 
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

export default {
  props: {
    chatList: {
      type: Array,
      required: true,
    },
    mChatData: {
      type: Array,
      required: true,
    },
  },
  computed: {
    getChatListData() { 
      let chatList = this.chatList // Контакты в телефоне персонажа
      let chatData = JSON.parse(JSON.stringify(this.mChatData)); // Данные чатов
      let chatListData = [] // Список текущих чатов с информацией о контакте и последнем сообщении
      for (let i in chatList) { // Перебираем каждого в списке contacts
        for (let key in chatData) { // Перебирем всех
          if (chatData[key].chatID === chatList[i]) {
            chatData[key].messagesHistory.find(function(message) { 
              // Заменяем весь массив с сообщениями, на одно удовлетворяющее критерию
              if (message.type !== 'suggestion') chatData[key].messagesHistory = message
            })
            chatListData.push(chatData[key])
          }
        }
      }
      return chatListData
    },
  },
  methods: {
    openSelectedChat(selectedChatID, selectedContactName, unreadMessageCount){
      this.$store.state.mChat.selectedChatID = selectedChatID // Для MessageList
      this.$store.state.mChat.selectedContactName = selectedContactName // Для MessageListToolbar
      var chatData = JSON.parse(JSON.stringify(this.mChatData)); // История всех чатов
      for (let chat of chatData) { // Перебираем для каждого чата
        if (chat.chatID === selectedChatID) { // Если это тот кто был выбран
          // Отниманием кол-во непричитанных сообщений у контакта из общего счётчика
          this.$store.state.mChat.newMessagesCount -= chat.unreadMessageCount
        }
      }
      this.$store.commit('mChatListShow');
    },
    chatThemes(select){
      this.$store.state.mChat.currentSelectedTheme_MC = select;
      this.$store.commit('updateStores');
      updateThemes()
    }
    },
  }
</script>

<style scoped>

.v-btn {
  background: var(--chat-list__v-btn--background) !important;
}

.v-btn:hover {
  background: var(--chat-list__v-btn--background) !important;
}

.chat-list {
  background: var(--chat-list--background) !important;
}

.chat-list__bar {
  background: var(--chat-list__bar--background) !important;
}

.chat-list__bar__nav-btn {
  color: var(--chat-list__bar__nav-btn--color) !important;
}

.chat-list__bar__palette-btn {
  color: var(--chat-list__bar__palette-btn--color) !important;
}

.chat-list__bar__search_btn {
  color: var(--chat-list__bar__search_btn--color) !important;
}

.chat-list__vlist {
  background: var(--chat-list__vlist--background) !important;  
}

.chat-list__vlist-item {
  background: var(--chat-list__vlist-item--background) !important;   
  margin-bottom: var(--chat-list__vlist-item--margin-bottom) !important;
}

.chat-list__vlist--contact-title {
  color: var(--chat-list__vlist--contact-title--color) !important;
  font-weight: var(--chat-list__vlist--contact-title--font-weight) !important;
}

.chat-list__vlist--contact-subtitle {
  color: var(--chat-list__vlist--contact-subtitle--color) !important;
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

* {
  -ms-overflow-style: none;  /* IE 10+ */
  scrollbar-width: none;  /* Firefox */
}

*::-webkit-scrollbar { 
  display: none;  /* Safari and Chrome */
}

</style>


