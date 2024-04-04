<script setup lang="ts">
import { computed, provide, ref, toRefs, useSlots, watch } from 'vue'
import { and, FilterExpression } from '@forecsys/collections'
import DataGridHeaderRow from './components/DataGridHeaderRow.vue'
import DataGridRowGroup from './components/DataGridRowGroup.vue'
import DataGridPaginationPanel from './components/DataGridPaginationPanel.vue'
import { useFilterContext } from './utils/useFilterContext.js'
import { useSortingContext } from './utils/useSortingContext.js'
import { DataGridColumn } from './types.js'

export interface Props {
	columns: Array<DataGridColumn>
	dataSource: Array<any>
	rowKey: (data: any) => string
	allowSelection: boolean
	selectedRows: Array<any>
	pageSize: number
	totalElements: number
	allowPagination: boolean
	currentPage: number
}

const props = withDefaults(defineProps<Props>(), {
	rowKey: (item: any) => item.id,
	allowSelection: false,
	selectedRows: () => [],
	allowPagination: false,
	currentPage: 0
})

const emit = defineEmits([
	'update:filters',
	'update:sort',
	'update:group',
	'update:order',
	'update:settings',
	'update:currentPage',
	'update:columns'
])

const slots = useSlots()
const { columns, dataSource, rowKey, allowSelection, selectedRows } = toRefs(props)
const hasDetails = computed(() => Boolean(slots.rowDetails))
const contentColumnsCount = computed(() => columns.value.length)
const columnsCount = computed(() => columns.value.length + Number(hasDetails.value) + 1)
const rowsCount = computed(() => dataSource.value.length)
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

watch(internalColumns, (newValue) => emit('update:columns', newValue))

const changePage = (value: number) => {
	emit('update:currentPage', value)
}
</script>

<template>
	<div ref="root" class="DataGrid">
		<table class="DataGrid__table">
			<thead class="DataGrid__thead">
				<DataGridHeaderRow
					v-model:columns="internalColumns"
					class="DataGrid__header"
					:detailsColumn="hasDetails"
					:selectColumn="allowSelection"
				>
				</DataGridHeaderRow>
			</thead>
			<tbody class="DataGrid__tbody">
				<DataGridRowGroup
					v-for="item in dataSource"
					:key="rowKey(item)"
					:item="item"
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
		<DataGridPaginationPanel
			v-if="allowPagination"
			:totalElements="totalElements"
			:modelValue="currentPage"
			:pageSize="pageSize"
			@update:modelValue="changePage"
		/>
	</div>
</template>

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
	grid-template-columns:
		repeat(calc(var(--datagrid-columns-count) - var(--datagrid-content-columns-count)), min-content)
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
