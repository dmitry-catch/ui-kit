<script setup lang="ts">
import { ref, toRefs } from 'vue'
import Icon from '../../../general/Icon/Icon.vue'
export interface SideNavItemProps {
	icon: string
	isCollapsed?: boolean
	active?: boolean
}

const props = defineProps<SideNavItemProps>()
const { icon, isCollapsed, active } = toRefs(props)

const isCollapsedItems = ref(false)

const toggleCollapse = () => {
	if (!isCollapsed.value) isCollapsedItems.value = !isCollapsedItems.value
}

const slots = defineSlots<{
	default?: () => unknown
	/** Иконка перед названием */
	before?: () => unknown
	/** Иконка после названия */
	after?: () => unknown
	/** Подменю */
	subitems?: () => unknown
}>()
</script>

<template>
	<div class="SubNuvItem" :class="{ active: active }">
		<div class="NavigationItem" @click="toggleCollapse">
			<div
				class="NavigationItem__title text-medium accent secondary"
				:class="{ collapsed: isCollapsed, active: active }"
			>
				<slot name="before">
					<Icon class="NavigationItem__title__icon" :name="icon"></Icon>
				</slot>
				<slot v-if="!isCollapsed"> </slot>
			</div>
			<slot v-if="slots.subitems" name="after">
				<Icon
					v-if="!isCollapsed"
					class="NavigationItem__chevron"
					:class="{ active: active }"
					:name="isCollapsedItems ? 'chevron_up' : 'chevron_down'"
				></Icon>
			</slot>
		</div>
		<div v-if="isCollapsedItems && slots.subitems" class="NavigationItem__subitems">
			<slot v-if="!isCollapsed" name="subitems"> </slot>
		</div>
	</div>
</template>

<style scoped>
.NavigationItem__chevron.active {
	fill: var(--design-text-color-accent);
}

.NavigationItem {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.SubNuvItem {
	border-radius: var(--design-border-radius-control);
}

.SubNuvItem.active {
	background-color: var(--design-background-color-primary);
}

.NavigationItem__chevron {
	--icon-size: 16px;
	fill: var(--design-text-color-secondary);
}
.NavigationItem__title {
	padding: var(--design-gap-unit);
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
