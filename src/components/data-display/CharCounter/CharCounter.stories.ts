import { Meta, StoryObj } from '@storybook/vue3'
import CharCounter from './CharCounter.vue'

export default {
	component: CharCounter,
	args: {
		current: 1,
		max: 10
	}
} satisfies Meta<typeof CharCounter>

type Story = StoryObj<typeof CharCounter>

export const Default: Story = {}

export const OverflowValue: Story = {
	args: {
		current: 11,
		max: 1
	}
}

export const MaxNegative: Story = {
	args: {
		current: 1,
		max: -10
	}
}

export const MaxZero: Story = {
	args: {
		current: 0,
		max: 0
	}
}
