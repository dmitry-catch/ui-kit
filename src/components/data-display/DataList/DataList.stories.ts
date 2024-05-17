import { Meta, StoryObj } from '@storybook/vue3'
import DataList from './DataList.vue'
import { DataListLoadContext, DataListGroupType, DataListItemType } from './types.js'
import { ref } from 'vue'
import Spinner from '../../general/Spinner/Spinner.vue'
import Button from '../../general/Button/Button.vue'

const fillData = (size: number) =>
	Array(size)
		.fill(0)
		.map((_, idx) => ({ label: `Item ${idx + 1}`, value: `value${idx + 1}` }))

const dataListItems: DataListItemType<string>[] = fillData(4)

const dataListGroupItems: DataListGroupType<string>[] = Array(2)
	.fill(0)
	.map((_, idx) => ({
		key: `Group ${idx + 1}`,
		data: fillData(2)
	}))

const dataListLazyGroups: DataListGroupType<string>[] = Array(3)
	.fill(0)
	.map((_, idx) => ({
		key: `Group ${idx + 1}`,
		data: [],
		isCollapsed: true
	}))

const dataListLazyGroupItems: DataListItemType<string>[] = fillData(5)

export default {
	component: DataList,
	args: {
		data: dataListItems,
		loading: false,
		hover: false,
		expandable: false,
		loadMore: ''
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
		  <template #loadMore>
				<div></div>
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
			<template #loadMore>
				<div></div>
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
			<template #loadMore>
				<div></div>
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
			<template #loadMore>
				<div></div>
			</template>
		</DataList>
	  `
	})
}

export const LazyGroups: Story = {
	args: {
		data: dataListLazyGroups,
		loadMore: `<Button class="functional" @click="load(data)" >Загрузить еще</Button>`,
		onLoad: async (context: DataListLoadContext<string>) => {
			if (context.type === 'group') {
				context.loading = true
				await new Promise((resolve) => setTimeout(resolve, 3000))
				if (context.current && context.current.data.length === 5) {
					context.current.data.push(
						...dataListLazyGroupItems.map((item, idx) => ({ ...item, label: `Item ${idx + 6}` }))
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
		components: { DataList, Button },
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
		<template #loadMore ="{load}">
			${args.loadMore}
		</template>
		</DataList>`
	})
}

export const LazyItems: Story = {
	args: {
		loadMore: `<Button class="functional" @click="load(data)" >Загрузить еще</Button>`,
		data: dataListItems,
		onLoad: async (context: DataListLoadContext<string>) => {
			if (context.type === 'list') {
				context.loading = true
				await new Promise((resolve) => setTimeout(resolve, 3000))
				if (context.current && context.current.length === 4) {
					context.current.push(...dataListItems.map((item, idx) => ({ ...item, label: `Item ${idx + 5}` })))
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
		<template #loadMore ="{ load}">
			${args.loadMore}
		</template>
		</DataList>`
	})
}
