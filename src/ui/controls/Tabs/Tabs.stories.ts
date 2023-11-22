import { Meta, StoryObj } from '@storybook/vue3'
import Tabs from './Tabs.vue'
import Tab from './Tab.vue'

export default {
	component: Tabs,
	args: {
		modelValue: 1
	},
	render: (args) => ({
		components: { Tabs, Tab },
		setup: () => ({ args }),
		template: `
			<Tabs v-bind='args'>
				<Tab :value='1'>Tab 1</Tab>
				<Tab :value='2'>Tab 2</Tab>
				<Tab :value='3'>Tab 3</Tab>
			</Tabs>
		`
	})
} satisfies Meta<typeof Tabs>

type Story = StoryObj<typeof Tabs>

export const Default: Story = {}
