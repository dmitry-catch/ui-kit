<style>
.CalendarPopupMonthPicker__body {
	border-spacing: 4px;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 4px;
}
.CalendarPopupMonthPicker__tableRow {
	display: contents;
}
.CalendarPopupMonthPicker__cell {
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

.CalendarPopupMonthPicker__cell:hover {
	background-color: var(--design-background-color-on-accent-primary);
	color: var(--design-text-color-primary);
}

.CalendarPopupMonthPicker__cell.picked:hover {
	color: var(--design-text-color-on-accent-primary);
	background-color: var(--design-background-color-on-accent-secondary);
	opacity: 0.9;
}

.CalendarPopupMonthPicker__cell.picked {
	color: var(--design-text-color-on-accent-primary);
	background-color: var(--design-background-color-on-accent-secondary);
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
	background-color: var(--design-background-color-on-accent-secondary);
	border-radius: 50%;
}
</style>
<template>
	<div class="CalendarPopupMonthPicker__body">
		<span
			v-for="(monthOfTheYear, index) in DateLocalization.MonthArray()"
			class="CalendarPopupMonthPicker__cell"
			:class="{
				picked: isPicked(index + 1, Number(month), Number(year)),
				CalendarPopupMonthPicker__cellDateToday: isDateToday(index, Number(year))
			}"
			@click="handleMonthClick"
			>{{ monthOfTheYear }}</span
		>
	</div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
import { DateLocalizationRu } from '../../../../localization.ru'

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
