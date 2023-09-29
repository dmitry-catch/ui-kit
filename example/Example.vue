<style>
body {
	background: var(--design-background-color-secondary);
}
</style>

<template>
	<div style="max-width: 50%">
		<Multiselect v-model="test" :options="options"></Multiselect>
		<DatePicker
			:label="'Заголовок'"
			:disabled="false"
			:required="true"
			:hint="'Подсказка'"
			:description="'Описание'"
			:invalid="false"
			v-model="date"
			:time="true"
		/>
		<input type="time" v-model="date" />
		<Btn :dropdown="options">
			234567890234567890
			<template #dropdownItem="{ data }">
				<div style="display: flex; flex-flow: row; gap: var(--design-gap-unit)">
					<div>{{ data.name }}</div>
					<Icon v-if="test.includes(data.value)" name="check" style="--icon-color: red"></Icon>
				</div>
			</template>
		</Btn>
		<DataList :context-menu="options" :data-source="grouped">
			<template #listItem="{ data }">
				{{ data }}
			</template>
		</DataList>
		<OrderableList v-model="options">
			<template #itemTemplate="{ data }: { data: { name: string, value: boolean } }">
				<Checkbox v-model:model-value="data.value" :value="data.value"> {{ data.name }} </Checkbox>
			</template>
		</OrderableList>
		<!--		<DropdownSelect :options="options" model-value="" placeholder="" label=""></DropdownSelect>-->
	</div>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import TextField from '../src/ui/controls/Inputs/TextField.vue'
import Icon from '../src/ui/icons/Icon.vue'
import DropdownSelect from '../src/ui/controls/Inputs/DropdownSelect.vue'
import DateField from '../src/ui/controls/Inputs/Date/DateField.vue'
import DatePicker from '../src/ui/controls/Inputs/DatePicker.vue'
import Checkbox from '../src/ui/controls/Inputs/Checkbox.vue'
import OrderableList from '../src/ui/lists/OrderableList.vue'
import Multiselect from '../src/ui/controls/Inputs/Multiselect.vue'
import Btn from '../src/ui/controls/Buttons/Btn.vue'
import DataList from '../src/ui/lists/DataList.vue'
import { comparator, groupBy } from '@forecsys/collections'

const tab = ref(null)
const test = ref(['value 1'])
const anchor = ref('center')
const date = ref('2022-02-01')

const addToList = ({ data }) => {
	test.value.push(data.value)
}
const options = ref([
	{ name: 'name', value: false, action: addToList },
	{ name: 'name 1', value: true, action: addToList },
	{ name: 'name 2', value: true, action: addToList },
	{ name: 'name 3', value: false, action: addToList }
])

const grouped = computed(() => groupBy(options.value, [{ direction: 'asc', target: 'name' }]))
const dropdown = [
	{ name: 'test options', action: () => console.debug('test action') },
	{
		name: 'test options 2',
		action: ({ preventDefault }: Event) => {
			console.debug('test action 2')

			preventDefault()
		}
	}
]

// watchEffect( () => {
// 	console.log(date.value)
// })
</script>
