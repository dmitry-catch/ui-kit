<style>
.Dropdown {
	position: fixed;
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
import { onMounted, ref, toRefs, watchEffect } from 'vue'

const props = defineProps<{ open: boolean }>()
const { open } = toRefs(props)

const root = ref<HTMLElement>()
const top = ref('0')
const left = ref('0')

watchEffect(() => {
	if (open.value) {
		const rect = root.value?.parentElement?.getBoundingClientRect()
		if (rect == null) return
		top.value = `${rect?.bottom + 5}px`
		left.value = `${rect?.left + 0}px`
	}
})
</script>
