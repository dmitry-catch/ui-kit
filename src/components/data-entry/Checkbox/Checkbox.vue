<script setup lang="ts">
import Icon from '../../general/Icon/Icon.vue'
import { computed, toRefs } from 'vue'

interface CheckboxProps {
	modelValue: boolean
	value?: any
}

const props = withDefaults(defineProps<CheckboxProps>(), { value: true })
const emit = defineEmits(['update:modelValue'])

const { modelValue } = toRefs(props)
const internalValue = computed({
	get() {
		return modelValue.value
	},
	set(value) {
		emit('update:modelValue', value)
	}
})
</script>

<template>
	<label class="Checkbox">
		<input v-model="internalValue" type="checkbox" :value="value" class="Checkbox__input visually-hidden" />
		<span class="Checkbox__visible">
			<Icon class="Checkbox__checked" name="check"></Icon>
		</span>
		<span class="Checkbox__label">
			<slot></slot>
		</span>
	</label>
</template>

<style>
@import '/public/visually-hidden.css';

.Checkbox {
	display: flex;
	gap: calc(1.5 * var(--design-gap-unit));
	align-content: center;
}

.Checkbox__visible {
	width: var(--design-current-line-height);
	height: var(--design-current-line-height);
	border-radius: var(--design-border-radius-control);
	border: var(--design-border-color-primary) solid 1px;
	display: inline-block;
	box-sizing: border-box;
}

.Checkbox__checked {
	visibility: hidden;
	--icon-color: var(--design-background-color-on-accent-primary);
	--icon-size: var(--design-current-line-height);
}

.Checkbox__input:checked + .Checkbox__visible {
	background: var(--design-background-color-accent-primary);
}

.Checkbox__input:checked + .Checkbox__visible .Checkbox__checked {
	visibility: initial;
}

.Checkbox__input:focus-visible + .Checkbox__visible {
	outline: var(--design-focus-outline);
}
</style>
