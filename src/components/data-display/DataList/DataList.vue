<script setup lang="ts">
import { toRefs } from 'vue'
import DataListGroup from './DataListGroup/DataListGroup.vue'
import { Grouped } from '@forecsys/collections'

interface DataListProps {
	dataSource: Grouped<any>
	contextMenu: Array<{ name: string; action: (data: any) => any }>
}

const props = defineProps<DataListProps>()
const emit = defineEmits(['itemClick'])

const { contextMenu, dataSource } = toRefs(props)
const itemClick = (data: any) => emit('itemClick', data)
</script>

<template>
	<div class="DataList">
		<DataListGroup v-for="item of dataSource" :data="item" :contextMenu="contextMenu" @itemClick="itemClick">
			<template #content="{ data }">
				<slot name="listItem" :data="data"></slot>
			</template>
			<template #contextMenuItem="{ data }">
				<slot name="contextMenuItem" :data="data"></slot>
			</template>
		</DataListGroup>
	</div>
</template>

<style></style>
