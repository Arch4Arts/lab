<template>
  <div class="chat-area">
    <!-- Стиливая сообщения -->
    <div class="messages-container" :class="{        
        from_me: source.author === 'me',
        from_them: source.author !== 'me' && source.type !== 'system' && source.type !== 'suggestion',
        suggestions: source.type === 'suggestion',
        system: source.type === 'system',
      }">
      <!-- Аватар отправителя -->
      <!-- Если не системное msg, не предложение, включено отображение аватаров и это групповой чат -->
      <div 
        v-if="source.type !== 'system' && source.type !== 'suggestion' && $store.state.mChat.showAvatars && $store.state.mChat.selectedChatIsGroup" 
        :title="authorName(source.author)" class="avatar"
        :style="{ backgroundImage: `url(${chatImageUrl(source.author)})` }">
      </div>
      <!-- Различные типы сообщений -->
      <TextMessage v-if="source.type === 'text'" :data="source.data" :author="authorName(source.author)" />
      <EmojiMessage v-else-if="source.type === 'emoji'" :data="source.data" :author="authorName(source.author)" />
      <TypingMessage v-else-if="source.type === 'typing'" :author="authorName(source.author)" />
      <SystemMessage v-else-if="source.type === 'system'" :data="source.data" />
      <ImageMessage v-else-if="source.type === 'image'"  :data="source.data" :author="authorName(source.author)" />
      <VideoMessage v-else-if="source.type === 'video'" :data="source.data" :author="authorName(source.author)" />
      <AudioMessage v-else-if="source.type === 'audio'" :data="source.data" :author="authorName(source.author)" />
      <!-- Варианты ответов -->
      <Suggestions v-if="source.type === 'suggestion'" 
        :suggestions="getSuggestions()" 
        @sendSuggestion="_submitSuggestion"
      />
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

import Suggestions from './messages/Suggestions'

import eventBus from '../../js/eventBus'

export default {
  components: {
    TextMessage,
    EmojiMessage,
    TypingMessage,
    SystemMessage,
    ImageMessage,
    VideoMessage,
    AudioMessage,
    Suggestions
  },
  props: {
    source: { 
      type: Object,
      required: true,
    },
    mChatData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    submitSuggestion(suggestion){ 
      var chatData = this.mChatData; // присваиваем ссылку, чтобы изменять оригинал
      var selectedChatID = this.$store.state.mChat.selectedChatID // В какой чат отправлять
      for (let chat of chatData.chatList) { // Перебираем для каждого пользователя
        if (chat.chatID === selectedChatID) {
          // если отправляемый suggestion автономен(т.е с type = suggestion), то нужно удалить его запись из истории, и добавить уже в виде ответа от From_me
          if (chat.messagesHistory[chat.messagesHistory.length - 1].type === 'suggestion') 
            chat.messagesHistory.splice([chat.messagesHistory.length - 1], 1)
          // В противном случае просто отправить ответ от From_me, т.к suggestion был привязан к From_them
          chat.messagesHistory = [...chat.messagesHistory, suggestion]
          this.$store.commit('updateStore');
          eventBus.emit('mChatMessageWasSent')
        }
      }
    },
    _submitSuggestion(suggestion) {
      let uniqid = require('uniqid');
      this.submitSuggestion({uid: uniqid(), type: 'text', author: 'me', data: { text: suggestion }})
    },
    getSuggestions(){
      return this.source.data.suggestions
    },
    profile(author) {
      const profile = this.mChatData.charProfiles.find(profile => profile.charID === author)
      // A profile may not be found for system messages or messages by 'me'
      return profile || {avatar: '', contactName: ''}
    },
    chatImageUrl(author) {
      return this.profile(author).avatar
    },
    authorName(author) {
      if (this.profile(author).isAlias) {
        return this.profile(author).aliasName
      }
      return this.profile(author).name
    }
  }
}
</script>

<style lang='scss'>

@function em($value) {
	@return ($value / 16) * 1em;
}
    
@mixin bubble($radius: 8, $bg_msg_color: dodgerblue, $proportional: false) {
	$tail: $radius * 1.5;
	$half: $radius * 0.5;
	$double: $radius * 2;
    
	display: inline-block;
	// margin: em($half);
	// margin-top: 3px;
	// margin-bottom: 3px; 
	min-height: em($double);
	// @include padding($half $tail, em);
	// padding: em($half) em($tail);
  padding: 8px 15px;
	position: relative;
	border-radius: em($radius);
	line-height: 1.5;
	color: white;
	background-color: $bg_msg_color;
	background: $bg_msg_color;

	// text-align: center;
	z-index: 3;
    
	@if $proportional == true {
	  p {
  font-size: em($radius);
	  }
	}
}

@mixin tail($radius: 8, $side: right, $tail_color: dodgerblue) {
	$tail: $radius * 1.5;
	$half: $radius * 0.5;
	$double: $radius * 2;

	content: '';
	display: block;
	width: em($tail);
	height: em($radius);
	// @include absolute(x ($radius - $tail) 0 x, em);
	position: absolute;

	@if $side == 'right' {
  right: em($radius - $tail);
	} @else if $side == 'left' {
  left: em($radius - $tail);
	}

	bottom: 0;

	@if $side == 'right' {
  border-left: em($radius) solid $tail_color;
	} @else if $side == 'left' {
  border-right: em($radius) solid $tail_color;
	}

	@if $side == 'right' {
  border-bottom-left-radius: 100%;
	} @else if $side == 'left' {
  border-bottom-right-radius: 100%;
	}

	z-index: 1;
}

.chat-area { // стиль окна чата
  display: flex;
  flex-direction: column;
  padding-bottom: 3.140%; // интервал между сообщениями
}

.messages-container { // Общий контейнер для всех сообщений
	display: flex;
  position: relative;
  &.system { // Системное сообщение - по центру
    justify-content: center;
  }
  &.suggestions{ // Предложения по центру - по центру
    flex-direction: column;
    justify-content: center;
  }
}

.messages-container { 
	&.from_them { // Гробальный стиль для всех сообщений в левой колонке
    justify-content: flex-start;
    .message-title {
      color: var(--message-system--color) !important;
      opacity: .6;
      font-size: 0.8em;
      margin-left: calc(var(--mChatWidth) / 100 * 6);
    }
    .bubble-container {
      position: relative;
      margin-left: 2%;
      .message-title {
        margin-left: calc(var(--mChatWidth) / 100 * 4);
      }
      .text-message { // Локальный стиль сообщения
        @include bubble(20, var(--text-message__from_them--background));
        color: var(--text-message__from_them--color) !important;
        font-size: 0.850em;
        max-width: calc(var(--mChatWidth) / 100 * 70);
        p {
          margin-bottom: 0px !important;
        }
        &__emoji {
          height: calc(var(--mChatWidth) / 100 * 6);
          vertical-align: -.2em;
          padding: 0 .05em 0 .1em;
        }
      }
      .tail { // Стиль хвостика сообщения
        @include tail(20, left, var(--text-message__from_them__tail--color))
      }
    }
    .image-message {
      margin-left: calc(var(--mChatFontSize) / 100 * 30);
    }
    .audio-message {
      margin-left: calc(var(--mChatFontSize) / 100 * 16);
    }
    .video-message {
      margin-left: calc(var(--mChatFontSize) / 100 * 16);
    }
    .emoji-message {
      margin-left: calc(var(--mChatFontSize) / 100 * 30);
    }
  }
	&.from_me { // Гробальный стиль для всех сообщений в правой колонке
    justify-content: flex-end;
    .bubble-container {
      position: relative;
      margin-right: 2%;
      .text-message { // Локальный стиль сообщения
        @include bubble(20, var(--text-message__from_me--background));
        color: var(--text-message__from_me--color) !important;
        font-size: 0.850em;
        max-width: calc(var(--mChatWidth) / 100 * 70);
        p {
          margin-bottom: 0px !important;
        }
        &__emoji {
          height: calc(var(--mChatWidth) / 100 * 6);
          vertical-align: -.2em;
          padding: 0 .05em 0 .1em;
        }
      }
      .tail { // Стиль хвостика сообщения
        @include tail(20, right, var(--text-message__from_me__tail--color))
      }		      
    }
    .image-message {
      margin-right: calc(var(--mChatFontSize) / 100 * 30);
    }
    .audio-message {
      margin-right: calc(var(--mChatFontSize) / 100 * 16);
    }
    .video-message {
      margin-right: calc(var(--mChatFontSize) / 100 * 16);
    }
    .emoji-message {
      margin-right: calc(var(--mChatFontSize) / 100 * 30);
    }
	}	
}

.message-system {
  color: var(--message-system--color) !important;
  background: var(--message-system--background) !important;
    
  padding: 2.8% 6%;
  border-radius: 12px;

  font-size: 0.7em;  
  font-weight: 300;
  font-style: italic;
  line-height: 1.1em;
  white-space: pre-wrap;
  -webkit-font-smoothing: subpixel-antialiased;

  opacity: .7;
}

.image-message {
  cursor: pointer;
  width: calc(var(--mChatWidth) / 100 * 60);  
  border-radius: calc(var(--mChatWidth) / 100 * 6);
}

.audio-message {
  max-width: 92%;
}

.emoji-message {
  height: 2.5em;
}

.message-meta {
  color: var(--message-meta--color);
  opacity: .6;
  font-size: 0.8em;
  text-align: center;

  margin-bottom: 0px !important;
  margin-top: 2.5%;
  &.system {
    color: var(--message-meta__system--color) !important;
  }
  &.text {
    color: var(--text-message__from_me--color) !important;
    font-size: 0.6em;
  }
  &.image {
    font-size: 0.6em;
    margin-top: 0px !important;
  }
}

.avatar { // Стиль для аватарки
  min-width: 2.2em;
  min-height: 2.2em;
  border-radius: 50%;

  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
    
  align-self: flex-end; // помещает аватар в самых низ конйтера сообщения (к хвостику)
  margin-right: 0.150em;
}

</style>
