import { Meta, StoryObj } from '@storybook/vue3'
import DataGridRow from './DataGridRow.vue'
import { provide, ref } from 'vue'

export default {
	component: DataGridRow,
	args: {
		detailsColumn: false,
		selectColumn: false,
		columns: [
			{ name: 'name', field: 'name', value: false, date: new Date(2023, 3, 3) },
			{ name: 'field', field: 'field', value: true, date: new Date(2023, 3, 3) }
		],
		item: { name: 'name', value: false }
	},
	render: (args: any) => ({
		components: { DataGridRow },
		setup: () => {
			const selectedColumns = ref([false])
			provide('datagrid-selectedRows', selectedColumns)
			return { args }
		},
		template: '<DataGridRow v-bind="args" />'
	})
} satisfies Meta<typeof DataGridRow>

type Story = StoryObj<typeof DataGridRow>
export const Default: Story = {}
