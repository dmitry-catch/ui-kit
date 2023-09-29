<style>
.calendar-popup {
	background: var(--design-background-color-primary);
	width: fit-content;
	box-shadow: 0px 32px 64px 0px #212c3a29;
	padding: 0 24px;
	border-radius: 4px;
}

.calendar-popup table {
	box-shadow: 0px -0.5px 0px 0px #e4e5e7 inset;
}
.calendar-popup__controls {
	padding: 24px 0 16px 0;
	box-shadow: 0px -0.5px 0px 0px #e4e5e7 inset;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.botom-controls {
	box-shadow: none;
}
.calendar-popup__cell {
	font-size: 16px;
	color: var(--design-text-color-primary);
	height: 40px !important;
	min-width: 40px;
	font-weight: normal;
	text-align: center;
	cursor: pointer;
	padding: 0;
	margin: 4px;
	position: relative;
	border-radius: 4px;
}
.calendar-popup__cell:hover {
	background-color: var(--design-background-color-on-accent-primary);
	color: var(--design-text-color-primary);
}
.calendar-popup__day-another-month {
	color: var(--design-border-color-primary);
}

.date-today {
	color: var(--design-text-color-accent);
}

.date-today::after {
	position: absolute;
	bottom: 0;
	left: 50%;
	content: '';
	width: 6px;
	height: 6px;
	background-color: var(--design-background-color-on-accent-secondary);
	border-radius: 50%;
}

.calendar-popup__week .date-today::after {
	left: 40%;
}

.picked {
	color: var(--design-text-color-on-accent-primary);
	background-color: var(--design-background-color-on-accent-secondary);
}

.calendar-popup__month {
	min-width: 139px;
}

.calendar-popup__year {
	min-width: 92px;
}

.calendar-popup__picker {
	font-weight: bold;
}

.calendar-popup__picker__chevron {
	color: var(--design-text-color-primary);
	display: inline-block;
	cursor: pointer;
}

.calendar-popup__controls__go-to-today {
	display: flex;
	gap: 11px;
	font-weight: bold;
}

.calendar-popup__controls__go-to-today__icon {
	cursor: pointer;
}
.calendar-popup__optional-control {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 10px;
}

.calendar-popup__optional-control .calendar-popup__picker__chevron {
	margin: 0 6px;
}
</style>

<template>
	<div class="calendar-popup">
		<div class="calendar-popup__controls">
			<span class="calendar-popup__picker__chevron" @click="handleChevronBackwardClick">
				<Icon name="chevron_backward" class="calendar-popup__icon"></Icon>
			</span>

			<div v-if="mode == 'calendar'" class="calendar-popup__optional-control">
				<span class="calendar-popup__picker">
					{{ new DateLocalizationRu().MonthArray()[Number(month) - 1] }}
				</span>
				<span class="calendar-popup__picker__chevron" @click="handleMonthChange">
					<Icon name="chevron_down" class="calendar-popup__icon"></Icon>
				</span>
				<span class="calendar-popup__picker">
					{{ year }}
				</span>
				<span class="calendar-popup__picker__chevron" @click="handleYearChange">
					<Icon name="chevron_down" class="calendar-popup__icon"></Icon>
				</span>
			</div>
			<div v-if="mode == 'month'" class="calendar-popup__optional-control">
				<span class="calendar-popup__picker">
					{{ year }}
				</span>
			</div>
			<div v-if="mode == 'year'" class="calendar-popup__optional-control">
				<span class="calendar-popup__picker" @click="handleYearChange">
					{{ `${Number(year) - 10} - ${Number(year) + 7}` }}
				</span>
			</div>

			<span class="calendar-popup__picker__chevron" @click="handleChevronForwardClick">
				<Icon name="chevron_forward" class="calendar-popup__icon"></Icon>
			</span>
		</div>

		<table class="calendar-popup__body" v-if="mode == 'calendar'">
			<thead class="calendar-popup__head">
				<tr>
					<th v-for="day in DateLocalization.WeekdayAbbrArray()" class="calendar-popup__cell">
						{{ day }}
					</th>
				</tr>
			</thead>
			<tbody class="calendar-popup__body">
				<tr v-for="(week, weekIndex) in monthArray" class="calendar-popup__week" @click="handleDayClick">
					<td
						v-for="(dayOfMonth, dayIndex) in week"
						class="calendar-popup__cell"
						:class="getClassOfDay(dayOfMonth, weekIndex, dayIndex)"
					>
						{{ dayOfMonth }}
					</td>
				</tr>
			</tbody>
		</table>
		<table v-if="mode == 'month'">
			<tbody class="calendar-popup__body">
				<tr
					v-for="row in Array(DateLocalization.MonthArray().length / 2).keys()"
					class="calendar-popup__month-row"
				>
					<td
						v-for="element in Array(0, 1)"
						class="calendar-popup__month calendar-popup__cell"
						@click="handleMonthClick"
						:class="getClassOfMonth(DateLocalization.MonthArray()[row * 2 + element])"
					>
						{{ DateLocalization.MonthArray()[row * 2 + element] }}
					</td>
				</tr>
			</tbody>
		</table>
		<table v-if="mode == 'year'">
			<tbody class="calendar-popup__body">
				<tr v-for="row in Array(6).keys()" class="calendar-popup__month-row">
					<td
						v-for="element in Array(0, 1, 2)"
						class="calendar-popup__year calendar-popup__cell"
						:class="getClassOfYear(String(Number(year) - 10 + row * 3 + element))"
						@click="handleYearClick"
					>
						{{ Number(year) - 10 + row * 3 + element }}
					</td>
				</tr>
			</tbody>
		</table>
		<div class="calendar-popup__controls botom-controls">
			<div class="calendar-popup__controls__time-control">
				<CalendarTimeControl v-if="isTime" :time="'00:00'" />
			</div>
			<div class="calendar-popup__controls__go-to-today">
				<span class="calendar-popup__controls__go-to-today__icon" @click="goToToday">
					<Icon class="calendar-popup__icon" name="calendar"></Icon>
				</span>
				{{ DateLocalization.Today() }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { DateLocalizationRu } from '../../../../localization.ru'
import { defineProps, toRefs, computed, ref, onMounted, onUnmounted } from 'vue'
import { Icon } from '../../../../main'
import CalendarTimeControl from './CalendarTimeControl.vue'
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
	isTime: {
		type: Boolean,
		default: false
	},
	handleCalendarClose: {
		type: Function,
		default: () => {}
	}
})

const emit = defineEmits(['update:day', 'update:month', 'update:year'])
const { day, month, year } = toRefs(props)

const isTime = ref(props.isTime)

const mode = ref('calendar')

const todayDay = computed(() => new Date().getDate())

const monthArray = computed(() => getMonthArray(Number(month.value) - 1, Number(year.value)))

const handleMonthChange = () => (mode.value = 'month')

const handleYearChange = () => (mode.value = 'year')

const handleClose = () => {
	document.removeEventListener('click', handleOutsideClick)
	props.handleCalendarClose()
}

const handleChevronBackwardClick = () => {
	if (mode.value == 'calendar') {
		if (Number(month.value) == 1) {
			emit('update:year', String(Number(year.value) - 1))
			emit('update:month', '12')
		} else {
			emit('update:month', convertNumberToTwoDigits(String(Number(month.value) - 1)))
		}
	} else if (mode.value == 'month') {
		emit('update:year', String(Number(year.value) - 1))
	} else if (mode.value == 'year') {
		emit('update:year', String(Number(year.value) - 17))
	}
}

const handleChevronForwardClick = () => {
	if (mode.value == 'calendar') {
		if (Number(month.value) == 12) {
			emit('update:year', String(Number(year.value) + 1))
			emit('update:month', '01')
		} else {
			emit('update:month', convertNumberToTwoDigits(String(Number(month.value) + 1)))
		}
	} else if (mode.value == 'month') {
		emit('update:year', String(Number(year.value) + 1))
	} else if (mode.value == 'year') {
		emit('update:year', String(Number(year.value) + 17))
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
	if (event.target.classList.contains('calendar-popup__day-another-month')) {
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
	handleClose()
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

const numberOfDaysInMonth = (month: number, year: number) => {
	return new Date(year, month + 1, 0).getDate()
}

const getFirstDayOfMonth = (month: number, year: number) => {
	const firstDayOfMonth = new Date(year, month, 1).getDay()
	return firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1
}

const getMonthArray = (month: number, year: number) => {
	const monthArray = []
	const firstDay = getFirstDayOfMonth(month, year)
	const numberOfDays = numberOfDaysInMonth(month, year)
	const numberOfDaysInPreviousMonth = numberOfDaysInMonth(month - 1, year)
	let day = 1
	for (let i = 0; i < 6; i++) {
		const week = []
		for (let j = 0; j < 7; j++) {
			if (i === 0 && j < firstDay) {
				week.push(numberOfDaysInPreviousMonth - firstDay + j + 1)
			} else if (day > numberOfDays) {
				week.push(day - numberOfDays)
				day++
			} else {
				week.push(day)
				day++
			}
		}
		monthArray.push(week)
	}
	return monthArray
}

const getClassOfDay = (dayOfMonth: number, weekIndex: number, dayIndex: number) => {
	let classCss: string = ''
	if ((weekIndex == 0 && dayOfMonth > 7) || (weekIndex > 3 && dayOfMonth < 14)) {
		classCss += 'calendar-popup__day-another-month '
	} else {
		if (
			dayOfMonth == Number(todayDay.value) &&
			Number(month.value) - 1 == new Date().getMonth() &&
			Number(year.value) == new Date().getFullYear()
		) {
			classCss += 'date-today '
		}
		if (dayOfMonth == Number(day.value)) {
			classCss += 'picked '
		}
	}

	return classCss
}

const getClassOfMonth = (currentMonth: string) => {
	let classCss: string = ''
	if (
		Number(DateLocalization.MonthArray().indexOf(currentMonth)) == Number(month.value) - 1 &&
		Number(year.value) == new Date().getFullYear()
	) {
		classCss += 'picked '
	}
	if (
		Number(DateLocalization.MonthArray().indexOf(currentMonth)) == new Date().getMonth() &&
		Number(year.value) == new Date().getFullYear()
	) {
		classCss += 'date-today '
	}
	return classCss
}

const getClassOfYear = (currentYear: string) => {
	let classCss: string = ''
	if (Number(currentYear) == Number(year.value)) {
		classCss += 'picked '
	}
	if (Number(currentYear) == new Date().getFullYear()) {
		classCss += 'date-today '
	}
	return classCss
}

const handleOutsideClick = (event: any) => {
	const classList = event.target.classList ? event.target.classList : []
	const isClassInClassListIncludesCalendar = Array(classList).some((className: string) =>
		String(className).includes('calendar-popup')
	)
	if (!event.target.closest('.calendar-popup') && !isClassInClassListIncludesCalendar) {
		if (!event.target.parentElement?.classList.contains('calendar-popup__icon')) {
			handleClose()
		}
	}
}

onMounted(async () => {
	await new Promise((resolve) => setTimeout(resolve, 1))
	document.addEventListener('click', handleOutsideClick)
})

// handling keyboard control
const handleArrowsClicks = (event: any) => {
	if (event.key == 'ArrowLeft') {
		handleChevronBackwardClick()
	} else if (event.key == 'ArrowRight') {
		handleChevronForwardClick()
	} else if (event.key == 'ArrowUp') {
		if (mode.value == 'calendar' && isValidDay(convertNumberToTwoDigits(String(Number(day.value) - 1)))) {
			emit('update:day', convertNumberToTwoDigits(String(Number(day.value) - 1)))
		} else if (mode.value == 'month' && isValidMonth(convertNumberToTwoDigits(String(Number(month.value) - 1)))) {
			emit('update:month', convertNumberToTwoDigits(String(Number(month.value) - 1)))
		} else if (mode.value == 'year') {
			emit('update:year', String(Number(year.value) - 1))
		}
	} else if (event.key == 'ArrowDown') {
		if (mode.value == 'calendar' && isValidDay(convertNumberToTwoDigits(String(Number(day.value) + 1)))) {
			emit('update:day', convertNumberToTwoDigits(String(Number(day.value) + 1)))
		} else if (mode.value == 'month' && isValidMonth(convertNumberToTwoDigits(String(Number(month.value) - 1)))) {
			emit('update:month', convertNumberToTwoDigits(String(Number(month.value) + 1)))
		} else if (mode.value == 'year') {
			emit('update:year', String(Number(year.value) + 1))
		}
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
})
</script>
