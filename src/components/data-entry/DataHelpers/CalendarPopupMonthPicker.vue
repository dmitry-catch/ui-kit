<style>
.CalendarPopupMonthPicker__body {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: calc(0.5 * var(--design-gap-unit));
}

.CalendarPopupMonthPicker__tableRow {
	display: contents;
}

.CalendarPopupMonthPicker__cell {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 40px;
	min-width: 40px;
	cursor: pointer;
	position: relative;
	border-radius: var(--design-border-radius-control);
	padding: 0;
}

.CalendarPopupMonthPicker__cell:hover {
	background-color: var(--design-background-color-on-accent-primary);
}

.CalendarPopupMonthPicker__cell.picked:hover {
	background-color: var(--design-background-color-accent-primary);
	opacity: 0.9;
}

.CalendarPopupMonthPicker__cell.picked {
	background-color: var(--design-background-color-accent-primary);
}

.CalendarPopupMonthPicker__cellDateToday {
	color: var(--design-text-color-accent);
}

.CalendarPopupMonthPicker__cellDateToday::after {
	position: absolute;
	bottom: 5%;
	left: 50%;
	content: '';
	width: 6px;
	height: 6px;
	background-color: var(--design-background-color-accent-primary);
	border-radius: 50%;
}
</style>
<template>
	<div class="CalendarPopupMonthPicker__body">
		<span
			v-for="(monthOfTheYear, index) in DateLocalization.MonthArray()"
			class="CalendarPopupMonthPicker__cell text-medium"
			:class="{
				picked: isPicked(index + 1, Number(month), Number(year)),
				'text-on-accent': isPicked(index + 1, Number(month), Number(year)),
				accent: isDateToday(index, Number(year)),
				CalendarPopupMonthPicker__cellDateToday:
					isDateToday(index, Number(year)) && !isPicked(index + 1, Number(month), Number(year))
			}"
			@click="handleMonthClick"
			>{{ monthOfTheYear }}</span
		>
	</div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
import { DateLocalizationRu } from '../../../localization.ru.js'

const DateLocalization = new DateLocalizationRu()

const props = defineProps<{
	handleMonthClick: (event: Event) => void
	month: string
	year: string
}>()

const { month, year } = toRefs(props)

const isDateToday = (currentMonth: number, currentYear: number) => {
	return currentMonth == new Date().getMonth() && currentYear == new Date().getFullYear()
}

const isPicked = (currentMonth: number, actualMonth: number, currentYear: number) => {
	return currentMonth == actualMonth && currentYear == new Date().getFullYear()
}
</script>