import { Meta, StoryObj } from '@storybook/vue3'
import DataGridCellContent from './DataGridCellContent.vue'

export default {
	component: DataGridCellContent
} satisfies Meta<typeof DataGridCellContent>

type Story = StoryObj<typeof DataGridCellContent>

export const Default: Story = {
	args: {
		column: { name: 'name', field: 'name', value: false, date: new Date(2023, 3, 3) },
		item: { name: 'Hello' }
	}
}

export const Enumed: Story = {
	args: {
		column: {
			name: 'value',
			field: 'value',
			type: 'enum',
			filterEnum: {
				ok: true,
				fail: false
			},
			template: (it: boolean) => (it ? 'ok' : 'fail'),
			value: true,
			date: new Date(2023, 3, 2)
		},
		item: { value: 1 }
	}
}
