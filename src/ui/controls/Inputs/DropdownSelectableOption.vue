<style>
.DropdownSelectableOption {
	display: flex;
	flex-flow: row;
	gap: var(--design-gap-unit);
	align-items: center;
	justify-content: space-between;
}
.DropdownSelectableOption__selected.hidden {
	visibility: hidden;
}
</style>

<template>
	<div class="DropdownSelectableOption text-medium">
		<div class="DropdownSelectableOption__name">{{ option.name }}</div>
		<Icon
			name="check"
			class="DropdownSelectableOption__selected accent"
			:class="{
				hidden: !selected
			}"
		></Icon>
	</div>
</template>

<script setup lang="ts">
import Icon from '../../icons/Icon.vue'
import { toRefs } from 'vue'

const props = defineProps<{ option: { name: string; value: any }; selected: boolean }>()
const { option, selected } = toRefs(props)
</script>
