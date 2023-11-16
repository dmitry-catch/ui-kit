<style>
.DataGridHeaderRow {
	display: contents;
}
.DataGridHeaderRow__cell {
	position: sticky;
	top: 0;
	left: 0;
	width: 100%;
	height: min-content;
}
</style>

<template>
	<tr class="DataGridHeaderRow" ref="root">
		<td v-if="detailsColumn" class="DataGridHeaderRow__cell"></td>
		<td v-if="selectColumn" class="DataGridHeaderRow__cell"></td>
		<DataGridHeader
			class="DataGridHeaderRow__cell"
			v-for="column of columns"
			:column="column"
			:key="column.field"
			@pointerdown.prevent="dragHandleMousedown"
			@click="clickHandler"
		></DataGridHeader>
	</tr>
</template>

<script setup lang="ts">
import { DataGridColumn } from './DataGridColumn'
import DataGridHeader from './DataGridHeader.vue'
import { ref, toRefs, watch } from 'vue'
import { DragEvent, useDragging } from '../../../utils/useDragging'

const props = defineProps<{ columns: Array<DataGridColumn>; detailsColumn: boolean; selectColumn: boolean }>()
const emit = defineEmits(['update:columns'])

const { columns, detailsColumn } = toRefs(props)

const internalColumns = ref(columns.value)
watch(columns, () => (internalColumns.value = columns.value))
const root = ref<HTMLElement>()
const onDrag = ({ shadow, element, x, y }: DragEvent) => {
	internalColumns.value = [...internalColumns.value].sort((a, b) => {
		const indexA = internalColumns.value.indexOf(a)
		const indexB = internalColumns.value.indexOf(b)

		let elementA = Array.from(root.value!.querySelectorAll('.DataGridHeaderRow__cell'))[indexA]
		let elementB = Array.from(root.value!.querySelectorAll('.DataGridHeaderRow__cell'))[indexB]
		if (elementA == element) elementA = shadow
		if (elementB == element) elementB = shadow
		const rectA = elementA.getBoundingClientRect()
		const rectB = elementB.getBoundingClientRect()

		return rectA.x - rectB.x
	})
	emit('update:columns', internalColumns.value)
}
const stopDragging = () => {
	emit('update:columns', internalColumns.value)
}

const { dragHandleMousedown, clickHandler } = useDragging({
	onDrag,
	onStopDragging: stopDragging,
	componentRoot: root
})
</script>
