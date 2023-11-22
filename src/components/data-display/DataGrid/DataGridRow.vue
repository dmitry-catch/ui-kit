<style>
.DataGridRow {
	display: contents;
}

.DataGridRow:nth-child(2n) .DataGridRow__cell {
	background: var(--design-background-color-tertiary);
}

.DataGridRow:hover .DataGridRow__cell {
	background: var(--design-background-color-secondary);
}

.DataGridRow__details {
	grid-column: span var(--datagrid-columns-count);
}

.DataGridRow__details:empty {
	display: none;
}

.DataGridRow__detailsToggler {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}

.DataGridRow__selectCell,
.DataGridRow__detailsCell {
	display: flex;
	align-items: center;
	justify-content: center;
	padding-inline: var(--design-gap-unit);
}
</style>

<template>
	<tr class="DataGridRow">
		<td v-if="detailsColumn" class="DataGridRow__cell DataGridRow__detailsCell">
			<span class="DataGridRow__detailsToggler">
				<Btn class="icon functional noBackground" @click="detailsVisible = !detailsVisible">
					<Icon v-if="detailsVisible" name="chevron_down"></Icon>
					<Icon v-else name="chevron_forward"></Icon>
				</Btn>
			</span>
		</td>
		<td v-if="selectColumn" class="DataGridRow__cell DataGridRow__selectCell">
			<Checkbox v-model="selected"></Checkbox>
		</td>
		<DataGridCell
			v-for="column of columns"
			:key="column.field"
			class="DataGridRow__cell"
			:item="item"
			:column="column"
		></DataGridCell>
		<td v-if="detailsVisible" class="DataGridRow__details">
			<slot name="rowDetails" :item="item"></slot>
		</td>
	</tr>
</template>

<script setup lang="ts">
import { computed, inject, ref, Ref, toRefs } from 'vue'
import { DataGridColumn } from './DataGridColumn'
import DataGridCell from './DataGridCell.vue'
import Btn from '../../general/Button/Button.vue'
import Icon from '../../general/Icon/Icon.vue'
import Checkbox from '../../data-entry/Checkbox/Checkbox.vue'

interface DataGridRowProps {
	columns: Array<DataGridColumn>
	item: any
	detailsColumn?: boolean
	selectColumn?: boolean
}

const props = defineProps<DataGridRowProps>()

const { item, columns, detailsColumn, selectColumn } = toRefs(props)
const detailsVisible = ref(false)
const selectedRows = inject('datagrid-selectedRows') as Ref<Array<any>>
const selected = computed({
	get() {
		return selectedRows.value.includes(item.value)
	},
	set(value) {
		if (value) selectedRows.value.push(item.value)
		else {
			const index = selectedRows.value.indexOf(item.value)
			if (index !== -1) selectedRows.value.splice(index, 1)
		}
	}
})
</script>