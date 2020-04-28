<template>
<v-card class="contacts-page">
  <!-- шапка -->
  <v-toolbar class="contacts-page__bar" dark height="50" flat>
    <!-- Декоративная кнопка -->
    <v-app-bar-nav-icon class="contacts-page__bar__nav-btn"></v-app-bar-nav-icon>
    <!-- <v-toolbar-title>Inbox</v-toolbar-title> -->
    <v-spacer></v-spacer>
    <!-- Меню выбора темы -->
    <v-menu open-on-hover offset-y class="contacts-page__palette-menu">
      <template v-slot:activator="{ on }">
        <v-btn class="contacts-page__bar__palette-btn" icon v-on="on">
          <v-icon size="20"> fas fa-palette </v-icon>
        </v-btn>
      </template>
      <v-list class="contacts-page__palette-menu">
        <v-list-item
          class="contacts-page__palette-menu--hover"
          v-for="(ThemesList, index) in $store.state.mChat.themesList"
          :key="index"
          @click="chatThemes(ThemesList.themeName)"
        >
          <v-list-item-title class="contacts-page__palette-menu-font">{{ ThemesList.themeName }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <!-- Декоративная кнопка -->
    <v-btn class="contacts-page__bar__search_btn" icon>
      <v-icon size="20"> fas fa-search </v-icon>
    </v-btn>
  </v-toolbar>

  <!-- Список контактов -->
  <v-list two-line class="contacts-page__vlist">
    <template v-for="chat in chatList">

      <!-- Контакт -->
      <v-list-item
        class="contacts-page__vlist-item contacts-page__palette-menu--hover"
        :key="chat.contactID"
        @click="openSelectedChat(chat.contactID, chat.contactName, chat.unreadMessageCount)">
        <!-- Аватар -->
        <v-list-item-avatar size="52">
          <img :class="{ contacts_page__vlist__avatar_badge: chat.unreadMessageCount > 0 }" :src="chat.avatarImg">
        </v-list-item-avatar>

        <!-- Основной блок с информацией -->
        <v-list-item-content>
          <!-- Имя контакта -->
          <v-list-item-title class="ml-2 contacts-page__vlist--contact-title">
            {{ chat.contactName }}
          </v-list-item-title>
          <!-- Текст последнего сообщения -->
          <v-list-item-subtitle v-if="chat.messagesHistory.type === 'text' || chat.messagesHistory.type === 'system'" class="ml-2 contacts-page__vlist--contact-subtitle"> 
            {{ chat.messagesHistory.data.text }} 
          </v-list-item-subtitle>
          <!-- Смайлик -->
          <v-list-item-subtitle v-else-if="chat.messagesHistory.type === 'emoji'" class="ml-2"> 
            <img width="28" :src="chat.messagesHistory.data.src" />
          </v-list-item-subtitle>
          <!-- Иконка фото/видео контента в сообщении -->
          <v-list-item-subtitle v-else class="ml-2"> 
            <v-icon class="contacts-page__vlist--contact-subtitle-icon">fas fa-photo-video</v-icon>
          </v-list-item-subtitle>
        </v-list-item-content>

        <!-- Кол-во непрочитанных сообщений -->
        <v-list-item-action class="text-no-wrap">
          <div v-if="chat.unreadMessageCount > 0" class="contacts-page__vlist--contact-badge">
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
    contactList: {
      type: Array,
      required: true,
    },
    mChatData: {
      type: Array,
      required: true,
    },
  },
  computed: {
    chatList() { 
      let contactList = this.contactList // Контакты в телефоне персонажа
      let chatData = JSON.parse(JSON.stringify(this.mChatData)); // Данные чатов
      let chatList = [] // Список текущих чатов с информацией о контакте и последнем сообщении
      for (let i in contactList) { // Перебираем каждого в списке contacts
        for (let key in chatData) { // Перебирем всех
          if (chatData[key].contactID === contactList[i]) {
            chatData[key].messagesHistory.find(function(message) { 
              // Заменяем весь массив с сообщениями, на одно удовлетворяющее критерию
              if (message.type !== 'suggestion') chatData[key].messagesHistory = message
            })
            chatList.push(chatData[key])
          }
        }
      }
      return chatList
    },
  },
  methods: {
    openSelectedChat(selectedContactID, selectedContactName, unreadMessageCount){
      this.$store.state.mChat.selectedContactID = selectedContactID
      this.$store.state.mChat.selectedContactName = selectedContactName
      var chatData = JSON.parse(JSON.stringify(this.mChatData)); // История всех чатов
      for (let chat of chatData) { // Перебираем для каждого чата
        if (chat.contactID === selectedContactID) { // Если это тот кто был выбран
          // Отниманием кол-во непричитанных сообщений у контакта из общего счётчика
          this.$store.state.mChat.newMessagesCount -= chat.unreadMessageCount
        }
      }
      this.$store.commit('mChatContactsPageShow');
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
  background: var(--contacts-page__v-btn--background) !important;
}

.v-btn:hover {
  background: var(--contacts-page__v-btn--background) !important;
}

.contacts-page {
  background: var(--contacts-page--background) !important;
}

.contacts-page__bar {
  background: var(--contacts-page__bar--background) !important;
}

.contacts-page__bar__nav-btn {
  color: var(--contacts-page__bar__nav-btn--color) !important;
}

.contacts-page__bar__palette-btn {
  color: var(--contacts-page__bar__palette-btn--color) !important;
}

.contacts-page__bar__search_btn {
  color: var(--contacts-page__bar__search_btn--color) !important;
}

.contacts-page__vlist {
  background: var(--contacts-page__vlist--background) !important;  
}

.contacts-page__vlist-item {
  background: var(--contacts-page__vlist-item--background) !important;   
  margin-bottom: var(--contacts-page__vlist-item--margin-bottom) !important;
}

.contacts-page__vlist--contact-title {
  color: var(--contacts-page__vlist--contact-title--color) !important;
  font-weight: var(--contacts-page__vlist--contact-title--font-weight) !important;
}

.contacts-page__vlist--contact-subtitle {
  color: var(--contacts-page__vlist--contact-subtitle--color) !important;
}

.contacts-page__vlist--contact-subtitle-icon {
  color: var(--contacts-page__vlist--contact-subtitle-icon--color) !important;
}

.contacts-page__vlist--contact-badge {
  align-items: center;
  display: inline-flex;
  justify-content: center;
  color: var(--contacts-page__vlist--contact-badge--color) !important;
  background-color: var(--contacts-page__vlist--contact-badge--background) !important;
  font-size: var(--contacts-page__vlist--contact-badge--font-size) !important;
  font-weight: var(--contacts-page__vlist--contact-badge--font-weight) !important;
  border-radius: var(--contacts-page__vlist--contact-badge--border-radius) !important;
  width: var(--contacts-page__vlist--contact-badge--width) !important;
  height: var(--contacts-page__vlist--contact-badge--height) !important;
}



.contacts_page__vlist__avatar_badge {
  width: 54px;
  border: var(--contacts_page__vlist__avatar_badge--border) !important;
  box-shadow: var(--contacts_page__vlist__avatar_badge--box-shadow) !important;
}

.contacts-page__palette-menu--hover:hover {
  background: var(--contacts-page__palette-menu--hover--background) !important;
}

.contacts-page__palette-menu {
  background: var(--contacts-page__palette-menu--background) !important;
}

.contacts-page__palette-menu-font {
  color: var(--contacts-page__palette-menu-font--color) !important;
}

* {
  -ms-overflow-style: none;  /* IE 10+ */
  scrollbar-width: none;  /* Firefox */
}

*::-webkit-scrollbar { 
  display: none;  /* Safari and Chrome */
}

</style>


