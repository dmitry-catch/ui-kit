<script setup lang="ts">
import Button from '../../../general/Button/Button.vue'
import Icon from '../../../general/Icon/Icon.vue'

defineProps({
	isCollapsed: Boolean
})
</script>

<template>
	<Button class="functional menu" :class="{ isCollapsed }">
		<div class="Button">
			<Icon name="main_menu" />
			<span v-if="!isCollapsed" class="accent secondary"> <slot></slot> </span>
		</div>
		<Icon v-if="!isCollapsed" class="chevron" name="chevron_backward" />
	</Button>
</template>

<style scoped>
.Button {
	display: flex;
	gap: var(--design-gap-unit);
}

.chevron {
	--icon-size: 16px;
}

.menu :deep(.Btn__actual) {
	width: 100%;
	justify-content: space-between;
}

.menu:not(.isCollapsed) {
	padding-right: 0;
}

.menu:hover :deep(*) {
	color: var(--design-text-color-primary);
	fill: var(--design-text-color-primary);
}

.menu :deep(*) {
	fill: var(--design-text-color-secondary);
}
</style>
