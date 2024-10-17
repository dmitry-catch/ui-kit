<script setup lang="ts">
import { computed, ref, toRefs } from 'vue'
import { Group, isGroup } from '@forecsys/collections'
import DataGroupToggler from '../../../non-public/DataGroupToggler/DataGroupToggler.vue'
import DataGridRow from './DataGridRow.vue'
import { DataGridColumn } from '../types.js'

interface DataGridRowGroupProps {
	columns: Array<DataGridColumn>
	item: any
	detailsColumn?: boolean
	selectColumn?: boolean
}

const props = defineProps<DataGridRowGroupProps>()
const emit = defineEmits(['itemClick'])

const { item, columns, detailsColumn } = toRefs(props)
const group = computed(() => item.value as Group<any>)
const isItem = computed(() => !isGroup(item.value))

const opened = ref(true)
const itemClick = (data: any) => emit('itemClick', data)
</script>

<template>
	<DataGridRow
		v-if="isItem"
		:item="item"
		:columns="columns"
		:detailsColumn="detailsColumn"
		:selectColumn="selectColumn"
		@click="itemClick(item)"
	>
		<template #rowDetails="{ item }">
			<slot name="rowDetails" :item="item"></slot>
		</template>
	</DataGridRow>
	<template v-else>
		<DataGroupToggler v-model="opened" class="DataGridRowGroup__toggler" :group="group"></DataGroupToggler>
		<template v-if="opened">
			<DataGridRowGroup
				v-for="(item, idx) of group.data"
				:key="idx"
				:item="item"
				:columns="columns"
				:detailsColumn="detailsColumn"
				:selectColumn="selectColumn"
				@itemClick="itemClick"
			>
				<template #rowDetails="{ item }">
					<slot name="rowDetails" :item="item"></slot>
				</template>
			</DataGridRowGroup>
		</template>
	</template>
</template>

<style>
.DataGridRowGroup {
}

.DataGridRowGroup__toggler {
	grid-column: span var(--datagrid-columns-count);
}
</style>
