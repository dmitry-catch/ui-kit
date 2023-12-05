<script setup lang="ts">
import Popover from '../../non-public/Popover/Popover.vue'
import Icon from '../../general/Icon/Icon.vue'
import Button from '../../general/Button/Button.vue'
import { onMounted, provide, ref, toRefs, watch } from 'vue'
import { DateLocalizationRu } from '../../../consts/localization.ru.js'
import CalendarPopup from '../../non-public/CalendarPopup/CalendarPopup.vue'
import { callSelectOnElement, handleInitialDateValue } from './utils.js'
import test from 'node:test'

interface DatePickerProps {
	disabled?: boolean
	required?: boolean
	invalid?: boolean
	autofocus?: boolean
	label?: string
	hint?: string
	description?: string
	modelValue?: string | Date | undefined
}

const props = withDefaults(defineProps<DatePickerProps>(), {
	disabled: false,
	required: false,
	invalid: false,
	autofocus: false,
	label: '',
	hint: '',
	description: '',
	modelValue: undefined
})
const emit = defineEmits(['update:modelValue'])

const { autofocus, modelValue } = toRefs(props)

const internalValue = ref<Date | null>(handleInitialDateValue(modelValue.value))

const day = ref<number | undefined>()
const month = ref<number | undefined>()
const year = ref<number | undefined>()

const dayRef = ref()
const monthRef = ref()
const yearRef = ref()
const DateLocalization = new DateLocalizationRu().DateAbbr()

const isCalendarOpen = ref(false)

const focus = () => dayRef.value.focus()

const handleDayInput = (event: Event) => {
	const target = event.target as HTMLInputElement
	if (target.value.length >= 2) monthRef.value.focus()
	const newInternalValue = internalValue.value instanceof Date ? internalValue.value : new Date()
	newInternalValue.setDate(Number(target.value))
	internalValue.value = new Date(newInternalValue.toDateString())
}
const handleMonthInput = (event: Event) => {
	const target = event.target as HTMLInputElement
	if (target.value.length >= 2) yearRef.value.focus()
	const newInternalValue = internalValue.value instanceof Date ? internalValue.value : new Date()
	newInternalValue.setMonth(Number(target.value) - 1)
	internalValue.value = new Date(newInternalValue.toDateString())
}
const handleYearInput = (event: Event) => {
	const target = event.target as HTMLInputElement
	const newInternalValue = internalValue.value instanceof Date ? internalValue.value : new Date()
	newInternalValue.setFullYear(Number(target.value.slice(-4)))
	internalValue.value = new Date(newInternalValue.toDateString())
}

const handleCalendarClose = () => {
	focus()
	isCalendarOpen.value = false
}

const handleCalendarClick = () => {
	if (!props.disabled) {
		if (!internalValue.value || !(internalValue.value instanceof Date)) internalValue.value = new Date()
		isCalendarOpen.value = !isCalendarOpen.value
	}
}

const handleInternalValueChange = () => {
	if (internalValue.value) {
		day.value = internalValue.value?.getDate()
		month.value = Number(internalValue.value?.getMonth()) + 1
		year.value = internalValue.value?.getFullYear()
		emit('update:modelValue', internalValue.value)
	}
}

watch(internalValue, () => {
	handleInternalValueChange()
})

watch([day, month, year], () => {
	const newInternalValue = internalValue.value instanceof Date ? internalValue.value : new Date()
	newInternalValue.setDate(Number(day.value))
	newInternalValue.setMonth(Number(month.value) - 1)
	newInternalValue.setFullYear(Number(year.value))
	internalValue.value = new Date(newInternalValue.toDateString())
})

watch(modelValue, (value) => {
	if (value != internalValue.value) internalValue.value = handleInitialDateValue(value)
})

onMounted(() => {
	if (autofocus.value) focus()
	handleInternalValueChange()
})

const root = ref()
provide('datepicker-root', root)
</script>
<template>
	<div ref="root" class="DatePicker Field" :class="{ disabled: disabled, invalid: invalid }">
		<span class="DatePicker__label Field__label" :class="{ required: required }">{{ label }}</span>
		<span class="Field__description text-small">{{ description }}</span>
		<div class="Field__visibleInput">
			<div class="Field__beforeWrapper">
				<slot name="before"></slot>
			</div>
			<div
				class="DatePicker__dateTime text-medium"
				:class="{
					active: internalValue != undefined,
					disabled: disabled
				}"
			>
				<label class="Field__input" :class="{ disabled: disabled }">
					<input
						ref="dayRef"
						type="number"
						min="1"
						max="31"
						class="visually-hidden"
						:value="day"
						:disabled="disabled"
						:autofocus="autofocus"
						@input="handleDayInput"
						@focus="callSelectOnElement"
					/>
					<span class="DatePicker__dateValue">{{
						day ? String(day)?.padStart(2, '0').slice(-2) : DateLocalization[0]
					}}</span>
				</label>

				<span class="DatePicker__dateSplitter">.</span>
				<label class="Field__input" :class="{ disabled: disabled }">
					<input
						ref="monthRef"
						type="number"
						min="1"
						max="12"
						class="visually-hidden"
						:valuel="month"
						:disabled="disabled"
						@input="handleMonthInput"
						@focus="callSelectOnElement"
					/>
					<span class="DatePicker__dateValue">{{
						month ? String(month)?.padStart(2, '0').slice(-2) : DateLocalization[1]
					}}</span>
				</label>
				<span class="DatePicker__dateSplitter">.</span>
				<label class="Field__input" :class="{ disabled: disabled }">
					<input
						ref="yearRef"
						type="number"
						min="1900"
						max="9999"
						class="DatePicker__input visually-hidden"
						:value="year"
						:disabled="disabled"
						@input="handleYearInput"
						@focus="callSelectOnElement"
					/>
					<span class="DatePicker__dateValue">{{
						year ? String(year)?.padStart(4, '0').slice(-4) : DateLocalization[2]
					}}</span>
				</label>
				<div class="Field__afterWrapper">
					<slot name="after"></slot>
				</div>
			</div>

			<Button
				class="DatePicker__visible icon functional"
				:class="{
					disabled__input: disabled
				}"
				@click="handleCalendarClick"
			>
				<Icon class="DatePicker__icon calendarIcon" name="calendar"></Icon>
			</Button>
		</div>
		<Popover v-if="isCalendarOpen" tabindex="0">
			<CalendarPopup
				v-model:day="day"
				v-model:month="month"
				v-model:year="year"
				:handleCalendarClose="handleCalendarClose"
			/>
		</Popover>
		<span class="DatePicker__hint text-small" :class="{ invalid: invalid }">{{ hint }}</span>
	</div>
</template>
<style>
@import '/public/visually-hidden.css';
@import '/src/styles/field.css';

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
