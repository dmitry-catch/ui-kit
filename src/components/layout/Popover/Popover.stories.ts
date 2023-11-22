import { Meta, StoryObj } from '@storybook/vue3'
import Dropdown from './Popover.vue'

export default {
	component: Dropdown,
	args: {
		default: 'I am content'
	}
} satisfies Meta<typeof Dropdown>

type Story = StoryObj<typeof Dropdown>

export const Default: Story = {}
