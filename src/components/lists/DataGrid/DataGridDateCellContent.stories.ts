import { Meta, StoryObj } from '@storybook/vue3'
import DataGridDateCellContent from './DataGridDateCellContent.vue'

export default {
	component: DataGridDateCellContent
} satisfies Meta<typeof DataGridDateCellContent>

type Story = StoryObj<typeof DataGridDateCellContent>

export const Default: Story = {
	args: {
		column: { name: 'name', field: 'name', value: false, date: new Date(2023, 3, 3) },
		item: { name: new Date() }
	}
}
