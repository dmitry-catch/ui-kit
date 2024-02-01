import { Meta, StoryObj } from '@storybook/vue3'
import Select from './Select.vue'
import SelectableOption from './SelectableOption/SelectableOption.vue'

export default {
	component: Select,
	args: {
		options: [
			{ name: 'Option 1', value: 1 },
			{ name: 'Option 2', value: 2 },
			{ name: 'Option 3', value: 3 }
		]
	}
} satisfies Meta<typeof Select>

type Story = StoryObj<typeof Select>

export const Default: Story = {}

export const Selectable: Story = {
	args: {
		modelValue: 1
	},
	render: (args) => ({
		components: { Select, SelectableOption },
		setup: () => ({ args }),
		template: `
			<Select v-bind='args'>
				<template v-slot:dropdownItem='slotProps'>
					<SelectableOption :option='slotProps.option' :selected='slotProps.selected' />
				</template>
			</Select>
		`
	})
}
