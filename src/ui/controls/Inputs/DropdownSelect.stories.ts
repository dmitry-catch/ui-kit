import { Meta, StoryObj } from '@storybook/vue3'
import DropdownSelect from './DropdownSelect.vue'
import DropdownSelectableOption from './DropdownSelectableOption.vue'

export default {
	component: DropdownSelect,
	args: {
		options: [{ name: 'Option 1', value: 1 }, { name: 'Option 2', value: 2 }, { name: 'Option 3', value: 3 }]
	}
} satisfies Meta<typeof DropdownSelect>

type Story = StoryObj<typeof DropdownSelect>;

export const Default: Story = {}

export const Selectable: Story = {
	args: {
		modelValue: 1
	},
	render: (args) => ({
		components: { DropdownSelect, DropdownSelectableOption },
		setup: () => ({ args }),
		template: `
			<DropdownSelect v-bind='args'>
				<template v-slot:dropdownItem='slotProps'>
					<DropdownSelectableOption :option='slotProps.option' :selected='slotProps.selected' />
				</template>
			</DropdownSelect>
		`
	})
}