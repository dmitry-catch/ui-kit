import { Meta, StoryObj } from '@storybook/vue3'
import DropdownSelectableOption from './DropdownSelectableOption.vue'

export default {
	component: DropdownSelectableOption,
	args: {
		selected: false,
		option: {name: 'Option', value: 1}
	}
} satisfies Meta<typeof DropdownSelectableOption>

type Story = StoryObj<typeof DropdownSelectableOption>;

export const Default: Story = {}