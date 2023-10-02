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
			:timeRef="timeRef"
			:handleCalendarClose="handleCalendarClose"
			:isWorkCalendar="isWorkCalendar"
		/>
	</div>
	<span class="DatePicker__hint" :class="invalid ? 'invalid' : ''">{{ hint }}</span>
</template>
<script setup lang="ts">
import Icon from '../../icons/Icon.vue'
import { defineProps, toRefs, ref, watch, computed } from 'vue'
import { DateLocalizationRu } from '../../../localization.ru'
import CalendarPopup from './DataHelpers/CalendarPopup.vue'
import {
	handleTwoDigitsInput,
	handleYearInputEvent,
	handleDayInputEvent,
	dateTimeStyling,
	handleInputFocus,
	formatToRequiredFormat
} from './DataHelpers/DataHelper'

const props = withDefaults(
	defineProps<{
		modelValue: string
		label: string
		disabled: boolean
		required: boolean
		hint: string
		description: string
		invalid: boolean
		time: boolean
		isWorkCalendar: boolean
	}>(),
	{
		label: '',
		disabled: false,
		required: false,
		hint: '',
		description: '',
		invalid: false,
		time: false,
		isWorkCalendar: false
	}
)

const emit = defineEmits(['update:modelValue'])
const { modelValue } = toRefs(props)

const day = ref(modelValue.value.split('-')[2])
const month = ref(modelValue.value.split('-')[1])
const year = ref(modelValue.value.split('-')[0])

const dayRef = ref()
const monthRef = ref()
const yearRef = ref()

const timeRef = ref()

const yearPlaceholderRef = ref()
const monthPlaceholderRef = ref()
const dayPlaceholderRef = ref()

const DateLocalization = new DateLocalizationRu()

const isCalendarOpen = ref(false)

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

const handleDateTimeDayClick = () => dayRef.value.focus()

const handleDateTimeMonthClick = () => monthRef.value.focus()

const handleDateTimeYearClick = () => yearRef.value.focus()

const handleDayInput = (event: any) => handleDayInputEvent(event, year.value, month.value, day)

const handleMonthInput = (event: any) => handleTwoDigitsInput('12', event, month)

const handleYearInput = (event: any) => handleYearInputEvent(event, year)

watch([day, month, year], () => {
	const formattedDate = formatToRequiredFormat(day.value, month.value, year.value, props.time, timeRef.value)
	emit('update:modelValue', formattedDate)
})

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
</script>
