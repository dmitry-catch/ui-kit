import { Meta, StoryObj } from '@storybook/vue3'
import DataList from './DataList.vue'
import { action } from '@storybook/addon-actions'

const onMenuItemClick = action('Menu item click')

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
			{ name: 'Point 1', action: onMenuItemClick },
			{ name: 'Point 2', action: onMenuItemClick },
			{ name: 'Point 3', action: onMenuItemClick },
			{ name: 'Point 4', action: onMenuItemClick },
			{ name: 'Point 5', action: onMenuItemClick }
		],
		onItemClick: action('Item click')
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
