<script setup lang="ts">
import { DataGridColumn } from '../types.js'
import { computed, onMounted, onUnmounted, ref, toRefs, watchEffect } from 'vue'
import Icon from '../../../general/Icon/Icon.vue'
import Button from '../../../general/Button/Button.vue'
import TextField from '../../../data-entry/TextField/TextField.vue'
import {
	BinaryFilterExpression,
	equals,
	field,
	includes,
	or,
	SortExpression,
	value,
	ValueExpression
} from '@forecsys/collections'
import { useFilterContext } from '../utils/useFilterContext.js'
import ListBox from '../../ListBox/ListBox.vue'
import { ListBoxOption } from '../../ListBox/types.js'
import { useClickOutside } from '../../../../utils/useClickOutside.js'
import { useSortingContext } from '../utils/useSortingContext.js'
import { MouseEvent } from 'happy-dom'
import DatePicker from '../../../data-entry/DatePicker/DatePicker.vue'
import { isCustomHeaderColumn, isDateColumn, isEnumColumn, isTypedColumn } from '../utils/index.js'

interface DataGridHeaderProps {
	column: DataGridColumn
}

const props = defineProps<DataGridHeaderProps>()
const { column } = toRefs(props)

const { getFilter, setFilter } = useFilterContext()

const searchOpened = ref(false)
const searchId = ref(column.value.field + '-search')
const searchable = computed(() => {
	if (!isTypedColumn(column.value)) return true
	return ['string'].includes(column.value.type)
})
const getFilterValue = () => {
	const filter = getFilter(searchId.value) as BinaryFilterExpression
	const filterValue = filter?.right as ValueExpression
	return filterValue?.value
}
const getSearch = () => getFilterValue()
const search = ref(getSearch())
watchEffect(() => {
	setFilter(
		searchId.value,
		search.value ? includes(field(column.value.field, null), value(search.value)) : value(true)
	)
})
const dateId = ref(column.value.field + '-date')
const getDate = () => getFilterValue()
const date = ref(getDate())
watchEffect(() => {
	const val = value(date.value) as ValueExpression
	val.type = 'date'
	setFilter(dateId.value, date.value ? equals(field(column.value.field, null), val) : value(true))
})

const filterListId = ref(column.value.field + '-enum')
const filterListButton = ref()
const filterListOpened = ref(false)
const filterListSelected = ref<Array<any>>([])
const doNothing = () => {}
const filterListOptions = computed<Array<ListBoxOption>>(() => {
	const colDefinition = column.value
	if (isEnumColumn(colDefinition))
		return Object.values(colDefinition.filterEnum).map((value) => {
			return {
				name: colDefinition.template(value),
				value: value,
				action: doNothing
			}
		})
	else return []
})
const openFilterList = () => {
	filterListOpened.value = true
}
const closeFilterList = () => {
	filterListOpened.value = false
}
useClickOutside(filterListButton, () => {
	closeFilterList()
})

watchEffect(() => {
	setFilter(
		filterListId.value,
		filterListSelected.value
			.map((it) => equals(field(column.value.field), value(it)))
			.reduce(or, value(filterListSelected.value.length === 0))
	)
})

const { setSorting, appendSorting, sorting } = useSortingContext()
const sort = ref<SortExpression | null>(sorting.value.find((it) => it.target === column.value.field) ?? null)
const existingSort = computed(() => sorting.value.find((it) => it.target === column.value.field))
const changeDirection = () => {
	if (sort.value) sort.value.direction = sort.value.direction === 'asc' ? 'desc' : 'asc'
}
const clickSort = (event: MouseEvent) => {
	console.log('clickSort', event)
	if (sort.value == null) sort.value = { target: column.value.field, direction: 'asc' }

	if (!event.shiftKey) {
		if (existingSort.value) changeDirection()
		setSorting([sort.value])
	} else if (!existingSort.value) {
		appendSorting([sort.value])
	} else changeDirection()
}

onMounted(() => {
	document.addEventListener('scroll', closeFilterList)
})

onUnmounted(() => {
	document.removeEventListener('scroll', closeFilterList)
})
</script>
<template>
	<th class="DataGridHeader">
		<div
			v-if="!searchOpened"
			class="DataGridHeader__name accent"
			:class="{ danger: isCustomHeaderColumn(column) && column.headerVariant === 'highlighted' }"
		>
			{{ column.name }}
		</div>
		<div
			v-if="searchOpened"
			class="DataGridHeader__eventInterceptor"
			@focusout="searchOpened = isDateColumn(column) ? searchOpened : false"
		>
			<TextField
				v-if="!isDateColumn(column)"
				v-model="search"
				class="DataGridHeader__search dense"
				:placeholder="column.name"
				autofocus
				@focusout="searchOpened = false"
			></TextField>
			<DatePicker v-else v-model="date" class="dense" autofocus>
				<template #after>
					<Button class="icon functional">
						<Icon
							name="close"
							@click="
								() => {
									date = null
									searchOpened = false
								}
							"
						></Icon>
					</Button>
				</template>
			</DatePicker>
		</div>
		<div class="DataGridHeader__actions">
			<Button
				v-if="(searchable || isDateColumn(column)) && !searchOpened"
				class="DataGridHeader__action DataGridHeader__actionSearch icon functional"
				@click="searchOpened = !searchOpened"
			>
				<Icon v-if="!isDateColumn(column)" :class="{ accent: Boolean(search) }" name="search"></Icon>
				<Icon v-else :class="{ accent: Boolean(date) }" name="calendar"></Icon>
			</Button>
			<div
				v-if="isEnumColumn(column)"
				:ref="(element) => (filterListButton = element)"
				class="DataGridHeader__eventInterceptor"
			>
				<Button
					class="DataGridHeader__action DataGridHeader__actionFilter icon functional"
					@click="openFilterList"
				>
					<Icon name="filter"></Icon>
				</Button>
			</div>
			<Button class="DataGridHeader__action DataGridHeader__actionSort icon functional" @click="clickSort">
				<Icon v-if="existingSort == null" name="sort"></Icon>
				<Icon v-else-if="existingSort.direction === 'asc'" name="sort_ascending"></Icon>
				<Icon v-else-if="existingSort.direction === 'desc'" name="sort_decending"></Icon>
			</Button>
		</div>
		<ListBox
			v-if="filterListOpened"
			v-model="filterListSelected"
			:options="filterListOptions"
			@update:modelValue="filterListOpened = false"
		></ListBox>
	</th>
</template>

<style>
.DataGridHeader {
	display: flex;
	flex-flow: row;
	padding: var(--datagrid-table-cell-padding);
	background-color: var(--design-background-color-primary);
	width: 100%;
	height: 100%;
	min-height: 26px;
	box-sizing: border-box;
	gap: calc(1.5 * var(--design-gap-unit));
	align-items: start;
	justify-content: space-between;
	z-index: 999;
}

.DataGridHeader__actions {
	display: flex;
	flex-flow: row;
	gap: var(--design-gap-unit);
	align-items: center;
}

.DataGridHeader__action {
	--icon-size: var(--design-current-font-size);
}

.DataGridHeader__eventInterceptor {
	display: contents;
}

.DataGridHeader__search {
	min-width: 100px;
}
.DataGridHeader__name {
	text-align: start;
}
</style>
