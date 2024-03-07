<script setup lang="ts">
import CharCounter from './components/CharCounter.vue'
import { computed, onMounted, ref, toRefs } from 'vue'

interface TextFieldProps {
	autofocus?: boolean
	required?: boolean
	invalid?: boolean
	readonly?: boolean
	label?: string
	description?: string
	minLength?: number
	/** Добавляет счетчик символов. */
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

<template>
	<label class="TextField Field text-medium" :class="{ 'Field--invalid': invalid }">
		<span class="Field__label">
			<slot v-if="slots.label" name="label">{{ label }}</slot>
			<span v-if="required" class="Field__requiredStar">*</span>
		</span>
		<span class="Field__description text-small">
			<slot v-if="slots.description" name="description">{{ description }}</slot>
		</span>
		<span class="Field__visibleInput">
			<span class="Field__beforeWrapper">
				<slot v-if="slots.before" name="before"></slot>
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
				<slot v-if="slots.after" name="after"></slot>
			</span>
		</span>
		<span class="Field__below text-small">
			<span class="Field__validationMessage danger">
				<slot v-if="slots.validationHint" name="validationHint"></slot>
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
