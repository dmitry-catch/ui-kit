<script setup lang="ts">
import { inject, toRefs } from 'vue'
import Icon from '../../../general/Icon/Icon.vue'
import { injectionKey } from '../consts.js'
interface SidenavItemProps {
	icon?: string
	id: string
	disabled?: boolean
}

const props = defineProps<SidenavItemProps>()
const { icon, disabled } = toRefs(props)

const { collapsed, active } = inject(injectionKey)!

const toggleActive = () => {
	active.value = active.value == props.id ? '' : props.id
}

const slots = defineSlots<{
	default?: () => unknown
	/** Иконка перед названием */
	icon?: () => unknown
}>()
</script>

<template>
	<div class="Item" :class="{ active: active == id && !disabled }" @click="toggleActive">
		<div
			class="Item__title text-medium secondary"
			:class="{ collapsed: collapsed, active: active == id && !disabled, bold: icon, disabled: disabled }"
		>
			<slot v-if="icon" name="icon">
				<Icon class="Item__title__icon" :name="icon"></Icon>
			</slot>
			<slot v-if="!collapsed"> </slot>
		</div>
	</div>
</template>

<style scoped>
.Item__title.disabled {
	color: var(--design-text-color-on-accent-secondary);
	cursor: default;
}

.Item__title.disabled :deep(.Icon svg) {
	fill: var(--design-text-color-on-accent-secondary);
}

.Item__title.disabled:hover {
	color: var(--design-text-color-on-accent-secondary);
}

.Item__title.disabled:hover :deep(.Icon svg) {
	fill: var(--design-text-color-on-accent-secondary);
}

.Item__title.bold {
	font-weight: 600;
}

.Item {
	display: flex;
	align-items: center;
	border-radius: var(--design-border-radius-control);
}

.Item__title {
	color: var(--design-text-color-secondary);
	display: flex;
	gap: var(--design-gap-unit);
	cursor: pointer;
}

.Item__title.collapsed {
	gap: 0;
	padding-left: var(--design-gap-unit);
}

.Item__title:hover {
	color: var(--design-text-color-primary);
}

.Item__title:hover :deep(.Icon svg) {
	fill: var(--design-text-color-primary);
}

.Item__title__icon {
	--icon-size: 24px;
	fill: var(--design-text-color-secondary);
}

.Item__title.active {
	color: var(--design-text-color-accent);
}

.Item__title.active :deep(.Icon svg) {
	color: var(--design-text-color-accent);
	fill: var(--design-text-color-accent);
}
</style>
