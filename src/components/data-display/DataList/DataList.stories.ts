import { Meta, StoryObj } from '@storybook/vue3'
import DataList from './DataList.vue'
import { DataListLoadContext, DataListGroupType, DataListItemType } from './types.js'
import { ref } from 'vue'
import Spinner from '../../general/Spinner/Spinner.vue'
import Button from '../../general/Button/Button.vue'

const dataListItems: DataListItemType<string>[] = [
	{ label: 'Item 1', value: 'value1', action: () => console.log('selected Item 1.') },
	{ label: 'Item 2', value: 'value2', action: () => console.log('selected Item 2.') },
	{ label: 'Item 3', value: 'value3', action: () => console.log('selected Item 3.') },
	{ label: 'Item 4', value: 'value4', action: () => console.log('selected Item 4.') }
]

const dataListGroupItems: DataListGroupType<string>[] = [
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

const dataListLazyGroups: DataListGroupType<string>[] = [
	{
		key: 'Group1',
		data: [],
		isCollapsed: true
	},
	{
		key: 'Group2',
		data: [],
		isCollapsed: true
	},
	{
		key: 'Group3',
		data: [],
		isCollapsed: true
	}
]

const dataListLazyGroupItems: DataListItemType<string>[] = [
	{ label: 'Item 1.1', value: 'value1.1', action: () => console.log('selected option 1.1.') },
	{ label: 'Item 1.2', value: 'value1.2', action: () => console.log('selected option 1.2.') },
	{ label: 'Item 1.3', value: 'value1.3', action: () => console.log('selected option 1.3.') },
	{ label: 'Item 1.4', value: 'value1.4', action: () => console.log('selected option 1.4.') },
	{ label: 'Item 1.5', value: 'value1.5', action: () => console.log('selected option 1.5.') }
]

export default {
	component: DataList,
	args: {
		data: dataListItems,
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
	args: {
		data: dataListLazyGroups,
		loadMoreGroup: `<Button v-if="!groupContext.completed && !groupContext.loading" class="functional" @click="loadGroup(groupContext)" >Загрузить еще</Button>
		<Spinner v-else-if="groupContext.loading" />`,
		onLoad: async (context: DataListLoadContext<string>) => {
			if (context.type === 'group') {
				context.loading = true
				await new Promise((resolve) => setTimeout(resolve, 3000))
				if (context.current && context.current.data.length === 5) {
					context.current.data.push(
						...dataListLazyGroupItems.map((item, idx) => ({ ...item, label: `Item 1.${idx + 6}` }))
					)
					context.completed = true
				} else if (context.current && context.current.data.length < 5) {
					context.current.data = dataListLazyGroupItems.slice(0, 5)
					context.completed = false
				}
				context.loading = false
			}
		}
	},
	render: (args) => ({
		components: { DataList, Spinner, Button },
		setup: () => {
			const data = ref(dataListLazyGroups)
			
			return { data, args }
		},
		template: `
		<DataList
			:data="data"
			@load="args.onLoad"
			expandable="true"
		>
		<template #loadMoreGroup ="{ loadGroup, groupContext }">
			${args.loadMoreGroup}
		</template>
		</DataList>`
	})
}

export const LazyItems: Story = {
	args: {
		loadMore: `<Button v-if="!context.completed && !context.loading" class="functional" @click="loadList(data)" >Загрузить еще</Button>
		<Spinner v-else-if="context.loading" />`,
		data: dataListItems,
		onLoad: async (context: DataListLoadContext<string>) => {
			if (context.type === 'list') {
				context.loading = true
				await new Promise((resolve) => setTimeout(resolve, 3000))
				if (context.current && context.current.length === 4) {
					context.current.push(
						...dataListItems.map((item, idx) => ({ ...item, label: `Item ${idx + 5}` }))
					)
					context.completed = true
				} else if (context.current && context.current.length < 4) {
					context.current = dataListItems.slice(0, 4)
					context.completed = false
				}
				context.loading = false
			}
		}
	},
	render: (args) => ({
		components: { DataList, Button, Spinner },
		setup: () => {
			const data = ref(dataListItems)
			
			return { data, args }
		},
		template: `
		<DataList
			v-model:data="data"
			@load="args.onLoad"
		>
		<template #loadMore ="{ loadList, context }">
			${args.loadMore}
		</template>
		</DataList>`
	})
}
