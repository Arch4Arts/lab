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
          @click="applySelectedTheme(ThemesList.themeName)"
        >
          <v-list-item-title class="chat-list__palette-menu-font">{{ ThemesList.themeName }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-toolbar>
  <!-- Пространство под шапкой (чтобы туда не уходил список чатов) -->
  <div :style="{ height: `${calcHeightToolbar}px` }" />
  <!-- Список контактов -->
  <v-list two-line class="chat-list__vlist">
    <template v-for="chat in getChatList">
      <!-- Контакт -->
      <v-list-item
        class="chat-list__vlist-item"
        :key="chat.chatID"
        :disabled="chat.disabled"
        :class="{ 'chat-list__vlist-item__disabled': chat.disabled }"
        @click="openSelectedChat(chat.chatID, chat.chatName, chat.groupChatName, chat.chatAvatar, chat.groupChatAvatar, chat.isGroupChat)">
        <!-- Аватар -->
        <v-list-item-avatar class="chat-list__vlist--chat__avatar" :class="{ 'chat-list__vlist--chat__avatar__badge': chat.unreadMessageCount > 0 }">
          <img v-if="chat.isGroupChat" :src="chat.groupChatAvatar">
          <img v-else :src="chat.chatAvatar">
        </v-list-item-avatar>

        <!-- Основной блок с информацией -->
        <v-list-item-content>
          <!-- Имя контакта -->
          <v-list-item-title class="chat-list__vlist--chat__title">
            <div v-if="chat.isGroupChat">{{ chat.groupChatName }}</div>
            <div v-else>{{ chat.chatName }}</div>
          </v-list-item-title>
          <!-- Текст последнего сообщения -->
          <v-list-item-subtitle v-if="chat.messagesHistory.type === 'text' || chat.messagesHistory.type === 'system'" 
            class="chat-list__vlist--chat__subtitle"
            v-html="chat.messagesHistory.data.text"
          > 
          </v-list-item-subtitle>
          <!-- Смайлик -->
          <v-list-item-subtitle v-else-if="chat.messagesHistory.type === 'emoji'"> 
            <img class="chat-list__vlist--chat__subtitle-emoji-preview" :src="chat.messagesHistory.data.src" />
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
    calcHeightToolbar: [Number, String],
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
      for (let i in сurrentChatList) {
        for (let key in chatData.chatList) {
          if (chatData.chatList[key].chatID === сurrentChatList[i]) {
            chatData.chatList[key].messagesHistory.reverse() // Инвертируем и ищем с конца
            chatData.chatList[key].messagesHistory.find(function(message, index) { 
              // Заменяем весь массив с сообщениями, на одно удовлетворяющее критерию
              if (message.type !== 'suggestion' && message.type === 'text') { // Если текстовое сообщение
                message.data.text = markdown(message.data.text)
                chatData.chatList[key].messagesHistory = message
                return true
              }
              else if (message.type !== 'suggestion') { // Или любого другого типа кроме suggestion
                chatData.chatList[key].messagesHistory = message
                return true
              }
            })
            chatListData.push(chatData.chatList[key])
          }
        }
      }
      
      return this.setChatInfo(chatListData) // Определение параметров аватара и имени
    },
  },
  methods: {
    // Процесс определения имени, аватара чата
    setChatInfo(chatListData){
      let chatData = JSON.parse(JSON.stringify(this.mChatData)); // Данные чатов
      // Процесс определения имени, аватара чата
      for (let i in chatListData) {
        // Если это не групповой чат, присваиваем имя и аватарку из charProfiles
        // Если групповой чат, то имя и аватар там уже заданы
        if (!chatListData[i].isGroupChat) {
          let str = chatListData[i].chatID;
          // Извлекаем sister из mc_sister
          let getCharID = str.slice(str.indexOf('_') + 1, str.length)
          // Обрабатываем данные из профиля персонажа
          for (let key in chatData.charProfiles) {
            if (getCharID == chatData.charProfiles[key].charID) {
              // Если используется псевдоним
              if (chatData.charProfiles[key].isAlias) {
                chatListData[i].chatName = chatData.charProfiles[key].aliasName;
                chatListData[i].chatAvatar = chatData.charProfiles[key].avatar;    
              }
              else {
                chatListData[i].chatName = chatData.charProfiles[key].name;
                chatListData[i].chatAvatar = chatData.charProfiles[key].avatar;                
              }
            }
          }
        }
      }
      return chatListData
    },
    openSelectedChat(selectedChatID, selectedChatName, selectedGroupChatName, selectedChatAvatar, selectedGroupChatAvatar, selectedChatIsGroup){
      this.$store.state.mChat.selectedChatID = selectedChatID // Для MessageList
      // Если групповой чат
      if (selectedChatIsGroup) { // Для MessageListToolbar
        this.$store.state.mChat.selectedChatName = selectedGroupChatName
        this.$store.state.mChat.selectedChatAvatar = selectedGroupChatAvatar
      }
      // Если не групповой чат
      else { // Для MessageListToolbar
        this.$store.state.mChat.selectedChatName = selectedChatName
        this.$store.state.mChat.selectedChatAvatar = selectedChatAvatar 
      }
      this.$store.state.mChat.selectedChatIsGroup = selectedChatIsGroup
      this.$store.commit('mChatListShow');
    },
    applySelectedTheme(select){
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

.chat-list__bar  {
  display: flex;
  flex-direction: column;
  justify-content: center;

  position: fixed;
  height: 6%;
  width: calc(100% - 6.24%);

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

// .chat-list__vlist--chat__avatar__badge {
//   width: 54px !important;
//   border: var(--chat-list__vlist--chat__avatar__badge--border) !important;
//   box-shadow: var(--chat-list__vlist--chat__avatar__badge--box-shadow) !important;
// }

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

.chat-list__vlist--chat__subtitle {
  font-size: 0.8em !important;
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
  font-size: 1.7em !important;
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


