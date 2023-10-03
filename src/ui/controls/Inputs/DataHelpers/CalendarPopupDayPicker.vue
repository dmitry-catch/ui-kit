<style>
.CalendarPopupDayPicker__body {
	border-spacing: 4px;
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	gap: 4px;
	position: relative;
}
.CalendarPopupDayPicker__tableRow {
	display: contents;
}
.CalendarPopupDayPicker_cell:hover {
	background-color: var(--design-background-color-on-accent-primary);
	color: var(--design-text-color-primary);
}
.CalendarPopupDayPicker__dayOfAnotherMonth {
	color: var(--design-border-color-primary);
	cursor: default;
	pointer-events: none;
}
.CalendarPopupDayPicker__cellDateToday {
	color: var(--design-text-color-accent);
}

.CalendarPopupDayPicker__headCell {
	color: var(--design-text-color-secondary);
}

.CalendarPopupDayPicker__cellDateToday::after {
	position: absolute;
	bottom: 5%;
	left: 40%;
	content: '';
	width: 6px;
	height: 6px;
	background-color: var(--design-background-color-on-accent-secondary);
	border-radius: 50%;
}
.CalendarPopupDayPicker__setRange {
	display: flex;
	justify-content: start;
	gap: 30px;
	width: 100%;
	padding-bottom: 8px;
}

.CalendarPopupDayPicker__holidays {
	color: var(--design-text-color-accent);
}

.CalendarPopupDayPicker__holidays.picked {
	color: var(--design-text-color-on-accent-primary);
}

.CalendarPopupDayPicker__cell.inside {
	background-color: var(--design-background-color-on-accent-primary);
	color: var(--design-text-color-primary);
	border-radius: 0px;
}

.CalendarPopupDayPicker__cell.picked.inside {
	background-color: var(--design-background-color-on-accent-secondary);
	color: var(--design-text-color-on-accent-primary);
}

.CalendarPopupDayPicker__cell {
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 16px;
	height: 40px !important;
	min-width: 40px;
	font-weight: normal;
	text-align: center;
	cursor: pointer;
	position: relative;
	border-radius: 4px;
	padding: 0;
}

.CalendarPopupDayPicker__cell:hover {
	background-color: var(--design-background-color-on-accent-primary);
	color: var(--design-text-color-primary);
}

.CalendarPopupDayPicker__cell.picked:hover {
	color: var(--design-text-color-on-accent-primary);
	background-color: var(--design-background-color-on-accent-secondary);
	opacity: 0.9;
}

.CalendarPopupDayPicker__cell.picked {
	color: var(--design-text-color-on-accent-primary);
	background-color: var(--design-background-color-on-accent-secondary);
}

.CalendarPopupDayPicker__cell.pickedEnd {
	border-radius: 0px;
	border-top-right-radius: 4px;
	border-bottom-right-radius: 4px;
}

.CalendarPopupDayPicker__cell.pickedStart {
	border-radius: 0px;
	border-top-left-radius: 4px;
	border-bottom-left-radius: 4px;
}

.CalendarPopupDayPicker__rowInRange {
	background-color: var(--design-background-color-on-accent-primary);
	position: absolute;
	width: 100%;
	height: 40px;
}

.CalendarPopupDayPicker__dayOfAnotherMonth.inside {
	color: var(--design-border-color-primary);
}
</style>

<template>
	<div class="CalendarPopupDayPicker__body">
		<div class="CalendarPopupDayPicker__tableRow">
			<span
				v-for="day in DateLocalization.WeekdayAbbrArray()"
				class="CalendarPopupDayPicker__cell CalendarPopupDayPicker__headCell"
			>
				{{ day }}
			</span>
		</div>
		<div
			class="CalendarPopupDayPicker__rowInRange"
			v-for="(week, weekIndex) in monthArray"
			:style="{
				'grid-row': `${weekIndex + 2}/${weekIndex + 3}`,
				'grid-column': rowInRangeGridColumn(week, weekIndex, month, year, getFullRange())
			}"
		></div>
		<div v-for="(week, weekIndex) in monthArray" class="CalendarPopupDayPicker__tableRow" @click="handleDayClick">
			<span
				v-for="(dayOfMonth, dayIndex) in week"
				class="CalendarPopupDayPicker__cell"
				:class="{
					CalendarPopupDayPicker__cellDateToday:
						isDayToday(dayOfMonth, month, year) && !isDayOfAnotherMonth(dayOfMonth, weekIndex),
					picked: dayOfMonth == Number(day) && !isDayOfAnotherMonth(dayOfMonth, weekIndex),
					CalendarPopupDayPicker__dayOfAnotherMonth: isDayOfAnotherMonth(dayOfMonth, weekIndex),
					CalendarPopupDayPicker__holidays:
						isWorkCalendar &&
						(dayIndex == 5 || dayIndex == 6) &&
						!isDayToday(dayOfMonth, month, year) &&
						!isDayOfAnotherMonth(dayOfMonth, weekIndex),
					inside: isRange && isInside(getFullRange(), dayOfMonth, weekIndex, month, year),
					pickedStart: isRange && isPickedStart(getFullRange(), dayOfMonth, month, year),
					pickedEnd: isRange && isPickedEnd(getFullRange(), dayOfMonth, month, year)
				}"
			>
				{{ dayOfMonth }}
			</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import { DateLocalizationRu } from '../../../../localization.ru'

const DateLocalization = new DateLocalizationRu()

defineProps<{
	handleDayClick: (event: Event) => void
	monthArray: number[][]
	day: string
	month: string
	year: string
	isRange: boolean
	isWorkCalendar: boolean
	getFullRange: Function
}>()

const rowInRangeGridColumn = (week: number[], weekIndex: number, month: string, year: string, fullRange: string[]) => {
	const rowArray = week.map((dayOfMonth) => {
		if (isInside(fullRange, dayOfMonth, weekIndex, month, year)) {
			return true
		}
		return false
	})
	const lastInRangeCell = rowArray.lastIndexOf(true)
	switch (lastInRangeCell) {
		case -1:
			return '8/8'
		case 6:
			return `${rowArray.indexOf(true) + 1}/8`
		default:
			return `1/-${7 - lastInRangeCell}`
	}
}

const isInside = (fullRange: string[], dayOfMonth: number, weekIndex: number, month: string, year: string) => {
	const rangeStartDate = new Date(fullRange[0] + 'T00:00:00')
	const rangeEndDate = new Date(fullRange[1])
	let currentDayMonth = month
	if (rangeStartDate.getMonth() == rangeEndDate.getMonth()) {
		return false
	}
	if (weekIndex == 0 && dayOfMonth > 7) {
		currentDayMonth = String(Number(month) - 1)
	} else if (weekIndex > 3 && dayOfMonth < 14) {
		currentDayMonth = String(Number(month) + 1)
	}
	const currentDate = new Date(`${year}-${currentDayMonth}-${dayOfMonth}`)
	if (currentDate >= rangeStartDate && currentDate <= rangeEndDate) {
		return true
	}
	return false
}

const isPickedStart = (FullRange: string[], dayOfMonth: number, month: string, year: string) => {
	const rangeStartDate = new Date(FullRange[0])
	const currentDate = new Date(`${year}-${month}-${dayOfMonth}`)
	if (currentDate.toDateString() == rangeStartDate.toDateString()) {
		return true
	}
	return false
}

const isPickedEnd = (FullRange: string[], dayOfMonth: number, month: string, year: string) => {
	const rangeEndDate = new Date(FullRange[1])
	const currentDate = new Date(`${year}-${month}-${dayOfMonth}`)
	if (currentDate.toDateString() == rangeEndDate.toDateString()) {
		return true
	}
	return false
}

const isDayToday = (dayOfMonth: number, month: string, year: string) => {
	return (
		dayOfMonth == Number(new Date().getDate()) &&
		Number(month) - 1 == new Date().getMonth() &&
		Number(year) == new Date().getFullYear()
	)
}

const isDayOfAnotherMonth = (dayOfMonth: number, weekIndex: number) => {
	return (weekIndex == 0 && dayOfMonth > 7) || (weekIndex > 3 && dayOfMonth < 14)
}
</script>
