<style>
.DataGridHeader {
	display: flex;
	flex-flow: row;
	padding: var(--datagrid-table-cell-padding);
	background: var(--design-background-color-primary);
	width: 100%;
	height: 100%;
	min-height: 26px;
	box-sizing: border-box;
	gap: calc(1.5 * var(--design-gap-unit));
	align-items: center;
}
.DataGridHeader__name {
	margin-inline-end: auto;
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
</style>

<template>
	<th class="DataGridHeader">
		<div v-if="!searchOpened" class="DataGridHeader__name accent">{{ column.name }}</div>
		<div
			class="DataGridHeader__eventInterceptor"
			v-if="searchOpened"
			@focusout="searchOpened = isDateColumn(column) ? searchOpened : false"
		>
			<TextField
				class="DataGridHeader__search dense"
				v-if="!isDateColumn(column)"
				v-model="search"
				:placeholder="column.name"
				@focusout="searchOpened = false"
				autofocus
			></TextField>
			<DatePicker v-else class="dense" v-model="date" autofocus>
				<template #after>
					<Btn class="icon functional">
						<Icon name="close" @click="date = null"></Icon>
					</Btn>
				</template>
			</DatePicker>
		</div>
		<div class="DataGridHeader__actions">
			<Btn
				v-if="(searchable || isDateColumn(column)) && !searchOpened"
				class="DataGridHeader__action DataGridHeader__actionSearch icon functional"
				@click="searchOpened = !searchOpened"
			>
				<Icon v-if="!isDateColumn(column)" :class="{ accent: Boolean(search) }" name="search"></Icon>
				<Icon v-else :class="{ accent: Boolean(date) }" name="calendar"></Icon>
			</Btn>
			<div
				v-if="isEnumColumn(column)"
				class="DataGridHeader__eventInterceptor"
				:ref="(element) => (filterListButton = element)"
			>
				<Btn
					class="DataGridHeader__action DataGridHeader__actionFilter icon functional"
					@click="openFilterList"
				>
					<Icon name="filter"></Icon>
				</Btn>
			</div>
			<Btn class="DataGridHeader__action DataGridHeader__actionSort icon functional" @click="clickSort">
				<Icon v-if="existingSort == null" name="sort"></Icon>
				<Icon v-else-if="existingSort.direction === 'asc'" name="sort_ascending"></Icon>
				<Icon v-else-if="existingSort.direction === 'desc'" name="sort_decending"></Icon>
			</Btn>
		</div>
		<ListBox
			v-if="filterListOpened"
			v-model="filterListSelected"
			@update:modelValue="filterListOpened = false"
			:options="filterListOptions"
		></ListBox>
	</th>
</template>

<script setup lang="ts">
import { DataGridColumn, isDateColumn, isEnumColumn, isTypedColumn } from './DataGridColumn'
import { computed, inject, nextTick, ref, toRefs, watch, watchEffect } from 'vue'
import Icon from '../../icons/Icon.vue'
import Btn from '../../controls/Buttons/Btn.vue'
import TextField from '../../controls/Inputs/TextField.vue'
import {
	BinaryFilterExpression,
	equals,
	field,
	FilterExpression,
	includes,
	or,
	SortExpression,
	value,
	ValueExpression
} from '@forecsys/collections'
import { useFilterContext } from './useFilterContext'
import ListBox from '../../controls/Inputs/ListBox.vue'
import { ListBoxOption } from '../../controls/Inputs/ListBoxOption'
import { useClickOutside } from '../../../utils/useClickOutside'
import { useSortingContext } from './useSortingContext'
import { MouseEvent } from 'happy-dom'
import DatePicker from '../../controls/Inputs/DatePicker.vue'

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
const getSearch = () => {
	const filter = getFilter(searchId.value) as BinaryFilterExpression
	const filterValue = filter?.right as ValueExpression
	return filterValue?.value
}
const search = ref(getSearch())
watchEffect(() => {
	setFilter(
		searchId.value,
		search.value ? includes(field(column.value.field, null), value(search.value)) : value(true)
	)
})
const dateId = ref(column.value.field + '-date')
const getDate = () => {
	const filter = getFilter(searchId.value) as BinaryFilterExpression
	const filterValue = filter?.right as ValueExpression
	return filterValue?.value
}
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
const openFilterList = async () => {
	filterListOpened.value = true
}
useClickOutside(filterListButton, (event: Event) => {
	filterListOpened.value = false
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

	if (event.shiftKey === false) {
		if (existingSort.value) changeDirection()
		setSorting([sort.value])
	} else if (!existingSort.value) {
		appendSorting([sort.value])
	} else changeDirection()
}
</script>
