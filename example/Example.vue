<script setup lang="ts">
import { ref } from 'vue'
import DataList from '../src/components/data-display/DataList/DataList.vue'
import { DataListLoadContext, DataListItemType, DataListGroupType } from '../src/components/data-display/DataList/types'
import Button from '../src/components/general/Button/Button.vue'
import Spinner from '../src/components/general/Spinner/Spinner.vue'

const dataListLazyItems: Array<DataListItemType<string> | DataListGroupType<string>> = [
	{ label: 'Item 1', value: 'value1', action: () => console.log('selected option 1.1.') },
	{ label: 'Item 2', value: 'value2', action: () => console.log('selected option 1.2.') },
	{ label: 'Item 3', value: 'value3', action: () => console.log('selected option 1.3.') },
	{ label: 'Item 4', value: 'value4', action: () => console.log('selected option 1.4.') },
	{ label: 'Item 5', value: 'value5', action: () => console.log('selected option 1.5.') }
]

const data = ref(dataListLazyItems)

const loadData = async (context: DataListLoadContext) => {
	if (context.type === 'list') {
		context.loading = true
		await new Promise((resolve) => setTimeout(resolve, 3000))
		if (context.current && context.current.length === 5) {
			context.current.push(...dataListLazyItems.map((item, idx) => ({ ...item, label: `Item ${idx + 6}` })))
			context.completed = true
			context.loading = false
		}
	}
}
</script>

<template>
	<div>
		<DataList :data="data" :expandable="true" @load="loadData">
			<template #loadMore="{ loadList, context }">
				<Button v-if="!context.completed && !context.loading" class="functional" @click="loadList(data)"
					>Загрузить еще</Button
				>
				<Spinner v-else-if="context.loading" class="DataList__loading" />
			</template>
		</DataList>
	</div>
</template>

<style>
body {
	background: white;
}
</style>
