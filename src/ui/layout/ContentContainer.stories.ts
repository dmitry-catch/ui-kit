import { Meta, StoryObj } from '@storybook/vue3'
import ContentContainer from './ContentContainer.vue'

export default {
	component: ContentContainer,
	args: {
		default: 'I am content'
	},
} satisfies Meta<typeof ContentContainer>

type Story = StoryObj<typeof ContentContainer>;

export const Default: Story = {}