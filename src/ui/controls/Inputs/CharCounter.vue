<style>
.CharCounter.danger {
	color: var(--design-text-color-danger);
}
</style>

<template>
	<div class='CharCounter' :class='{ danger: isOverflow }'>{{ `${current} / ${max}` }}</div>
</template>

<script setup lang='ts'>
import { computed, toRefs } from 'vue'

interface CharCounterProps {
	/** Число слева. */
	current?: number
	/** Число справа. */
	max?: number
}

const props = withDefaults(defineProps<CharCounterProps>(), { current: 0, max: 0 })

const { current, max } = toRefs(props)
const isOverflow = computed(() => current.value > max.value)
</script>
