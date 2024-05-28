<script setup lang="ts">
import { computed, inject, toRefs } from 'vue'
import Icon from '../../../general/Icon/Icon.vue'
import { injectionKey } from '../consts.js'
import { InjectionTypes } from '../types.js'
interface MenuProps {
	icon: string
	title: string
	id?: string
}

const props = defineProps<MenuProps>()
const { icon } = toRefs(props)

const { active, collapsed, open } = inject(injectionKey) as InjectionTypes

const openMenu = () => {
	if (!collapsed.value) {
		open.value = open.value == props.id ? '' : props.id
	}
}

const isActive = computed(() => {
	const activeParts = active.value?.split('.')
	return activeParts?.[0] == props.id
})

const slots = defineSlots<{
	/** Элементы меню */
	default?: () => unknown
	/** Иконка перед названием */
	icon?: () => unknown
}>()
</script>

<template>
	<div class="Menu" :class="{ active: isActive }">
		<div class="NavigationItem" @click="openMenu">
			<div class="NavigationItem__title" :class="{ collapsed: collapsed, active: isActive }">
				<slot name="icon">
					<Icon class="NavigationItem__title__icon" :name="icon"></Icon>
				</slot>
				<span
					v-if="!collapsed"
					class="NavigationItem__title__text text-medium accent secondary"
					:class="{ active: isActive }"
					>{{ title }}</span
				>
			</div>
			<Icon
				v-if="!collapsed && slots.default"
				class="NavigationItem__chevron"
				:class="{ active: isActive }"
				:name="open == id ? 'chevron_up' : 'chevron_down'"
			></Icon>
		</div>
		<div v-if="open == id && slots.default" class="NavigationItem__subitems">
			<slot v-if="!collapsed"> </slot>
		</div>
	</div>
</template>

<style scoped>
.NavigationItem__title__text.active {
	color: var(--design-text-color-accent);
}

.NavigationItem__chevron.active {
	fill: var(--design-text-color-accent);
}

.NavigationItem {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.Menu {
	border-radius: var(--design-border-radius-control);
}

.Menu.active {
	background-color: var(--design-background-color-primary);
}

.NavigationItem__chevron {
	--icon-size: 16px;
	fill: var(--design-text-color-secondary);
}
.NavigationItem__title {
	padding: var(--design-gap-unit);
	padding-left: 0;
	color: var(--design-text-color-secondary);
	text-decoration: none;
	display: grid;
	grid-template-columns: 24px auto;
	gap: var(--design-gap-unit);
	cursor: pointer;
}

.NavigationItem__subitems {
	padding-left: calc(5 * var(--design-gap-unit));
	margin-top: var(--design-gap-unit);
	display: flex;
	flex-direction: column;
	gap: var(--design-gap-unit);
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
