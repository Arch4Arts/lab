<template>
    <div class="suggestions-row">
        <button class="suggestions-element" v-for="(suggestion, idx) in suggestions" 
         v-on:click="$emit('sendSuggestion', suggestion)" 
         :key="idx">{{suggestion}}</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    props: {
        suggestions: {
            type: Array,
            default: () => []
        },
    }
}
</script>

<style>
.suggestions-row {
  text-align: center;
  background: transparent;
}

.suggestions-element {
  margin: 3px;
  padding: 5px 10px 5px 10px;
  border: var(--suggestions-element--border) !important;
  border-radius: 15px;
  font-size: 14px;
  color: var(--suggestions-element--color) !important;
  background: var(--suggestions-element--background) !important;
  cursor: pointer;
}
</style>