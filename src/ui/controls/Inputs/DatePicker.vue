<style>
@import '/public/visually-hidden.css';
@import '/src/ui/controls/Inputs/field.css';

.DatePicker {
}

.DatePicker__visible {
	box-sizing: border-box;
	display: inline-block;
	width: var(--design-current-line-height);
	height: var(--design-current-line-height);
	cursor: pointer;
	margin-left: auto;
}

.DatePicker__visible:focus {
	outline: none;
}

.DatePicker__inputsContainer {
	display: flex;
	align-items: center;
	justify-content: space-between;
	min-width: min-content;
	gap: var(--design-gap-unit);
}

.DatePicker__inputsContainer:focus-within {
	border-color: var(--design-border-color-primary);
}

.DatePicker__inputsContainer:focus-within.disabled {
	border-color: var(--design-border-color-primary);
}
.DatePicker__dateTime {
	display: flex;
	text-align: center;
	color: var(--design-text-color-secondary);
}

.DatePicker.disabled .DatePicker__dateTime {
	border: none;
	color: var(--design-text-color-secondary);
}

.DatePicker.disabled .DatePicker__icon {
	background-color: var(--design-background-color-secondary);
	cursor: not-allowed;
}
.DatePicker.disabled .DatePicker__dateValue {
	color: var(--design-text-color-secondary);
}
.DatePicker__dateTime.active {
	color: var(--design-text-color-primary);
}
.DatePicker .Field__visibleInput {
	margin-top: var(--design-gap-unit);
}

.DatePicker__hint {
	color: var(--design-text-color-secondary);
	display: block;
}

.DatePicker__description {
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

.DatePicker__inputsContainer.invalid {
	border: 1px solid var(--design-border-color-accent-primary);
}

.DatePicker__inputsContainer.invalid:focus-within,
.DatePicker__inputsContainer.invalid:focus {
	box-shadow: 0px 0px 0px 3px #d2283533;
	border: 1px solid var(--design-border-color-accent-primary);
}

.DatePicker__label.required::after {
	content: '*';
	color: var(--design-text-color-danger);
	margin-left: 4px;
}

.DatePicker__inputsContainer.disabled {
	background-color: var(--design-background-color-on-accent-primary);
	cursor: not-allowed;
}

.DatePicker__visible.disabled__input {
	background-color: var(--design-background-color-on-accent-primary);
	cursor: not-allowed;
}

.DatePicker__dateTimeInputContainer span:focus {
	outline: none;
}
.DatePicker__icon.calendarIcon {
	--icon-color: var(--design-text-color-secondary);
}
:focus + .DatePicker__dateValue {
	background-color: var(--design-background-color-info);
	color: var(--design-text-color-on-accent-primary);
}

.DatePicker.dense .DatePicker__dateValue,
.DatePicker.dense .DatePicker__dateSplitter {
	--design-current-font-size: var(--design-font-size-footnote);
	--design-current-line-height: var(--design-line-height-footnote);
}
</style>

<template>
	<div class="DatePicker Field" ref="root" :class="{ disabled: disabled, invalid: invalid }">
		<span class="DatePicker__label Field__label" :class="{ required: required }">{{ label }}</span>
		<span class="Field__description text-small">{{ description }}</span>
		<div class="Field__visibleInput">
			<div class="Field__beforeWrapper">
				<slot name="before"></slot>
			</div>
			<div
				class="DatePicker__dateTime text-medium"
				:class="{
					active: dateTimeValue.some((value) => /\d/.test(value)),
					disabled: disabled
				}"
			>
				<label class="Field__input" :class="{ disabled: disabled }">
					<input
						type="number"
						min="1"
						max="31"
						class="visually-hidden"
						:value="day"
						ref="dayRef"
						:disabled="disabled"
						@input="handleDayInput"
						@focus="handleInputFocus"
						:autofocus="autofocus"
					/>
					<span class="DatePicker__dateValue">{{ day?.padStart(2, '0').slice(-2) || 'ДД' }}</span>
				</label>

				<span class="DatePicker__dateSplitter">.</span>
				<label class="Field__input" :class="{ disabled: disabled }">
					<input
						type="number"
						min="1"
						max="12"
						class="visually-hidden"
						:valuel="month"
						ref="monthRef"
						:disabled="disabled"
						@input="handleMonthInput"
						@focus="handleInputFocus"
					/>
					<span class="DatePicker__dateValue">{{ month?.padStart(2, '0').slice(-2) || 'ММ' }}</span>
				</label>
				<span class="DatePicker__dateSplitter">.</span>
				<label class="Field__input" :class="{ disabled: disabled }">
					<input
						type="number"
						min="1"
						max="9999"
						class="DatePicker__input visually-hidden"
						:value="year"
						ref="yearRef"
						:disabled="disabled"
						@input="handleYearInput"
						@focus="handleInputFocus"
					/>
					<span class="DatePicker__dateValue">{{ year?.padStart(4, '0').slice(-4) || 'ГГГГ' }}</span>
				</label>
				<div class="Field__afterWrapper">
					<slot name="after"></slot>
				</div>
			</div>

			<Btn
				class="DatePicker__visible icon functional"
				:class="{
					disabled__input: disabled
				}"
				@click="handleCalendarClick"
			>
				<Icon class="DatePicker__icon calendarIcon" name="calendar"></Icon>
			</Btn>
		</div>
		<Dropdown v-if="isCalendarOpen" tabindex="0">
			<CalendarPopup
				v-model:day="day"
				v-model:month="month"
				v-model:year="year"
				:handleCalendarClose="handleCalendarClose"
			/>
		</Dropdown>
		<span class="DatePicker__hint text-small" :class="{ invalid: invalid }">{{ hint }}</span>
	</div>
</template>
<script setup lang="ts">
import Dropdown from '../../layout/Dropdown.vue'
import Icon from '../../icons/Icon.vue'
import Btn from '../Buttons/Btn.vue'
import { defineProps, toRefs, ref, watch, computed, onMounted, provide, watchEffect } from 'vue'
import { DateLocalizationRu } from '../../../localization.ru'
import CalendarPopup from './DataHelpers/CalendarPopup.vue'
import { handleInputFocus, handleNextInputFocus } from './DataHelpers/DataEventHelper'
import {
	getMonthArray,
	handleYearInputEvent,
	isInputEventTriggersEffect,
	numberOfDaysInMonth
} from './DataHelpers/DataHelper'

interface DatePickerProps {
	disabled?: boolean
	required?: boolean
	invalid?: boolean
	autofocus?: boolean
	label?: string
	hint?: string
	description?: string
	modelValue?: string
}

const props = withDefaults(defineProps<DatePickerProps>(), {
	disabled: false,
	required: false,
	invalid: false,
	autofocus: false,
	label: '',
	hint: '',
	description: '',
})
const emit = defineEmits(['update:modelValue'])

const { autofocus } = toRefs(props)
const modelValue = ref(props.modelValue ? JSON.stringify(new Date(props.modelValue)).split('T')[0] : null)
const day = ref<string | null | undefined>(modelValue.value?.split('-')[2])
const month = ref<string | null | undefined>(modelValue.value?.split('-')[1])
const year = ref<string | null | undefined>(modelValue.value?.split('-')[0])

watchEffect(() => {
	year.value = modelValue != null ? modelValue.value?.split('-')[0] : null
	month.value = modelValue != null ? modelValue.value?.split('-')[1] : null
	day.value = modelValue != null ? modelValue.value?.split('-')[2] : null
})

const dayRef = ref()
const monthRef = ref()
const yearRef = ref()
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
		if (!day.value) day.value = String(new Date().getDate())
		if (!month.value) month.value = String(new Date().getMonth() + 1)
		if (!year.value) year.value = String(new Date().getFullYear())
		isCalendarOpen.value = !isCalendarOpen.value
	}
}

const focus = () => dayRef.value.focus()

onMounted(() => {
	if (autofocus.value) focus()
})
const handleCalendarClose = () => {
	focus()
	isCalendarOpen.value = false
}

const handleDayInput = (event: Event) => {
	const target = event.target as HTMLInputElement
	if (target.value.length >= 2 && day.value && day.value.length < 2) monthRef.value.focus()
	day.value = target.value
}

const handleMonthInput = (event: Event) => {
	const target = event.target as HTMLInputElement
	if (target.value.length >= 2 && month.value && month.value.length < 2) yearRef.value.focus()
	month.value = String(target.value)
}

const handleYearInput = (event: Event) => {
	const target = event.target as HTMLInputElement
	year.value = handleYearInputEvent(target.value)
}

watch([day, month, year], () => {
	if (month.value) {
		if (Number(month.value) > 12) month.value = '12'
		if (Number(month.value) < 1 && month.value.length > 1) month.value = '1'
		if (day.value && year.value) {
			const days = numberOfDaysInMonth(Number(month.value), Number(year.value))

			if (Number(day.value) > days) day.value = days.toString()
			if (Number(day.value) < 1 && day.value.length > 1) day.value = '1'
		}
	}
	year.value = year.value ? year.value.toString().slice(-4) : null
	month.value = month.value ? month.value.toString().slice(-2) : null
	day.value = day.value ? day.value.toString().slice(-2) : null
	if (day.value && month.value && year.value) emit('update:modelValue', `${year.value}-${month.value}-${day.value}`)
	else emit('update:modelValue', null)
})
const root = ref()
provide('datepicker-root', root)
</script>
