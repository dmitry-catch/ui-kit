<style>
@import '../field.css';
</style>

<template>
	<label class="TextField Field text-medium" :class="{ 'Field--invalid': invalid }">
		<span class="Field__label">
			<slot name="label">{{ label }}</slot>
			<span v-if="required" class="Field__requiredStar">*</span>
		</span>
		<span class="Field__description text-small">
			<slot name="description">{{ description }}</slot>
		</span>
		<span class="Field__visibleInput">
			<span class="Field__beforeWrapper">
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
			/>
			<span class="Field__afterWrapper">
				<slot name="after"></slot>
			</span>
		</span>
		<span class="Field__below text-small">
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

<script setup lang="ts">
import CharCounter from '../CharCounter/CharCounter.vue'
import { computed, defineEmits, onMounted, ref, toRefs } from 'vue'

interface TextFieldProps {
	autofocus?: boolean
	required?: boolean
	invalid?: boolean
	readonly?: boolean
	label?: string
	description?: string
	minLength?: number
	maxLength?: number
	min?: number
	max?: number
	placeholder?: string
	tabindex?: '0' | '1' | 0 | 1
	modelValue: string
}

const props = withDefaults(defineProps<TextFieldProps>(), {
	autofocus: false,
	required: false,
	invalid: false,
	readonly: false,
	label: '',
	description: ''
})
const emit = defineEmits(['update:modelValue'])

const { modelValue, tabindex, maxLength, label, invalid, placeholder, description, autofocus, required } = toRefs(props)
const internalValue = computed({ get: () => modelValue.value, set: (value) => emit('update:modelValue', value) })
const type = computed(() => 'text')
const inputElement = ref()
const focus = () => inputElement.value.focus()

onMounted(() => {
	if (autofocus.value) focus()
})
</script>