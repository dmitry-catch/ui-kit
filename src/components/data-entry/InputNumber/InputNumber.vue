<script setup lang="ts">
import Icon from '../../general/Icon/Icon.vue'
import { computed, toRefs } from 'vue'

interface InputNumberProps {
	modelValue: number
	step?: number
	min?: number
	max?: number
	disabled?: boolean
	readonly?: boolean
	arrowed?: boolean
	scrollable?: boolean
	invalid?: boolean | string
	placeholder?: string
	size?: 'extra-small' | 'small' | 'medium'
}

const props = withDefaults(defineProps<InputNumberProps>(), {
	step: 1,
	size: 'medium',
	min: -Infinity,
	max: Infinity
})

const { modelValue, step, placeholder, disabled, readonly, invalid, size, min, max, scrollable } = toRefs(props)

const emit = defineEmits(['update:modelValue'])

const internalValue = computed({
	get: () => modelValue.value,
	set: (value) => {
		if (canChangeValue.value) {
			emit('update:modelValue', Number(value))
		}
	}
})

const isNotMaxValue = computed(() => internalValue.value < max.value)
const isNotMinValue = computed(() => internalValue.value > min.value)
const canChangeValue = computed(() => !readonly.value && !disabled.value)

const incrementValue = () => {
	if (isNotMaxValue.value) internalValue.value = internalValue.value + step.value
}

const decrementValue = () => {
	if (isNotMinValue.value) internalValue.value = internalValue.value - step.value
}

const onWheel = (evt: WheelEvent) => {
	evt.preventDefault()
	if (scrollable.value) {
		const delta = -evt.deltaY
		if (delta > 0) {
			incrementValue()
		} else {
			decrementValue()
		}
	}
}

const onKeyDown = (evt: KeyboardEvent) => {
	switch (evt.key) {
		case 'Home':
			if (min.value !== -Infinity) {
				internalValue.value = min.value
			}
			break
		case 'End':
			if (max.value !== Infinity) {
				internalValue.value = max.value
			}
			break
		default:
			break
	}
}

const onBlur = () => {
	if (internalValue.value > max.value) {
		internalValue.value = max.value
	}
	if (internalValue.value < min.value) {
		internalValue.value = min.value
	}
}
</script>

<template>
	<div ref="root" class="InputNumber__wrapper">
		<div class="InputNumber" :class="{ 'InputNumber--invalid': invalid }">
			<span class="InputNumber__prefix" :class="size">
				<slot name="prefix"></slot>
			</span>

			<input
				type="number"
				class="InputNumber__input"
				:class="size"
				v-model="internalValue"
				@wheel="onWheel"
				@keydown="onKeyDown"
				@blur="onBlur"
				:placeholder="placeholder"
				:min="min"
				:max="max"
				:disabled="disabled"
				:readonly="readonly"
			/>
			<span v-if="arrowed" class="InputNumber__arrows" :class="size">
				<span
					class="InputNumber__arrowRemove"
					:class="{ 'InputNumber__arrow--disabled': !isNotMinValue || disabled }"
					@click="decrementValue"
				>
					<Icon name="remove" class="InputNumber__arrowIcon" />
				</span>
				<span
					class="InputNumber__arrowAdd"
					:class="{ 'InputNumber__arrow--disabled': !isNotMaxValue || disabled }"
					@click="incrementValue"
				>
					<Icon name="add" class="InputNumber__arrowIcon" />
				</span>
			</span>
			<span class="InputNumber__postfix" :class="size">
				<slot name="postfix"></slot>
			</span>
		</div>
		<span v-if="typeof invalid === 'string'" class="InputNumber__error" :class="size">
			{{ invalid }}
		</span>
	</div>
</template>

<style scoped>
.InputNumber {
	display: flex;
	border: 1px solid var(--design-border-color-primary);
	border-radius: var(--design-border-radius-control);
}

.InputNumber__input {
	outline: none;
	width: 100%;
	border-radius: var(--design-border-radius-control);
	padding: var(--design-gap-unit) var(--design-gap-unit) var(--design-gap-unit) calc(2 * var(--design-gap-unit));
	border: none;
}

.InputNumber__arrows {
	--icon-size: 20px;
	cursor: pointer;
	display: flex;
	align-items: center;
}

.InputNumber__arrowAdd {
	border-left: 1px solid var(--design-border-color-tertiary);
}

.InputNumber__arrowAdd,
.InputNumber__arrowRemove {
	padding: 0 calc(1.5 * var(--design-gap-unit));
	--icon-size: 16px;
}

.InputNumber__prefix,
.InputNumber__postfix {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: var(--design-gap-unit);
	background-color: var(--design-background-color-tertiary);
	--icon-size: 20px;
}

.InputNumber__postfix {
	border-left: 1px solid var(--design-border-color-primary);
	border-radius: 0 var(--design-border-radius-control) var(--design-border-radius-control) 0;
	user-select: none;
}

.InputNumber__prefix {
	border-right: 1px solid var(--design-border-color-primary);
	border-radius: var(--design-border-radius-control) 0 0 var(--design-border-radius-control);
}

.InputNumber__arrow--disabled .InputNumber__arrowIcon {
	cursor: not-allowed;
}

.InputNumber__arrow--disabled :deep(.Icon path) {
	fill: var(--design-border-color-secondary);
}

.InputNumber--invalid {
	border: var(--design-border-color-danger-primary) 1px solid;
}

.InputNumber__error {
	color: var(--design-text-color-danger);
}

/* Size Styling */

/* Small Size Styling */
.InputNumber__prefix.small,
.InputNumber__postfix.small,
.InputNumber__input.small {
	font-size: var(--design-font-size-small);
	padding: calc(var(--design-gap-unit) / 2) calc(var(--design-gap-unit) / 2) calc(var(--design-gap-unit) / 2)
		var(--design-gap-unit);
}
.InputNumber__error.small {
	font-size: var(--design-font-size-small);
}

/* Extra-Small Size Styling */
.InputNumber__prefix.extra-small,
.InputNumber__postfix.extra-small,
.InputNumber__input.extra-small {
	--icon-size: 18px;
	font-size: var(--design-font-size-footnote);
	padding: calc(var(--design-gap-unit) / 4) calc(var(--design-gap-unit) / 4) calc(var(--design-gap-unit) / 4)
		calc(var(--design-gap-unit) / 2);
}
.InputNumber__error.extra-small {
	font-size: var(--design-font-size-footnote);
}
/* */

.InputNumber__prefix:empty,
.InputNumber__postfix:empty {
	padding: 0;
	border: none;
}

/* Reset Input Number styling */

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}

/* Firefox */
input[type='number'] {
	-moz-appearance: textfield;
}
</style>
