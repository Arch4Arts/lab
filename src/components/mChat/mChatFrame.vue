<template>
  <vue-draggable-resizable 
    :minWidth="150"
    :w="width" 
    :h="height" 

    :x="getCurrentPosition()"
    :y="y"
    :z="3"
    
    :handles="['ml','mr']" 
    drag-cancel=".smartphone-screen"

    @dragging="onDrag" 
    @dragstop="savePosition"
    :draggable="!$vuetify.breakpoint.xsOnly"

    @resizing="onResize"
    @resizestop="saveSizes"
    :resizable="!$vuetify.breakpoint.xsOnly"

    v-show="$store.state.mChat.show"
    >
    <div>
      <!-- <p class="hidden-sm-and-down" style="position: absolute; left: -100px; bottom:300px">width: {{width}}</p>
      <p class="hidden-sm-and-down" style="position: absolute; left: -120px; bottom:280px">calcHeight: {{height - (height / 100 * 11.32)}}</p> -->
      <!-- текстура смартфона -->
      <smartphone-mockup class="smartphone" id="smartphone-mockup" :width="width" />
      <div class="smartphone-screen">
        <!-- Страница со списком чатов -->
        <ChatList
          v-if="$store.state.mChat.showChatList"
          class="chat-list"

          :width="calcWidth"
          :height="calcHeight"
          :calcHeightToolbar="calcChatList_ToolbarHeight"
          
          :chatList="chatList"
          :charProfiles="charProfiles"
          :userChatIDList="userChatIDList"
          :userChatTheme="userChatTheme"
        />
        <!-- Отображаемый чат -->
        <div v-if="!$store.state.mChat.showChatList" class="message-list">
          <!-- Шапка -->
          <MessageListToolbar :height="calcMessageList_ToolbarHeight" :chatData="chatData" />
          <!-- Область прокрутки с сообщениями -->
          <MessageList
            :chatData="chatData"
            :charProfiles="charProfiles"
            
            :width="calcWidth"
            :height="calcMessageList_Height"
            :ToolbarHeight="calcMessageList_ToolbarHeight"
          />
          <!-- Декоративная панель ввода -->
          <MessageListInput v-if="$store.state.mChat.showDecorativeInputPanel" :width="calcWidth" :height="calcMessageList_InputHeight" /> 
        </div>
      </div>
    </div>
  </vue-draggable-resizable>
</template>

<script>
import ChatList from './ChatList'

import MessageListToolbar from './MessageListToolbar.vue'
import MessageListInput from './MessageListInput.vue'
import MessageList from './MessageList.vue'

import smartphoneMockup from './assets/smartphoneMockup.vue'
import VueDraggableResizable from 'vue-draggable-resizable'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

import eventBus from '../../js/eventBus.js'

export default {
  data() {
    return {
      width: (this.$vuetify.breakpoint.xsOnly) ? window.innerWidth : this.$store.state.mChat.width,
      height: (this.$vuetify.breakpoint.xsOnly) ? window.innerHeight : this.$store.state.mChat.height,
      y: (this.$vuetify.breakpoint.xsOnly) ? 0 : this.$store.state.mChat.posY,
    }
  },
  props: {    
    chatData: {
      type: Object,
      default: function () {
        return {}
      }
    },
    chatList: {
      type: Array,
      required: true,
    },
    charProfiles: {
      type: Array,
      required: true
    },    
    userChatIDList: {
      type: Array,
      required: true
    },
    userChatTheme: {
      type: String
    },
  },
  computed: {
    calcWidth() {
      this.updateSize;
      // Если мобильное представление
      if (this.$vuetify.breakpoint.xsOnly) {
        this.width = window.innerWidth
        this.changeCSSVars(this.width);
        return this.width;
      }
      // Desktop
      else {
        this.changeCSSVars(this.width - (this.width / 100 * 6.24));
        return this.width - (this.width / 100 * 6.24);    
      }
    },
    calcHeight() {
      // Если мобильное представление
      this.updateSize;
      if (this.$vuetify.breakpoint.xsOnly) {
        this.height = window.innerHeight;
        this.changeCSSVars(undefined, this.height);
        return this.height
      }
      // Desktop
      else {
        this.changeCSSVars(undefined, this.height- (this.height / 100 * 11.32));
        return this.height- (this.height / 100 * 11.32)
      } 
    },
    calcChatList_ToolbarHeight() {
      // Если мобильное представление
      this.updateSize;
      if (this.$vuetify.breakpoint.xsOnly) {
        this.height = window.innerHeight;
        return this.height / 100 * 8
      }
      // Desktop
      else {
        return this.height / 100 * 6
      }
    },
    calcMessageList_ToolbarHeight() {
      // Если мобильное представление
      this.updateSize;
      if (this.$vuetify.breakpoint.xsOnly) {
        this.height = window.innerHeight;
        return this.height / 100 * 8
      }
      // Desktop
      else {
        return this.height / 100 * 6
      }
    },
    calcMessageList_Height() {
      //  Если мобильное представление
      this.updateSize;
      if (this.$vuetify.breakpoint.xsOnly && this.$store.state.mChat.showDecorativeInputPanel) {
        this.height = window.innerHeight;
        return this.height - (this.height / 100 * (8.5))
      }
      else if (this.$vuetify.breakpoint.xsOnly) {
        this.height = window.innerHeight;
        return this.height
      }
      // Desktop
      else if (this.$store.state.mChat.showDecorativeInputPanel) {
        return (this.height - (this.height / 100 * 11.32)) - (this.height / 100 * (8))
      }
      else {
        return this.height - (this.height / 100 * 11.32)
      }
    },
    calcMessageList_InputHeight() {
      // Если мобильное представление
      this.updateSize;
      if (this.$vuetify.breakpoint.xsOnly) {
        this.height = window.innerHeight;
        return this.height / 100 * 8.5
      }
      // Desktop
      else {
        return this.height / 100 * 8
      }
    },
  },
  methods: {
    changeCSSVars(width, height){
      let element = document.querySelector('html');
      if (width != undefined) {
        element.style.setProperty("--mChatWidth", `${width}px`);
        element.style.setProperty("--mChatFontSize", `${width / 18}px`);
      }
      if (height != undefined) {
        element.style.setProperty("--mChatHeight", `${height}px`);
      }
    },
    onDrag(x, y) {
      this.x = x
      this.y = y
    },
    savePosition(x, y){
      this.$store.state.mChat.posX = x
      this.$store.state.mChat.posY = y
      this.$store.commit('updateStore');
    },
    onResize(x, y, width, height) {
      this.x = x
      this.y = y
      this.width = width
      this.height = this.getSmartphoneSize().height
      this.changeCSSVars(width - (width / 100 * 6.24), this.height - (this.height / 100 * 11.32));
    },
    saveSizes(x, y, width, height) {
      // Обновляем положение боковых обработчиков (левого и правого), чтобы они одаптировались под новую высоту
      // Свойства w и h реактивны только после того, как компонент перестанет изменяться (после отработки onResize)
      let size = this.getSmartphoneSize();
      this.height = size.height

      this.$store.state.mChat.width = width
      this.$store.state.mChat.height = size.height
      this.$store.commit('updateStore');
    },
    getSmartphoneSize(){ // Получение размеров smartphoneMockup
      let element = document.getElementById('smartphone-mockup');
      let elementInfo = element.getBoundingClientRect();
      let device = {
        width: elementInfo.width,
        height: elementInfo.height
      }
      return device
    },
    getCurrentPosition(){ // Определение начальной позиции чата
      // Если мобильное представление, устанавливаем в начало координат (выравнивание по левому краю)
      if (this.$vuetify.breakpoint.xsOnly) return 0;
      // Если позиция не задана, присваиваем по ширине окна (выравнивание по правому краю)
      else { 
        if (this.$store.state.mChat.posX === undefined) 
          return window.innerWidth - this.width;
        else // Если задана, возвращаем значение
          return this.$store.state.mChat.posX;
      }
    },
  },
  components: {
    MessageListToolbar,
    MessageListInput,    
    ChatList,
    MessageList,

    'vue-draggable-resizable': VueDraggableResizable,
    smartphoneMockup,
  },
}
</script>

<style lang='scss'>

html {
  --mChatWidth: 340px;
  --mChatHeight: 740px;
  --mChatFontSize: 19px;
}

.vdr {
  border: none; // Убираем сетку с марширующими муравьями
  position: fixed; // Смартфон перемещается вместе с пользователем (при прокрутке)
}

.handle { // Активаторы изменения размера
  height: 90%;
  width: 3%;
  position: absolute;
  // Видимость активаторов
  background-color: transparent !important;
  border-width: 0px !important;
  // background-color: red !important;
}
.handle-ml { // Левый активатор
  top: 5%;
  left: 0;
}
.handle-mr { // Правый активатор
  top: 5%;
  right: 0;
}

.smartphone {
  transition: 0.3s ease-in-out;
}

.smartphone-screen {
  width: var(--mChatWidth);
  height: var(--mChatHeight);
  font-size: var(--mChatFontSize);
}

.chat-list {
  position: absolute;

  left: calc(var(--mChatWidth) / 100 * 3.24);
  right: calc(var(--mChatWidth) / 100 * 3.24);
  top: calc(var(--mChatWidth) / 100 * 13);
  // bottom: calc(var(--mChatWidth) / 100 * 5.72);

  // left: 3.12%;
  // right: 3.12%;
  // top: 5.6%;
  // bottom: 5.72%;

  border-radius: calc(var(--mChatWidth) / 100 * 6) !important;
  // Для border-radius
  mask-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYGBgAAgwAAAEAAGbA+oJAAAAAElFTkSuQmCC);
  -webkit-mask-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYGBgAAgwAAAEAAGbA+oJAAAAAElFTkSuQmCC);
  
  overflow-y: auto;
}

.message-list {
  position: absolute;

  left: calc(var(--mChatWidth) / 100 * 3.24);
  right: calc(var(--mChatWidth) / 100 * 3.24);
  top: calc(var(--mChatWidth) / 100 * 13);
  // bottom: calc(var(--mChatWidth) / 100 * 5.72);

  // left: 3.12%;
  // right: 3.12%;
  // top: 5.6%;
  // bottom: 5.72%;

  border-radius: calc(var(--mChatWidth) / 100 * 6) !important;
  // Для border-radius
  mask-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYGBgAAgwAAAEAAGbA+oJAAAAAElFTkSuQmCC);
  -webkit-mask-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYGBgAAgwAAAEAAGbA+oJAAAAAElFTkSuQmCC);

  // display: flex;
  // flex-direction: column;
  // justify-content: space-between;

  overflow-y: auto;
}

@import '~vuetify/src/styles/styles.sass';
@media #{map-get($display-breakpoints, 'xs-only')} {

  .smartphone {
    visibility: hidden;
  } 

  .chat-list {
    position: absolute;

    width: 100%;
    height: 100%;
    // max-height: 100%;

    top: 0px;
    left: 0px;

    border-radius: 0px !important;

    overflow-y: auto;
  }

  .message-list {
    position: absolute;

    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;

    border-radius: 0px !important;

    overflow-y: auto;
  }
  
}

</style>
