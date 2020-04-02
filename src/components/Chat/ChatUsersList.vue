<template>
      <v-card class="users-list">
        <v-toolbar class="users-list__bar" dark height="50" flat>
          <v-app-bar-nav-icon class="users-list__bar__nav-btn v-btn--hover"></v-app-bar-nav-icon>
          <!-- <v-toolbar-title>Inbox</v-toolbar-title> -->
          <v-spacer></v-spacer>
          <v-menu offset-y class="users-list__palette-menu-bg">
          <template v-slot:activator="{ on }">
            <v-btn class="users-list__bar__palette-btn v-btn--hover" icon v-on="on">
              <v-icon size="20"> fas fa-palette </v-icon>
            </v-btn>
          </template>
          <v-list class="users-list__palette-menu-bg">
            <v-list-item
              class="users-list__vlist--hover"
              v-for="(item, index) in $store.state.chat.ThemesList"
              :key="index"
              @click="chatThemes(item.title)"
            >
              <v-list-item-title class="users-list__palette-menu-font">{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn class="users-list__bar__search_btn v-btn--hover" icon>
          <v-icon size="20"> fas fa-search </v-icon>
        </v-btn>
        </v-toolbar>
        <v-list two-line class="users-list__vlist">
          <template v-for="contact in ContactList">

            <v-list-item
              class="users-list__vlist-item users-list__vlist--hover"
              :key="contact.id"
              @click="ClickOnContact(contact.id, contact.name)"
            >
              <v-list-item-avatar size="52">
                <img :class="{ users_list__vlist__avatar_badge: contact.unreadMSGCount > 0 }" :src="contact.imageUrl">
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title class="ml-2 users-list__vlist--contact-title"> {{ contact.name }} </v-list-item-title>
                <v-list-item-subtitle class="ml-2 users-list__vlist--contact-subtitle" 
                v-if="contact.messagesHistory.type === 'text' || contact.messagesHistory.type === 'system'"> {{ contact.messagesHistory.data.text }} </v-list-item-subtitle>
                <v-list-item-subtitle class="ml-2" 
                v-else-if="contact.messagesHistory.type === 'emoji'"> <v-img width="28" :src="contact.messagesHistory.data.src"></v-img> </v-list-item-subtitle>
                <v-list-item-subtitle class="ml-2" v-else> <v-icon class="users-list__vlist--contact-subtitle-icon">fas fa-photo-video</v-icon> </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action class="text-no-wrap">
                <v-badge color="badge">
                  <template v-slot:badge>
                      <span v-if="contact.unreadMSGCount > 0"> {{ contact.unreadMSGCount }} </span>
                  </template>
                </v-badge>
              </v-list-item-action>
            </v-list-item>
          </template>
        </v-list>
      </v-card>
</template>

<script>
import chatThemes from '../../plugins/chatThemes'

  export default {
    computed: {
      ContactList: {
        get() {
          var contacts = this.$store.state.chat.currentContacts // Контакты в телефоне
          var users = JSON.parse(JSON.stringify(this.$store.state.chatUsers)); // все контакты в игре
          var showContactsList = [] // обработанные контакты для отображения
          for (let i = 0; i < contacts.length; i++) { // Перебираем столько раз, сколько контактов в contacts
            for (let user of users) { // Перебираем для каждого пользователя
              if (user.id === contacts[i]) {
                showContactsList.push(user)
                user.messagesHistory.find(function(item) {
                  // if (item.type === 'text' && item.author === contacts[i]) showContactsList[i].messagesHistory = item.data.text;
                  // if (item.type === 'text' && item.author === contacts[i]) showContactsList[i].messagesHistory = item.data.text; // Забирем первое значение удовлетворяющее условию
                  if (item.type !== 'suggestion') showContactsList[i].messagesHistory = item
                })
              }
            }
          }
          return showContactsList
        },
      }
    },
    methods: {
      ClickOnContact(contactID, contactName){
        this.$store.state.chat.ContactOnClikedID = contactID
        this.$store.state.chat.ContactOnClikedName = contactName
        this.$store.state.chat.UserListShow = !this.$store.state.chat.UserListShow
        this.$store.commit('updateStores');
      },
      chatThemes(select){
        this.$store.state.chat.CurrentTheme = select;
        this.$store.commit('updateStores');
        chatThemes();
      }
    },
  }
</script>

<style scoped>

.users-list {
    background: var(--users-list--background) !important;
}

.users-list__bar {
    background: var(--users-list__bar--background) !important;
}

.users-list__bar__nav-btn {
    color: var(--users-list__bar__nav-btn--color) !important;
}

.users-list__bar__palette-btn {
    color: var(--users-list__bar__palette-btn--color) !important;
}

.users-list__bar__search_btn {
    color: var(--users-list__bar__search_btn--color) !important;
}

.v-btn--hover:hover {
  background: var(--v-btn--hover--background) !important;
}

.users-list__vlist {
    background: var(--users-list__vlist--background) !important;  
}

.users-list__vlist-item {
    background: var(--users-list__vlist-item--background) !important;   
    margin-bottom: var(--users-list__vlist-item--margin-bottom);
}

.users-list__vlist--contact-title {
    color: var(--users-list__vlist--contact-title--color) !important;
    font-weight: var(--users-list__vlist--contact-title--font-weight) !important;
}

.users-list__vlist--contact-subtitle {
    color: var(--users-list__vlist--contact-subtitle--color) !important;
}

.users-list__vlist--contact-subtitle-icon {
    color: var(--users-list__vlist--contact-subtitle-icon--color) !important;
}

.users-list__vlist--hover:hover {
  background: var(--users-list__vlist--hover--background) !important;
}

.users_list__vlist__avatar_badge {
  width: 54px;
  border: var(--users_list__vlist__avatar_badge--border);
  box-shadow: var(--users_list__vlist__avatar_badge--box-shadow);
}

.users-list__palette-menu-bg {
  background: var(--users-list__palette-menu-bg--background) !important;
}

.users-list__palette-menu-font {
  color: var(--users-list__palette-menu-font--color) !important;
}

* {
  -ms-overflow-style: none;  /* IE 10+ */
  scrollbar-width: none;  /* Firefox */
}

*::-webkit-scrollbar { 
    display: none;  /* Safari and Chrome */
}

</style>


