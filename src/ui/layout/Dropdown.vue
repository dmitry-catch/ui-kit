<style>
.Dropdown {
	display: none;
}
.Dropdown__content {
	position: fixed;
	top: v-bind(top);
	left: v-bind(left);
	z-index: var(--dropdown-z-index, 1000);
}
</style>

<template>
	<div class="Dropdown" ref="root">
		<teleport to="body">
			<div class="Dropdown__content">
				<slot></slot>
			</div>
		</teleport>
	</div>
</template>

<script setup lang="ts">
import { ref, toRefs, watchEffect, computed, watch, onMounted } from 'vue'

const root = ref<HTMLElement>()
const left = ref('0')
const top = ref('0')
const menuHeight = ref(0)

// const top = computed(() => {
// 	const screenHeight = window.innerHeight
// 	const topBound = baseTop.value
// 	const bottomBound = topBound + menuHeight.value
// 	if (bottomBound > screenHeight) {
// 		const newTop = screenHeight - menuHeight.value
// 		return `${newTop}px`
// 	}
// 	return `${topBound}px`
// })
let recalculateStyle = null
onMounted(() => {
	if (root.value) {
		const rect = root.value!.parentElement!.getBoundingClientRect()
		top.value = rect!.bottom + 5 + 'px'
		left.value = rect!.left + 'px'
	}
})
</script>
