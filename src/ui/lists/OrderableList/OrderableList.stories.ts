import { Meta, StoryObj } from '@storybook/vue3'
import OrderableList from './OrderableList.vue'

export default {
	component: OrderableList,
	render: (args) => ({
		components: { OrderableList },
		setup: () => ({ args }),
		template: `
			<OrderableList v-bind='args'>
				<template v-slot:itemTemplate='slotProps'>
					{{ slotProps.data.name }}
				</template>
			</OrderableList>`
	}),
	args: {
		modelValue: [{ name: 'Item 1' }, { name: 'Item 2' }, { name: 'Item 3' }, { name: 'Item 4' }, { name: 'Item 5' }]
	}
} satisfies Meta<typeof OrderableList>

type Story = StoryObj<typeof OrderableList>

export const Default: Story = {}
