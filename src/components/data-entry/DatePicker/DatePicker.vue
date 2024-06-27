<script setup lang="ts">
import { toRefs, onMounted, ref, provide } from 'vue'
import { useModalContext } from '../../../utils/useModalContext.ts'

interface DatePickerProps {
	disabled?: boolean
	required?: boolean
	invalid?: boolean
	autofocus?: boolean
	label?: string
	hint?: string
	description?: string
}

const props = withDefaults(defineProps<DatePickerProps>(), {
	disabled: false,
	required: false,
	invalid: false,
	autofocus: false,
	label: '',
	hint: '',
	description: ''
})

const { autofocus, disabled } = toRefs(props)

const value = defineModel<string | Date | undefined | null>({ required: true })

const root = ref<HTMLElement>()
const inputRef = ref<HTMLElement>()

const focus = () => inputRef.value?.focus()

onMounted(() => {
	if (autofocus.value) focus()
})

provide('datepicker-root', root)
useModalContext(root)
</script>
<template>
	<div ref="root" class="DatePicker">
		<span v-if="label" class="label Field__label" :class="{ required: required }">{{ label }}</span>
		<span v-if="description" class="Field__description text-small description">{{ description }}</span>
		<div class="Field__beforeWrapper">
			<slot name="before"></slot>
		</div>
		<input
			ref="inputRef"
			v-model="value"
			type="date"
			:disabled="disabled"
			:class="['input', { invalid: invalid }]"
		/>
		<div v-if="$slots.after" class="Field__afterWrapper after">
			<slot name="after"></slot>
		</div>
		<span v-if="hint" class="hint text-small" :class="{ invalid: invalid }">
			{{ hint }}
		</span>
	</div>
</template>
<style scoped>
.DatePicker {
	text-align: start;
	padding: var(--design-gap-unit);
	background: var(--design-background-color-primary);
	.input {
		padding: var(--design-gap-unit) calc(2 * var(--design-gap-unit));
		outline: none;
		border-width: 1px;
		text-transform: uppercase;
		border-radius: var(--design-border-radius-control);
		width: calc(100% - 4 * var(--design-gap-unit) - 2px);
		background: var(--design-background-color-primary);
	}
	.input.invalid {
		border: 1px solid var(--design-border-color-danger-primary);
	}
	.input.invalid:focus-within,
	.input.invalid:focus {
		box-shadow: 0px 0px 0px 3px #d2283533;
		border: 1px solid var(--design-border-color-danger-primary);
	}
	.label.required::after {
		content: '*';
		color: var(--design-text-color-danger);
		margin-left: 4px;
	}
	.hint {
		color: var(--design-text-color-secondary);
		display: block;
	}
	.hint.invalid {
		border: none;
		color: var(--design-text-color-danger);
	}
	.description {
		color: var(--design-text-color-secondary);
		display: block;
	}
	.after {
		display: inline-block;
	}
}
.DatePicker.dense {
	display: flex;
	padding: 0;
	.input {
		padding: 0 var(--design-gap-unit);
		font-size: var(--design-font-size-small);
	}
}
</style>
