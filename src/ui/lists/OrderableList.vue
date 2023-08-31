<style>
.OrderableList {
	display: flex;
	flex-flow: column;
	gap: calc(1.5 * var(--design-gap-unit));
}
.OrderableListItem {
	display: flex;
	gap: calc(0.5 * var(--design-gap-unit));
	align-content: center;
}
.OrderableListItem__dragDropHandle {
	--icon-size: var(--design-current-line-height);
}
</style>

<template>
	<div class="OrderableList" ref="root">
		<div
			v-for="item of internalItems"
			:key="item.name"
			class="OrderableListItem"
			@pointerdown.prevent="dragHandleMousedown"
		>
			<Icon class="OrderableListItem__dragDropHandle" name="drag-drop"></Icon>
			<span>
				<slot name="itemTemplate" :data="item"></slot>
			</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import Icon from '../icons/Icon.vue'
import { computed, ref, toRefs, watchEffect } from 'vue'
import { MouseEvent } from 'happy-dom'

const props = defineProps<{ modelValue: Array<any> }>()
const { modelValue } = toRefs(props)
const emit = defineEmits(['update:modelValue'])

const root = ref<HTMLElement>()
// Dragging
const internalItems = ref(modelValue.value)
watchEffect(() => (internalItems.value = modelValue.value))
const dragged = ref<HTMLElement>()
const drag = (x: number, y: number) => {
	const rect = dragged.value?.getBoundingClientRect()
	const offset = {
		x: x - dragged.value!.offsetLeft,
		y: y - dragged.value!.offsetTop
	}

	dragged.value!.style.transform = `translate(${offset.x}px, ${offset.y}px)`

	internalItems.value = [...internalItems.value].sort((a, b) => {
		const indexA = internalItems.value.indexOf(a)
		const indexB = internalItems.value.indexOf(b)

		const rectA = Array.from(root.value!.querySelectorAll('.OrderableListItem'))[indexA].getBoundingClientRect()
		const rectB = Array.from(root.value!.querySelectorAll('.OrderableListItem'))[indexB].getBoundingClientRect()

		return rectA.y - rectB.y
	})
}
const dragEvent = (event: Event) => {
	const mouseEvent = event as unknown as MouseEvent
	drag(mouseEvent.clientX, mouseEvent.clientY)
}
const stopDragging = () => {
	dragged.value!.style.transform = ''
	document.removeEventListener('pointermove', dragEvent)
	emit('update:modelValue', internalItems.value)
}
const startDragging = (element: HTMLElement) => {
	dragged.value = element
	document.addEventListener('pointermove', dragEvent)
	document.addEventListener('pointerup', stopDragging)
}
const dragHandleMousedown = (event: MouseEvent) => {
	startDragging(event.currentTarget as unknown as HTMLElement)
}
</script>
