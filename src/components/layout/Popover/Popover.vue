<style scoped>
.root {
	display: none;
}

.content {
	position: fixed;
	top: v-bind(top);
	left: v-bind(left);
	z-index: var(--dropdown-z-index, 1000);
}
</style>

<template>
	<div ref="root" class="root">
		<teleport :to="teleportTarget">
			<div class="content">
				<slot></slot>
			</div>
		</teleport>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useModalContext } from '../../../utils/useModalContext.js'

const root = ref<HTMLElement>()
const left = ref('0')
const top = ref('0')

onMounted(() => {
	if (root.value) {
		const rect = root.value!.parentElement!.getBoundingClientRect()
		top.value = rect!.bottom + 5 + 'px'
		left.value = rect!.left + 'px'
	}
})

const { element: teleportTarget } = useModalContext()
</script>
