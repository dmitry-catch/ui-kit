import { Meta, StoryObj } from '@storybook/vue3'
import CharCounter from './CharCounter.vue'

export default {
	component: CharCounter,
	args: {
		current: 0,
		max: 0
	}
} satisfies Meta<typeof CharCounter>

type Story = StoryObj<typeof CharCounter>

export const Default: Story = {}
