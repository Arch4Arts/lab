<template>
  <div class="chat-area">
    <!-- Стиливая сообщения -->
    <div class="messages-container" :class="{
        from_me: source.author === 'me',
        from_them: source.author !== 'me' && source.type !== 'system',
        system: source.type === 'system'  // Свой стиль
      }">
      <!-- Аватар отправителя -->
      <div 
        v-if="source.type !== 'system' && source.type !== 'suggestion' && $store.state.mChat.mChat_ShowAvatars" 
        :title="authorName(source.author)" class="avatar" 
        :style="{ backgroundImage: `url(${chatImageUrl(source.author)})` }">
      </div>
      <!-- Различные типы сообщений -->
      <TextMessage v-if="source.type === 'text'" :data="source.data" />
      <EmojiMessage v-else-if="source.type === 'emoji'" :data="source.data" />
      <TypingMessage v-else-if="source.type === 'typing'" />
      <SystemMessage v-else-if="source.type === 'system'" :data="source.data" />
      <ImageMessage v-else-if="source.type === 'image'"  :data="source.data" />
      <VideoMessage v-else-if="source.type === 'video'" :data="source.data" />
      <AudioMessage v-else-if="source.type === 'audio'" :data="source.data" />
    </div>
  </div>
</template>

<script>
import TextMessage from './message type/TextMessage'
import EmojiMessage from './message type/EmojiMessage.vue'
import TypingMessage from './message type/TypingMessage.vue'
import SystemMessage from './message type/SystemMessage.vue'
import ImageMessage from './message type/ImageMessage.vue'
import VideoMessage from './message type/VideoMessage.vue'
import AudioMessage from './message type/AudioMessage.vue'
import defaultAvatar from './assets/user-default-avatar.svg'
import Suggestions from './Suggestions'


export default {
  components: {
    TextMessage,
    EmojiMessage,
    TypingMessage,
    SystemMessage,
    ImageMessage,
    VideoMessage,
    AudioMessage,
    Suggestions,
  },
  props: {
    source: { 
      type: Object,
      required: true,
    },
  },
  methods: {
    profile(author) {
      const profile = this.$store.state.mChatData.find(profile => profile.mChatData_ContactID === author)

      // A profile may not be found for system messages or messages by 'me'
      return profile || {mChatData_AvatarImg: '', mChatData_ContactName: ''}
    },
    chatImageUrl(author) {
      return this.profile(author).mChatData_AvatarImg
    },
    authorName(author) {
      return this.profile(author).mChatData_ContactName
    }
  }
}
</script>

<style lang="scss">

@function em($value) {
	@return ($value / 16) * 1em;
}
  
@mixin bubble($radius: 8, $bg_msg_color: dodgerblue, $proportional: false) {
	$tail: $radius * 1.5;
	$half: $radius * 0.5;
	$double: $radius * 2;
  
	display: inline-block;
	// margin: em($half);
	margin-top: 3px;
	margin-bottom: 3px; 
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

	text-align: center;
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
  width: 320px;
  margin-left: 9px;
  margin-right: 8px;
  padding-bottom: 10px; // интервал между сообщениями
  display: flex;
  flex-direction: column;
}

.text-msg-container { // Для позиционирования хвостика
	// width: 100%;
	display: flex;
	position: relative;
}

.messages-container { // Общий контейнер для всех сообщений
	// width: 100%;
	display: flex;
	position: relative;
}

.text-message-meta { // Глобальный стиль для мета-информации
  font-size: xx-small;
  margin-bottom: 0px !important;
  color: white;
  text-align: center;
}

.message-meta {
  font-size: xx-small;
  margin-bottom: 0px !important;
  color: white;
  text-align: center;  
}

.messages-container.system { // Системное сообщение - по центру
  justify-content: center;
}

.messages-container { 
	&.from_me { // Гробальный стиль для всех сообщений в правой колонке
		justify-content: flex-end;
		// margin-left: 25%;
		// max-width: 200px;
		.text-message { // Локальный стиль сообщения
      @include bubble(20, var(--from_me_msg_bg));
      color: var(--from_me_msg_font) !important;
      max-width: 220px;
		}
		.tail { // Стиль хвостика сообщения
			@include tail(20, right, var(--from_me_tail_color))
		}		
	}	
}

.messages-container { 
	&.from_them { // Гробальный стиль для всех сообщений в левой колонке
		justify-content: flex-start;
		// margin-right: 25%;
		// max-width: 200px;
		.text-message { // Локальный стиль сообщения
      @include bubble(20, var(--from_them_msg_bg));
      color: var(--from_them_msg_font) !important;
      max-width: 220px;
		}
		.tail { // Стиль хвостика сообщения
			@include tail(20, left, var(--from_them_tail_color))
    }
	}
}

.image-message {
  border-radius: 20px;
  max-width: 200px;
  position: relative;
  cursor: pointer;
}

.message-system {
  background: var(--message-system--background) !important;
  color: var(--message-system--color) !important;
  padding: 8px 20px;
  border-radius: 12px;
  font-weight: 300;
  font-size: 12px;
  line-height: 1.2;
  white-space: pre-wrap;
  -webkit-font-smoothing: subpixel-antialiased;
  font-style: italic;
  opacity: .70;
}

.message-meta {
  color: var(--message-meta--color) !important;
  font-size: xx-small;
  margin-bottom: 0px;
  margin-top: 5px;
  opacity: .6;
  text-align: center;
  .message-system-meta {
    color: var(--message-system-meta--color) !important;
  }
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

@media (max-width: 450px) {

  .chat-area { // стиль окна чата
    width: 94%;
    margin-left: 8px;
    margin-right: 8px;
    padding-bottom: 10px; // интервал между сообщениями
    display: flex;
    flex-direction: column;
  }
}
</style>
