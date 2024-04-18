<script setup lang="ts">
import { toRefs } from 'vue'
import { Icon } from '../../../../main'

interface DropdownItemProps {
	disabled?: boolean
	/** Является ли элемент выбранным */
	picked?: boolean
	/** Отображение выбранного элемента */
	isDefault?: boolean
}

const props = withDefaults(defineProps<DropdownItemProps>(), { isDefault: true })

defineSlots<{
	default?: () => unknown
}>()

const { disabled } = toRefs(props)
</script>

<template>
	<div class="DropdownItem" :class="{ 'DropdownItem--disabled': disabled }">
		<slot></slot>
		<Icon v-if="picked && isDefault" name="check" class="icon" />
	</div>
</template>

<style scoped>
.DropdownItem {
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: var(--design-gap-unit);
	cursor: pointer;
	.icon:deep(*) {
		color: var(--design-text-color-accent);
		min-width: calc(3 * var(--design-gap-unit));
	}
}
.DropdownItem--disabled {
	background: var(--design-background-color-tertiary);
	color: var(--design-background-color-disabled-primary);
	cursor: pointer;
}
</style>
