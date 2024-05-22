<script setup lang="ts">
import { computed, inject, ref, Ref, toRefs } from 'vue'
import { DataGridColumn } from '../types.js'
import DataGridCell from './DataGridCell.vue'
import Button from '../../../general/Button/Button.vue'
import Icon from '../../../general/Icon/Icon.vue'
import Checkbox from '../../../data-entry/Checkbox/Checkbox.vue'

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

<template>
	<tr class="DataGridRow">
		<td class="DataGridRow__cell DataGridRow__selectCell">
			<Checkbox v-if="selectColumn" v-model="selected"></Checkbox>
		</td>
		<td v-if="detailsColumn" class="DataGridRow__cell DataGridRow__detailsCell">
			<span class="DataGridRow__detailsToggler">
				<Button class="icon functional noBackground" @click="detailsVisible = !detailsVisible">
					<Icon v-if="detailsVisible" name="chevron_down"></Icon>
					<Icon v-else name="chevron_forward"></Icon>
				</Button>
			</span>
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

<style>
.DataGridRow {
	display: contents;
	text-align: left;
}

.DataGridRow:hover .DataGridRow__cell {
	background: var(--design-background-color-tertiary);
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
