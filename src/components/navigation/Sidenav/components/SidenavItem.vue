<script setup lang="ts">
import { inject, toRefs } from 'vue'
import Icon from '../../../general/Icon/Icon.vue'
import { injectionKey } from '../consts.js'
import Tag from '../../../data-display/Tag/Tag.vue'
interface SidenavItemProps {
	icon?: string
	id: string
	disabled?: boolean
	badge?: string
}

const props = defineProps<SidenavItemProps>()
const { icon, disabled, badge } = toRefs(props)

const { collapsed, active } = inject(injectionKey)!

const toggleActive = () => {
	if (!disabled.value) {
		active.value = props.id
	}
}

const slots = defineSlots<{
	default?: () => unknown
	/** Иконка перед названием */
	icon?: () => unknown
}>()
</script>

<template>
	<div class="Item" :class="{ active: active == id && !disabled, disabled: disabled }" @click="toggleActive">
		<div
			class="Item__title text-medium secondary"
			:class="{ collapsed: collapsed, active: active == id && !disabled, bold: icon, disabled: disabled }"
		>
			<slot v-if="icon" name="icon">
				<Icon class="Item__title__icon" :name="icon"></Icon>
			</slot>
			<slot v-if="!collapsed"> </slot>
			<Tag
				v-if="!collapsed && badge"
				:color="active == id ? 'accent' : 'dark'"
				size="extra-small"
				class="Item__title__badge"
				>{{ badge }}</Tag
			>
		</div>
	</div>
</template>

<style scoped>
.Item__title.disabled:hover {
	color: var(--design-text-color-secondary);
}

.Item__title.disabled:hover :deep(.Icon svg) {
	fill: var(--design-text-color-secondary);
}
.Item__title.disabled {
	cursor: default;
	opacity: 0.5;
}

.Item__title.bold {
	font-weight: 600;
}

.Item {
	border-radius: var(--design-border-radius-control);
	padding: var(--design-gap-unit);
}

.Item.collapsed {
	display: flex;
	justify-content: center;
}

.Item:hover {
	background-color: var(--design-background-color-primary);
}

.Item.disabled:hover {
	background-color: var(--design-background-color-tertiary);
}

.Item__title {
	color: var(--design-text-color-secondary);
	display: flex;
	gap: var(--design-gap-unit);
	cursor: pointer;
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
