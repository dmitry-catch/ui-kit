<script setup lang="ts">
import { toRefs } from 'vue'

interface DropdownItemProps {
	disabled?: boolean
	divider?: boolean
}

const props = defineProps<DropdownItemProps>()

defineSlots<{
	default?: () => Node[]
}>()

const { disabled, divider } = toRefs(props)
</script>

<template>
	<div class="DropdownItem" :class="{ 'DropdownItem--disabled': disabled, divider: divider }">
		<slot v-if="!divider"></slot>
	</div>
</template>

<style scoped>
.DropdownItem {
	display: flex;
	gap: var(--design-gap-unit);
	padding: var(--design-gap-unit);
	cursor: pointer;
}

.DropdownItem:hover {
	background: var(--design-background-color-on-accent-primary);
}

.DropdownItem--disabled {
	background: var(--design-background-color-tertiary);
	cursor: not-allowed;
}

.DropdownItem--disabled :deep(> *),
.DropdownItem--disabled :deep(.Icon path) {
	color: var(--design-background-color-disabled-primary);
}

.DropdownItem.divider {
	height: 1px;
	padding: 0;
	background-color: var(--design-background-color-on-accent-primary);
}
</style>
