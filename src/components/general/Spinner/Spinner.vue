<script setup lang="ts">
import { toRefs } from 'vue'

interface SpinnerProps {
	variant?: string
}

const props = withDefaults(defineProps<SpinnerProps>(), {
	variant: 'light'
})

const { variant } = toRefs(props)
</script>

<template>
	<div class="Spinner" :variant="variant"></div>
</template>

<style>
.Spinner {
	width: fit-content;
	min-height: var(--design-current-font-size);
	min-width: var(--design-current-font-size);
	border-radius: 50%;
	border: 2px solid var(--design-border-color-accent-primary);
	border-top-color: var(--design-background-color-primary);
	animation: spin 1.2s ease-in-out infinite;
}
.Spinner[variant='dark'] {
	border: 2px solid var(--design-text-color-on-accent-tertiary);
	border-top-color: var(--design-border-color-accent-primary);
}

@keyframes spin {
	to {
		transform: rotate(360deg);
	}
}
</style>
