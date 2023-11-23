import { Meta, StoryObj } from '@storybook/vue3'
import Popover from './Popover.vue'
import Readme from './Popover.md?raw'

export default {
	component: Popover,
	args: {
		default: 'I am popover content'
	},
	parameters: {
		docs: {
			description: {
				component: Readme
			}
		}
	}
} satisfies Meta<typeof Popover>

type Story = StoryObj<typeof Popover>

export const Default: Story = {}
