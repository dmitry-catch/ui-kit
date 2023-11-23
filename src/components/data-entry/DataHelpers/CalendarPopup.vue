<style>
.CalendarPopup {
	background: var(--design-background-color-primary);
	width: fit-content;
	padding: 0 24px;
	border-radius: var(--design-border-radius-control);
}

.CalendarPopup_calendar {
	padding: calc(2 * var(--design-gap-unit)) 0;
	box-shadow: 0px -0.5px 0px 0px #e4e5e7 inset;
	min-width: 304px;
	min-height: 304px;
}

.CalendarPopup__controls {
	padding: calc(3 * var(--design-gap-unit)) 0 calc(2 * var(--design-gap-unit)) 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
	box-shadow: 0px -0.5px 0px 0px #e4e5e7 inset;
}

.CalendarPopup__botomControls {
	padding: calc(2 * var(--design-gap-unit)) 0 calc(3 * var(--design-gap-unit)) 0;
	justify-content: end;
	box-shadow: none;
}

.CalendarPopup__pickerChevron {
	color: var(--design-text-color-primary);
	display: inline-block;
	cursor: pointer;
}

.CalendarPopup__goToToday {
	display: flex;
	gap: var(--design-gap-unit);
}

.CalendarPopup__goToTodayIcon {
	cursor: pointer;
}

.CalendarPopup__optionalControl {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: calc(0.75 * var(--design-gap-unit));
}

.CalendarPopup__optionalControl .CalendarPopup__pickerChevron {
	margin-right: calc(1.25 * var(--design-gap-unit));
}

.CalendarPopup__optionalControl .CalendarPopup__pickerChevron:last-of-type {
	margin-right: 0;
}

.CalendarPopup__controlButton {
	font-weight: bold;
	min-height: 40px;
	cursor: pointer;
	display: flex;
	align-items: center;
}

.CalendarPopup__controlButtonApply {
	border: 1px solid var(--design-border-color-primary);
	border-radius: var(--design-border-radius-control);
	padding: 0 calc(3.125 * var(--design-gap-unit));
}

.CalendarPopup__setRange {
	display: flex;
	justify-content: start;
	gap: calc(4 * var(--design-gap-unit));
	width: 100%;
	padding: 0;
}
</style>

<template>
	<div ref="calendarPopupRef" class="CalendarPopup">
		<div class="CalendarPopup__controls">
			<span class="CalendarPopup__pickerChevron" @click="handleChevronBackwardClick">
				<Icon name="chevron_backward" class="CalendarPopup__icon"></Icon>
			</span>

			<div v-if="mode == 'calendar'" class="CalendarPopup__optionalControl">
				<span class="CalendarPopup__picker accent">
					{{ DateLocalization.MonthArray()[Number(month) - 1] }}
				</span>
				<span class="CalendarPopup__pickerChevron" @click="handleMonthChange">
					<Icon name="chevron_down" class="CalendarPopup__icon"></Icon>
				</span>
				<span class="CalendarPopup__picker accent">
					{{ year }}
				</span>
				<span class="CalendarPopup__pickerChevron" @click="handleYearChange">
					<Icon name="chevron_down" class="CalendarPopup__icon"></Icon>
				</span>
			</div>
			<div v-if="mode == 'month'" class="CalendarPopup__optionalControl">
				<span class="CalendarPopup__picker accent">
					{{ year }}
				</span>
			</div>
			<div v-if="mode == 'year'" class="CalendarPopup__optionalControl">
				<span class="CalendarPopup__picker accent" @click="handleYearChange">
					{{ `${Number(year) - 10} - ${Number(year) + 7}` }}
				</span>
			</div>
			<span class="CalendarPopup__pickerChevron" @click="handleChevronForwardClick">
				<Icon name="chevron_forward" class="CalendarPopup__icon"></Icon>
			</span>
		</div>

		<div v-if="mode == 'calendar'" :class="{ range: isRange }" class="CalendarPopup_calendar">
			<CalendarPopupDayPicker
				ref="CalendarPopupDayPickerRef"
				:handleDayClick="handleDayClick"
				:monthArray="monthArray"
				:day="day"
				:month="month"
				:year="year"
				:isRange="isRange"
				:getFullRange="getFullRange"
			/>
		</div>
		<div v-if="mode == 'month'" class="CalendarPopup__body CalendarPopup_calendar">
			<CalendarPopupMonthPicker
				ref="CalendarPopupMonthPickerRef"
				:handleMonthClick="handleMonthClick"
				:month="month"
				:year="year"
			/>
		</div>
		<div v-if="mode == 'year'" class="CalendarPopup__body CalendarPopup_calendar">
			<CalendarPopupYearPicker ref="CalendarPopupYearPickerRef" :handleYearClick="handleYearClick" :year="year" />
		</div>
		<div class="CalendarPopup__controls CalendarPopup__botomControls">
			<div v-if="!isRange" class="CalendarPopup__goToToday accent">
				<span class="CalendarPopup__goToTodayIcon" @click="goToToday">
					<Icon class="CalendarPopup__icon" name="calendar"></Icon>
				</span>
				{{ DateLocalization.Today() }}
			</div>
			<div
				v-if="isRange && isControlRange"
				class="CalendarPopup__setRange CalendarPopup__controls CalendarPopup__botomControls"
			>
				<span class="CalendarPopup__controlButton CalendarPopup__controlButtonApply" @click="handleApply">
					{{ DateLocalization.Apply() }}
				</span>
				<span class="CalendarPopup__controlButton" @click="handleReset">
					{{ DateLocalization.Reset() }}
				</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { DateLocalizationRu } from '../../../localization.ru.js'
import { computed, inject, nextTick, onMounted, onUnmounted, ref, Ref, toRefs } from 'vue'
import { getMonthArray, numberOfDaysInMonth } from './DataHelper.js'
import CalendarPopupMonthPicker from './CalendarPopupMonthPicker.vue'
import CalendarPopupYearPicker from './CalendarPopupYearPicker.vue'
import CalendarPopupDayPicker from './CalendarPopupDayPicker.vue'
import { Icon } from '../../../main.js'

const props = defineProps({
	day: {
		type: String,
		default: ''
	},
	month: {
		type: String,
		default: ''
	},
	year: {
		type: String,
		default: ''
	},
	isRange: {
		type: Boolean,
		default: false
	},
	isControlRange: {
		type: Boolean,
		default: false
	},
	handleCalendarClose: {
		type: Function,
		default: () => {}
	},
	handleReset: {
		type: Function,
		default: () => {}
	},
	getFullRange: {
		type: Function,
		default: () => []
	}
})

const emit = defineEmits(['update:day', 'update:month', 'update:year'])
const { day, month, year } = toRefs(props)

const calendarPopupRef = ref()
const CalendarPopupDayPickerRef = ref()
const CalendarPopupMonthPickerRef = ref()
const CalendarPopupYearPickerRef = ref()
const datepickerRef = inject<Ref<HTMLElement>>('datepicker-root')
const mode = ref('calendar')

const monthArray = computed(() => getMonthArray(Number(month.value) - 1, Number(year.value)))

const handleMonthChange = () => (mode.value = 'month')

const handleYearChange = () => (mode.value = 'year')

const handleClose = () => {
	props.handleCalendarClose()
}
const handleApply = () => props.handleCalendarClose()
const handleReset = () => props.handleReset()

const handleChevronBackwardClick = () => {
	switch (mode.value) {
		case 'calendar':
			if (Number(month.value) == 1) {
				emit('update:year', String(Number(year.value) - 1))
				emit('update:month', '12')
			} else {
				emit('update:month', convertNumberToTwoDigits(String(Number(month.value) - 1)))
			}
			break
		case 'month':
			emit('update:year', String(Number(year.value) - 1))
			break
		case 'year':
			emit('update:year', String(Number(year.value) - 17))
			break
	}
}

const handleChevronForwardClick = () => {
	switch (mode.value) {
		case 'calendar':
			if (Number(month.value) == 12) {
				emit('update:year', String(Number(year.value) + 1))
				emit('update:month', '01')
			} else {
				emit('update:month', convertNumberToTwoDigits(String(Number(month.value) + 1)))
			}
			break
		case 'month':
			emit('update:year', String(Number(year.value) + 1))
			break
		case 'year':
			emit('update:year', String(Number(year.value) + 17))
			break
	}
}

const goToToday = () => {
	const today = new Date()
	emit('update:day', convertNumberToTwoDigits(String(today.getDate())))
	emit('update:month', convertNumberToTwoDigits(String(today.getMonth() + 1)))
	emit('update:year', String(new Date().getFullYear()))
	mode.value = 'calendar'
	handleClose()
}

const handleDayClick = (event: any) => {
	if (event.target.classList.contains('CalendarPopup__day-another-month')) {
		if (event.target.innerText > 20) {
			if (Number(month.value) == 1) {
				emit('update:year', String(Number(year.value) - 1))
				emit('update:month', '12')
			} else {
				emit('update:month', convertNumberToTwoDigits(String(Number(month.value) - 1)))
			}
		} else {
			if (Number(month.value) == 12) {
				emit('update:year', String(Number(year.value) + 1))
				emit('update:month', '01')
			} else {
				emit('update:month', convertNumberToTwoDigits(String(Number(month.value) + 1)))
			}
		}
		emit('update:day', convertNumberToTwoDigits(event.target.innerText))
	} else {
		emit('update:day', convertNumberToTwoDigits(event.target.innerText))
	}
	if (!props.isRange) handleClose()
}

const handleMonthClick = (event: any) => {
	emit(
		'update:month',
		convertNumberToTwoDigits(String(DateLocalization.MonthArray().indexOf(event.target.innerText) + 1))
	)
	mode.value = 'calendar'
}

const handleYearClick = (event: any) => {
	emit('update:year', event.target.innerText)
	mode.value = 'calendar'
}

const convertNumberToTwoDigits = (number: string) => {
	return Number(number) > 9 ? number : '0' + number
}

const DateLocalization = new DateLocalizationRu()

const handleOutsideClick = (event: Event) => {
	if (
		!event.composedPath().includes(calendarPopupRef.value) &&
		!event.composedPath().includes(datepickerRef!.value)
	) {
		handleClose()
	}
}

onMounted(async () => {
	await nextTick()
	document.addEventListener('click', handleOutsideClick)
})

const handleArrowsClicks = (event: KeyboardEvent) => {
	if (!props.isRange) {
		event.preventDefault()
		switch (event.key) {
			case 'ArrowLeft':
				handleChevronBackwardClick()
				break
			case 'ArrowRight':
				handleChevronForwardClick()
				break
			case 'ArrowUp':
				handleArrowUpClick()
				break
			case 'ArrowDown':
				handleArrowDownClick()
				break
		}
	}
}

const handleArrowUpClick = () => {
	if (mode.value == 'calendar' && isValidDay(convertNumberToTwoDigits(String(Number(day.value) - 1)))) {
		emit('update:day', convertNumberToTwoDigits(String(Number(day.value) - 1)))
	} else if (mode.value == 'month' && isValidMonth(convertNumberToTwoDigits(String(Number(month.value) - 1)))) {
		emit('update:month', convertNumberToTwoDigits(String(Number(month.value) - 1)))
	} else if (mode.value == 'year') {
		emit('update:year', String(Number(year.value) - 1))
	}
}

const handleArrowDownClick = () => {
	if (mode.value == 'calendar' && isValidDay(convertNumberToTwoDigits(String(Number(day.value) + 1)))) {
		emit('update:day', convertNumberToTwoDigits(String(Number(day.value) + 1)))
	} else if (mode.value == 'month' && isValidMonth(convertNumberToTwoDigits(String(Number(month.value) - 1)))) {
		emit('update:month', convertNumberToTwoDigits(String(Number(month.value) + 1)))
	} else if (mode.value == 'year') {
		emit('update:year', String(Number(year.value) + 1))
	}
}

const isValidMonth = (month: string) => {
	return Number(month) > 0 && Number(month) < 13
}

const isValidDay = (day: string) => {
	const maxDayInCurrentMonth = numberOfDaysInMonth(Number(month.value) - 1, Number(year.value))
	return Number(day) > 0 && Number(day) < maxDayInCurrentMonth + 1
}

document.addEventListener('keydown', handleArrowsClicks)

onUnmounted(() => {
	document.removeEventListener('keydown', handleArrowsClicks)
	document.removeEventListener('click', handleOutsideClick)
})
</script>
