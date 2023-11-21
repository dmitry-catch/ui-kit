import { Meta, StoryObj } from '@storybook/vue3'
import DataGridHeader from './DataGridHeader.vue'

export default {
	component: DataGridHeader
} satisfies Meta<typeof DataGridHeader>

type Story = StoryObj<typeof DataGridHeader>

export const Default: Story = {
	args: {
		column: { name: 'name', field: 'name', value: false, date: new Date(2023, 3, 3) }
	}
}
