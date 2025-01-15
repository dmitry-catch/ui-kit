import { Meta, StoryObj } from '@storybook/vue3'

import { Sidenav } from './index.js'

export default {
	component: Sidenav,
	args: {
		collapsed: false,
		open: [],
		active: '',
		hidden: [],
		header: 'Header',
		footer: 'Footer',
		style: {
			height: '400px'
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
			<SidenavItem id="1" icon="expand">Item 1</SidenavItem>
			<SidenavMenu id="2" icon="bar_chart" title="Item 2">
				<SidenavItem id="2.1">Item 2.1</SidenavItem>
				<SidenavItem id="2.2">Item 2.2</SidenavItem>
			</SidenavMenu>
			<template #footer>Footer</template>
		</Sidenav>`
	})
}
/** Скрыты элемент Item 1, меню Item 2 и элемент меню Item 3.2 */
export const Hided: Story = {
	args: {
		hidden: ['1', '2', '3.2']
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
			<SidenavItem id="1" icon="expand">Item 1</SidenavItem>
			<SidenavMenu id="2" icon="bar_chart" title="Item 2">
				<SidenavItem id="2.1">Item 2.1</SidenavItem>
				<SidenavItem id="2.2">Item 2.2</SidenavItem>
			</SidenavMenu>
			<SidenavMenu id="3" icon="bar_chart" title="Item 3">
				<SidenavItem id="3.1">Item 3.1</SidenavItem>
				<SidenavItem id="3.2">Item 3.2</SidenavItem>
			</SidenavMenu>
			<template #footer>Footer</template>
		</Sidenav>`
	})
}

export const Overflow: Story = {
	args: {
		open: ['2', '4']
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
			<SidenavItem id="1" icon="expand">Item 1</SidenavItem>
			<SidenavMenu id="2" icon="bar_chart" title="Item 2">
				<SidenavItem id="2.1">Item 2.1</SidenavItem>
				<SidenavItem id="2.2">Item 2.2</SidenavItem>
			</SidenavMenu>
			<SidenavItem id="3" icon="expand">Item 3</SidenavItem>
			<SidenavMenu id="4" icon="bar_chart" title="Item 4">
				<SidenavItem id="4.1">Item 4.1</SidenavItem>
				<SidenavItem id="4.2">Item 4.2</SidenavItem>
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
			<SidenavItem id="1" icon="expand" badge="99">Item 1</SidenavItem>
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
			<SidenavItem id="1" icon="expand" :disabled="true" badge="99" >Item 1</SidenavItem>
			<SidenavMenu id="2" icon="bar_chart" :disabled="true" badge="99" title="Item 2">
				<SidenavItem disabled id="2.1">Item 2.1</SidenavItem>
				<SidenavItem disabled id="2.2">Item 2.2</SidenavItem>
			</SidenavMenu>
			<template #footer>Footer</template>
		</Sidenav>`
	})
}
