import { Meta, StoryObj } from '@storybook/vue3'
import DataListGroup from './DataListGroup.vue'
import { action } from '@storybook/addon-actions'

export default {
	component: DataListGroup,
	args: {
		data: {
			_tag: 'group',
			data: [{ name: 'Item 1' }, { name: 'Item 2' }, { name: 'Item 3' }, { name: 'Item 4' }, { name: 'Item 5' }]
		},
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
		components: { DataListGroup },
		setup: () => ({ args }),
		template: `
			<DataListGroup v-bind='args'>
				<template v-slot:content='{data}'>
					{{ data.name }}
				</template>
				<template v-slot:contextMenuItem='{data}'>
					{{ data.name }}
				</template>
			</DataListGroup>`
	})
} satisfies Meta<typeof DataListGroup>

type Story = StoryObj<typeof DataListGroup>

export const Default: Story = {}
