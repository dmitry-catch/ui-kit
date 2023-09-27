<style>
.calendar-popup {
	background: var(--design-background-color-primary);
	width: fit-content;
	box-shadow: 0px 32px 64px 0px #212c3a29;
	padding: 0 24px;
    border-radius: 4px;
}
.calendar-popup__controls {
	padding: 24px 0 16px 0;
	box-shadow: 0px -0.5px 0px 0px #e4e5e7 inset;
}
.calendar-popup__day {
	font-size: 16px;
	color: var(--design-text-color-secondary);
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
.calendar-popup__day:hover{
    background-color: var(--design-background-color-on-accent-primary);
}
.calendar-popup__day-another-month {
	color: var(--design-border-color-primary);
}


.picked{
    color: var(--design-text-color-accent);
    
}
/* dot below picked number*/
.picked::after{
    position: absolute;
    top: 32px;
    left: 17px;
    content: '';
    width: 6px;
    height: 6px;
    background-color: var(--design-background-color-on-accent-secondary);
    border-radius: 50%;
}
</style>

<template>
	<div class="calendar-popup">
		<div class="calendar-popup__controls">
			<span class="calendar-popup__picker">
				{{ new DateLocalizationRu().MonthArray()[new Date().getMonth()] }}
			</span>
			<span class="calendar-popup__picker">
				{{ new Date().getFullYear() }}
			</span>
		</div>
		<table class="calendar-popup__body">
			<thead class="calendar-popup__head">
				<tr>
					<th v-for="day in DateLocalization.WeekdayAbbrArray()" class="calendar-popup__day">
						{{ day }}
					</th>
				</tr>
			</thead>
			<tbody class="calendar-popup__body">
				<tr v-for="(week, weekIndex) in monthArray" class="calendar-popup__week">
					<td v-for="(dayOfMonth, dayIndex) in week" class="calendar-popup__day">
						<span
							class="calendar-popup__day-another-month"
							v-if="(weekIndex == 0 && dayOfMonth > 1) || (weekIndex > 4 && dayOfMonth < 10)"
						>
							{{ dayOfMonth }}
						</span>
						<span v-else :class="dayOfMonth == Number(day) ? 'picked' : ''">
							{{ dayOfMonth }}
						</span>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup lang="ts">
import { DateLocalizationRu } from '../../../localization.ru'
import { defineProps, toRefs, computed } from 'vue'
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
	}
})

const { day, month, year } = toRefs(props)

const monthArray = computed(() => getMonthArray(Number(month.value), Number(year.value)))

const DateLocalization = new DateLocalizationRu()

const numberOfDaysInMonth = (month: number, year: number) => {
	return new Date(year, month, 0).getDate()
}

const getFirstDayOfMonth = (month: number, year: number) => {
	const firstDayOfMonth = new Date(year, month - 1, 1).getDay()
	return firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1
}

const getMonthArray = (month: number, year: number) => {
	const monthArray = []
	const firstDay = getFirstDayOfMonth(month, year)
	const numberOfDays = numberOfDaysInMonth(month, year)
	const numberOfDaysInPreviousMonth = numberOfDaysInMonth(month - 1, year)
	console.log(firstDay, numberOfDays)
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
</script>
