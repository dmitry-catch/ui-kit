<style>
.CalendarPopupDayPicker__body {
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	gap: calc(0.5 * var(--design-gap-unit));
	position: relative;
}

.CalendarPopupDayPicker__tableRow {
	display: contents;
}

.CalendarPopupDayPicker_cell:hover {
	background-color: var(--design-background-color-on-accent-primary);
}

.CalendarPopupDayPicker__dayOfAnotherMonth {
	cursor: default;
	pointer-events: none;
}

.CalendarPopupDayPicker__cellDateToday {
	color: var(--design-text-color-accent);
}

.CalendarPopupDayPicker__cellDateToday.picked {
	color: var(--design-text-color-on-accent-primary);
}

.CalendarPopupDayPicker__cellDateToday::after {
	position: absolute;
	bottom: 5%;
	left: 42%;
	content: '';
	width: 6px;
	height: 6px;
	background-color: var(--design-background-color-accent-primary);
	border-radius: 50%;
}

.CalendarPopupDayPicker__setRange {
	display: flex;
	justify-content: start;
	gap: calc(3.75 * var(--design-gap-unit));
	width: 100%;
	padding-bottom: var(--design-gap-unit);
}

.CalendarPopupDayPicker__holidays.picked {
	color: var(--design-text-color-on-accent-primary);
}

.CalendarPopupDayPicker__cell.inside {
	background-color: var(--design-background-color-on-accent-primary);
	border-radius: 0px;
}

.CalendarPopupDayPicker__cell.picked.inside {
	background-color: var(--design-background-color-accent-primary);
}

.CalendarPopupDayPicker__cell {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 40px;
	width: 40px;
	cursor: pointer;
	position: relative;
	border-radius: var(--design-border-radius-control);
	padding: 0;
}

.CalendarPopupDayPicker__cell:hover {
	background-color: var(--design-background-color-on-accent-primary);
}

.CalendarPopupDayPicker__cell.picked:hover {
	background-color: var(--design-background-color-accent-primary);
	opacity: 0.9;
}

.CalendarPopupDayPicker__cell.picked {
	background-color: var(--design-background-color-accent-primary);
}

.CalendarPopupDayPicker__cell.pickedEnd {
	border-radius: 0px;
	border-top-right-radius: var(--design-border-radius-control);
	border-bottom-right-radius: var(--design-border-radius-control);
}

.CalendarPopupDayPicker__cell.pickedStart {
	border-radius: 0px;
	border-top-left-radius: var(--design-border-radius-control);
	border-bottom-left-radius: var(--design-border-radius-control);
}

.CalendarPopupDayPicker__rowInRange {
	background-color: var(--design-background-color-on-accent-primary);
	position: absolute;
	width: 100%;
	height: 40px;
}
</style>

<template>
	<div class="CalendarPopupDayPicker__body">
		<div class="CalendarPopupDayPicker__tableRow">
			<span
				v-for="day in DateLocalization.WeekdayAbbrArray()"
				:key="day"
				class="CalendarPopupDayPicker__cell secondary text-medium"
			>
				{{ day }}
			</span>
		</div>
		<div
			v-for="(week, weekIndex) in monthArray"
			:key="weekIndex"
			class="CalendarPopupDayPicker__rowInRange"
			:style="{
				'grid-row': `${weekIndex + 2}/${weekIndex + 3}`,
				'grid-column': rowInRangeGridColumn(week, weekIndex, month, year, getFullRange())
			}"
		></div>
		<div
			v-for="(week, weekIndex) in monthArray"
			:key="weekIndex"
			class="CalendarPopupDayPicker__tableRow"
			@click="handleDayClick"
		>
			<span
				v-for="(dayOfMonth, dayIndex) in week"
				class="CalendarPopupDayPicker__cell text-medium"
				:class="{
					CalendarPopupDayPicker__cellDateToday:
						isDayToday(dayOfMonth, month, year) && !isDayOfAnotherMonth(dayOfMonth, weekIndex),
					accent: isDayToday(dayOfMonth, month, year) && !isDayOfAnotherMonth(dayOfMonth, weekIndex),
					'on-accent':
						(dayIndex == 5 || dayIndex == 6) &&
						!isDayToday(dayOfMonth, month, year) &&
						!isDayOfAnotherMonth(dayOfMonth, weekIndex),
					danger:
						(dayIndex == 5 || dayIndex == 6) &&
						!isDayToday(dayOfMonth, month, year) &&
						!isDayOfAnotherMonth(dayOfMonth, weekIndex) &&
						!(dayOfMonth == Number(day) && !isDayOfAnotherMonth(dayOfMonth, weekIndex)),
					picked: dayOfMonth == Number(day) && !isDayOfAnotherMonth(dayOfMonth, weekIndex),
					'text-on-accent': dayOfMonth == Number(day) && !isDayOfAnotherMonth(dayOfMonth, weekIndex),
					CalendarPopupDayPicker__dayOfAnotherMonth: isDayOfAnotherMonth(dayOfMonth, weekIndex),
					secondary: isDayOfAnotherMonth(dayOfMonth, weekIndex),
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
import { DateLocalizationRu } from '../../../localization.ru.js'

const DateLocalization = new DateLocalizationRu()

defineProps<{
	handleDayClick: (event: Event) => void
	monthArray: number[][]
	day: string
	month: string
	year: string
	isRange: boolean
	//TODO fix type
	// eslint-disable-next-line @typescript-eslint/ban-types
	getFullRange: Function
}>()

const rowInRangeGridColumn = (week: number[], weekIndex: number, month: string, year: string, fullRange: string[]) => {
	const rowArray = week.map((dayOfMonth) => isInside(fullRange, dayOfMonth, weekIndex, month, year))
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
	return currentDate >= rangeStartDate && currentDate <= rangeEndDate
}

const isPickedStart = (FullRange: string[], dayOfMonth: number, month: string, year: string) => {
	const rangeStartDate = new Date(FullRange[0])
	const currentDate = new Date(`${year}-${month}-${dayOfMonth}`)
	return currentDate.toDateString() == rangeStartDate.toDateString()
}

const isPickedEnd = (FullRange: string[], dayOfMonth: number, month: string, year: string) => {
	const rangeEndDate = new Date(FullRange[1])
	const currentDate = new Date(`${year}-${month}-${dayOfMonth}`)
	return currentDate.toDateString() == rangeEndDate.toDateString()
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
