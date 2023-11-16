import { Meta, StoryObj } from '@storybook/vue3'
import Header from './Header.vue'

export default {
	component: Header,
	args: {
		default: 'I am header'
	}
} satisfies Meta<typeof Header>

type Story = StoryObj<typeof Header>;

export const Default: Story = {}