import { Meta, StoryObj } from '@storybook/vue3'
import Icon from './Icon.vue'

export default {
	component: Icon,
	args: {
		name: 'inbox'
	}
} satisfies Meta<typeof Icon>

type Story = StoryObj<typeof Icon>

export const Default: Story = {}
