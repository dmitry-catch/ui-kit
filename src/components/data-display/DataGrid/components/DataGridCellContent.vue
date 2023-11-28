<style></style>

<template>
	{{ template(item[column.field]) }}
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
import { DataGridColumn } from '../types.js'
import { isEnumColumn } from '../utils/index.js'

const props = defineProps<{ column: DataGridColumn; item: any }>()
const { item, column } = toRefs(props)

const template = (value: any) => {
	if (isEnumColumn(column.value)) return column.value.template(value)
	return value
}
</script>
