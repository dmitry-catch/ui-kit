import { Meta, StoryObj } from '@storybook/vue3'
import Dropdown from './Dropdown.vue'
import DropdownItem from './DropdownItem/DropdownItem.vue'
import Icon from '../../general/Icon/Icon.vue'

export default {
	component: Dropdown,
	args: {
		title: 'Dropdown',
		disabled: false,
		caret: true,
		icon: 'internet',
		loading: false,
		items: [
			{
				label: 'Item 1',
				value: 'value1',
				extraAttrs: { disabled: true },
				wrapperClass: 'Dropdown__wrapperClass',
				action: () => console.log('selected Item 1.')
			},
			{ label: 'Item 2', value: 'value2', action: () => console.log('selected Item 2.') },
			{
				name: 'Группа 1',
				
				items: [
					{
						label: 'SubItem 1',
						value: 'value1.1',
						
						action: () => console.log('selected option 1.1.')
					},
					{ label: 'SubItem 2', value: 'value1.2', action: () => console.log('selected option 1.2.'), extraAttrs: { disabled: true } }
				]
			}
		]
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
	},
    render: (args) => ({
		components: { Dropdown, DropdownItem, Icon },
		setup: () => ({ args }),
		template: `
		<Dropdown v-bind="args">
			<template #toggle> Toggle </template>
			<template #header> Dropdown header </template>
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

} satisfies Meta<typeof Dropdown>

type Story = StoryObj<typeof Dropdown>

export const Default: Story = {}
