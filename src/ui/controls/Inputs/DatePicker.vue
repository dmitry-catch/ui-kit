<style>
@import '/public/visually-hidden.css';
.DatePicker {
	box-sizing: border-box;
	width: fit-content;
}
.DatePicker__input {
	border: none;
	display: inline-block;
	max-width: 1.6rem;
	background-color: var(--design-background-color-primary);
	padding: 0;
}

.DatePicker__input:last-of-type {
	max-width: 10vw;
}
.DatePicker__input::placeholder {
	color: var(--design-text-color-secondary);
}

.DatePicker__input:focus {
	border: none;
	outline: none;
}
.DatePicker__input:checked {
	background-color: none;
}
.DatePicker__visible {
	box-sizing: border-box;
	display: inline-block;
	margin-left: 6px;
	width: var(--design-current-line-height);
	height: var(--design-current-line-height);
	cursor: pointer;
  
}
.DatePicker__icon {
	--icon-color: var(--design-text-color-secondary);
}

.DatePicker__hint {
	display: block;
}
.DatePicker__inputs-container {
	display: grid;
  grid-template-columns: repeat(4, 2rem);
	background-color: var(--design-background-color-primary);
	padding: 8px 14px 8px 16px;
	border-radius: 4px;
	border: 1px solid var(--design-border-color-primary);
	margin: 8px 0;
	max-height: 40px;
	cursor: pointer;
  width: fit-content;
}
.DatePicker__inputs-container:focus-within {
	border-color: var(--design-border-color-secondary);
}

.DatePicker__hint {
	font-size: 14px;
	color: var(--design-text-color-secondary);
	margin-top: 4px;
	display: block;
}

.DatePicker__description {
	font-size: 14px;
	color: var(--design-text-color-secondary);
	display: block;
}

.DatePicker__calendar-popup{
  top: 100%;
  right: 0;
  
}

.DatePicker__input:focus + .DatePicker__visible .DatePicker__calendar-popup {
  display: block;
}

.DatePicker__hint.invalid {
	border: none;
	color: var(--design-text-color-danger);
}

.invalid {
	border: 1px solid var(--design-border-color-accent-primary);
}

.invalid:focus-within {
	box-shadow: 0px 0px 0px 3px #d2283533;
}
.required::after {
	content: '*';
	color: var(--design-text-color-danger);
	margin-left: 4px;
}

.disabled {
	background-color: var(--color-on-accent-primary);
	border: 1px solid var(--design-border-color-primary);
	cursor: not-allowed;
}
.disabled__input {
	background-color: var(--color-on-accent-primary);
	cursor: not-allowed;
}
/* Chrome, Safari, Edge, Opera */
.DatePicker__input::-webkit-outer-spin-button,
.DatePicker__input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}

/* Firefox */
/* .DatePicker__input[type='number'] {
	-moz-appearance: textfield;
} */
</style>

<template>
	<div class="DatePicker">
		<span class="DatePicker__label" :class="required ? 'required' : ''">{{ label }}</span>
		<span class="DatePicker__description">{{ description }}</span>
		<div class="DatePicker__inputs-container" :class="(disabled ? 'disabled' : '') + (invalid ? 'invalid' : '')">
			<input
				:class="disabled ? 'disabled__input' : ''"
				type="number"
				class="DatePicker__input"
				maxlength="2"
				v-model="day"
				@input="handleDayInput"
				:disabled="disabled"
				:placeholder="'ДД'"
				@blur="handleTwoDigitsInputBlur"
			/>
			<input
				:class="disabled ? 'disabled__input' : ''"
				type="number"
				class="DatePicker__input"
				maxlength="2"
				:disabled="disabled"
				v-model="month"
				@input="handleMonthInput"
				:placeholder="'ММ'"
				@blur="handleTwoDigitsInputBlur"
			/>
			<input
				:class="disabled ? 'disabled__input' : ''"
				:disabled="disabled"
				type="number"
				class="DatePicker__input"
				maxlength="4"
				v-model="year"
				@input="handleYearInput"
				:placeholder="'ГГГГ'"
				@blur="handleYearInputBlur"
			/>
			<span class="DatePicker__visible" :class="disabled ? 'disabled__input' : ''" tabindex="0">
				<Icon class="DatePicker__icon" name="calendar"></Icon>
			</span>
		</div>
    <div class="DatePicker__calendar-popup">
          <CalendarPopup
            :day="'1'"
            :month="'10'"
            :year="'2023'"
          />
        </div>
		<span class="DatePicker__hint" :class="invalid ? 'invalid' : ''">{{ hint }}</span>

	</div>
</template>
<script setup lang="ts">
import Icon from '../../icons/Icon.vue'
import { defineProps, toRefs, computed, ref, watchEffect } from 'vue'

import { DateLocalizationRu } from '../../../localization.ru'
import CalendarPopup from './CalendarPopup.vue';


const props = withDefaults(
	defineProps<{
		modelValue: any
		value?: any
		disabled?: boolean
		label?: string
		required?: boolean
		hint?: string
		description?: string
		invalid?: boolean
	}>(),
	{ value: new Date() }
)

const emit = defineEmits(['update:modelValue'])
const { modelValue } = toRefs(props)
const day = ref('')
const month = ref('')
const year = ref('')

const handleDayInput = (event: any) => {
	const value = event.target.value
	const maxPossibleValue = new Date(Number(year.value), Number(month.value), 0).getDate()

	if (value.length == 2 || value >= maxPossibleValue) {
		if (value > maxPossibleValue) {
			day.value = String(maxPossibleValue)
		} else if (value < 0) {
			day.value = '1'
		}
		event.target.nextElementSibling.focus()
	}
}

const handleTwoDigitsInputBlur = (event: any) => {
	const value = event.target.value
	if (value.length == 1) {
		event.target.value = '0' + value
	}
}

const handleMonthInput = (event: any) => {
	const value = event.target.value
	if (value.length == 2 || value >= 12) {
		if (Number(value) > 12) {
			month.value = '12'
		} else if (value < 0) {
			month.value = '1'
		}
		event.target.nextElementSibling.focus()
	}
}

const handleYearInput = (event: any) => {
	const value = event.target.value
	if (value.length == 4 || value < 0) {
		if (value.length > 4) {
			year.value = value.slice(0, 4)
			event.target.value = year.value
		}
		event.target.blur()
	}
}

const handleYearInputBlur = (event: any) => {
	const value = event.target.value
	if (value.length < 4) {
		year.value = '0'.repeat(4 - value.length) + value
	}
	if (value.length > 4) {
		year.value = value.slice(0, 4)
	}
}

const validateDate = (day: string, month: string, year: string) => {
	return true
}

const formatToYourPreferredFormat = (day: string, month: string, year: string) => {
	return `${day}.${month}.${year}`
}

watchEffect(() => {
	const isValidDate = validateDate(day.value, month.value, year.value)
	if (isValidDate) {
		const formattedDate = formatToYourPreferredFormat(day.value, month.value, year.value)
		emit('update:modelValue', formattedDate)
	} else {
		emit('update:modelValue', null)
	}
})

// const internalValue = computed({
//     get() {
//         return modelValue.value
//     },
//     set(value) {
//         emit('update:modelValue', value)
//     }
// })
</script>
