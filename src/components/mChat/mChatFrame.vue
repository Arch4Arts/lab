<template>
  <vue-draggable-resizable 
    :minWidth="150"
    :w="width" 
    :h="height" 

    :x="x"
    :y="y"
    :z="3"
    :key="reRenderSizeScreen"
    
    :handles="['ml','mr']" 
    drag-cancel=".smartphone-screen"

    @dragging="onDrag" 
    @dragstop="savePosition"
    @resizing="onResize"
    @resizestop="saveSizes"
    v-show="$store.state.mChat.show">
    <div>
      <!-- текстура смартфона -->
      <div class="smartphone">
        <p style="position: absolute; left: -100px; bottom:300px">width: {{width}}</p>
        <p style="position: absolute; left: -120px; bottom:280px">calcHeight: {{calcHeight}}</p>
        <device-layout class="test" id="svgDevice" :width="width" />
        <div class="smartphone-screen">
          <!-- Страница со списком чатов -->
          <ChatList
            class="chat-list" 
            :width="width"
            :height="height"
            v-if="$store.state.mChat.chatListShow"

            :chatList="chatList"
            :mChatData="mChatData"
          />
          <!-- Конкретный чат -->
          <div v-if="!$store.state.mChat.chatListShow" class="chat-window">
            <!-- Шапка -->
            <MessageListToolbar :width="width" />
            <!-- Область прокрутки с сообщениями -->
            <MessageList
              :messages="getMessageList"
              :mChatData="mChatData"
            />
            <!-- Декоративная панель ввода -->
            <MessageListInput v-if="$store.state.mChat.showDecorativeInputPanel" /> 
          </div>
        </div>
      </div> 
    </div>
  </vue-draggable-resizable>
</template>

<script>
import MessageListToolbar from './MessageListToolbar.vue'
import MessageListInput from './MessageListInput.vue'
import MessageList from './MessageList.vue'

import ChatList from './ChatList'

import VueDraggableResizable from 'vue-draggable-resizable'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

import deviceLayout from './deviceLayout.vue'

export default {
  data() {
    return {
      width: this.$store.state.mChat.width,
      height: this.$store.state.mChat.height,
      calcHeight: 0,
      x: this.$store.state.mChat.posX,
      y: this.$store.state.mChat.posY,
      reRenderSizeScreen: 0
    }
  },
  props: {    
    mChatData: {
      type: Object,
      required: true,
    },    
    chatList: {
      type: Array,
      required: true
    },
  },
  computed: {
    getMessageList() {
      this.$store.state.mChat.chatListShow // обновляет список сообщений при каждом открытии и закрытии списка пользователей
      
      var chatData = this.mChatData;
      var selectedChat = this.$store.state.mChat.selectedChatID
      for (let i in chatData.chatList) { // Перебираем для каждого пользователя
        if (chatData.chatList[i].chatID === selectedChat) {
          // Сбрасывает счётчик сообщений текущего выбранного чата, только если чат отображается
          if (this.$store.state.mChat.show) chatData.chatList[i].unreadMessageCount = 0 // Сбрасываем индивидуальный счётчик непрочитанных сообщений контакта
          return chatData.chatList[i].messagesHistory
        }
      }
    },
  },
  methods: {
    closeChat() {
      this.$store.commit('mChatShow');
    },
    onDrag(x, y) {
      this.x = x
      this.y = y
    },
    savePosition(x, y){
      this.$store.state.mChat.posX = x
      this.$store.state.mChat.posY = y
      this.$store.commit('updateStores');
    },
    onResize(x, y, width, height) {
      this.x = x
      this.y = y
      this.width = width
      this.height = this.getDeviceSize().height
      let test = document.querySelector('html');
      test.style.setProperty("--mChatWidth", `${width - (width / 100 * 6.24)}px`);
      this.calcHeight = this.height - (this.height / 100 * 11.32)
      test.style.setProperty("--mChatHeigth", `${this.height - (this.height / 100 * 11.32)}px`);
      test.style.setProperty("--mChatFontSize", `${width / 18}px`);
    },
    saveSizes(x, y, width, height) {
      // Обновляем положение боковых обработчиков (левого и правого), чтобы они одаптировались под новую высоту
      // Свойства w и h реактивны только после того, как компонент перестанет изменяться (после отработки onResize)
      let size = this.getDeviceSize();
      this.height = size.height

      this.$store.state.mChat.width = width
      console.log(height)
      this.$store.state.mChat.height = size.height
      this.$store.commit('updateStores');
      this.reRenderSizeScreen += 1;
    },
    getDeviceSize(){
      let element = document.getElementById('svgDevice');
      let elementInfo = element.getBoundingClientRect();
      let device = {
        width: elementInfo.width,
        height: elementInfo.height
      }
      return device
    },
  },
  components: {
    MessageListToolbar,
    MessageListInput,    
    ChatList,
    MessageList,

    'vue-draggable-resizable': VueDraggableResizable,
    deviceLayout,
  },
}
</script>

<style lang='scss'>

html {
  --mChatWidth: 340px;
  --mChatHeigth: 740px;
  --mChatFontSize: 19px;
}

.vdr {
  // border: none;
  position: fixed;
}

.handle {
  height: 70%;
  width: 3%;
  position: absolute;
  background-color: transparent !important;
  border-width: 0px !important;
  // background-color: red !important;
}
.handle-ml {
  top: 0;
  left: 0;
}
.handle-mr {
  top: 0;
  right: 0;
}

.smartphone {
  transition: 0.3s ease-in-out;
  // width: 370px;
  // position: fixed;
  // right: 25px;
  // bottom: 0px;
  // box-sizing: border-box;

  // border-radius: 20px;
  // overflow: hidden;
}

.smartphone-screen {
  width: var(--mChatWidth) !important;
  height: var(--mChatHeigth) !important;
  font-size: var(--mChatFontSize) !important;
}

.smartphone.close-area {
  cursor: pointer;
}

.smartphone.closed {
  opacity: 0;
  visibility: hidden;
  // bottom: 90px;
}

.chat-list {
  // width: 340px;
  // height: calc(100% - 120px);
  // max-height: 598px;
  position: absolute;
  // right: 39px;
  // bottom: 70px;
  left: 3.12%;
  right: 3.12%;
  top: 5.6%;
  bottom: 5.72%;
  // margin: 15% 2% 10% 2%;
  // box-sizing: border-box;
  // border-radius: 20px !important;
  border-radius: calc(var(--mChatWidth) / 100 * 6) !important;
  overflow-y: auto;
}

.chat-window {
  // width: 340px;
  // height: calc(100% - 120px);
  // max-height: 598px;
  position: absolute;
  // right: 39px;
  // bottom: 70px;
  left: 3.12%;
  right: 3.12%;
  top: 5.6%;
  bottom: 5.72%;
  // box-sizing: border-box;
  // border-radius: 20px !important;
  border-radius: calc(var(--mChatWidth) / 100 * 6) !important;
  // Для border-radius НЕ УДАЛЯТЬ
  -webkit-mask-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYGBgAAgwAAAEAAGbA+oJAAAAAElFTkSuQmCC);
  /* box-shadow: 0px 7px 40px 2px rgba(148, 149, 150, 0.1); */
  /* background: white; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // transition: 0.3s ease-in-out;
  /* border-radius: 20px; */
  font-family: 'Helvetica Neue', sans-serif;
  font-size: 11pt;

  overflow-y: auto;
}

.chat-window.closed {
  opacity: 0;
  visibility: hidden;
  // bottom: 90px;
}
@import '~vuetify/src/styles/styles.sass';

@media #{map-get($display-breakpoints, 'xs-only')} {
    .test {
    visibility: hidden;
  } 
}

@media (max-width: 450px) {


  .chat-list {
    width: 100%;
    height: 100%;
    max-height: 100%;
    right: 0px;
    bottom: 0px;
  }

  .chat-window {
    width: 100%;
    height: 100%;
    max-height: 100%;
    right: 0px;
    bottom: 0px;
    border-radius: 0px;
  }

  .chat-window {
    transition: 0.1s ease-in-out;
  }
  
  .chat-window.closed {
    bottom: 0px;
  }
}
</style>
