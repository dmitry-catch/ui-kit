<script setup lang="ts">
import { inject } from 'vue'
import Button from '../../../general/Button/Button.vue'
import Icon from '../../../general/Icon/Icon.vue'
import { injectionKey } from '../consts.js'

const { collapsed } = inject(injectionKey)!

const slots = defineSlots<{ default?: () => unknown }>()
</script>

<template>
	<Button class="Toggle functional" :class="{ collapsed }" :block="true">
		<Icon name="main_menu" />
		<span v-if="!collapsed" class="Toggle__label accent secondary"> <slot></slot> </span>

		<Icon v-if="!collapsed" class="Toggle__chevron" name="chevron_backward" />
	</Button>
</template>

<style scoped>
.Toggle {
	border-bottom: 1px solid var(--design-border-color-baseline);
	padding: var(--design-gap-unit) 0;
}

.Toggle__label {
	margin-right: auto;
}

.Toggle__chevron {
	--icon-size: 16px;
}

.Toggle:hover :deep(*) {
	color: var(--design-text-color-primary);
	fill: var(--design-text-color-primary);
}

.Toggle :deep(*) {
	fill: var(--design-text-color-secondary);
}
</style>
