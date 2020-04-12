<template>
      <v-card class="contacts-page">

        <!-- шапка -->
        <v-toolbar class="contacts-page__bar" dark height="50" flat>
          <!-- Декоративная кнопка -->
          <v-app-bar-nav-icon class="contacts-page__bar__nav-btn v-btn--hover"></v-app-bar-nav-icon>
          <!-- <v-toolbar-title>Inbox</v-toolbar-title> -->
          <v-spacer></v-spacer>
          <!-- Меню выбора темы -->
          <v-menu offset-y class="contacts-page__palette-menu-bg">
          <template v-slot:activator="{ on }">
            <v-btn class="contacts-page__bar__palette-btn v-btn--hover" icon v-on="on">
              <v-icon size="20"> fas fa-palette </v-icon>
            </v-btn>
          </template>
          <v-list class="contacts-page__palette-menu-bg">
            <v-list-item
              class="contacts-page__vlist--hover"
              v-for="(ThemesList, index) in $store.state.mChat.mChat_ThemesList"
              :key="index"
              @click="chatThemes(ThemesList.themeName)"
            >
              <v-list-item-title class="contacts-page__palette-menu-font">{{ ThemesList.themeName }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <!-- Декоративная кнопка -->
        <v-btn class="contacts-page__bar__search_btn v-btn--hover" icon>
          <v-icon size="20"> fas fa-search </v-icon>
        </v-btn>
        </v-toolbar>

        <!-- Список контактов -->
        <v-list two-line class="contacts-page__vlist">
          <template v-for="contact in ContactsList">

            <!-- Контакт -->
            <v-list-item
              class="contacts-page__vlist-item contacts-page__vlist--hover"
              :key="contact.mChatHistory_ContactID"
              @click="ClickOnContact(contact.mChatHistory_ContactID, contact.mChatHistory_ContactName, contact.mChatHistory_unReadMsgCount)"
            >
              <!-- Аватар -->
              <v-list-item-avatar size="52">
                <img :class="{ contacts_page__vlist__avatar_badge: contact.mChatHistory_unReadMsgCount > 0 }" :src="contact.mChatHistory_AvatarImg">
              </v-list-item-avatar>

              <!-- Основной блок с информацией -->
              <v-list-item-content>
                <!-- Имя контакта -->
                <v-list-item-title class="ml-2 contacts-page__vlist--contact-title">
                  {{ contact.mChatHistory_ContactName }}
                </v-list-item-title>
                <!-- Текст последнего сообщения -->
                <v-list-item-subtitle class="ml-2 contacts-page__vlist--contact-subtitle" 
                v-if="contact.mChatHistory_MsgHistory.type === 'text' || contact.mChatHistory_MsgHistory.type === 'system'"> 
                  {{ contact.mChatHistory_MsgHistory.data.text }} 
                </v-list-item-subtitle>
                <!-- Смайлик -->
                <v-list-item-subtitle class="ml-2" 
                v-else-if="contact.mChatHistory_MsgHistory.type === 'emoji'"> 
                  <img width="28" :src="contact.mChatHistory_MsgHistory.data.src" />
                </v-list-item-subtitle>
                <!-- Иконка фото/видео контента в сообщении -->
                <v-list-item-subtitle class="ml-2" v-else> 
                  <v-icon class="contacts-page__vlist--contact-subtitle-icon">fas fa-photo-video</v-icon>
                </v-list-item-subtitle>
              </v-list-item-content>

              <!-- Кол-во непрочитанных сообщений -->
              <v-list-item-action class="text-no-wrap">
                <div v-if="contact.mChatHistory_unReadMsgCount > 0" class="contacts-page__vlist--contact-badge">
                  {{ contact.mChatHistory_unReadMsgCount }}
                </div>
              </v-list-item-action>
            </v-list-item>
          </template>
        </v-list>
        
      </v-card>
</template>

<script>
import updateAllThemes from '../../styles/updateAllThemes';

export default {
  computed: {
    ContactsList: {
      get() {
        var contacts = this.$store.state.mChat.mChat_CurrentContacts_MC // Контакты в телефоне персонажа
        var users = JSON.parse(JSON.stringify(this.$store.state.mChatHistory)); // История всех чатов
        var showContactsList = [] // обработанные контакты для отображения
        for (let i = 0; i < contacts.length; i++) { // Перебираем столько раз, сколько контактов в contacts
          for (let user of users) { // Перебираем для каждого пользователя
            if (user.mChatHistory_ContactID === contacts[i]) {
              showContactsList.push(user)
              user.mChatHistory_MsgHistory.find(function(item) {
                // if (item.type === 'text' && item.author === contacts[i]) showContactsList[i].mChatHistory_MsgHistory = item.data.text;
                // if (item.type === 'text' && item.author === contacts[i]) showContactsList[i].mChatHistory_MsgHistory = item.data.text; // Забирем первое значение удовлетворяющее условию
                if (item.type !== 'suggestion') showContactsList[i].mChatHistory_MsgHistory = item
              })
            }
          }
        }
        return showContactsList
      },
    }
  },
  methods: {
    ClickOnContact(contactID, contactName, contactUnReadMsgCount){
      this.$store.state.mChat.mChat_ContactClikedID = contactID
      this.$store.state.mChat.mChat_ContactClikedName = contactName
      var contacts = JSON.parse(JSON.stringify(this.$store.state.mChatHistory)); // История всех чатов
        for (let contact of contacts) { // Перебираем для каждого контакта
          if (contact.mChatHistory_ContactID === contactID) { // Если это тот кто был выбран
            // Отниманием кол-во непричитанных сообщений у контакта из общего счётчика
            this.$store.state.mChat.mChat_NewMessagesCount = this.$store.state.mChat.mChat_NewMessagesCount - contact.mChatHistory_unReadMsgCount
          }
        }
      this.$store.state.mChat.mChat_ContactsPageShow = !this.$store.state.mChat.mChat_ContactsPageShow
      this.$store.commit('updateStores');
    },
    chatThemes(select){
      this.$store.state.mChat.mChat_CurrentTheme_MC = select;
      this.$store.commit('updateStores');
      updateAllThemes()
    }
    },
  }
</script>

<style scoped>

.v-btn--hover:hover {
  background: var(--contacts-page__v-btn--hover--background) !important;
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

.contacts-page__vlist--hover:hover {
  background: var(--contacts-page__vlist--hover--background) !important;
}

.contacts_page__vlist__avatar_badge {
  width: 54px;
  border: var(--contacts_page__vlist__avatar_badge--border) !important;
  box-shadow: var(--contacts_page__vlist__avatar_badge--box-shadow) !important;
}

.contacts-page__palette-menu-bg {
  background: var(--contacts-page__palette-menu-bg--background) !important;
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


