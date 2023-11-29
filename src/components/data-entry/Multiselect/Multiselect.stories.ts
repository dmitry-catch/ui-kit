import { Meta, StoryObj } from '@storybook/vue3'
import Multiselect from './Multiselect.vue'

export default {
	args: {
		options: [
			{ name: 'Option 1', value: 1 },
			{ name: 'Option 2', value: 2 },
			{ name: 'Option 3', value: 3 }
		],
		modelValue: [2]
	},
	component: Multiselect
} satisfies Meta<typeof Multiselect>

type Story = StoryObj<typeof Multiselect>

export const Default: Story = {}
