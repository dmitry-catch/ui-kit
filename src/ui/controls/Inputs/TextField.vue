<style>
.Field {
	display: flex;
	flex-flow: column;
	padding: 4px;
}

.Field__description {
	color: var(--design-text-color-secondary);
}
.Field__input {
	border: none;
	width: 100%;
}
.Field__input:focus-visible {
	outline: none;
}
.Field__visibleInput {
	background: var(--design-background-color-primary);
	border: var(--design-border-color-secondary) 1px solid;
	border-radius: var(--design-border-radius-control);
	box-sizing: border-box;
	width: 100%;
	overflow: hidden;
	height: min-content;
	max-height: 40px;
	display: flex;
	padding: var(--design-gap-unit) calc(2 * var(--design-gap-unit));
}
.Field--invalid .Field__visibleInput {
	border-color: var(--design-border-color-danger-primary);
}
.Field__visibleInput {
	outline: var(--forced-focus-outline, none);
}
.Field__visibleInput:focus-within {
	outline: var(--design-focus-outline);
}
.Field__below {
	display: flex;
	flex-flow: row;
}
.Field__validationMessage {
}
.Field__counter {
	margin-left: auto;
}
.Field__validationMessage.danger {
	color: var(--design-text-color-danger);
}

.Field__beforeWrapper,
.Field__afterWrapper {
	width: min-content;
	height: min-content;
}
</style>

<template>
	<label class="Field text-medium" :class="{ 'Field--invalid': invalid }">
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
				:readonly="readonly ? 'true' : 'false'"
				:tabindex="tabindex"
				v-bind="$attrs"
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
import { computed, toRefs, defineEmits } from 'vue'

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
}>()

const { modelValue } = toRefs(props)
const internalValue = computed({ get: () => modelValue.value, set: (value) => emit('update:modelValue', value) })
const type = computed(() => 'text')
</script>
