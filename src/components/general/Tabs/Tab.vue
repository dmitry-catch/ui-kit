<script setup lang="ts">
import { computed, inject, Ref, toRefs } from 'vue'
import { TabsProvide } from './tabs.provide'

interface TabProps {
	value?: string | number | null
}
const props = withDefaults(defineProps<TabProps>(), { value: null })

const { value } = toRefs(props)
const selectedValue = inject(TabsProvide.selectedTab) as Ref
const pressed = computed(() => selectedValue?.value == value.value)
const selectValue = (inject(TabsProvide.selectTab) ??
	// eslint-disable-next-line @typescript-eslint/ban-types
	console.warn('Tab is used outside of context. Wrap Tab in Tabs component')) as Function
</script>

<template>
	<button class="Tab accent" :class="{ pressed: pressed }" @click="selectValue(value)">
		<slot name="before"></slot>
		<slot></slot>
		<slot name="after"></slot>
	</button>
</template>

<style scoped>
.Tab {
	display: flex;
	gap: var(--design-gap-unit);
	background: var(--design-background-color-primary);
	color: var(--design-text-color-secondary);
	border: none;
	border-bottom: 3px solid rgba(0, 0, 0, 0);
	box-sizing: border-box;
	align-content: center;
	padding-bottom: calc(1.5 * var(--design-gap-unit));
}

.Tab:hover {
	color: var(--design-text-color-primary);
}

.Tab:hover:disabled {
	color: var(--design-text-color-secondary);
}

.Tab:disabled {
	color: var(--design-text-color-secondary);
	cursor: none;
}

.Tab:focus-visible {
	outline: var(--design-focus-outline);
	color: var(--design-text-color-primary);
}

.Tab.pressed {
	border-bottom: var(--design-background-color-accent-primary) 3px solid;
	color: var(--design-text-color-primary);
}
</style>
