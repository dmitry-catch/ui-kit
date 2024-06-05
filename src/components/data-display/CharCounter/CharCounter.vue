<script setup lang="ts">
import { computed, toRefs } from 'vue'

interface CharCounterProps {
	/** Число слева. */
	current?: number
	/** Число справа. */
	max?: number
}

const props = withDefaults(defineProps<CharCounterProps>(), { current: 0, max: 0 })

const { current, max } = toRefs(props)
const validatedMax = computed(() => Math.max(0, max.value))
const isOverflow = computed(() => current.value > validatedMax.value)
</script>

<template>
	<div class="CharCounter" :class="{ danger: isOverflow }">{{ `${current} / ${validatedMax}` }}</div>
</template>

<style scoped>
.danger {
	color: var(--design-text-color-danger);
}
</style>
