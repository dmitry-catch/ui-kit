import { Meta, StoryObj } from '@storybook/vue3'
import DataList from './DataList.vue'
import { ContextType, DataListGroupType, DataListItemType } from './types.js'
import { ref } from 'vue'

const dataListItems: DataListItemType<any>[] = [
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

const dataListLazyGroups: DataListGroupType[] = [
	{
		key: 'Group1',
		data: [],
		isCollapsed: true
	}
]

const dataListLazyItems: DataListItemType<any>[] = [
	{ label: 'Item 1.1', value: 'value1.1', action: () => console.log('selected option 1.1.') },
	{ label: 'Item 1.2', value: 'value1.2', action: () => console.log('selected option 1.2.') },
	{ label: 'Item 1.3', value: 'value1.3', action: () => console.log('selected option 1.3.') },
	{ label: 'Item 1.4', value: 'value1.4', action: () => console.log('selected option 1.4.') },
	{ label: 'Item 1.5', value: 'value1.5', action: () => console.log('selected option 1.5.') }
]

const dataListItemsToAdd: DataListItemType<any>[] = [
	{ label: 'Item 1.1', value: 'value1.1', action: () => console.log('selected option 1.1.') },
	{ label: 'Item 1.2', value: 'value1.2', action: () => console.log('selected option 1.2.') },
	{ label: 'Item 1.3', value: 'value1.3', action: () => console.log('selected option 1.3.') },
	{ label: 'Item 1.4', value: 'value1.4', action: () => console.log('selected option 1.4.') },
	{ label: 'Item 1.5', value: 'value1.5', action: () => console.log('selected option 1.5.') },
	{ label: 'Item 1.6', value: 'value1.6', action: () => console.log('selected option 1.6.') },
	{ label: 'Item 1.7', value: 'value1.7', action: () => console.log('selected option 1.7.') },
	{ label: 'Item 1.8', value: 'value1.1', action: () => console.log('selected option 1.1.') },
	{ label: 'Item 1.9', value: 'value1.2', action: () => console.log('selected option 1.2.') },
	{ label: 'Item 1.10', value: 'value1.3', action: () => console.log('selected option 1.3.') }
]

export default {
	component: DataList as any,
	args: {
		data: dataListItems,
		loading: false,
		hover: false,
		expandable: false,
		lazy: false
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
		data: dataListGroupItems
	}
}

export const CustomGroups: Story = {
	args: {
		data: dataListGroupItems
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
		data: dataListGroupItems,
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
		data: [],
		empty: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.'
	}
}

export const MiscellaneousContent: Story = {
	args: {
		data: [...dataListItems, ...dataListGroupItems]
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

export const LazyGroups: Story = {
	render: () => ({
		components: { DataList },
		setup: () => {
			const data = ref(dataListLazyGroups)
			const loadData = async (context: ContextType) => {
				if (context.type === 'group') {
					context.loading.value = true
					await new Promise((resolve) => setTimeout(resolve, 3000))
					if (context.current.value && context.current.value.data.length === 5) {
						context.current.value.data.push(...dataListItemsToAdd.slice(5, 10))
						context.completed.value = true
					} else if (context.current.value && context.current.value.data.length < 5) {
						context.current.value.data = dataListItemsToAdd.slice(0, 5)
						context.completed.value = false
					}
					context.loading.value = false
				}
			}
			return { data, loadData }
		},
		template: `
		<DataList
			:data="data"
			@load="loadData"
			lazy="true"
			expandable="true"
		>
			
		</DataList>`
	})
}

export const LazyItems: Story = {
	render: () => ({
		components: { DataList },
		setup: () => {
			const data = ref(dataListLazyItems)
			const loadData = async (context: ContextType) => {
				if (context.type === 'list') {
					context.loading.value = true
					await new Promise((resolve) => setTimeout(resolve, 3000))
					if (context.current.value && context.current.value.length === 5) {
						context.current.value.push(...dataListItemsToAdd.slice(5))
						context.completed.value = true
					} else if (context.current.value && context.current.value.length < 5) {
						context.current.value = dataListItemsToAdd.slice(0, 5)
						context.completed.value = false
					}
					context.loading.value = false
				}
			}
			return { data, loadData }
		},
		template: `
		<DataList
			:data="data"
			@load="loadData"
			lazy="true"
		>
			
		</DataList>`
	})
}
