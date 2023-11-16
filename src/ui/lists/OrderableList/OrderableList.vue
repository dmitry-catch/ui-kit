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
			@click="clickHandler"
		>
			<Icon class="OrderableListItem__dragDropHandle" name="drag-drop"></Icon>
			<span>
				<slot name="itemTemplate" :data="item"></slot>
			</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import Icon from '../../icons/Icon.vue'
import { ref, toRefs, watchEffect } from 'vue'
import { DragEvent, useDragging } from '../../../utils/useDragging'

const props = defineProps<{ modelValue: Array<any> }>()
const { modelValue } = toRefs(props)
const emit = defineEmits(['update:modelValue'])

const root = ref<HTMLElement>()
// Dragging
const internalItems = ref(modelValue.value)
watchEffect(() => (internalItems.value = modelValue.value))

const onDrag = ({ shadow, element, x, y }: DragEvent) => {
	internalItems.value = [...internalItems.value].sort((a, b) => {
		const indexA = internalItems.value.indexOf(a)
		const indexB = internalItems.value.indexOf(b)

		let elementA = Array.from(root.value!.querySelectorAll('.OrderableListItem'))[indexA]
		let elementB = Array.from(root.value!.querySelectorAll('.OrderableListItem'))[indexB]
		if (elementA == element) elementA = shadow
		if (elementB == element) elementB = shadow
		const rectA = elementA.getBoundingClientRect()
		const rectB = elementB.getBoundingClientRect()

		return rectA.y - rectB.y
	})
}
const stopDragging = () => {
	emit('update:modelValue', internalItems.value)
}

const { dragHandleMousedown, clickHandler } = useDragging({
	onDrag,
	onStopDragging: stopDragging,
	componentRoot: root
})
</script>
