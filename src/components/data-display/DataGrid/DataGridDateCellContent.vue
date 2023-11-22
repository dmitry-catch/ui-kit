<style></style>

<template>
	{{ new Date(item[column.field]).toLocaleDateString() }}
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
import { DataGridColumn } from './DataGridColumn'

interface DataGridDateCellContentProps {
	column: DataGridColumn
	item: any
}

const props = defineProps<DataGridDateCellContentProps>()
const { item, column } = toRefs(props)
</script>
