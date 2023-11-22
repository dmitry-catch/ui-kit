<style>
body {
	background: white;
}
</style>

<template>
	<ButtonStand />
	<input type="date" />
	<input type="number" />
	<div style="width: 468px">
		<DatePicker v-model="date" :hint="'string'" :description="'string'" :invalid="false" :disabled="true" />
	</div>

	<div>
		<DataGrid
			v-model:filters="filters"
			v-model:sort="sort"
			:columns="options"
			:data-source="grouped"
			:rowKey="(data: any) => data.id"
		>
		</DataGrid>
	</div>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { comparator, groupBy, linqFilter, linqSort, predicate, value } from '@forecsys/collections'
import DataGrid from '../src/ui/lists/DataGrid/DataGrid.vue'
import ButtonStand from './ButtonStand.vue'

const filters = ref(value(true))
watchEffect(() => console.log('filters', filters.value))
const test = ref<any[]>([])
const date = ref(new Date())
const addToList = ({ data }: any) => {
	test.value.push(data.value)
}
const options = ref([
	{ name: 'name', field: 'name', value: false, action: addToList, date: new Date(2023, 3, 3) },
	{ name: 'field', field: 'field', value: true, action: addToList, date: new Date(2023, 3, 3) },
	{
		name: 'value',
		field: 'value',
		type: 'enum',
		filterEnum: {
			ok: true,
			fail: false
		},
		template: (it: boolean) => (it ? 'ok' : 'fail'),
		value: true,
		action: addToList,
		date: new Date(2023, 3, 2)
	},
	{ name: 'action', field: 'action', value: false, action: addToList, date: new Date(2023, 3, 2) },
	{ name: 'date', field: 'date', value: false, action: addToList, date: new Date(2023, 3, 2), type: 'date' }
])

const range = ref<Array<number>>([])
for (let i = 0; i < 100; i++) range.value.push(i)
const dataSource = computed<Array<any>>(() =>
	range.value.map((i) => ({
		id: i,
		name: 'name ' + i,
		field: options.value[i % 4].field,
		value: Boolean(i % 2),
		action: addToList,
		date: options.value[i % 4].date
	}))
)
const filterPredicate = ref(predicate(filters.value))
watchEffect(() => {
	filterPredicate.value = predicate(filters.value)
})
const sort = ref([])
const filtered = computed(() => dataSource.value.filter(filterPredicate.value).sort(comparator(sort.value)), {
	onTrigger: console.log
})
const grouped = computed(() => groupBy(filtered.value, [{ direction: 'asc', target: 'field' }]))

watchEffect(() => {
	console.log(linqFilter(filters.value))
})
watchEffect(() => {
	console.log(linqSort(sort.value))
})
</script>
