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
import { ref, toRefs, watchEffect } from 'vue'

const props = defineProps<{ open: boolean }>()
const { open } = toRefs(props)

const root = ref<HTMLElement>()
const top = ref(0)
const left = ref(0)

watchEffect(() => {
	if (open.value) {
		top.value = root.value?.clientTop + root.value?.clientHeight + 5
		left.value = root.value?.clientLeft + 0
	}
})
</script>
