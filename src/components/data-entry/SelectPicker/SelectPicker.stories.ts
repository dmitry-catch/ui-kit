import { Meta, StoryObj } from '@storybook/vue3'
import SelectPicker from './SelectPicker.vue'
import SelectableOption from './SelectableOption/SelectableOption.vue'

export default {
	component: SelectPicker,
	args: {
		options: [
			{ name: 'Option 1', value: 1 },
			{ name: 'Option 2', value: 2 },
			{ name: 'Option 3', value: 3 }
		]
	}
} satisfies Meta<typeof SelectPicker>

type Story = StoryObj<typeof SelectPicker>

export const Default: Story = {}

export const Selectable: Story = {
	args: {
		modelValue: 1
	},
	render: (args) => ({
		components: { SelectPicker, SelectableOption },
		setup: () => ({ args }),
		template: `
			<SelectPicker v-bind='args'>
				<template v-slot:dropdownItem='slotProps'>
					<SelectableOption :option='slotProps.option' :selected='slotProps.selected' />
				</template>
			</SelectPicker>
		`
	})
}
