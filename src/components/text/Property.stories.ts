import { Meta, StoryObj } from '@storybook/vue3'
import Property from './Property.vue'

export default {
	component: Property,
	args: {
		name: 'Name',
		value: 'Value'
	}
} satisfies Meta<typeof Property>

type Story = StoryObj<typeof Property>

export const Default: Story = {}
