<script setup lang="ts">
import { DataGridColumn } from '../types.js'
import DataGridHeader from './DataGridHeader.vue'
import { ref, toRefs, watch } from 'vue'
import { DragEvent, useDragging } from '../../../../utils/useDragging.js'

interface DataGridHeaderRowProps {
	columns: Array<DataGridColumn>
	detailsColumn?: boolean
	selectColumn?: boolean
}

const props = defineProps<DataGridHeaderRowProps>()
const emit = defineEmits(['update:columns'])

const { columns, detailsColumn } = toRefs(props)

const internalColumns = ref(columns.value)
watch(columns, () => (internalColumns.value = columns.value))
const root = ref<HTMLElement>()
const onDrag = ({ shadow, element }: DragEvent) => {
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

<template>
	<tr ref="root" class="DataGridHeaderRow">
		<td v-if="detailsColumn" class="DataGridHeaderRow__cell"></td>
		<td v-if="selectColumn" class="DataGridHeaderRow__cell"></td>
		<DataGridHeader
			v-for="column of columns"
			:key="column.field"
			class="DataGridHeaderRow__cell"
			:column="column"
			@pointerdown.prevent="dragHandleMousedown"
			@click="clickHandler"
		></DataGridHeader>
	</tr>
</template>

<style>
.DataGridHeaderRow {
	display: contents;
}

.DataGridHeaderRow__cell {
	position: sticky;
	top: 0;
	left: 0;
	width: 100%;
}
</style>
