<style>
.Tab {
	display: flex;
	gap: var(--design-gap-unit);
	background: var(--design-background-color-primary);
	color: var(--design-text-color-primary);
	border: none;
	border-bottom: 3px solid rgba(0, 0, 0, 0);
	box-sizing: border-box;
	align-content: center;
}
.Tab:hover {
	color: var(--design-text-color-primary);
}
.Tab:disabled {
	color: var(--design-text-color-secondary);
}
.Tab:focus-visible {
	outline: var(--design-focus-outline);
	color: var(--design-text-color-primary);
}

.Tab.pressed {
	border-bottom: var(--design-background-color-accent-primary) 3px solid;
}
</style>

<template>
	<button class="Tab" :class="{ pressed: selectedValue === value }" @click="selectValue(value)">
		<slot name="before"></slot>
		<slot></slot>
		<slot name="after"></slot>
	</button>
</template>

<script setup lang="ts">
import { computed, inject, Ref, ref, toRefs } from 'vue'
import { TabsProvide } from './tabs.provide'
const props = defineProps({ value: { default: () => null } })
const { value } = toRefs(props)
const selectedValue = computed(() => (inject(TabsProvide.selectedTab) as Ref<any>).value)
const selectValue =
	inject(TabsProvide.selectTab) ?? console.warn('Tab is used outside of context. Wrap Tab in Tabs component')
</script>
