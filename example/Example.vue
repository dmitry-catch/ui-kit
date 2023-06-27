<style>
body {
	background: var(--design-background-color-secondary);
}
</style>

<template>
	<DropdownSelect
		v-model="test"
		:options="options"
		placeholder="Выберите из списка"
		style="width: 400px"
		label="Расследование"
	>
	</DropdownSelect>
	<TextField v-model="test" label="Label" description="description" type="date">
		<template #before>
			<Icon name="privacy"></Icon>
		</template>
		<template #after>
			<Icon name="privacy"></Icon>
		</template>
		<template #validationHint> <span>validation hint</span> </template>
	</TextField>
	<div aria-roledescription="date field">
		<input aria-description="Day" type="number" min="0" max="30" />
	</div>
	<hr />
	<label>
		<span>Test</span>
		<input type="date" />
	</label>
	<hr />
	<div style="display: flex; gap: 16px; align-items: center">
		<DateField v-model="date"></DateField>
		<span>{{ new Date(date).toLocaleString('ru') }}</span>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TextField from '../src/ui/controls/Inputs/TextField.vue'
import Icon from '../src/ui/icons/Icon.vue'
import DropdownSelect from '../src/ui/controls/Inputs/DropdownSelect.vue'
import DateField from '../src/ui/controls/Inputs/Date/DateField.vue'
const tab = ref(null)
const test = ref(null)
const anchor = ref('center')
const date = ref('2022-02-01')

const options = [
	{ name: 'name', value: 'value' },
	{ name: 'name 1', value: 'value 1' },
	{ name: 'name 2', value: 'value 2' },
	{ name: 'name 3', value: 'value 3' }
]

const dropdown = [
	{ name: 'test options', action: () => console.debug('test action') },
	{
		name: 'test options 2',
		action: ({ preventDefault }) => {
			console.debug('test action 2')

			preventDefault()
		}
	}
]
</script>
