<style>
.DataGridRow {
	display: contents;
}
.DataGridRow:nth-child(2n) .DataGridRow__cell {
	background: var(--design-background-color-tertiary);
}
.DataGridRow:hover .DataGridRow__cell {
	background: var(--design-background-color-secondary);
}
</style>

<template>
	<tr class="DataGridRow">
		<DataGridCell
			class="DataGridRow__cell"
			v-for="column of columns"
			:key="column.field"
			:item="item"
			:column="column"
		></DataGridCell>
	</tr>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
import { DataGridColumn } from './DataGridColumn'
import DataGridCell from './DataGridCell.vue'

const props = defineProps<{ columns: Array<DataGridColumn>; item: any }>()
const { item, columns } = toRefs(props)
</script>
