import { Meta, StoryObj } from '@storybook/vue3'
import Dropdown from './Dropdown.vue'
import Icon from '../../general/Icon/Icon.vue'
import { DropdownGroupType, DropdownItemType } from './types'

const dropdownItems: DropdownItemType[] = [
	{ label: 'Item 1', value: 'value1', action: () => console.log('selected Item 1.') },
	{ label: 'Item 2', value: 'value2', action: () => console.log('selected Item 2.') },
	{ label: 'Item 3', value: 'value3', action: () => console.log('selected Item 3.') },
	{ label: 'Item 4', value: 'value4', action: () => console.log('selected Item 4.') },
	{ label: 'Item 5', value: 'value5', action: () => console.log('selected Item 5.') },
	{ label: 'Item 6', value: 'value6', action: () => console.log('selected Item 6.') },
	{ label: 'Item 7', value: 'value7', action: () => console.log('selected Item 7.') },
	{ label: 'Item 8', value: 'value8', action: () => console.log('selected Item 8.') },
	{ label: 'Item 9', value: 'value9', action: () => console.log('selected Item 9.') },
	{ label: 'Item 10', value: 'value10', action: () => console.log('selected Item 10.') },
	{ label: 'Item 11', value: 'value11', action: () => console.log('selected Item 11.') },
	{ label: 'Item 12', value: 'value12', action: () => console.log('selected Item 12.') }
]

const dropdownGroupItems: DropdownGroupType[] = [
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
			{ label: 'SubItem 2.1', value: 'value2.1', action: () => console.log('selected option 2.1.') },
			{ label: 'SubItem 2.2', value: 'value2.2', action: () => console.log('selected option 2.2.') }
		]
	},
	{
		name: 'Group3:',
		items: [
			{ label: 'SubItem 3.1', value: 'value3.1', action: () => console.log('selected option 3.1.') },
			{ label: 'SubItem 3.2', value: 'value3.2', action: () => console.log('selected option 3.2.') }
		]
	},
	{
		name: 'Group4:',
		items: [
			{ label: 'SubItem 4.1', value: 'value4.1', action: () => console.log('selected option 4.1.') },
			{ label: 'SubItem 4.2', value: 'value4.2', action: () => console.log('selected option 4.2.') }
		]
	}
]

export default {
	component: Dropdown,
	args: {
		label: 'Dropdown',
		selected: [],
		disabled: false,
		caret: true,
		icon: 'internet',
		loading: false,
		items: dropdownItems,
		autoClose: true,
		related: false,
		multiple: false,
		viewport: null
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
		},
		placement: {
			control: 'select',
			options: ['start', 'end']
		}
	},
	render: (args) => ({
		components: { Dropdown },
		setup() {
			return { args }
		},
		template: `
		<Dropdown v-bind="args" v-model:selected="args.selected" >
		</Dropdown>
	  `
	})
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
		<Dropdown v-bind="args"  v-model:selected="args.selected">
		  <template #item="{ item }">
			<i>{{ item.label }}</i>
		  </template>
		  <template #menuFooter>
				<div><i>Footer</i></div>
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
	  <Dropdown v-bind="args"  v-model:selected="args.selected">
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
		<Dropdown v-bind="args"  v-model:selected="args.selected">
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
		items: dropdownGroupItems
	},
	render: (args) => ({
		components: { Dropdown },
		setup() {
			return { args }
		},
		template: `
		<Dropdown v-bind="args"  v-model:selected="args.selected">
			<template #contentHeader>
				<b>Dropdown header</b>
			</template>
			<template #item="{ item }">
				<div>{{ item.label }}</div>
			</template>
			<template #groupLabel="{ group }">
				<div>{{ group.name }}</div>
			</template>
			<template #contentFooter>
				<div><i>Content Footer</i></div>
			</template>
			<template #menuFooter>
				<div><i>Footer</i></div>
			</template>
		</Dropdown>
	  `
	})
}

export const BottomedDropdown: Story = {
	args: {
		items: dropdownItems,
		visibleSize: `400px`
	},
	render: (args) => ({
		components: { Dropdown },
		setup() {
			return { args }
		},
		template: `
		<Dropdown v-bind="args" style="top: 80vh"  v-model:selected="args.selected">
			<template #contentHeader>
				<b>Dropdown header</b>
			</template>
			<template #item="{ item }">
				<div>{{ item.label }}</div>
			</template>
			<template #groupLabel="{ group }">
				<div>{{ group.name }}</div>
			</template>
			<template #menuFooter>
				<div><i>Footer</i></div>
			</template>
		</Dropdown>
	  `
	})
}

export const DropdownDefaultSlot: Story = {
	render: (args) => ({
		components: { Dropdown },
		setup() {
			return { args }
		},
		template: `
		<Dropdown v-bind="args">
			<template #default>
				<div>Loading</div>
			</template>
		</Dropdown>
	  `
	})
}
