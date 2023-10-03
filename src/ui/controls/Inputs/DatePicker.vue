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

.DatePicker__inputsContainer {
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

.DatePicker__inputsContainer:focus-within {
	border-color: var(--design-border-color-secondary);
}

.DatePicker__dateTime {
	text-align: center;
	color: var(--design-text-color-secondary);
}

.DatePicker__dateTime.disabled {
	border: none !important;
	color: var(--design-text-color-secondary);
}

.DatePicker__dateTime.active {
	color: var(--design-text-color-primary);
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

.DatePicker__calendarPopup {
	top: 100%;
	right: 0;
	box-shadow: 0px 32px 64px 0px #212c3a29;
	width: fit-content;
}

.DatePicker__calendarPopup:focus {
	outline: none;
}

.DatePicker__input:focus + .DatePicker__visible .DatePicker__calendarPopup {
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

.DatePicker__dateTimeInputContainer {
	width: fit-content;
	display: inline-block;
}
.DatePicker__dateTimeInputContainer:focus-within {
	background-color: #3266d0;
	color: var(--design-text-color-on-accent-primary);
}
</style>

<template>
	<div class="DatePicker">
		<span class="DatePicker__label" :class="{ required: required }">{{ label }}</span>
		<span class="DatePicker__description">{{ description }}</span>
		<div class="DatePicker__inputsContainer" :class="{ disabled: disabled, invalid: invalid }">
			<div
				class="DatePicker__dateTime"
				:class="{
					active: dateTimeValue.some((value) => /\d/.test(value)),
					disabled: disabled
				}"
			>
				<div class="DatePicker__dateTimeInputContainer">
					<span @click="handleDateTimeDayClick" tabindex="1">{{ dateTimeValue[0] }}</span>
					<input
						type="number"
						class="visually-hidden"
						v-model="day"
						ref="dayRef"
						@input="handleDayInput"
						@focus="handleInputFocus"
					/>
				</div>

				<span>.</span>
				<div class="DatePicker__dateTimeInputContainer">
					<span @click="handleDateTimeMonthClick" tabindex="2">{{ dateTimeValue[1] }}</span>
					<input
						type="number"
						class="visually-hidden"
						v-model="month"
						ref="monthRef"
						@input="handleMonthInput"
						@focus="handleInputFocus"
					/>
				</div>
				<span>.</span>
				<div class="DatePicker__dateTimeInputContainer">
					<span @click="handleDateTimeYearClick" tabindex="3">{{ dateTimeValue[2] }}</span>
					<input
						type="number"
						class="DatePicker__input visually-hidden"
						v-model="year"
						ref="yearRef"
						@input="handleYearInput"
						@focus="handleInputFocus"
					/>
				</div>
			</div>

			<span
				class="DatePicker__visible"
				:class="{
					disabled__input: disabled
				}"
				tabindex="0"
				@click="handleCalendarClick"
			>
				<Icon class="DatePicker__icon" name="calendar"></Icon>
			</span>
		</div>
	</div>
	<div class="DatePicker__calendarPopup" v-if="isCalendarOpen" tabindex="0">
		<CalendarPopup
			v-model:day="day"
			v-model:month="month"
			v-model:year="year"
			:handleCalendarClose="handleCalendarClose"
			:isWorkCalendar="isWorkCalendar"
		/>
	</div>
	<span class="DatePicker__hint" :class="{ invalid: invalid }">{{ hint }}</span>
</template>
<script setup lang="ts">
import Icon from '../../icons/Icon.vue'
import { defineProps, toRefs, ref, watch, computed } from 'vue'
import { DateLocalizationRu } from '../../../localization.ru'
import CalendarPopup from './DataHelpers/CalendarPopup.vue'
import { handleInputFocus, handleNextInputFocus } from './DataHelpers/DataEventHelper'
import { handleTwoDigitsInput, handleYearInputEvent, isInputEventTriggersEffect } from './DataHelpers/DataHelper'

const props = withDefaults(
	defineProps<{
		modelValue: string
		label: string
		disabled: boolean
		required: boolean
		hint: string
		description: string
		invalid: boolean
		isWorkCalendar: boolean
	}>(),
	{
		label: '',
		disabled: false,
		required: false,
		hint: '',
		description: '',
		invalid: false,
		isWorkCalendar: false
	}
)

const emit = defineEmits(['update:modelValue'])
const { modelValue } = toRefs(props)

const day = ref(modelValue.value?.split('-')[2])
const month = ref(modelValue.value?.split('-')[1])
const year = ref(modelValue.value?.split('-')[0])

const dayRef = ref()
const monthRef = ref()
const yearRef = ref()

const refsArray = [dayRef, monthRef, yearRef]

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
	if (!props.disabled) {
		if (!day.value) day.value = handleTwoDigitsInput('31', String(new Date().getDate()))
		if (!month.value) month.value = handleTwoDigitsInput('12', String(new Date().getMonth() + 1))
		if (!year.value) year.value = String(new Date().getFullYear())
		isCalendarOpen.value = !isCalendarOpen.value
	}
}

const handleCalendarClose = () => (isCalendarOpen.value = false)

const handleDateTimeDayClick = () => dayRef.value.focus()

const handleDateTimeMonthClick = () => monthRef.value.focus()

const handleDateTimeYearClick = () => yearRef.value.focus()

const handleDayInput = (event: Event) => {
	const target = event.target as HTMLInputElement
	const maxPossibleValue = new Date(
		Number(year.value ? year.value : new Date().getFullYear()),
		Number(month.value ? month.value : new Date().getMonth()) + 1,
		0
	).getDate()
	day.value = handleTwoDigitsInput(String(maxPossibleValue), String(target.value))
	if (isInputEventTriggersEffect(day.value)) handleNextInputFocus(refsArray, refsArray.indexOf(dayRef))
}

const handleMonthInput = (event: Event) => {
	const target = event.target as HTMLInputElement
	month.value = handleTwoDigitsInput('12', String(target.value))
	if (isInputEventTriggersEffect(month.value)) handleNextInputFocus(refsArray, refsArray.indexOf(monthRef))
}

const handleYearInput = (event: Event) => {
	const target = event.target as HTMLInputElement
	year.value = handleYearInputEvent(target.value)
	if (isInputEventTriggersEffect(year.value)) target.blur()
}

watch([day, month, year], () => {
	emit('update:modelValue', `${year.value}-${month.value}-${day.value}`)
})
</script>
