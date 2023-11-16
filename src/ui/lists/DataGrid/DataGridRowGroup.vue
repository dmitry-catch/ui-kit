<style>
.DataGridRowGroup {
}
.DataGridRowGroup__toggler {
	grid-column: span var(--datagrid-columns-count);
}
</style>

<template>
	<DataGridRow
		v-if="isItem"
		:item="item"
		:columns="columns"
		@click="itemClick(item)"
		:detailsColumn="detailsColumn"
		:selectColumn="selectColumn"
	>
		<template #rowDetails="{ item }">
			<slot name="rowDetails" :item="item"></slot>
		</template>
	</DataGridRow>
	<template v-else>
		<DataGroupTogler class="DataGridRowGroup__toggler" v-model="opened" :group="group"></DataGroupTogler>
		<template v-if="opened">
			<DataGridRowGroup
				v-for="item of group.data"
				:item="item"
				:columns="columns"
				@itemClick="itemClick"
				:detailsColumn="detailsColumn"
				:selectColumn="selectColumn"
			>
				<template #rowDetails="{ item }">
					<slot name="rowDetails" :item="item"></slot>
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
const emit = defineEmits(['itemClick'])
const props = defineProps<{
	columns: Array<DataGridColumn>
	item: any
	detailsColumn: boolean
	selectColumn: boolean
}>()
const { item, columns, detailsColumn } = toRefs(props)
const group = computed(() => item.value as Group<any>)
const isItem = computed(() => !isGroup(item.value))

const opened = ref(true)
const itemClick = (data: any) => emit('itemClick', data)
</script>
