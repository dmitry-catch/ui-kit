import { Meta, StoryObj } from '@storybook/vue3'
import DataListItem from './DataListItem.vue'

export default {
	component: DataListItem,
	args: {
		data: { name: 123 },
		contextMenu: [
			{ name: 'Point 1' },
			{ name: 'Point 2' },
			{ name: 'Point 3' },
			{ name: 'Point 4' },
			{ name: 'Point 5' }
		]
	},
	render: (args) => ({
		components: { DataListItem },
		setup: () => ({ args }),
		template: `
			<DataListItem v-bind='args'>
				<template v-slot:content='slotProps'>
					{{slotProps.data}}
				</template>
				<template v-slot:contextMenuItem='slotProps'>
					{{slotProps.data}}
				</template>
			</DataListItem>
		`
	})
} satisfies Meta<typeof DataListItem>

type Story = StoryObj<typeof DataListItem>

export const Default: Story = {}
