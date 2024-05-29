import { Meta, StoryObj } from '@storybook/vue3'

import { Sidenav } from '../../../main.js'

export default {
	component: Sidenav,
	args: {
		collapsed: false,
		open: [],
		active: '',
		header: 'Header',
		footer: 'Footer',
		default: 'Item',
		style: {
			'max-height': '400px'
		}
	},
	argTypes: {
		active: {
			description: 'Активный элемент'
		},
		open: {
			description: 'Массив открытых меню'
		}
	}
} satisfies Meta<typeof Sidenav>

type Story = StoryObj<typeof Sidenav>

export const Default: Story = {
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

export const Badge: Story = {
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
			<SidenavItem id="1" icon="bar_chart" badge="99">Item 1</SidenavItem>
			<SidenavMenu id="2" icon="bar_chart" badge="99" title="Item 2">
				<SidenavItem id="2.1">Item 2.1</SidenavItem>
				<SidenavItem id="2.2">Item 2.2</SidenavItem>
			</SidenavMenu>
			<template #footer>Footer</template>
		</Sidenav>`
	})
}

export const Disabled: Story = {
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
			<SidenavItem id="1" icon="bar_chart" :disabled="true" badge="99" >Item 1</SidenavItem>
			<SidenavMenu id="2" icon="bar_chart" :disabled="true" badge="99" title="Item 2">
				<SidenavItem disabled id="2.1">Item 2.1</SidenavItem>
				<SidenavItem disabled id="2.2">Item 2.2</SidenavItem>
			</SidenavMenu>
			<template #footer>Footer</template>
		</Sidenav>`
	})
}
