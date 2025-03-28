import { Meta, StoryObj } from '@storybook/vue3'

import { Sidenav } from '../../../main.js'

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
		components: { Sidenav, SidenavItem: Sidenav.Item, SidenavMenu: Sidenav.Menu, SidenavToggle: Sidenav.Toggle },
		setup() {
			return {
				args
			}
		},
		template: `
		<Sidenav v-bind="args">
			<template #header>Header</template>
			<SidenavToggle @click="args.collapsed = !args.collapsed">Menu</SidenavToggle>
			<SidenavItem id="1" icon="bar_chart">Item 1</SidenavItem>
			<SidenavMenu id="2" icon="bar_chart" title="Item 2">
				<SidenavItem id="2.1">Item 2.1</SidenavItem>
				<SidenavItem id="2.2">Item 2.2</SidenavItem>
			</SidenavMenu>
			<template #footer>Footer</template>
		</Sidenav>`
	})
}
