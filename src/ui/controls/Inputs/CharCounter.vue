<style>
.CharCounter.danger {
	color: var(--design-text-color-danger);
}
</style>

<template>
	<div class="CharCounter" :class="{ danger: isOverflow }">{{ `${current} / ${max}` }}</div>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue'

const props = defineProps<{ current: number; max: number }>()
const { current, max } = toRefs(props)
const isOverflow = computed(() => current.value > max.value)
</script>
