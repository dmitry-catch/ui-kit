import { Meta, StoryObj } from '@storybook/vue3'
import Paragraph from './Paragraph.vue'

export default {
	component: Paragraph,
	args: {
		default: 'I am Paragraph'
	}
} satisfies Meta<typeof Paragraph>

type Story = StoryObj<typeof Paragraph>;

export const Default: Story = {}