import { Meta, StoryObj } from '@storybook/vue3'
import DataGroupToggler from './DataGroupToggler.vue'

export default {
	component: DataGroupToggler,
	args: {
		modelValue: false,
		group: {
			key: 'Key',
			data: [1, 2, 3, 4, 5]
		}
	}
} satisfies Meta<typeof DataGroupToggler>

type Story = StoryObj<typeof DataGroupToggler>

export const Default: Story = {}
