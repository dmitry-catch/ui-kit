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
		<teleport :to="teleportTarget">
			<div class="Dropdown__content">
				<slot></slot>
			</div>
		</teleport>
	</div>
</template>

<script setup lang="ts">
import { ref, toRefs, watchEffect, computed, watch, onMounted } from 'vue'
import { useModalContext } from '../../utils/useModalContext'

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
