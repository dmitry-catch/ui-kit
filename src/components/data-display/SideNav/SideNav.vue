<script setup lang="ts">
import { toRefs } from 'vue'

export interface SideNavProps {
	isCollapsed?: boolean
}

const props = withDefaults(defineProps<SideNavProps>(), {
	isCollapsed: false
})
const { isCollapsed } = toRefs(props)

defineSlots<{
	/** Заголовок */
	header?: () => unknown
	/** Меню */
	menu?: () => unknown
	/** Элементы меню */
	default?: () => unknown
	/** Нижний колонтитул списка элементов  */
	footer?: () => unknown
}>()
</script>

<template>
	<div :class="['SideNav', { collapsed: isCollapsed }]">
		<div class="SideNav__header">
			<slot name="header"> </slot>
		</div>
		<div class="SideNav__content">
			<div class="SideNav__menu">
				<slot name="menu"></slot>
			</div>
			<div class="SideNav__items">
				<slot> </slot>
			</div>
			<div class="SideNav__footer">
				<slot name="footer"></slot>
			</div>
		</div>
	</div>
</template>

<style scoped>
.SideNav__menu {
	border-bottom: 1px solid var(--design-border-color-baseline);
	padding: var(--design-gap-unit);
}

.SideNav__header {
	box-sizing: border-box;
	height: 64px;
	border-bottom: 1px solid var(--design-border-color-baseline);
	padding: calc(2.5 * var(--design-gap-unit)) calc(3 * var(--design-gap-unit));
	.icon {
		fill: var(--design-text-color-danger);
		cursor: pointer;
	}
}
.SideNav {
	height: 100vh;
	width: 236px;
	flex-flow: column;
	display: flex;
	grid-area: navigation;
	top: 0;
	background: var(--design-background-color-tertiary);
	border-color: var(--design-border-color-baseline);
	border-style: solid;
	border-bottom: none;
	border-right-width: 1px;
	border-top: none;
	border-left: none;
	transition: width 0.3s;

	.SideNav__content {
		display: flex;
		flex-direction: column;
		height: 100%;
		padding: calc(2 * var(--design-gap-unit));
		padding-top: var(--design-gap-unit);
	}

	.SideNav__footer {
		display: flex;
		flex-direction: column;
		gap: calc(3 * var(--design-gap-unit));
		margin-top: auto;
	}
}

.SideNav__items {
	display: flex;
	flex-direction: column;
	gap: calc(2 * var(--design-gap-unit));
	padding-top: calc(2 * var(--design-gap-unit));
}

.SideNav.collapsed {
	width: 84px;
}

.SideNav.collapsed .SideNav__content {
	align-items: center;
}
</style>
