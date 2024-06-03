<script setup lang="ts">
import { computed, inject, toRefs } from 'vue'
import Icon from '../../../general/Icon/Icon.vue'
import { injectionKey } from '../consts.js'
import Tag from '../../../data-display/Tag/Tag.vue'
interface SidenavMenuProps {
	icon: string
	title: string
	id: string
	disabled?: boolean
	badge?: string
}

const props = defineProps<SidenavMenuProps>()
const { icon, disabled } = toRefs(props)

const { active, collapsed, open } = inject(injectionKey)!

const toggleMenu = () => {
	if (!collapsed.value && !disabled.value) {
		if (!open.value?.includes(props.id)) {
			open.value?.push(props.id)
		} else {
			open.value?.splice(open.value?.indexOf(props.id), 1)
		}
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
	<div class="Menu" :class="{ active: isActive, disabled: disabled }">
		<div class="NavigationMenu" :class="{ disabled: disabled }" @click="toggleMenu">
			<div class="NavigationMenu__title" :class="{ collapsed: collapsed, active: isActive, disabled: disabled }">
				<slot name="icon">
					<Icon class="NavigationMenu__title__icon" :name="icon"></Icon>
				</slot>
				<span
					v-if="!collapsed"
					class="NavigationMenu__title__text text-medium accent secondary"
					:class="{ active: isActive, disabled: disabled }"
					>{{ title }}</span
				>
			</div>
			<Tag v-if="badge && !collapsed" :color="isActive ? 'accent' : 'dark'" size="extra-small">{{ badge }}</Tag>
			<Icon
				v-if="!collapsed && slots.default"
				class="NavigationMenu__chevron"
				:class="{ active: isActive, disabled: disabled }"
				:name="open?.find((id) => id == props.id) ? 'chevron_up' : 'chevron_down'"
			></Icon>
		</div>
		<div v-if="open?.find((id) => id == props.id) && slots.default" class="Menu__subitems">
			<slot v-if="!collapsed"> </slot>
		</div>
	</div>
</template>

<style scoped>
.NavigationMenu {
	display: flex;
	gap: var(--design-gap-unit);
	align-items: center;
}

.Menu:hover.disabled {
	background-color: var(--design-background-color-tertiary);
}

.NavigationMenu__title.disabled:hover :deep(.Icon svg) {
	fill: var(--design-text-color-secondary);
}
.NavigationMenu__title.disabled {
	cursor: default;
}

.NavigationMenu__title:hover .NavigationMenu__title__text {
	color: var(--design-text-color-primary);
}

.Menu {
	border-radius: var(--design-border-radius-control);
	padding: var(--design-gap-unit);
}
.Menu:hover {
	background-color: var(--design-background-color-primary);
}

.Menu.active {
	background-color: var(--design-background-color-primary);
}

.Menu.disabled {
	opacity: 0.5;
}

.NavigationMenu:hover .NavigationMenu__chevron {
	fill: var(--design-text-color-primary);
}

.NavigationMenu__chevron {
	--icon-size: 16px;
	fill: var(--design-text-color-secondary);
	margin-left: auto;
}

.NavigationMenu__chevron :deep(svg) {
	width: 16px;
	height: 16px;
}

.NavigationMenu__title {
	padding-left: 0;
	color: var(--design-text-color-secondary);
	text-decoration: none;
	display: grid;
	grid-template-columns: 24px auto;
	gap: var(--design-gap-unit);
	cursor: pointer;
	width: 100%;
}

.NavigationMenu__title__text.active {
	color: var(--design-text-color-accent);
}

.Menu__subitems {
	padding-left: calc(3 * var(--design-gap-unit));
	margin-top: var(--design-gap-unit);
	display: flex;
	flex-direction: column;
}

.NavigationMenu__title.collapsed {
	gap: 0;
}

.NavigationMenu__title:hover :deep(.Icon svg) {
	fill: var(--design-text-color-primary);
}

.NavigationMenu__title__icon {
	--icon-size: 24px;
	fill: var(--design-text-color-secondary);
}

.NavigationMenu__title.active {
	color: var(--design-text-color-accent);
}

.NavigationMenu__title.active :deep(.Icon svg) {
	color: var(--design-text-color-accent);
	fill: var(--design-text-color-accent);
}
</style>
