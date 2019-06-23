<template>
      <v-card>
        <v-toolbar color="cyan" dark>
          <v-toolbar-side-icon></v-toolbar-side-icon>
          <v-toolbar-title>Inbox</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon size="20"> far fa-search </v-icon>
          </v-btn>
        </v-toolbar>
        <v-list two-line>
          <template v-for="contact in ContactList">

            <v-list-tile
              :key="contact.id"
              avatar
              @click=""
            >
              <v-list-tile-avatar size="52">
                <img :src="contact.imageUrl">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title class="ml-2"> {{ contact.name }} </v-list-tile-title>
                <v-list-tile-sub-title class="ml-2"> {{ contact.messagesHistory }} </v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action class="test">
                <v-badge color="cyan" left>
                <template v-slot:badge>
                    <span>6</span>
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
          var users = this.$store.state.chatUsers; // все контакты в игре
          var contactsList = [] // обработанные контакты для отображения
          for (let i = 0; i < contacts.length; i++) { // Перебираем столько раз, сколько контактов в contacts
            for (let user of users) {
              if (user.id === contacts[i]) {
                contactsList.push(user)
                _.find(user.messagesHistory, function(item) {
                  // if (item.type === 'text' && item.author === contacts[i]) contactsList[i].messagesHistory = item.data.text;
                  if (item.type === 'text') contactsList[i].messagesHistory = item.data.text;
                })
              }
            }
          }
          return contactsList
        },
      }
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


