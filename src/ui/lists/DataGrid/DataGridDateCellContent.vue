<style></style>

<template>
	{{ new Date(item[column.field]).toLocaleDateString() }}
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
import { DataGridColumn } from './DataGridColumn'

const props = defineProps<{ column: DataGridColumn; item: any }>()
const { item, column } = toRefs(props)
</script>
