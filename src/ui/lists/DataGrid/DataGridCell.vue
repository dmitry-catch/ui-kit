<style>
.DataGridCell {
	display: block;
	padding: var(--datagrid-table-cell-padding);
	-webkit-line-clamp: 3;
	overflow: hidden;
	text-overflow: ellipsis;
	border-bottom: var(--design-border-color-primary) 1px solid;
}
</style>

<template>
	<td class="DataGridCell">
		<component :is="cellComponent(item, column)" :item="item" :column="column"></component>
	</td>
</template>

<script setup lang="ts">
import { DataGridColumn, isCustomizedColumn, isDateColumn } from './DataGridColumn'
import { toRefs } from 'vue'
import DataGridCellContent from './DataGridCellContent.vue'
import DataGridDateCellContent from './DataGridDateCellContent.vue'

const props = defineProps<{ column: DataGridColumn; item: any }>()
const { item, column } = toRefs(props)

const cellComponent = (item: any, column: DataGridColumn) => {
	if (isCustomizedColumn(column)) return column.cellComponent
	if (isDateColumn(column)) return DataGridDateCellContent
	return DataGridCellContent
}
</script>
