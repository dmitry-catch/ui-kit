import { Meta, StoryObj } from '@storybook/vue3'
import Tag from './Tag.vue'

export default {
	component: Tag,
	args: {
		default: 'I am Pill'
	}
} satisfies Meta<typeof Tag>

type Story = StoryObj<typeof Tag>

export const Default: Story = {}
