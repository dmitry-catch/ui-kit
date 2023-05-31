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
	<Modal style="left: 0" :anchor="anchor">
		<Surface class="square" style="display: flex; flex-flow: row-reverse">
			<div style="left: 0">Tests e lsdf;glksd;fkg;lsdkfg;ksdf;lgk;sldfkglsdjfkg;lkjsrothjgklsfdklg</div>
			<Btn class="functional" :dropdown="dropdown">
				<template #before>
					<Icon name="add"></Icon>
				</template>
				<span class="accent">Test btn</span>
			</Btn>
		</Surface>
	</Modal>
</template>

<script setup lang="ts">
import { computed, ref, toRefs } from 'vue'
import TextField from '../src/ui/controls/Inputs/TextField.vue'
import Icon from '../src/ui/icons/Icon.vue'
import DropdownSelect from '../src/ui/controls/Inputs/DropdownSelect.vue'
import Modal from '../src/ui/layout/Modal.vue'
import Surface from '../src/ui/layout/Surface.vue'
import Btn from '../src/ui/controls/Buttons/Btn.vue'
const tab = ref(null)
const test = ref(null)
const anchor = ref('center')

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
