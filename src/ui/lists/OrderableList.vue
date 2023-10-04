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
			@click="cancelDragging = true"
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
import { ref, toRefs, watchEffect } from 'vue'

const props = defineProps<{ modelValue: Array<any> }>()
const { modelValue } = toRefs(props)
const emit = defineEmits(['update:modelValue'])

const root = ref<HTMLElement>()
// Dragging
const internalItems = ref(modelValue.value)
watchEffect(() => (internalItems.value = modelValue.value))
const dragged = ref<HTMLElement>()
const shadow = ref<HTMLElement>()
const drag = (x: number, y: number) => {
	const rect = dragged.value!.getBoundingClientRect()
	const offset = {
		x: x - shadow.value!.offsetLeft,
		y: y - shadow.value!.offsetTop
	}

	shadow.value!.style.transform = `translate(${offset.x}px, ${offset.y}px)`

	internalItems.value = [...internalItems.value].sort((a, b) => {
		const indexA = internalItems.value.indexOf(a)
		const indexB = internalItems.value.indexOf(b)

		let elementA = Array.from(root.value!.querySelectorAll('.OrderableListItem'))[indexA]
		let elementB = Array.from(root.value!.querySelectorAll('.OrderableListItem'))[indexB]
		if (elementA == dragged.value) elementA = shadow.value!
		if (elementB == dragged.value) elementB = shadow.value!
		const rectA = elementA.getBoundingClientRect()
		const rectB = elementB.getBoundingClientRect()

		return rectA.y - rectB.y
	})
}
const dragEvent = (event: PointerEvent) => {
	drag(event.clientX, event.clientY)
}
const stopDragging = () => {
	dragged.value!.style.visibility = 'initial'
	shadow.value?.remove()
	document.removeEventListener('pointermove', dragEvent)
	emit('update:modelValue', internalItems.value)
}
const startDragging = (element: HTMLElement) => {
	dragged.value = element
	shadow.value = element.cloneNode(true) as HTMLElement
	const draggedRect = element.getBoundingClientRect()
	dragged.value!.style.visibility = 'hidden'
	shadow.value!.style.position = 'fixed'
	shadow.value!.style.top = draggedRect.top + 'px'
	shadow.value!.style.left = draggedRect.left + 'px'
	shadow.value!.style.right = draggedRect.right + 'px'
	shadow.value!.style.bottom = draggedRect.bottom + 'px'
	root.value!.append(shadow.value)

	document.addEventListener('pointermove', dragEvent)
	document.addEventListener('pointerup', stopDragging)
}
const cancelDragging = ref<boolean>(true)
watchEffect(() => {
	console.log('cancelDragging', cancelDragging.value)
})
const tryDragging = async (target: HTMLElement) => {
	cancelDragging.value = false
	await new Promise((resolve) => setTimeout(resolve, 100))
	if (cancelDragging.value) {
		return
	}

	startDragging(target)
}
const dragHandleMousedown = (event: PointerEvent) => {
	tryDragging(event.currentTarget as unknown as HTMLElement)
}
</script>
