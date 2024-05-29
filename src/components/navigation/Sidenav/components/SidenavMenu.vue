<script setup lang="ts">
import { computed, inject, toRefs } from 'vue'
import Icon from '../../../general/Icon/Icon.vue'
import { injectionKey } from '../consts.js'
interface SidenavMenuProps {
	icon: string
	title: string
	id: string
	disabled?: boolean
}

const props = defineProps<SidenavMenuProps>()
const { icon, disabled } = toRefs(props)

const { active, collapsed, open } = inject(injectionKey)!

const toggleMenu = () => {
	if (!collapsed.value && !disabled.value) {
		if (!open.value?.includes(props.id)) {
			open.value?.push(props.id)
			console.log('open')
		} else {
			open.value?.splice(open.value?.indexOf(props.id), 1)
			console.log('close')
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
	<div class="Menu" :class="{ active: isActive }">
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
.NavigationMenu__title.disabled {
	cursor: default;
}

.NavigationMenu__title__text.disabled {
	color: var(--design-text-color-on-accent-secondary);
}

.NavigationMenu__title.disabled :deep(.Icon svg) {
	fill: var(--design-text-color-on-accent-secondary);
}

.NavigationMenu__title.disabled:hover :deep(.Icon svg) {
	fill: var(--design-text-color-on-accent-secondary);
}
.NavigationMenu__title__text.active {
	color: var(--design-text-color-accent);
}

.NavigationMenu__chevron.disabled {
	fill: var(--design-text-color-on-accent-secondary);
}

.NavigationMenu__chevron.active {
	fill: var(--design-text-color-accent);
}

.NavigationMenu {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.NavigationMenu:hover {
	background-color: var(--design-background-color-primary);
}

.NavigationMenu:hover.disabled {
	background-color: var(--design-background-color-tertiary);
}

.Menu {
	border-radius: var(--design-border-radius-control);
}

.Menu.active {
	background-color: var(--design-background-color-primary);
}

.NavigationMenu__chevron {
	--icon-size: 16px;
	fill: var(--design-text-color-secondary);
}
.NavigationMenu__title {
	padding: var(--design-gap-unit);
	padding-left: 0;
	color: var(--design-text-color-secondary);
	text-decoration: none;
	display: grid;
	grid-template-columns: 24px auto;
	gap: var(--design-gap-unit);
	cursor: pointer;
}

.Menu__subitems {
	padding-left: calc(4 * var(--design-gap-unit));
	margin-top: var(--design-gap-unit);
	display: flex;
	flex-direction: column;
	gap: var(--design-gap-unit);
}

.NavigationMenu__title.collapsed {
	gap: 0;
	padding-left: var(--design-gap-unit);
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
