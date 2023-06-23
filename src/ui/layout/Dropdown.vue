<style>
.Dropdown {
	position: fixed;
	background: var(--design-background-color-primary);
	border: 1px solid var(--design-border-color-primary);
	border-radius: var(--design-border-radius-control);
	top: v-bind(top);
	left: v-bind(left);
}
</style>

<template>
	<div v-if="open" class="Dropdown" ref="root">
		<slot></slot>
	</div>
</template>

<script setup lang="ts">
import { ref, toRefs, watchEffect, computed } from 'vue'

const props = defineProps<{ open: boolean }>()
const { open } = toRefs(props)

const root = ref<HTMLElement>()
const left = ref('0')
const upper = ref(0)
const menuHeight = ref(0)

const top = computed(() => {
	const screenHeight = window.innerHeight
	const topBound = upper.value
	const bottomBound = topBound + menuHeight.value
	if (bottomBound > screenHeight) {
		const newTop = screenHeight - menuHeight.value
		return `${newTop}px`
	}
	return `${topBound}px`
})

watchEffect(() => {
	if (open.value) {
		const rect = root.value?.parentElement?.getBoundingClientRect()
		left.value = rect?.left + 0 + 'px'
		upper.value = rect?.bottom
		menuHeight.value = root.value?.scrollHeight + 5
	}
})
</script>
