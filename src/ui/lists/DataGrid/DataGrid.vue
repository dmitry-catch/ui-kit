<style>
.DataGrid {
	/*noinspection CssInvalidFunction*/
	--datagrid-table-cell-padding: var(
		--design-table-cell-padding,
		calc(1.5 * var(--design-gap-unit)) calc(2 * var(--design-gap-unit))
	);
	width: 100%;
	height: 100%;
}

.DataGrid__table {
	width: 100%;
	height: 100%;

	display: grid;
	--datagrid-rows-count: v-bind(rowsCount);
	--datagrid-columns-count: v-bind(columnsCount);
	grid-auto-rows: min-content;
	grid-template-columns: repeat(var(--datagrid-columns-count), auto);
	background: var(--design-background-color-primary);
	overflow: auto;
}
.DataGrid__header {
	position: sticky;
	top: 0;
}

.DataGrid__thead,
.DataGrid__tbody {
	display: contents;
}
.DataGrid__eventInterceptor {
	display: contents;
}
</style>

<template>
	<div class="DataGrid" ref="root">
		<table class="DataGrid__table">
			<thead class="DataGrid__thead">
				<DataGridHeaderRow class="DataGrid__header" v-model:columns="internalColumns"> </DataGridHeaderRow>
			</thead>
			<tbody class="DataGrid__tbody">
				<DataGridRowGroup
					v-for="item in dataSource"
					:item="item"
					:key="rowKey(item)"
					:columns="internalColumns"
				></DataGridRowGroup>
			</tbody>
		</table>
	</div>
</template>

<script setup lang="ts">
import { computed, ref, toRefs, watch, watchEffect } from 'vue'
import DataGridRow from './DataGridRow.vue'
import { DataGridColumn } from './DataGridColumn'
import DataGridHeaderRow from './DataGridHeaderRow.vue'
import { useFilterContext } from './useFilterContext'
import { and, FilterExpression, linqFilter, predicate } from '@forecsys/collections'
import { useSortingContext } from './useSortingContext'
import DataGridRowGroup from './DataGridRowGroup.vue'
import { DragEvent, useDragging } from '../../../utils/useDragging'
export interface Props {
	columns: Array<DataGridColumn>
	dataSource: Array<any>
	rowKey: (data: any) => string
}
const props = withDefaults(defineProps<Props>(), { rowKey: (item: any) => item.id })
const emit = defineEmits(['update:filters', 'update:sort', 'update:group', 'update:order', 'update:settings'])
const { columns, dataSource, rowKey } = toRefs(props)

const columnsCount = computed(() => columns.value.length)
const rowsCount = computed(() => dataSource.value.length)

const { filters } = useFilterContext()

watch(
	() => [filters],
	() =>
		emit(
			'update:filters',
			Object.values(filters.value).reduce(and, {
				value: true,
				operation: 'value'
			} as FilterExpression)
		),
	{ deep: true }
)

const { sorting } = useSortingContext()
watch(
	() => [sorting],
	() => emit('update:sort', sorting.value),
	{ deep: true }
)

watch(
	() => [filters, sorting],
	() => {
		emit('update:settings', { filters: filters.value, sorting: sorting.value })
	},
	{ deep: true }
)

const internalColumns = ref(columns.value)
watch(columns, () => (internalColumns.value = columns.value))
</script>
