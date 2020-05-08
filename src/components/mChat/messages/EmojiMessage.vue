<template>
<div>
  <div class="message-title" style="margin-bottom: 6%" v-if="$store.state.mChat.selectedChatIsGroup">{{ author }}</div>
  <img class="emoji-message" :src="data.src" />  
</div>

</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    author: [String],
  }
}
</script>
