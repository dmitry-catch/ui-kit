<script setup lang="ts">
import { computed, provide, ref, toRefs, useSlots, watch } from 'vue'
import { and, FilterExpression } from '@forecsys/collections'
import DataGridHeaderRow from './components/DataGridHeaderRow.vue'
import { useFilterContext } from './utils/useFilterContext.js'
import { useSortingContext } from './utils/useSortingContext.js'
import { DataGridColumn } from './types.js'
import DataGridRowGroup from './components/DataGridRowGroup.vue'
import Spinner from '../../general/Spinner/Spinner.vue'

export interface Props {
	columns: Array<DataGridColumn>
	dataSource: Array<any>
	rowKey: (data: any) => string
	allowSelection: boolean
	selectedRows: Array<any>
	allowPagination: boolean
	loading?: boolean
	spinnerOverlay?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	rowKey: (item: any) => item.id,
	allowSelection: false,
	selectedRows: () => [],
	allowPagination: false,
	loading: false,
	spinnerOverlay: false
})

const emit = defineEmits([
	'update:filters',
	'update:sort',
	'update:group',
	'update:order',
	'update:settings',
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
</script>

<template>
	<div ref="root" class="DataGrid">
		<table class="DataGrid__table" :allowPagination="allowPagination">
			<thead class="DataGrid__thead">
				<DataGridHeaderRow
					v-model:columns="internalColumns"
					class="DataGrid__header"
					:detailsColumn="hasDetails"
					:selectColumn="allowSelection"
				>
				</DataGridHeaderRow>
			</thead>
			<tbody v-if="!loading || (loading && spinnerOverlay)" class="DataGrid__tbody">
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
		<Spinner
			v-if="loading"
			class="DataGrid__spinner"
			:class="{ overlay: spinnerOverlay }"
			variant="dark"
			size="extra-large"
			center
		/>
	</div>
</template>

<style>
.DataGrid {
	/*noinspection CssInvalidFunction*/
	--datagrid-table-cell-padding: var(
		--design-table-cell-padding,
		var(--design-gap-unit) calc(2 * var(--design-gap-unit))
	);
	width: 100%;
	height: fit-content;
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
	overflow: unset;
}

.DataGrid__table[allowPagination='true'] {
	max-height: calc(100% - 72px);
}

.DataGrid__header {
	position: sticky;
	top: 0;
}

.DataGrid__spinner.overlay {
	background-color: var(--design-text-color-on-accent-primary);
	opacity: 80%;
	z-index: 1;
}

.DataGrid__thead,
.DataGrid__tbody {
	display: contents;
}
.DataGrid__eventInterceptor {
	display: contents;
}
</style>
