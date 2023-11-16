import { Meta, StoryObj } from '@storybook/vue3'
import ContentBlock from './ContentBlock.vue'

export default {
	component: ContentBlock,
	args: {
		default: 'I am content'
	}
} satisfies Meta<typeof ContentBlock>

type Story = StoryObj<typeof ContentBlock>;

export const Default: Story = {}