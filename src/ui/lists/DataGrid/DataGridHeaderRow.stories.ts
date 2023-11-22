import { Meta, StoryObj } from '@storybook/vue3'
import DataGridHeaderRow from './DataGridHeaderRow.vue'

export default {
	component: DataGridHeaderRow,
	args: {
		detailsColumn: false,
		selectColumn: false
	}
} satisfies Meta<typeof DataGridHeaderRow>

type Story = StoryObj<typeof DataGridHeaderRow>

export const Default: Story = {
	args: {
		columns: [
			{ name: 'name', field: 'name', value: false, date: new Date(2023, 3, 3) },
			{ name: 'field', field: 'field', value: true, date: new Date(2023, 3, 3) }
		]
	}
}
