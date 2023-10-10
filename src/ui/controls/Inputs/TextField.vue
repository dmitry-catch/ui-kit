<style>
@import 'field.css';
</style>

<template>
	<label class="TextField Field text-medium" :class="{ 'Field--invalid': invalid }">
		<span class="Field__label">{{ label }}</span>
		<span class="Field__description text-small">{{ description }}</span>
		<span class="Field__visibleInput">
			<span class="Field__beforeWrapper">
				<slot name="before"></slot>
			</span>
			<input
				v-model="internalValue"
				class="Field__input"
				:type="type"
				:placeholder="placeholder"
				:tabindex="tabindex"
				v-bind="$attrs"
				:autofocus="autofocus"
				ref="inputElement"
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
import CharCounter from './CharCounter.vue'
import { computed, toRefs, defineEmits, ref, onMounted } from 'vue'

const emit = defineEmits(['update:modelValue'])
const props = defineProps<{
	label: any
	description: any
	modelValue: string
	maxLength: any
	minLength: any
	max: any
	min: any
	invalid: boolean
	placeholder: string
	readonly: boolean
	tabindex: number
	autofocus: boolean
}>()

const { modelValue, tabindex, min, max, minLength, maxLength, label, invalid, placeholder, description, autofocus } =
	toRefs(props)
const internalValue = computed({ get: () => modelValue.value, set: (value) => emit('update:modelValue', value) })
const type = computed(() => 'text')
const inputElement = ref()
const focus = () => inputElement.value.focus()

onMounted(() => {
	if (autofocus.value) focus()
})
</script>
