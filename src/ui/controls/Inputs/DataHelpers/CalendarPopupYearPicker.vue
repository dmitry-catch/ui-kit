<style>
.CalendarPopupYearPicker__body {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: calc(0.5 * var(--design-gap-unit));
}
.CalendarPopupYearPicker__tableRow {
	display: contents;
}
.CalendarPopupYearPicker__cell {
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

.CalendarPopupYearPicker__cell:hover {
	background-color: var(--design-background-color-on-accent-primary);
}

.CalendarPopupYearPicker__cell.picked:hover {
	color: var(--design-text-color-on-accent-primary);
	background-color: var(--design-background-color-accent-primary);
	opacity: 0.9;
}

.CalendarPopupYearPicker__cell.picked {
	color: var(--design-text-color-on-accent-primary);
	background-color: var(--design-background-color-accent-primary);
}

.CalendarPopupYearPicker__cellDateToday {
	color: var(--design-text-color-accent);
}

.CalendarPopupYearPicker__cellDateToday::after {
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
	<div class="CalendarPopupYearPicker__body">
		<span
			v-for="yearOfYears in yearsSet"
			class="CalendarPopupYearPicker__cell text-medium"
			:class="{
				picked: String(yearOfYears) == year,
				CalendarPopupYearPicker__cellDateToday: yearOfYears == currentYear
			}"
			@click="handleYearClick"
		>
			{{ yearOfYears }}
		</span>
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
	handleYearClick: (event: Event) => void
	year: string
}>()

const pickedYear = ref(props.year)

const currentYear: number = new Date().getFullYear()

const yearsSet = computed(() => {
	const years = []
	for (let year = Number(pickedYear.value) - 10; year <= Number(pickedYear.value) + 7; year++) {
		years.push(year)
	}
	return years
})
</script>
