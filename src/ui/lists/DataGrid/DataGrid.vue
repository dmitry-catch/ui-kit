<style>
.DataGrid {
	/*noinspection CssInvalidFunction*/
	--datagrid-table-cell-padding: var(
		--design-table-cell-padding,
		calc(1.5 * var(--design-gap-unit)) calc(2 * var(--design-gap-unit))
	);
	width: 100%;
	height: 100%;
	overflow: auto;
}

.DataGrid__table {
	width: 100%;
	height: 100%;
	display: grid;
	--datagrid-rows-count: v-bind(rowsCount);
	--datagrid-columns-count: v-bind(columnsCount);
	--datagrid-content-columns-count: v-bind(contentColumnsCount);
	grid-auto-rows: min-content;
	--datagrid-template-details-column: v-bind(detailsColumn);
	--datagrid-template-select-column: v-bind(selectColumn);
	grid-template-columns:
		var(--datagrid-template-details-column, minmax(min-content, auto))
		var(--datagrid-template-select-column, minmax(min-content, auto))
		repeat(var(--datagrid-content-columns-count), minmax(min-content, auto));
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
				<DataGridHeaderRow
					class="DataGrid__header"
					v-model:columns="internalColumns"
					:detailsColumn="hasDetails"
					:selectColumn="allowSelection"
				>
				</DataGridHeaderRow>
			</thead>
			<tbody class="DataGrid__tbody">
				<DataGridRowGroup
					v-for="item in dataSource"
					:item="item"
					:key="rowKey(item)"
					:columns="internalColumns"
					:detailsColumn="hasDetails"
					:selectColumn="allowSelection"
				>
					<template #rowDetails="{ item }">
						<slot name="rowDetails" :item="item"></slot>
					</template>
				</DataGridRowGroup>
			</tbody>
		</table>
	</div>
</template>

<script setup lang="ts">
import { computed, provide, ref, toRefs, useSlots, watch } from 'vue'
import { DataGridColumn } from './DataGridColumn'
import DataGridHeaderRow from './DataGridHeaderRow.vue'
import { useFilterContext } from './useFilterContext'
import { and, FilterExpression } from '@forecsys/collections'
import { useSortingContext } from './useSortingContext'
import DataGridRowGroup from './DataGridRowGroup.vue'

export interface Props {
	columns: Array<DataGridColumn>
	dataSource: Array<any>
	rowKey: (data: any) => string
	allowSelection: boolean
	selectedRows: Array<any>
}

const props = withDefaults(defineProps<Props>(), {
	rowKey: (item: any) => item.id,
	allowSelection: false,
	selectedRows: () => []
})
const emit = defineEmits(['update:filters', 'update:sort', 'update:group', 'update:order', 'update:settings'])

const slots = useSlots()
const { columns, dataSource, rowKey, allowSelection, selectedRows } = toRefs(props)
const hasDetails = computed(() => Boolean(slots.rowDetails))
const contentColumnsCount = computed(
	() => columns.value.length - Number(!hasDetails.value) - Number(!allowSelection.value)
)
const columnsCount = computed(() => columns.value.length + Number(allowSelection.value) + Number(hasDetails.value))
const rowsCount = computed(() => dataSource.value.length)
const detailsColumn = computed(() => (hasDetails.value ? 'min-content' : null))
const selectColumn = computed(() => (allowSelection.value ? 'min-content' : null))
provide('datagrid-selectedRows', selectedRows)
const { filters } = useFilterContext({ forceId: true })

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

const { sorting } = useSortingContext({ forceId: true })
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
