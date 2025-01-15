<script setup lang="ts">
import { provide, toRefs } from 'vue'
import { injectionKey } from './consts.js'

interface SidenavProps {
	/** Состояние свернуто/развернуто */
	collapsed?: boolean
	/** Массив скрытых элементов и меню */
	hidden?: Array<string>
}
const props = withDefaults(defineProps<SidenavProps>(), {
	collapsed: false
})
const { collapsed, hidden } = toRefs(props)

const active = defineModel<string>('active')
const open = defineModel<Array<string>>('open')

provide(injectionKey, {
	collapsed,
	active,
	open,
	hidden
})

defineSlots<{
	/** Заголовок */
	header?: () => unknown
	/** Элементы меню */
	default?: () => unknown
	/** Нижний колонтитул списка элементов  */
	footer?: () => unknown
}>()
</script>

<template>
	<div :class="['Sidenav', { collapsed: collapsed }]">
		<div class="Sidenav__header">
			<slot name="header"> </slot>
		</div>
		<div class="Sidenav__content">
			<div class="Sidenav__items">
				<slot> </slot>
			</div>
			<div class="Sidenav__footer">
				<slot name="footer"></slot>
			</div>
		</div>
	</div>
</template>

<style scoped>
.Sidenav__header {
	box-sizing: border-box;
	height: 64px;
	border-bottom: 1px solid var(--design-border-color-baseline);
	padding: calc(2.5 * var(--design-gap-unit)) calc(3 * var(--design-gap-unit));
}
.Sidenav {
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

	.Sidenav__content {
		display: flex;
		flex-direction: column;
		height: 100%;
		padding: calc(2 * var(--design-gap-unit));
		padding-top: var(--design-gap-unit);
		overflow-y: auto;
		overflow-x: hidden;
	}

	.Sidenav__footer {
		display: flex;
		flex-direction: column;
		gap: calc(3 * var(--design-gap-unit));
		margin-top: auto;
	}
}

.Sidenav__items {
	display: flex;
	flex-direction: column;
	gap: var(--design-gap-unit);
}

.Sidenav.collapsed {
	width: 84px;
}

.Sidenav.collapsed .Sidenav__content {
	align-items: center;
}
</style>
