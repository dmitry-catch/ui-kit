import { Meta, StoryObj } from '@storybook/vue3'
import Pill from './Pill.vue'

export default {
	component: Pill,
	args: {
		default: 'I am Pill'
	}
} satisfies Meta<typeof Pill>

type Story = StoryObj<typeof Pill>

export const Default: Story = {}
