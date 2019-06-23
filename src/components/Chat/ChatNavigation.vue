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
                <v-list-tile-sub-title v-if="contact.messagesHistory !== undefined" class="ml-2"> {{ contact.messagesHistory }} </v-list-tile-sub-title>
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
    data () {
      return {
        // items: [
        //   {
        //     avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        //     title: 'Brunch this weekend?',
        //     subtitle: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
        //   },
        //   {
        //     avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        //     title: 'Summer BBQ',
        //     subtitle: "Wish I could come, but I'm out of town this weekend."
        //   },
        //   {
        //     avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        //     title: 'Oui oui',
        //     subtitle: "Do you have Paris recommendations? Have you ever been?"
        //   },
        //   {
        //     avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
        //     title: 'Birthday gift',
        //     subtitle: "Have any ideas about what we should get Heidi for her birthday?"
        //   },
        //   {
        //     avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
        //     title: 'Recipe to try',
        //     subtitle: "We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
        //   },
        // ]
      }
    },
    computed: {
        ContactList: {
        get() {
          var contacts = this.$store.state.chat.currentContacts
          var users = this.$store.state.chatUsers;
          var contactsList = []
          for (let i = 0; i < contacts.length; i++) {
            for (let user of users) {
              if (user.id === contacts[i]) {
                contactsList.push(user)
                _.findLast(user.messagesHistory, function(item) {
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


