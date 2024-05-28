import { Meta, StoryObj } from '@storybook/vue3'
import Sidenav from './Sidenav.vue'
import { Toggle, Item, Menu } from './index.js'

export default {
	component: Sidenav,
	args: {
		collapsed: false,
		open: '',
		active: '',
		header: 'Header',
		footer: 'Footer',
		default: 'Item',
		style: {
			'max-height': '400px'
		}
	}
} satisfies Meta<typeof Sidenav>

type Story = StoryObj<typeof Sidenav>

export const Default: Story = {}

export const Interactive: Story = {
	args: {
		collapsed: false
	},
	render: (args) => ({
		components: { Sidenav, Toggle, Item, Menu },
		setup() {
			return {
				args
			}
		},
		template: `
		<Sidenav v-bind="args">
			<template #header>Header</template>
			<Toggle @click="args.collapsed = !args.collapsed">Menu</Toggle>
			<Item id="1" icon="bar_chart">Item 1</Item>
			<Menu id="2" icon="bar_chart" title="Item 2">
				<Item id="2.1">Item 2.1</Item>
				<Item id="2.2">Item 2.2</Item>
			</Menu>
			<template #footer>Footer</template>
		</Sidenav>`
	})
}
