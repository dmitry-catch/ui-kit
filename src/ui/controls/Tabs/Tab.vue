<style>
.Tab {
	display: flex;
	gap: var(--design-gap-unit);
	background: var(--design-background-color-primary);
	color: var(--design-text-color-primary);
	border: none;
	border-bottom: 3px solid rgba(0, 0, 0, 0);
	box-sizing: border-box;
}
.Tab:hover {
	color: var(--design-text-color-primary);
}
.Tab:disabled {
	color: var(--design-text-color-secondary);
}
.Tab:focus-visible {
	outline: var(--design-focus-outline);
	color: var(--design-text-color-primary);
}

.Tab.pressed {
	border-bottom: var(--design-background-color-accent-primary) 3px solid;
}
</style>

<template>
	<button class="Tab_wrapper">
		<slot name="before"></slot>
		<slot></slot>
		<slot name="after"></slot>
	</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(null)
</script>
