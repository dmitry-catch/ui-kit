<style>
.DateRangePicker {
	box-sizing: border-box;
	width: fit-content;
}

.DateRangePicker__calendarPopup {
	display: flex;
	box-shadow: 0px 32px 64px 0px #212c3a29;
	width: fit-content;
}
.DateRangePicker__calendarPopup .calendarPopup {
	box-shadow: none;
}
.DateRangePicker__calendarPopup .calendarPopup:first-of-type {
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
}
.DateRangePicker__calendarPopup .calendarPopup:last-of-type {
	border-top-left-radius: 0;
	border-bottom-left-radius: 0;
}

.DateRangePicker__description {
	font-size: 14px;
	color: var(--design-text-color-secondary);
	display: block;
}

.DateRangePicker__inputsContainer {
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

.DateRangePicker__inputsContainer:focus-within {
	border-color: var(--design-border-color-secondary);
}

.DateRangePicker__dateTime {
	text-align: center;
	color: var(--design-text-color-secondary);
}

.DateRangePicker__dateTime.disabled {
	border: none !important;
	color: var(--design-text-color-secondary);
}

.DateRangePicker__dateTime.active {
	color: var(--design-text-color-primary);
}

.DateRangePicker__visible {
	box-sizing: border-box;
	display: inline-block;
	margin-left: 6px;
	width: var(--design-current-line-height);
	height: var(--design-current-line-height);
	cursor: pointer;
}

.DateRangePicker__visible:focus {
	outline: none;
}

.DateRangePicker__input:focus + .DateRangePicker__visible .DateRangePicker__calendarPopup {
	display: block;
}

.DateRangePicker__icon {
	--icon-color: var(--design-text-color-secondary);
}

.DateRangePicker__hint.invalid {
	border: none;
	color: var(--design-text-color-danger);
}

.DateRangePicker__hint {
	font-size: 14px;
	color: var(--design-text-color-secondary);
	display: block;
}

.DateRangePicker__dateTimeInputContainer {
	width: fit-content;
	display: inline-block;
}
.DateRangePicker__dateTimeInputContainer:focus-within {
	background-color: #3266d0;
	color: var(--design-text-color-on-accent-primary);
}
</style>

<template>
	<div class="DateRangePicker">
		<span class="DateRangePicker__label" :class="{ required: required }">{{ label }}</span>
		<span class="DateRangePicker__description">{{ description }}</span>
		<div
			class="DateRangePicker__inputsContainer"
			:class="{
				disabled: disabled,
				invalid: invalid
			}"
		>
			<div
				class="DateRangePicker__dateTime"
				:class="{
					active:
						dateTimeFromValue.some((value) => /\d/.test(value)) ||
						dateTimeToValue.some((value) => /\d/.test(value)),
					disabled: disabled
				}"
			>
				<div class="DateRangePicker__dateTimeInputContainer">
					<span @click="handleDateTimeDayFromClick" tabindex="1">{{ dateTimeFromValue[0] }}</span>
					<input
						type="number"
						class="visually-hidden"
						v-model="dayFrom"
						ref="dayFromRef"
						@input="handleDayFromInput"
						@focus="handleInputFocus"
					/>
				</div>
				<span>.</span>
				<div class="DateRangePicker__dateTimeInputContainer">
					<span @click="handleDateTimeMonthFromClick" tabindex="2">{{ dateTimeFromValue[1] }}</span>
					<input
						type="number"
						class="visually-hidden"
						v-model="monthFrom"
						ref="monthFromRef"
						@input="handleMonthFromInput"
						@focus="handleInputFocus"
					/>
				</div>
				<span>.</span>
				<div class="DateRangePicker__dateTimeInputContainer">
					<span @click="handleDateTimeYearFromClick" tabindex="3">{{ dateTimeFromValue[2] }}</span>

					<input
						type="number"
						class="visually-hidden"
						v-model="yearFrom"
						ref="yearFromRef"
						@input="handleYearFromInput"
						@focus="handleInputFocus"
					/>
				</div>
				<span> &mdash; </span>
				<div class="DateRangePicker__dateTimeInputContainer">
					<span @click="handleDateTimeDayToClick" tabindex="1">{{ dateTimeToValue[0] }}</span>

					<input
						type="number"
						class="visually-hidden"
						v-model="dayTo"
						ref="dayToRef"
						@input="handleDayToInput"
						@focus="handleInputFocus"
					/>
				</div>
				<span>.</span>
				<div class="DateRangePicker__dateTimeInputContainer">
					<span @click="handleDateTimeMonthToClick" tabindex="2">{{ dateTimeToValue[1] }}</span>
					<input
						type="number"
						class="visually-hidden"
						v-model="monthTo"
						ref="monthToRef"
						@input="handleMonthToInput"
						@focus="handleInputFocus"
					/>
				</div>
				<span>.</span>
				<div class="DateRangePicker__dateTimeInputContainer">
					<span @click="handleDateTimeYearToClick" tabindex="3">{{ dateTimeToValue[2] }}</span>
					<input
						type="number"
						class="visually-hidden"
						v-model="yearTo"
						ref="yearToRef"
						@input="handleYearToInput"
						@focus="handleInputFocus"
					/>
				</div>
			</div>

			<span
				class="DateRangePicker__visible"
				:class="{ disabled__input: disabled }"
				tabindex="0"
				@click="handleCalendarClick"
			>
				<Icon class="DateRangePicker__icon" name="calendar"></Icon>
			</span>
		</div>
	</div>
	<div class="DateRangePicker__calendarPopup" v-if="isCalendarOpen" tabindex="0">
		<CalendarPopup
			v-model:day="dayFrom"
			v-model:month="monthFrom"
			v-model:year="yearFrom"
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
			:handleCalendarClose="handleCalendarClose"
			:isRange="true"
			:getFullRange="getRange"
		/>
	</div>
	<span class="DateRangePicker__hint" :class="invalid ? 'invalid' : ''">{{ hint }}</span>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import CalendarPopup from './DataHelpers/CalendarPopup.vue'
import Icon from '../../icons/Icon.vue'
import { DateLocalizationRu } from '../../../localization.ru'
import { ref, watch, computed, toRefs } from 'vue'
import { handleInputFocus, handleNextInputFocus } from './DataHelpers/DataEventHelper'
import { handleTwoDigitsInput, handleYearInputEvent } from './DataHelpers/DataHelper'
import { isInputEventTriggersEffect } from './DataHelpers/DataHelper'

const props = withDefaults(
	defineProps<{
		from: String
		to: String
		value?: string
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

const { from, to } = toRefs(props)
const emit = defineEmits(['update:from', 'update:to'])

const dayFrom = ref(from.value?.split('-')[2])
const monthFrom = ref(from.value?.split('-')[1])
const yearFrom = ref(from.value?.split('-')[0])

const dayTo = ref(to.value?.split('-')[2])
const monthTo = ref(to.value?.split('-')[1])
const yearTo = ref(to.value?.split('-')[0])

const dayFromRef = ref()
const monthFromRef = ref()
const yearFromRef = ref()

const dayToRef = ref()
const monthToRef = ref()
const yearToRef = ref()

const refsArray = [dayFromRef, monthFromRef, yearFromRef, dayToRef, monthToRef, yearToRef]

const DateLocalization = new DateLocalizationRu()

const isCalendarOpen = ref(false)

const handleDateTimeDayFromClick = () => dayFromRef.value.focus()
const handleDateTimeMonthFromClick = () => monthFromRef.value.focus()
const handleDateTimeYearFromClick = () => yearFromRef.value.focus()

const handleDateTimeDayToClick = () => dayToRef.value.focus()
const handleDateTimeMonthToClick = () => monthToRef.value.focus()
const handleDateTimeYearToClick = () => yearToRef.value.focus()

const handleDayFromInput = (event: Event) => {
	const target = event.target as HTMLInputElement
	dayFrom.value = handleTwoDigitsInput('31', target.value)
	if (isInputEventTriggersEffect(dayFrom.value)) handleNextInputFocus(refsArray, refsArray.indexOf(dayFromRef))
}
const handleMonthFromInput = (event: Event) => {
	const target = event.target as HTMLInputElement
	monthFrom.value = handleTwoDigitsInput('12', target.value)
	if (isInputEventTriggersEffect(monthFrom.value)) handleNextInputFocus(refsArray, refsArray.indexOf(monthFromRef))
}
const handleYearFromInput = (event: Event) => {
	const target = event.target as HTMLInputElement
	yearFrom.value = handleYearInputEvent(target.value)
	if (isInputEventTriggersEffect(yearFrom.value)) handleNextInputFocus(refsArray, refsArray.indexOf(yearFromRef))
}

const handleDayToInput = (event: Event) => {
	const target = event.target as HTMLInputElement
	dayTo.value = handleTwoDigitsInput('31', target.value)
	if (isInputEventTriggersEffect(dayTo.value)) handleNextInputFocus(refsArray, refsArray.indexOf(dayToRef))
}
const handleMonthToInput = (event: Event) => {
	const target = event.target as HTMLInputElement
	monthTo.value = handleTwoDigitsInput('12', target.value)
	if (isInputEventTriggersEffect(monthTo.value)) handleNextInputFocus(refsArray, refsArray.indexOf(monthToRef))
}
const handleYearToInput = (event: Event) => {
	const target = event.target as HTMLInputElement
	yearTo.value = handleYearInputEvent(target.value)
	if (isInputEventTriggersEffect(yearTo.value)) target.blur()
}

const getRange = () => (from.value && to.value ? [from.value, to.value] : [])

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
	if (!props.disabled) {
		if (!dayFrom.value) dayFrom.value = handleTwoDigitsInput('31', String(new Date().getDate()))
		if (!monthFrom.value) monthFrom.value = handleTwoDigitsInput('12', String(new Date().getMonth() + 1))
		if (!yearFrom.value) yearFrom.value = String(new Date().getFullYear())
		if (!dayTo.value) dayTo.value = handleTwoDigitsInput('31', String(new Date().getDate()))
		if (!monthTo.value) monthTo.value = handleTwoDigitsInput('12', String(new Date().getMonth() + 2))
		if (!yearTo.value) yearTo.value = String(new Date().getFullYear())
		isCalendarOpen.value = !isCalendarOpen.value
	}
}

const handleCalendarClose = () => (isCalendarOpen.value = false)

const handleCalendarReset = () => {
	const today = new Date()
	const newDayValue = String(today.getDate() < 10 ? '0' + today.getDate() : today.getDate())
	const newMonthValue = String(today.getMonth() + 1 < 10 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1)

	dayFrom.value = newDayValue
	monthFrom.value = newMonthValue
	yearFrom.value = String(today.getFullYear())

	dayTo.value = newDayValue
	monthTo.value = newMonthValue
	yearTo.value = String(today.getFullYear())
}

watch([dayFrom, monthFrom, yearFrom], () => {
	emit('update:from', `${yearFrom.value}-${monthFrom.value}-${dayFrom.value}`)
})

watch([dayTo, monthTo, yearTo], () => {
	emit('update:to', `${yearTo.value}-${monthTo.value}-${dayTo.value}`)
})
</script>
