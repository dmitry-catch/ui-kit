import { Meta, StoryObj } from '@storybook/vue3'
import DataGridRowGroup from './DataGridRowGroup.vue'
import { provide, ref } from 'vue'

export default {
	component: DataGridRowGroup,
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
		components: { DataGridRowGroup },
		setup: () => {
			const selectedColumns = ref([false])
			provide('datagrid-selectedRows', selectedColumns)
			return { args }
		},
		template: '<DataGridRowGroup v-bind="args" />'
	})
} satisfies Meta<typeof DataGridRowGroup>

type Story = StoryObj<typeof DataGridRowGroup>

export const Default: Story = {}
