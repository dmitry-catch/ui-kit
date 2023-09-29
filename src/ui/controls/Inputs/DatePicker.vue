<style>
@import '/public/visually-hidden.css';
.DatePicker {
	box-sizing: border-box;
	width: fit-content;
}

.DatePicker__visible {
	box-sizing: border-box;
	display: inline-block;
	margin-left: 6px;
	width: var(--design-current-line-height);
	height: var(--design-current-line-height);
	cursor: pointer;
}

.DatePicker__visible:focus {
	outline: none;
}

.DatePicker__icon {
	--icon-color: var(--design-text-color-secondary);
}

.DatePicker__hint {
	display: block;
}

.DatePicker__inputs-container {
	background-color: var(--design-background-color-primary);
	padding: 8px 14px 8px 16px;
	border-radius: 4px;
	border: 1px solid var(--design-border-color-primary);
	margin: 8px 0;
	/* cursor: pointer; */
	display: flex;
	align-items: center;
	justify-content: space-between;
	min-width: 240px;
}

.DatePicker__date-time {
	text-align: center;
	color: var(--design-text-color-secondary);
}

.DatePicker__date-time.disabled {
	border: none !important;
	color: var(--design-text-color-secondary);
}

.active {
	color: var(--design-text-color-primary);
}

.DatePicker__inputs-container:focus-within {
	border-color: var(--design-border-color-secondary);
}

.DatePicker__hint {
	font-size: 14px;
	color: var(--design-text-color-secondary);
	display: block;
}

.DatePicker__description {
	font-size: 14px;
	color: var(--design-text-color-secondary);
	display: block;
}

.DatePicker__calendar-popup {
	top: 100%;
	right: 0;
}

.DatePicker__calendar-popup:focus {
	outline: none;
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

.invalid:focus-within,
.invalid:focus {
	box-shadow: 0px 0px 0px 3px #d2283533;
	border: 1px solid var(--design-border-color-accent-primary);
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

.highlight-text {
	background-color: #3266d0;
	color: var(--design-text-color-on-accent-primary);
}
</style>

<template>
	<div class="DatePicker">
		<span class="DatePicker__label" :class="required ? 'required' : ''">{{ label }}</span>
		<span class="DatePicker__description">{{ description }}</span>
		<div class="DatePicker__inputs-container" :class="(disabled ? 'disabled' : '') + (invalid ? 'invalid' : '')">
			<div class="DatePicker__date-time" :class="dateTimeStyling(dateTimeValue, disabled)">
				<span @click="handleDateTimeDayClick" ref="dayPlaceholderRef" tabindex="1">{{ dateTimeValue[0] }}</span>
				<span>.</span>
				<span @click="handleDateTimeMonthClick" ref="monthPlaceholderRef" tabindex="2">{{
					dateTimeValue[1]
				}}</span>
				<span>.</span>
				<span @click="handleDateTimeYearClick" ref="yearPlaceholderRef" tabindex="3">{{
					dateTimeValue[2]
				}}</span>
			</div>

			<input
				type="number"
				class="visually-hidden"
				v-model="day"
				ref="dayRef"
				@input="handleDayInput"
				@focus="handleInputFocus"
			/>
			<input
				type="number"
				class="visually-hidden"
				v-model="month"
				ref="monthRef"
				@input="handleMonthInput"
				@focus="handleInputFocus"
			/>
			<input
				type="number"
				class="DatePicker__input visually-hidden"
				v-model="year"
				ref="yearRef"
				@input="handleYearInput"
				@focus="handleInputFocus"
			/>

			<span
				class="DatePicker__visible"
				:class="disabled ? 'disabled__input' : ''"
				tabindex="0"
				@click="handleCalendarClick"
			>
				<Icon class="DatePicker__icon" name="calendar"></Icon>
			</span>
		</div>
	</div>
	<div class="DatePicker__calendar-popup" v-if="isCalendarOpen" tabindex="0">
		<CalendarPopup
			v-model:day="day"
			v-model:month="month"
			v-model:year="year"
			:isTime="time"
			:handleCalendarClose="handleCalendarClose"
		/>
	</div>
	<span class="DatePicker__hint" :class="invalid ? 'invalid' : ''">{{ hint }}</span>
</template>
<script setup lang="ts">
import Icon from '../../icons/Icon.vue'
import { defineProps, toRefs, ref, watch, computed } from 'vue'
import { DateLocalizationRu } from '../../../localization.ru'
import CalendarPopup from './DataHelpers/CalendarPopup.vue'

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
		time?: boolean
	}>(),
	{ value: new Date() }
)

const emit = defineEmits(['update:modelValue'])
const { modelValue } = toRefs(props)
const day = ref(modelValue.value.split('-')[2])
const month = ref(modelValue.value.split('-')[1])
const year = ref(modelValue.value.split('-')[0])
const DateLocalization = new DateLocalizationRu()
const isCalendarOpen = ref(false)

const dayRef = ref()
const monthRef = ref()
const yearRef = ref()

const dateTimeValue = computed(() => {
	const dateAbbr = DateLocalization.DateAbbr().split('.')
	return [
		day.value && day.value != '00' ? String(day.value) : dateAbbr[0],
		month.value && month.value != '00' ? String(month.value) : dateAbbr[1],
		year.value && year.value != '0000' ? String(year.value) : dateAbbr[2]
	]
})

const handleCalendarClick = () => {
	if (!props.disabled) isCalendarOpen.value = !isCalendarOpen.value
}

const handleCalendarClose = () => (isCalendarOpen.value = false)

const dateTimeStyling = (values: Array<string>, disabled: boolean | undefined) => {
	const isActive = values.some((value) => /\d/.test(value))
	return `${isActive ? 'active' : ''} ${disabled ? 'disabled' : ''}`
}

const handleDayInput = (event: any) => {
	const maxPossibleValue = new Date(Number(year.value), Number(month.value), 0).getDate()
	handleTwoDigitsInput(maxPossibleValue.toString(), event, day)
}

const handleDateTimeDayClick = () => dayRef.value.focus()

const handleDateTimeMonthClick = () => monthRef.value.focus()

const handleDateTimeYearClick = () => yearRef.value.focus()

const yearPlaceholderRef = ref()
const monthPlaceholderRef = ref()
const dayPlaceholderRef = ref()

watch([dayRef, monthRef, yearRef], () => {
	const refs = [dayPlaceholderRef, monthPlaceholderRef, yearPlaceholderRef]
	const inputs = [dayRef, monthRef, yearRef]
	refs.forEach((ref, index) => {
		inputs[index].value.addEventListener('focus', () => {
			ref.value.classList.add('highlight-text')
		})
		inputs[index].value.addEventListener('blur', () => {
			ref.value.classList.remove('highlight-text')
		})
	})
})

const handleMonthInput = (event: any) => {
	handleTwoDigitsInput('12', event, month)
}

const handleTwoDigitsInput = (maxPossibleValue: string, event: any, ref: any) => {
	const value = event.target.value
	if (Number(value) > Number(maxPossibleValue)) {
		ref.value = maxPossibleValue
	} else if (Number(value) < 0) {
		ref.value = '01'
	} else if (value.length > 2) {
		if (value.charAt(0) == '0') {
			ref.value = value.slice(1)
		} else {
			ref.value = maxPossibleValue
		}
	} else if (value.length == 1) {
		ref.value = '0' + value
	} else if (value.length == 0 || value == '0') {
		ref.value = '01'
	}

	if (!(ref.value.charAt(0) == '0')) {
		event.target.nextElementSibling.focus()
	}
}

const handleYearInput = (event: any) => {
	const value = event.target.value
	if (value.length > 4) {
		year.value = value.slice(1)
	} else if (value.length < 4) {
		year.value = '0'.repeat(4 - value.length) + value
	}
	if (String(year.value).length >= 4 && !(String(year.value).charAt(0) == '0')) {
		event.target.blur()
	}
}

const handleInputFocus = (event: any) => {
	event.target.select()
}

const formatToDDMMYY = (day: string, month: string, year: string) => {
	day = day ? day : '00'
	month = month ? month : '00'
	year = year ? year : '0000'
	return `${year}-${month}-${day}`
}

watch([day, month, year], () => {
	const formattedDate = formatToDDMMYY(day.value, month.value, year.value)
	emit('update:modelValue', formattedDate)
})
</script>
