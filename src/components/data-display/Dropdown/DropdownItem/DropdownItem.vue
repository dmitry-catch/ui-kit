<script setup lang="ts">
import { toRefs } from 'vue'

interface DropdownItemProps {
	disabled?: boolean
}

const props = defineProps<DropdownItemProps>()

defineSlots<{
	default?: () => any
}>()

const { disabled } = toRefs(props)
</script>

<template>
	<div class="DropdownItem" :class="{ 'DropdownItem--disabled': disabled }">
		<slot></slot>
	</div>
</template>

<style scoped>
.DropdownItem {
	display: flex;
	gap: var(--design-gap-unit);
	cursor: pointer;
}

.DropdownItem--disabled {
	background: var(--design-background-color-tertiary);
	color: var(--design-background-color-disabled-primary);
	cursor: pointer;
}
</style>
