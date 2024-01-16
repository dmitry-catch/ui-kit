import { Meta, StoryObj } from '@storybook/vue3'
import DropdownItem from './DropdownItem.vue'

export default {
	component: DropdownItem,
	args: {
        disabled: false,
        divider: false,
		default: 'I am DropdownItem'
	}
} satisfies Meta<typeof DropdownItem>

type Story = StoryObj<typeof DropdownItem>

export const Default: Story = {}

export const Disabled: Story = {
	args: {
		disabled: true
	}
}

export const Divider: Story = {
	args: {
		divider: true
	}
}