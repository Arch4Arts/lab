<template>
      <v-card>
        <v-toolbar color="cyan" dark height="50" flat>
          <v-toolbar-side-icon></v-toolbar-side-icon>
          <!-- <v-toolbar-title>Inbox</v-toolbar-title> -->
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon size="18"> fas fa-search </v-icon>
          </v-btn>
        </v-toolbar>
        <v-list two-line>
          <template v-for="contact in ContactList">

            <v-list-tile
              :key="contact.id"
              avatar
              @click="ClickOnContact(contact.id, contact.name)"
            >
              <v-list-tile-avatar size="52">
                <img :src="contact.imageUrl">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title class="ml-2"> {{ contact.name }} </v-list-tile-title>
                <v-list-tile-sub-title class="ml-2" 
                v-if="contact.messagesHistory.type === 'text' || contact.messagesHistory.type === 'system'"> {{ contact.messagesHistory.data.text }} </v-list-tile-sub-title>
                <v-list-tile-sub-title class="ml-2" 
                v-else-if="contact.messagesHistory.type === 'emoji'"> <v-img width="28" :src="contact.messagesHistory.data.src"></v-img> </v-list-tile-sub-title>
                <v-list-tile-sub-title class="ml-2" v-else> <v-icon>fas fa-photo-video</v-icon> </v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action class="test" v-if="contact.unreadMSGCount > 0">
                <v-badge color="cyan" left>
                <template v-slot:badge>
                    <span> {{ contact.unreadMSGCount }} </span>
                </template>
                </v-badge>
              </v-list-tile-action>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
</template>

<script>
const _ = require('lodash'); // Библиотека для упрощения работы со строками, таблицами и т д.
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
                _.find(user.messagesHistory, function(item) {
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
      },
    },
  }
</script>

<style scoped>

.test {
    min-width: 0px;
    margin-bottom: 24px;
}

* {
  -ms-overflow-style: none;  /* IE 10+ */
  scrollbar-width: none;  /* Firefox */
}

*::-webkit-scrollbar { 
    display: none;  /* Safari and Chrome */
}

</style>


