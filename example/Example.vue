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
	<TextField v-model="test" label="Label" description="description" :maxLength="10" :invalid="true">
		<template #before>
			<Icon name="privacy"></Icon>
		</template>
		<template #after>
			<Icon name="privacy"></Icon>
		</template>
		<template #validationHint> <span>validation hint</span> </template>
	</TextField>
</template>

<script setup lang="ts">
import { computed, ref, toRefs } from 'vue'
import TextField from '../src/ui/controls/Inputs/TextField.vue'
import Icon from '../src/ui/icons/Icon.vue'
import DropdownSelect from '../src/ui/controls/Inputs/DropdownSelect.vue'
const tab = ref(null)
const test = ref(null)

const options = [
	{ name: 'name', value: 'value' },
	{ name: 'name 1', value: 'value 1' },
	{ name: 'name 2', value: 'value 2' },
	{ name: 'name 3', value: 'value 3' }
]
</script>
