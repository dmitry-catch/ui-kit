<style>
.ListBox {
}
.ListBox__dropdownItem {
	padding: var(--design-gap-unit) calc(3 * var(--design-gap-unit));
}
.ListBox__dropdownItem:hover {
	background: var(--design-background-color-secondary);
}
</style>

<template>
	<Dropdown class="ListBox" ref="root">
		<div class="Btn__dropdownContent">
			<div
				v-for="option in options"
				class="ListBox__dropdownItem"
				@click="(event) => dropdownOptionClick(event, option)"
			>
				<slot name="item" :data="option">
					<DropdownSelectableOption
						:option="option"
						:selected="modelValue.includes(option.value)"
					></DropdownSelectableOption>
				</slot>
			</div>
		</div>
	</Dropdown>
</template>

<script setup lang="ts">
import Dropdown from '../../layout/Dropdown.vue'
import {
	onActivated,
	onBeforeUnmount,
	onDeactivated,
	onMounted,
	onUnmounted,
	ref,
	toRef,
	toRefs,
	watchEffect
} from 'vue'
import { ListBoxAction, ListBoxOption } from './ListBoxOption'
import DropdownSelectableOption from './DropdownSelectableOption.vue'
import { useClickOutside } from '../../../utils/useClickOutside'
const root = ref()
const props = withDefaults(defineProps<{ modelValue: Array<any>; opened: boolean; options: Array<ListBoxOption> }>(), {
	options: () => [],
	modelValue: () => []
})

const { options, modelValue } = toRefs(props)

const emit = defineEmits(['update:modelValue', 'closeRequest'])
const dropdownOptionClick = async (event: MouseEvent, option: ListBoxOption) => {
	let defaultPrevented = false
	const preventDefault = () => (defaultPrevented = true)
	if (typeof option.action === 'function') await option.action({ preventDefault, data: option })
	if (!defaultPrevented) {
		emit('update:modelValue', [option.value])
		emit('closeRequest', event)
	}
}
useClickOutside(root, (event) => emit('closeRequest', event))
</script>
