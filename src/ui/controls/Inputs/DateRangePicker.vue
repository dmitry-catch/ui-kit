<style>
.DateRangePicker__calendar-popup {
	display: flex;
	box-shadow: 0px 32px 64px 0px #212c3a29;
	width: fit-content;
}
.DateRangePicker__calendar-popup .calendar-popup {
	box-shadow: none;
}
.DateRangePicker__calendar-popup .calendar-popup:first-of-type {
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
}
.DateRangePicker__calendar-popup .calendar-popup:last-of-type {
	border-top-left-radius: 0;
	border-bottom-left-radius: 0;
}
</style>

<template>
	<div class="DatePicker">
		<span class="DatePicker__label" :class="required ? 'required' : ''">{{ label }}</span>
		<span class="DatePicker__description">{{ description }}</span>
		<div class="DatePicker__inputs-container" :class="(disabled ? 'disabled' : '') + (invalid ? 'invalid' : '')">
			<div class="DatePicker__date-time" :class="dateTimeStyling(dateTimeFromValue, disabled)">
				<span @click="handleDateTimeDayFromClick" ref="dayFromPlaceholderRef" tabindex="1">{{
					dateTimeFromValue[0]
				}}</span>
				<span>.</span>
				<span @click="handleDateTimeMonthFromClick" ref="monthFromPlaceholderRef" tabindex="2">{{
					dateTimeFromValue[1]
				}}</span>
				<span>.</span>
				<span @click="handleDateTimeYearFromClick" ref="yearFromPlaceholderRef" tabindex="3">{{
					dateTimeFromValue[2]
				}}</span>
				<span> &mdash; </span>
				<span @click="handleDateTimeDayToClick" ref="dayToPlaceholderRef" tabindex="1">{{
					dateTimeToValue[0]
				}}</span>
				<span>.</span>
				<span @click="handleDateTimeMonthToClick" ref="monthToPlaceholderRef" tabindex="2">{{
					dateTimeToValue[1]
				}}</span>
				<span>.</span>
				<span @click="handleDateTimeYearToClick" ref="yearToPlaceholderRef" tabindex="3">{{
					dateTimeToValue[2]
				}}</span>
			</div>

			<input
				type="number"
				class="visually-hidden"
				v-model="dayFrom"
				ref="dayFromRef"
				@input="handleDayFromInput"
				@focus="handleInputFocus"
			/>
			<input
				type="number"
				class="visually-hidden"
				v-model="monthFrom"
				ref="monthFromRef"
				@input="handleMonthFromInput"
				@focus="handleInputFocus"
			/>
			<input
				type="number"
				class="DatePicker__input visually-hidden"
				v-model="yearFrom"
				ref="yearFromRef"
				@input="handleYearFromInput"
				@focus="handleInputFocus"
			/>
			<input
				type="number"
				class="visually-hidden"
				v-model="dayTo"
				ref="dayToRef"
				@input="handleDayToInput"
				@focus="handleInputFocus"
			/>
			<input
				type="number"
				class="visually-hidden"
				v-model="monthTo"
				ref="monthToRef"
				@input="handleMonthToInput"
				@focus="handleInputFocus"
			/>
			<input
				type="number"
				class="DatePicker__input visually-hidden"
				v-model="yearTo"
				ref="yearToRef"
				@input="handleYearToInput"
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
	<div class="DatePicker__calendar-popup DateRangePicker__calendar-popup" v-if="isCalendarOpen" tabindex="0">
		<CalendarPopup
			v-model:day="dayFrom"
			v-model:month="monthFrom"
			v-model:year="yearFrom"
			:isTime="false"
			:handleCalendarClose="handleCalendarClose"
			:isRange="true"
			:isControlRange="true"
			:handleReset="handleCalendarReset"
			:getFullRange="getRange"
		/>
		<CalendarPopup
			v-model:day="dayTo"
			v-model:month="monthTo"
			v-model:year="yearTo"
			:isTime="false"
			:handleCalendarClose="handleCalendarClose"
			:isRange="true"
			:getFullRange="getRange"
		/>
	</div>
	<span class="DatePicker__hint" :class="invalid ? 'invalid' : ''">{{ hint }}</span>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import CalendarPopup from './DataHelpers/CalendarPopup.vue'
import Icon from '../../icons/Icon.vue'
import { DateLocalizationRu } from '../../../localization.ru'
import { ref, watch, computed, toRefs } from 'vue'
import {
	handleTwoDigitsInput,
	handleYearInputEvent,
	handleDayInputEvent,
	dateTimeStyling,
	handleInputFocus,
	formatToRequiredFormatRange
} from './DataHelpers/DataHelper'

const props = withDefaults(
	defineProps<{
		modelValue: any
		value?: any
		disabled?: boolean
		required?: boolean
		hint?: string
		label?: string
		description?: string
		invalid?: boolean
	}>(),
	{
		disabled: false,
		required: false,
		hint: '',
		label: '',
		description: '',
		invalid: false
	}
)

const modelValue = toRefs(props).modelValue
const emit = defineEmits(['update:modelValue'])

const dayFrom = ref(modelValue.value.split(',')[0].split('-')[2].trim())
const monthFrom = ref(modelValue.value.split(',')[0].split('-')[1].trim())
const yearFrom = ref(modelValue.value.split(',')[0].split('-')[0].trim())

const dayTo = ref(modelValue.value.split(',')[1].split('-')[2].trim())
const monthTo = ref(modelValue.value.split(',')[1].split('-')[1].trim())
const yearTo = ref(modelValue.value.split(',')[1].split('-')[0].trim())

const dayFromRef = ref()
const monthFromRef = ref()
const yearFromRef = ref()

const dayToRef = ref()
const monthToRef = ref()
const yearToRef = ref()

const dayFromPlaceholderRef = ref()
const monthFromPlaceholderRef = ref()
const yearFromPlaceholderRef = ref()

const dayToPlaceholderRef = ref()
const monthToPlaceholderRef = ref()
const yearToPlaceholderRef = ref()

const DateLocalization = new DateLocalizationRu()

const isCalendarOpen = ref(false)

const handleDateTimeDayFromClick = () => dayFromRef.value.focus()
const handleDateTimeMonthFromClick = () => monthFromRef.value.focus()
const handleDateTimeYearFromClick = () => yearFromRef.value.focus()

const handleDateTimeDayToClick = () => dayToRef.value.focus()
const handleDateTimeMonthToClick = () => monthToRef.value.focus()
const handleDateTimeYearToClick = () => yearToRef.value.focus()

const handleDayFromInput = (event: any) => handleDayInputEvent(event, yearFrom.value, monthFrom.value, dayFrom)
const handleMonthFromInput = (event: any) => handleTwoDigitsInput('12', event, monthFrom)
const handleYearFromInput = (event: any) =>
	handleYearInputEvent(event, yearFrom, (event: any) => event.target.nextElementSibling.focus())

const handleDayToInput = (event: any) => handleDayInputEvent(event, yearTo.value, monthTo.value, dayTo)
const handleMonthToInput = (event: any) => handleTwoDigitsInput('12', event, monthTo)
const handleYearToInput = (event: any) => handleYearInputEvent(event, yearTo)

const getRange = () => modelValue.value.split(',').map((date: any) => String(date).trim())

const dateTimeFromValue = computed(() => {
	const dateAbbr = DateLocalization.DateAbbr().split('.')
	return [
		dayFrom.value && dayFrom.value != '00' ? String(dayFrom.value) : dateAbbr[0],
		monthFrom.value && monthFrom.value != '00' ? String(monthFrom.value) : dateAbbr[1],
		yearFrom.value && yearFrom.value != '0000' ? String(yearFrom.value) : dateAbbr[2]
	]
})

const dateTimeToValue = computed(() => {
	const dateAbbr = DateLocalization.DateAbbr().split('.')
	return [
		dayTo.value && dayTo.value != '00' ? String(dayTo.value) : dateAbbr[0],
		monthTo.value && monthTo.value != '00' ? String(monthTo.value) : dateAbbr[1],
		yearTo.value && yearTo.value != '0000' ? String(yearTo.value) : dateAbbr[2]
	]
})

const handleCalendarClick = () => {
	if (!props.disabled) isCalendarOpen.value = !isCalendarOpen.value
}

const handleCalendarClose = () => (isCalendarOpen.value = false)

const handleCalendarReset = () => {
	const today = new Date()
	const newDayValue = today.getDate() < 10 ? '0' + today.getDate() : today.getDate()
	const newMonthValue = today.getMonth() + 1 < 10 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1

	dayFrom.value = newDayValue
	monthFrom.value = newMonthValue
	yearFrom.value = today.getFullYear()

	dayTo.value = newDayValue
	monthTo.value = newMonthValue
	yearTo.value = today.getFullYear()
}

watch([dayToRef, monthToRef, yearToRef, dayFromRef, monthFromRef, yearFromRef], () => {
	const refs = [
		dayToPlaceholderRef,
		monthToPlaceholderRef,
		yearToPlaceholderRef,
		dayFromPlaceholderRef,
		monthFromPlaceholderRef,
		yearFromPlaceholderRef
	]
	const inputs = [dayToRef, monthToRef, yearToRef, dayFromRef, monthFromRef, yearFromRef]

	refs.forEach((ref, index) => {
		inputs[index].value.addEventListener('focus', () => {
			ref.value.classList.add('highlight-text')
		})
		inputs[index].value.addEventListener('blur', () => {
			ref.value.classList.remove('highlight-text')
		})
	})
})

watch([dayFrom, monthFrom, yearFrom, dayTo, monthTo, yearTo], () => {
	const formattedDate = formatToRequiredFormatRange(
		dayFrom.value,
		monthFrom.value,
		yearFrom.value,
		dayTo.value,
		monthTo.value,
		yearTo.value
	)
	emit('update:modelValue', formattedDate)
})
</script>
