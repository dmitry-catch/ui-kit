<script setup lang="ts">
import { toRefs, ref, computed } from 'vue'
import { DataGridColumn } from '../types.js'
import { isEnumColumn } from '../utils/index.js'

const props = defineProps<{ column: DataGridColumn; item: any }>()
const { item, column } = toRefs(props)

const content = ref<HTMLElement>()
const hasOverflow = computed(() => Number(content.value?.scrollHeight) > Number(content.value?.offsetHeight))
const expanded = ref(false)

const template = (value: any) => {
	if (isEnumColumn(column.value)) return column.value.template(value)
	return value
}

const contentMaxHeight = ref('calc(2 * var(--design-current-line-height))')
const expand = () => {
	if (contentMaxHeight.value == 'none') contentMaxHeight.value = 'calc(2 * var(--design-current-line-height))'
	else contentMaxHeight.value = 'none'
	expanded.value = !expanded.value
}
</script>

<template>
	<div
		ref="content"
		class="DataGridCellContent__content"
		:class="{ 'has-overflow': false }"
		:hasOverflow="hasOverflow"
		@click="expand"
	>
		{{ template(item[column.field]) }}
	</div>
	<span v-if="hasOverflow && !expanded" class="DataGridCellContent___expand" @click="expand">...</span>
</template>

<style>
.DataGridCellContent__content {
	position: relative;
	max-height: v-bind(contentMaxHeight);
	overflow: hidden;
	text-overflow: ellipsis;
}
.DataGridCellContent__content[hasOverflow='true'],
.DataGridCellContent___expand {
	cursor: pointer;
}
</style>
