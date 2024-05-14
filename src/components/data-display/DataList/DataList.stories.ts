import { Meta, StoryObj } from '@storybook/vue3'
import DataList from './DataList.vue'
import { DataListGroupType, DataListItemType } from './types.js'

const dataListItems: DataListItemType[] = [
	{ label: 'Item 1', value: 'value1', action: () => console.log('selected Item 1.') },
	{ label: 'Item 2', value: 'value2', action: () => console.log('selected Item 2.') },
	{ label: 'Item 3', value: 'value3', action: () => console.log('selected Item 3.') },
	{ label: 'Item 4', value: 'value4', action: () => console.log('selected Item 4.') }
]

const dataListGroupItems: DataListGroupType[] = [
	{
		key: 'Group1',
		data: [
			{ label: 'SubItem 1.1', value: 'value1.1', action: () => console.log('selected option 1.1.') },
			{ label: 'SubItem 1.2', value: 'value1.2', action: () => console.log('selected option 1.2.') }
		]
	},
	{
		key: 'Group2',
		data: [
			{ label: 'SubItem 2.2', value: 'value1.1', action: () => console.log('selected option 1.1.') },
			{ label: 'SubItem 2.2', value: 'value1.2', action: () => console.log('selected option 1.2.') }
		]
	}
]

export default {
	component: DataList,
	args: {
		items: dataListItems,
		loading: false,
		hover: false,
		expandable: false
	},
	argTypes: {
		size: {
			control: 'select',
			options: ['extra-small', 'small', 'medium']
		}
	}
} satisfies Meta<typeof DataList>

type Story = StoryObj<typeof DataList>

export const Default: Story = {}

export const Loading: Story = {
	args: {
		loading: true
	}
}

/** Элементы подсвечиваются при наведении мышкой */
export const HoverEnable: Story = {
	args: {
		hover: true
	}
}

export const CustomItems: Story = {
	render: (args) => ({
		components: { DataList },
		setup() {
			return { args }
		},
		template: `
		<DataList v-bind="args">
		  <template #item="{ item }">
			<i>{{ item.label }}</i>
		  </template>
		</DataList>
	  `
	})
}

export const Groups: Story = {
	args: {
		items: dataListGroupItems
	}
}

export const CustomGroups: Story = {
	args: {
		items: dataListGroupItems
	},
	render: (args) => ({
		components: { DataList },
		setup() {
			return { args }
		},
		template: `
	  	<DataList v-bind="args">
			<template #groupLabel="{ group }">
			  <i>{{ group.key }}</i>
			</template>
	  	</DataList>
	  `
	})
}

export const CollapseGroups: Story = {
	args: {
		items: dataListGroupItems,
		expandable: true
	},
	render: (args) => ({
		components: { DataList },
		setup() {
			return { args }
		},
		template: `
	  	<DataList v-bind="args">
			<template #groupLabel="{ group }">
			  <div>{{ group.key }}</div>
			</template>
	  	</DataList>
	  `
	})
}

export const EmptyPlaceholder: Story = {
	args: {
		items: [],
		empty: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.'
	}
}

export const MiscellaneousContent: Story = {
	args: {
		items: [...dataListItems, ...dataListGroupItems]
	},
	render: (args) => ({
		components: { DataList },
		setup() {
			return { args }
		},
		template: `
		<DataList v-bind="args">
			<template #header>
				<b>DataList header</b>
			</template>
			<template #item="{ item }">
				<div>{{ item.label }}</div>
			</template>
			<template #groupLabel="{ group }">
				<div>{{ group.key }}</div>
			</template>
			<template #footer>
				<i>Footer</i>
			</template>
		</DataList>
	  `
	})
}
