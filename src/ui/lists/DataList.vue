<style></style>

<template>
	<div class="DataList">
		<DataListGroup v-for="item of dataSource" :data="item" :context-menu="contextMenu">
			<template #content="{ data }">
				<slot name="listItem" :data="data"></slot>
			</template>
			<template #contextMenuItem="{ data }">
				<slot name="contextMenuItem" :data="data"></slot>
			</template>
		</DataListGroup>
	</div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
import DataListGroup from './DataListGroup.vue'
import { Grouped } from '@forecsys/collections'
const props = defineProps<{
	dataSource: Grouped<any>
	contextMenu: Array<{ name: string; action: (data: any) => any }>
}>()

const { contextMenu, dataSource } = toRefs(props)
</script>
