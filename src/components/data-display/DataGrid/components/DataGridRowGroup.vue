<script setup lang="ts">
import { computed, ref, toRefs } from 'vue'
import { GroupExtended, isGroup } from '@forecsys/collections'
import DataGroupToggler from '../../../non-public/DataGroupToggler/DataGroupToggler.vue'
import DataGridRow from './DataGridRow.vue'
import type { DataGridColumn, GroupCheckboxClickEmit, ItemCheckboxClickEmit } from '../types.js'

interface DataGridRowGroupProps {
	columns: Array<DataGridColumn>
	item: any
	detailsColumn?: boolean
	selectColumn?: boolean
	selectedGroups?: string[]
}

const props = defineProps<DataGridRowGroupProps>()
const emit = defineEmits(['itemClick', 'groupCheckboxClick', 'itemCheckboxClick'])

const { item, columns, detailsColumn, selectedGroups } = toRefs(props)
const group = computed(() => item.value as GroupExtended<any>)
const isItem = computed(() => !isGroup(item.value))

const opened = ref(true)
const itemClick = (data: any) => emit('itemClick', data)
const groupCheckboxClick = (data: GroupCheckboxClickEmit) => emit('groupCheckboxClick', data)
const itemCheckboxClick = (data: ItemCheckboxClickEmit) =>
	emit('itemCheckboxClick', { ...data, groupFilters: data.groupFilters || group.value.filters })
</script>

<template>
	<DataGridRow
		v-if="isItem"
		:item="item"
		:columns="columns"
		:detailsColumn="detailsColumn"
		:selectColumn="selectColumn"
		@click="itemClick(item)"
		@itemCheckboxClick="itemCheckboxClick"
	>
		<template #rowDetails="{ item }">
			<slot name="rowDetails" :item="item"></slot>
		</template>
	</DataGridRow>
	<template v-else>
		<DataGroupToggler
			:key="group.key"
			v-model="opened"
			class="DataGridRowGroup__toggler"
			:group="group"
			:selectedGroups="selectedGroups"
			@groupCheckboxClick="groupCheckboxClick"
		></DataGroupToggler>
		<template v-if="opened">
			<DataGridRowGroup
				v-for="(item, idx) of group.data"
				:key="idx"
				:item="item"
				:columns="columns"
				:detailsColumn="detailsColumn"
				:selectColumn="selectColumn"
				:selectedGroups="selectedGroups"
				@itemClick="itemClick"
				@groupCheckboxClick="groupCheckboxClick"
				@itemCheckboxClick="itemCheckboxClick"
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
