import { Meta, StoryObj } from '@storybook/vue3'
import Dropdown from './Dropdown.vue'
import Icon from '../../general/Icon/Icon.vue'

const dropdownItems = [
	{ label: 'Item 1', value: 'value1', action: () => console.log('selected Item 1.') },
	{ label: 'Item 2', value: 'value2', action: () => console.log('selected Item 2.') },
	{ label: 'Item 3', value: 'value3', action: () => console.log('selected Item 3.') },
	{ label: 'Item 4', value: 'value4', action: () => console.log('selected Item 4.') }
]

const dropdownGroupItems = [
	{
		name: 'Group1:',
		items: [
			{ label: 'SubItem 1.1', value: 'value1.1', action: () => console.log('selected option 1.1.') },
			{ label: 'SubItem 1.2', value: 'value1.2', action: () => console.log('selected option 1.2.') }
		]
	},
	{
		name: 'Group2:',
		items: [
			{ label: 'SubItem 2.2', value: 'value1.1', action: () => console.log('selected option 1.1.') },
			{ label: 'SubItem 2.2', value: 'value1.2', action: () => console.log('selected option 1.2.') }
		]
	}
]

export default {
	component: Dropdown,
	args: {
		title: 'Dropdown',
		disabled: false,
		caret: true,
		icon: 'internet',
		loading: false,
		items: dropdownItems,
		autoClose: true
	},
	argTypes: {
		size: {
			control: 'select',
			options: ['extra-small', 'small', 'medium']
		},
		variant: {
			control: 'select',
			options: ['default', 'icon', 'functional', 'accent']
		},
		autoClose: {
			control: 'select',
			options: [true, 'keyboard', 'outside', 'item']
		}
	}
} satisfies Meta<typeof Dropdown>

type Story = StoryObj<typeof Dropdown>

export const Default: Story = {}

export const CustomItems: Story = {
	render: (args) => ({
		components: { Dropdown },
		setup() {
			return { args }
		},
		template: `
		<Dropdown v-bind="args">
		  <template #item="{ item }">
			<i>{{ item.label }}</i>
		  </template>
		</Dropdown>
	  `
	})
}

export const Groups: Story = {
	args: {
		items: dropdownGroupItems
	}
}

export const CustomGroups: Story = {
	args: {
		items: dropdownGroupItems
	},
	render: (args) => ({
		components: { Dropdown },
		setup() {
			return { args }
		},
		template: `
	  <Dropdown v-bind="args">
		<template #groupLabel="{ group }">
		  <i>{{ group.name }}</i>
		</template>
	  </Dropdown>
	  `
	})
}

export const CustomToggle: Story = {
	render: (args) => ({
		components: { Dropdown, Icon },
		setup() {
			return { args }
		},
		template: `
		<Dropdown v-bind="args">
			<template #toggle>
				<Icon name='edit' />
			</template>
		</Dropdown>
	  `
	})
}

export const TextContent: Story = {
	args: {
		default: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.'
	}
}

export const MiscellaneousContent: Story = {
	args: {
		items: [...dropdownItems, ...dropdownGroupItems]
	},
	render: (args) => ({
		components: { Dropdown },
		setup() {
			return { args }
		},
		template: `
		<Dropdown v-bind="args">
			<template #header>
				<b>Dropdown header</b>
			</template>
			<template #item="{ item }">
				<div>{{ item.label }}</div>
			</template>
			<template #groupLabel="{ group }">
				<div>{{ group.name }}</div>
			</template>
			<template #footer>
				<i>Footer</i>
			</template>
		</Dropdown>
	  `
	})
}
