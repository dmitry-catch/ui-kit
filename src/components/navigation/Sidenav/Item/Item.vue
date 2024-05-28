<script setup lang="ts">
import { inject, toRefs } from 'vue'
import Icon from '../../../general/Icon/Icon.vue'
import { injectionKey } from '../consts.js'
import { InjectionTypes } from '../types.js'
interface SideNavItemProps {
	icon?: string
	id?: string
}

const props = defineProps<SideNavItemProps>()
const { icon } = toRefs(props)

const { collapsed, active } = inject(injectionKey) as InjectionTypes

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
	<div class="Item" :class="{ active: active == id }" @click="toggleActive">
		<div class="NavigationItem">
			<div
				class="NavigationItem__title text-medium secondary"
				:class="{ collapsed: collapsed, active: active == id, bold: icon }"
			>
				<slot v-if="icon" name="icon">
					<Icon class="NavigationItem__title__icon" :name="icon"></Icon>
				</slot>
				<slot v-if="!collapsed"> </slot>
			</div>
		</div>
	</div>
</template>

<style scoped>
.NavigationItem__title.bold {
	font-weight: 600;
}

.NavigationItem {
	display: flex;
	align-items: center;
}

.Item {
	border-radius: var(--design-border-radius-control);
}

.NavigationItem__title {
	color: var(--design-text-color-secondary);
	display: flex;
	gap: var(--design-gap-unit);
	cursor: pointer;
}

.NavigationItem__title.collapsed {
	gap: 0;
	padding-left: var(--design-gap-unit);
}

.NavigationItem__title:hover {
	color: var(--design-text-color-primary);
}

.NavigationItem__title:hover :deep(.Icon svg) {
	fill: var(--design-text-color-primary);
}

.NavigationItem__title__icon {
	--icon-size: 24px;
	fill: var(--design-text-color-secondary);
}

.NavigationItem__title.active {
	color: var(--design-text-color-accent);
}

.NavigationItem__title.active :deep(.Icon svg) {
	color: var(--design-text-color-accent);
	fill: var(--design-text-color-accent);
}
</style>
