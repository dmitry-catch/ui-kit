<style>
.Tabs {
	display: flex;
	align-items: center;
	height: min-content;
	gap: calc(2 * var(--design-gap-unit));
}
</style>

<template>
	<div class="Tabs">
		<slot></slot>
	</div>
</template>

<script setup lang="ts">
import { provide, toRefs, computed, toRef, Ref } from 'vue'
import { TabsProvide } from './tabs.provide'
const props = defineProps({ modelValue: { required: true } })
const emit = defineEmits(['update:modelValue'])
const modelValue: Ref<any> = toRef(props, 'modelValue')
const selectedValue = computed({
	get() {
		return modelValue.value
	},
	set(value) {
		emit('update:modelValue', value)
	},
})
provide(TabsProvide.selectedTab, selectedValue)
provide(TabsProvide.selectTab, (value: any) => {
	selectedValue.value = value
})
</script>
