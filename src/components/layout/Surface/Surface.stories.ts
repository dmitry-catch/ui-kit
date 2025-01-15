import { Meta, StoryObj } from '@storybook/vue3'
import Surface from './Surface.vue'

export default {
	component: Surface,
	args: {
		default: 'I am content'
	}
} satisfies Meta<typeof Surface>

type Story = StoryObj<typeof Surface>

export const Default: Story = {}
