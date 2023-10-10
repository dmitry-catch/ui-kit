<style>
.DataGridRowGroup {
}
.DataGridRowGroup__toggler {
	grid-column: span var(--datagrid-columns-count);
}
</style>

<template>
	<DataGridRow v-if="isItem" :item="item" :columns="columns" @click="itemClick(item)">
		<template #content="{ data }">
			<slot name="content" :data="data"></slot>
		</template>
		<template #contextMenuItem="{ data }">
			<slot name="contextMenuItem" :data="data"></slot>
		</template>
	</DataGridRow>
	<template v-else>
		<DataGroupTogler class="DataGridRowGroup__toggler" v-model="opened" :group="group"></DataGroupTogler>
		<template v-if="opened">
			<DataGridRowGroup v-for="item of group.data" :item="item" :columns="columns" @itemClick="itemClick">
				<template #content="{ data }">
					<slot name="content" :data="data"></slot>
				</template>
				<template #contextMenuItem="{ data }">
					<slot name="contextMenuItem" :data="data"></slot>
				</template>
			</DataGridRowGroup>
		</template>
	</template>
</template>

<script setup lang="ts">
import { computed, ref, toRefs } from 'vue'
import { Group, isGroup } from '@forecsys/collections'
import DataGroupTogler from '../DataGroupToggler.vue'
import DataGridRow from './DataGridRow.vue'
import { DataGridColumn } from './DataGridColumn'
import DataGroupToggler from '../DataGroupToggler.vue'
const emit = defineEmits(['itemClick'])
const props = defineProps<{ columns: Array<DataGridColumn>; item: any }>()
const { item, columns } = toRefs(props)
const group = computed(() => item.value as Group<any>)
const isItem = computed(() => !isGroup(item.value))

const opened = ref(true)
const itemClick = (data: any) => emit('itemClick', data)
</script>
