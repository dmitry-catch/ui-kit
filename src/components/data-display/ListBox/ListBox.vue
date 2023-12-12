<script setup lang="ts">
import Popover from '../../non-public/Popover/Popover.vue'
import { ref, toRefs } from 'vue'
import { ListBoxOption } from './types.js'
import SelectableOption from '../../data-entry/Select/SelectableOption/SelectableOption.vue'
import { useClickOutside } from '../../../utils/useClickOutside.js'

interface ListBoxProps {
	modelValue?: Array<any>
	options?: Array<ListBoxOption>
}

const props = withDefaults(defineProps<ListBoxProps>(), {
	options: () => [],
	modelValue: () => []
})
const emit = defineEmits(['update:modelValue', 'closeRequest'])

const root = ref()
const { options, modelValue } = toRefs(props)

const dropdownOptionClick = async (event: MouseEvent, option: ListBoxOption) => {
	let defaultPrevented = false
	const preventDefault = () => (defaultPrevented = true)
	if (typeof option.action === 'function') await option.action({ preventDefault, data: option })
	if (!defaultPrevented) {
		emit('update:modelValue', [option.value])
		emit('closeRequest', event)
	}
}
const content = ref()
defineExpose(
	{ content }
)

useClickOutside(root, (event) => emit('closeRequest', event))
</script>

<template>
	<Popover ref="root" class="ListBox">
		<div ref="content" class="Btn__dropdownContent">
			<div
				v-for="option in options"
				class="ListBox__dropdownItem"
				@click="(event) => dropdownOptionClick(event, option)"
			>
				<slot name="item" :data="option">
					<SelectableOption :option="option" :selected="modelValue.includes(option.value)"></SelectableOption>
				</slot>
			</div>
		</div>
	</Popover>
</template>

<style>
.ListBox {
}

.ListBox__dropdownItem {
	padding: var(--design-gap-unit) calc(3 * var(--design-gap-unit));
}

.ListBox__dropdownItem:hover {
	background: var(--design-background-color-secondary);
}

.Btn__dropdownContent {
	background: var(--design-background-color-primary);
	border: 1px solid var(--design-border-color-primary);
	border-radius: var(--design-border-radius-control);
}
</style>
