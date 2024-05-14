<script setup lang="ts">
import { ref } from 'vue'
import DataList from '../src/components/data-display/DataList/DataList.vue'
import { ContextType, DataListGroupType, DataListItemType } from '../src/components/data-display/DataList/types'

const dataListGroupItems: DataListGroupType[] = [
	{
		key: 'Group1',
		data: [],
		isCollapsed: true
	},
	{
		key: 'Group2',
		data: [],
		isCollapsed: true
	}
]

const dataListItemss: DataListItemType<any>[] = [
	{ label: 'Item 1.1', value: 'value1.1', action: () => console.log('selected option 1.1.') },
	{ label: 'Item 1.2', value: 'value1.2', action: () => console.log('selected option 1.2.') },
	{ label: 'Item 1.3', value: 'value1.3', action: () => console.log('selected option 1.3.') },
	{ label: 'Item 1.4', value: 'value1.4', action: () => console.log('selected option 1.4.') },
	{ label: 'Item 1.5', value: 'value1.5', action: () => console.log('selected option 1.5.') },
	{ label: 'Item 1.6', value: 'value1.6', action: () => console.log('selected option 1.6.') },
	{ label: 'Item 1.7', value: 'value1.7', action: () => console.log('selected option 1.7.') },
	{ label: 'Item 1.1', value: 'value1.1', action: () => console.log('selected option 1.1.') },
	{ label: 'Item 1.2', value: 'value1.2', action: () => console.log('selected option 1.2.') },
	{ label: 'Item 1.3', value: 'value1.3', action: () => console.log('selected option 1.3.') }
]

const dataListItems: DataListItemType<any>[] = [
	{ label: 'Item 1.1', value: 'value1.1', action: () => console.log('selected option 1.1.') },
	{ label: 'Item 1.2', value: 'value1.2', action: () => console.log('selected option 1.2.') },
	{ label: 'Item 1.3', value: 'value1.3', action: () => console.log('selected option 1.3.') },
	{ label: 'Item 1.4', value: 'value1.4', action: () => console.log('selected option 1.4.') },
	{ label: 'Item 1.5', value: 'value1.5', action: () => console.log('selected option 1.5.') },
	{ label: 'Item 1.6', value: 'value1.6', action: () => console.log('selected option 1.6.') },
	{ label: 'Item 1.7', value: 'value1.7', action: () => console.log('selected option 1.7.') },
	{ label: 'Item 1.1', value: 'value1.1', action: () => console.log('selected option 1.1.') },
	{ label: 'Item 1.2', value: 'value1.2', action: () => console.log('selected option 1.2.') },
	{ label: 'Item 1.3', value: 'value1.3', action: () => console.log('selected option 1.3.') },
	{ label: 'Item 1.4', value: 'value1.4', action: () => console.log('selected option 1.4.') },
	{ label: 'Item 1.5', value: 'value1.5', action: () => console.log('selected option 1.5.') },
	{ label: 'Item 1.6', value: 'value1.6', action: () => console.log('selected option 1.6.') },
	{ label: 'Item 1.7', value: 'value1.7', action: () => console.log('selected option 1.7.') },
	{ label: 'Item 1.1', value: 'value1.1', action: () => console.log('selected option 1.1.') },
	{ label: 'Item 1.2', value: 'value1.2', action: () => console.log('selected option 1.2.') },
	{ label: 'Item 1.3', value: 'value1.3', action: () => console.log('selected option 1.3.') },
	{ label: 'Item 1.4', value: 'value1.4', action: () => console.log('selected option 1.4.') },
	{ label: 'Item 1.5', value: 'value1.5', action: () => console.log('selected option 1.5.') },
	{ label: 'Item 1.6', value: 'value1.6', action: () => console.log('selected option 1.6.') },
	{ label: 'Item 1.7', value: 'value1.7', action: () => console.log('selected option 1.7.') }
]

const dataList = ref<DataListGroupType[] | DataListItemType<any>[]>(dataListItemss)

const loadData = async (context: ContextType) => {
	if (context.type === 'group') {
		context.loading.value = true
		await new Promise((resolve) => setTimeout(resolve, 3000))
		if (context.current.value && context.current.value.data.length === 5) {
			context.current.value.data.push(...dataListItems.slice(5))
			context.completed.value = true
		} else if (context.current.value && context.current.value.data.length < 5) {
			context.current.value.data = dataListItems.slice(0, 5)
			context.completed.value = false
		}
		context.loading.value = false
	} else {
		context.loading.value = true
		await new Promise((resolve) => setTimeout(resolve, 3000))
		if (context.current.value && context.current.value.length === 5) {
			context.current.value.push(...dataListItems.slice(5))
			context.completed.value = true
		} else if (context.current.value && context.current.value.length < 5) {
			context.current.value = dataListItems.slice(0, 5)
			context.completed.value = false
		}
		context.loading.value = false
	}
}
</script>

<template>
	<div>
		<DataList :data="dataList" :expandable="true" @load="loadData" :lazy="true"></DataList>
	</div>
</template>

<style>
body {
	background: white;
}
</style>
