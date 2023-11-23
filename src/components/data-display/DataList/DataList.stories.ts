import { Meta, StoryObj } from '@storybook/vue3'
import DataList from './DataList.vue'
import { action } from '@storybook/addon-actions'

export default {
	component: DataList,
	args: {
		dataSource: [
			{ name: 'Item 1' },
			{ name: 'Item 2' },
			{ name: 'Item 3' },
			{ name: 'Item 4' },
			{ name: 'Item 5' }
		],
		contextMenu: [
			{ name: 'Point 1' },
			{ name: 'Point 2' },
			{ name: 'Point 3' },
			{ name: 'Point 4' },
			{ name: 'Point 5' }
		],
		onItemClick: action('itemClick')
	},
	render: (args) => ({
		components: { DataList },
		setup: () => ({ args }),
		template: `
			<DataList v-bind='args'>
				<template v-slot:listItem='slotProps'>
					{{ slotProps.data.name }}
				</template>
				<template v-slot:contextMenuItem='slotProps'>
					{{ slotProps.data.name }}
				</template>
			</DataList>`
	})
} satisfies Meta<typeof DataList>

type Story = StoryObj<typeof DataList>

export const Default: Story = {}
