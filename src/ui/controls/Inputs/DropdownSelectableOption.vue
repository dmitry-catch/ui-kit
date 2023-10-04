<style>
.DropdownSelectableOption {
	display: flex;
	flex-flow: row;
	gap: var(--design-gap-unit);
	align-items: center;
	justify-content: space-between;
}
</style>

<template>
	<div class="DropdownSelectableOption">
		<div class="DropdownSelectableOption__name">{{ option.name }}</div>
		<Icon v-if="selected" name="check" style="--icon-color: red"></Icon>
	</div>
</template>

<script setup lang="ts">
import Icon from '../../icons/Icon.vue'
import { toRefs } from 'vue'

const props = defineProps<{ option: { name: string; value: any }; selected: boolean }>()
const { option, selected } = toRefs(props)
</script>
