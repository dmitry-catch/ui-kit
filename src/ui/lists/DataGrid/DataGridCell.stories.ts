import { Meta, StoryObj } from '@storybook/vue3'
import DataGridCell from './DataGridCell.vue'

export default {
	component: DataGridCell
} satisfies Meta<typeof DataGridCell>

type Story = StoryObj<typeof DataGridCell>

export const Default: Story = {
	args: {
		column: { name: 'name', field: 'name', value: false, date: new Date(2023, 3, 3) },
		item: { name: 'Hello' }
	}
}

export const Dated: Story = {
	args: {
		column: { name: 'name', field: 'name', value: false, date: new Date(2023, 3, 3), type: 'date' },
		item: { name: new Date() }
	}
}
