import { Meta, StoryObj } from '@storybook/vue3'
import DataGrid from './DataGrid.vue'
import { computed, ref, watchEffect } from 'vue'
import { comparator, groupBy, linqFilter, linqSort, predicate, value } from '@forecsys/collections'

export default {
	component: DataGrid
} satisfies Meta<typeof DataGrid>

type Story = StoryObj<typeof DataGrid>

export const Default: Story = {
	render: () => ({
		components: { DataGrid },
		setup: () => {
			const filters = ref(value(true))
			watchEffect(() => console.log('filters', filters.value))
			const options = ref([
				{ name: 'name', field: 'name', value: false, date: new Date(2023, 3, 3) },
				{ name: 'field', field: 'field', value: true, date: new Date(2023, 3, 3) },
				{
					name: 'value',
					field: 'value',
					type: 'enum',
					filterEnum: {
						ok: true,
						fail: false
					},
					template: (it: boolean) => (it ? 'ok ads d asd ' : 'fail as dsa dasd as d'),
					value: true,
					date: new Date(2023, 3, 2)
				},
				{ name: 'action', field: 'action', value: false, date: new Date(2023, 3, 2) },
				{
					name: 'date',
					field: 'date',
					value: false,
					date: new Date(2023, 3, 2),
					type: 'date'
				}
			])

			const dataSource = computed(() =>
				[...Array(10).keys()].map((i) => ({
					id: i,
					name: 'nameadsd a asdasda sdfkjgd fgfgd fdgfdg dsd as das sdssssss dasd sa ds ' + i,
					field: options.value[i % 4].field,
					value: Boolean(i % 2),
					date: options.value[i % 4].date
				}))
			)
			const filterPredicate = ref(predicate(filters.value))
			watchEffect(() => {
				filterPredicate.value = predicate(filters.value)
			})
			const sort = ref([])
			const filtered = computed(
				() => dataSource.value.filter(filterPredicate.value).sort(comparator(sort.value)),
				{
					onTrigger: console.log
				}
			)
			const grouped = computed(() => groupBy(filtered.value, [{ direction: 'asc', target: 'field' }]))

			watchEffect(() => {
				console.log(linqFilter(filters.value))
			})
			watchEffect(() => {
				console.log(linqSort(sort.value))
			})

			return { options, grouped, filters, sort }
		},
		template: `
		<div :style="{height: '800px'}">
			<DataGrid
				:columns='options'
				:data-source='grouped'
				:row-key='(data) => data.id'
				v-model:filters='filters'
				v-model:sort='sort'
				:allowSelection='true'
			/>
		</div>`
	})
}
