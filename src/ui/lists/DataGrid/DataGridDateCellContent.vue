<style></style>

<template>
	{{ item[column.field]?.toLocaleDateString() }}
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
import type { DataGridCellContentProps } from './DataGridCellContentProps'

const props = defineProps<DataGridCellContentProps>()
const { item, column } = toRefs(props)
</script>
