<template>
	<div class="suggestions-row">
		<button 
			class="suggestions-element" 
			v-for="(suggestion, id) in suggestions" 
			:key="id"
			@click="$emit('sendSuggestion', suggestion)" 
		>
			{{ suggestion }}
		</button>
	</div>
</template>

<script>
export default {
	props: {
		suggestions: {
			type: Array,
			default: () => []
		},
	}
}
</script>

<style lang='scss' scoped>

.suggestions-row {
	text-align: center;
  background: transparent;
}

.suggestions-element {
	cursor: pointer;
  margin: 1%;
  padding: 1.4% 3%;
  border: var(--suggestions__element--border) !important;
	border-radius: calc(var(--mChatWidth) / 100 * 6);
	
  font-size: 0.850em;
  color: var(--suggestions__element--color) !important;
  background: var(--suggestions__element--background) !important;
}

</style>