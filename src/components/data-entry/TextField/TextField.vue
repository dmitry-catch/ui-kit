<script setup lang="ts">
import CharCounter from '../../data-display/CharCounter/CharCounter.vue'
import { computed, onMounted, ref, toRefs } from 'vue'
import type { TextFieldProps } from './types'

const props = withDefaults(defineProps<TextFieldProps>(), {
	autofocus: false,
	required: false,
	invalid: false,
	readonly: false
})

const slots = defineSlots<{
	/** Заголовок */
	label?: string
	/** Описание между загголовком и полем */
	description?: string
	/** Валидационная подсказка под полем */
	validationHint?: string
	before?: unknown
	after?: unknown
}>()

const emit = defineEmits(['update:modelValue', 'focus', 'blur'])

const { modelValue, tabindex, maxLength, label, invalid, placeholder, description, autofocus, required } = toRefs(props)
const internalValue = computed({ get: () => modelValue.value, set: (value) => emit('update:modelValue', value) })
const type = computed(() => 'text')
const inputElement = ref()
const focus = () => inputElement.value.focus()

onMounted(() => {
	if (autofocus.value) focus()
})

const root = ref<HTMLElement>()

const focusHandler = (event: FocusEvent) => {
	if (root.value?.contains(event.relatedTarget as HTMLElement)) return

	emit('focus', event)
}

const blurHandler = (event: FocusEvent) => {
	if (root.value?.contains(event.relatedTarget as HTMLElement)) return

	emit('blur', event)
}
</script>

<template>
	<label ref="root" class="TextField Field text-medium" :class="{ 'Field--invalid': invalid }">
		<span v-if="slots.label || label || required" class="Field__label">
			<slot name="label">{{ label }}</slot>
			<span v-if="required" class="Field__requiredStar">*</span>
		</span>
		<span v-if="slots.description || description" class="Field__description text-small">
			<slot name="description">{{ description }}</slot>
		</span>
		<span class="Field__visibleInput">
			<span v-if="slots.before" class="Field__beforeWrapper">
				<slot name="before"></slot>
			</span>
			<input
				v-bind="$attrs"
				ref="inputElement"
				v-model="internalValue"
				class="Field__input"
				:type="type"
				:placeholder="placeholder"
				:tabindex="tabindex"
				:autofocus="autofocus"
				@focus="focusHandler"
				@blur="blurHandler"
			/>
			<span v-if="slots.after" class="Field__afterWrapper">
				<slot name="after"></slot>
			</span>
		</span>
		<span v-if="slots.validationHint || maxLength != null" class="Field__below text-small">
			<span class="Field__validationMessage danger">
				<slot name="validationHint"></slot>
			</span>
			<CharCounter
				v-if="maxLength != null"
				:current="modelValue?.length ?? 0"
				:max="maxLength"
				class="Field__counter"
			></CharCounter>
		</span>
	</label>
</template>

<style>
@import '/src/styles/field.css';
</style>
