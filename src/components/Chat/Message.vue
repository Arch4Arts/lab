<template>
  <div class="chat">
    <div class="message-position" :class="{
        from_me: message.author === 'me',
        from_them: message.author !== 'me' && message.type !== 'system',
        system: message.type === 'system'  // Свой стиль
      }">
      <div v-if="message.type !== 'system' && message.type !== 'suggestion'" :title="authorName" class="avatar" :style="{
        backgroundImage: `url(${chatImageUrl})` // Аватарки
      }"></div>
      <TextMessage v-if="message.type === 'text'" :data="message.data" />
      <EmojiMessage v-else-if="message.type === 'emoji'" :data="message.data" />
      <TypingMessage v-else-if="message.type === 'typing'" />
      <SystemMessage v-else-if="message.type === 'system'" :data="message.data" />
      <ImageMessage v-else-if="message.type === 'image'"  :data="message.data" />
      <VideoMessage v-else-if="message.type === 'video'" :data="message.data" />
      <AudioMessage v-else-if="message.type === 'audio'" :data="message.data" />
    </div>
  </div>
</template>

<script>
import TextMessage from './messages/TextMessage'
import EmojiMessage from './messages/EmojiMessage.vue'
import TypingMessage from './messages/TypingMessage.vue'
import SystemMessage from './messages/SystemMessage.vue'
import ImageMessage from './messages/ImageMessage.vue'
import VideoMessage from './messages/VideoMessage.vue'
import AudioMessage from './messages/AudioMessage.vue'
import chatIcon from './assets/user-default-avatar.svg'

export default {
  data () {
    return {

    }
  },
  components: {
    TextMessage,
    EmojiMessage,
    TypingMessage,
    SystemMessage,
    ImageMessage,
    VideoMessage,
    AudioMessage,
  },
  props: {
    message: {
      type: Object,
      required: true
    },
    chatImageUrl: {
      type: String,
      default: chatIcon // Аватарка по умолчанию, если у пользователя она не назначенна.
    },
    authorName: {
      type: String
    },
    messageStyling: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    // sentColorsStyle() {
    //   return {
    //     color: this.colors.sentMessage.text,
    //     backgroundColor: this.colors.sentMessage.bg
    //   }
    // },
    // receivedColorsStyle() {
    //   return {
    //     color: this.colors.receivedMessage.text,
    //     backgroundColor: this.colors.receivedMessage.bg
    //   }
    // },
    // determineMessageColors() {
    //   return this.message.author === 'me' ? this.sentColorsStyle() : this.receivedColorsStyle()
    // }
  }
}
</script>
<style lang="scss">
.chat { // стиль окна чата
  width: 320px;
  margin-left: 8px;
  margin-right: 8px;
  padding-bottom: 10px; // интервал между сообщениями
  display: flex;
  flex-direction: column;
}

.message { // Глобальный стиль сообщения
  border-radius: 20px;
  padding: 8px 15px;
  margin-top: 2px;
  margin-bottom: 2px;
  display: inline-block;
}

.message-meta { // Глобальный стиль для мета-информации
  font-size: xx-small;
  margin-bottom: 0px;
  color: white;
  text-align: center;
}

.message-position { // Глобальный стиль позиционирования
  width: 100%;
  display: flex;
}

.message-position { 
	&.from_them { // Левая колонка - слева
		justify-content: flex-start;
		.message { // стиль сообщения
			margin-right: 25%;
      max-width: 200px;
			background-color: #eee;
			position: relative;
			&:before { // Хвостик
				content: "";
				position: absolute;
				z-index: 0;
				bottom: 0;
				left: -7px;
				height: 20px;
				width: 20px;
				background: rgb(233, 233, 233);
				border-bottom-right-radius: 15px;
			}
			&:after { // Хвостик
				content: ""; 
				position: absolute;
				z-index: 1;
				bottom: 0;
				left: -10px;
				width: 10px;
				height: 20px;
				background: white;
				border-bottom-right-radius: 10px;
			}
		}
	}
}

.message-position { 
	&.from_me { // Правая колонка - справа
		justify-content: flex-end;
		.message { // Стиль сообщения
			color: white;
			margin-left: 25%;
      max-width: 200px;
			background: linear-gradient(to bottom, #00D0EA 0%, #00D0EA 100%);
			background-attachment: fixed;
			position: relative;
			&:before { // Хвостик
				content: "";
				position: absolute;
				z-index: 0;
				bottom: 0;
				right: -8px;
				height: 20px;
				width: 20px;
				background: linear-gradient(to bottom, #00D0EA 0%, #00D0EA 100%);
				background-attachment: fixed;
				border-bottom-left-radius: 15px;
			}
			&:after { // Хвостик
				content: "";
				position: absolute;
				z-index: 1;
				bottom: 0;
				right: -10px;
				width: 10px;
				height: 20px;
				background: white;
				border-bottom-left-radius: 10px;
			}
		}
	}
}

.message-position.system { // Системное сообщение - по центру
  justify-content: center;
}

.image-message {
  border-radius: 20px;
  max-width: 200px;
  position: relative;
  cursor: pointer;
}

.avatar { // Стиль для аватарки
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
  min-width: 40px;
  min-height: 40px;
  border-radius: 50%;
  align-self: center;
  margin-right: 12px;
}

.tooltip { // Показывает имя при наведении на аватарку
  display: block !important;
  z-index: 10000;
  .tooltip-inner {
    background: black;
    color: white;
    border-radius: 16px;
    padding: 5px 10px 4px;
  }
  .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    border-color: black;
    z-index: 1;
  }
  &[x-placement^="top"] {
    margin-bottom: 5px;
    .tooltip-arrow {
      border-width: 5px 5px 0 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      bottom: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }
  &[x-placement^="bottom"] {
    margin-top: 5px;
    .tooltip-arrow {
      border-width: 0 5px 5px 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-top-color: transparent !important;
      top: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }
  &[x-placement^="right"] {
    margin-left: 5px;
    .tooltip-arrow {
      border-width: 5px 5px 5px 0;
      border-left-color: transparent !important;
      border-top-color: transparent !important;
      border-bottom-color: transparent !important;
      left: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }
  &[x-placement^="left"] {
    margin-right: 5px;
    .tooltip-arrow {
      border-width: 5px 0 5px 5px;
      border-top-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      right: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }
  &[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
    transition: opacity .15s, visibility .15s;
  }
  &[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
    transition: opacity .15s;
  }
  &.info {
    $color: rgba(#004499, .9);
    .tooltip-inner {
      background: $color;
      color: white;
      padding: 24px;
      border-radius: 5px;
      box-shadow: 0 5px 30px rgba(black, .1);
    }
    .tooltip-arrow {
      border-color: $color;
    }
  }
  &.popover {
    $color: #f9f9f9;
    .popover-inner {
      background: $color;
      color: black;
      padding: 24px;
      border-radius: 5px;
      box-shadow: 0 5px 30px rgba(black, .1);
    }
    .popover-arrow {
      border-color: $color;
    }
  }
}
</style>
