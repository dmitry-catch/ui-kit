<style>
.calendar-time-control {
	display: flex;
	align-items: center;
	justify-content: center;
	border: 1px solid var(--design-border-color-primary);
	border-radius: 4px;
	min-width: 130px;
}
.calendar-time-control__controls {
	display: flex;
	flex-direction: column;
	gap: 8px;
	justify-content: center;
	padding: 0px 10px;
	border-left: 1px solid var(--design-border-color-primary);
	height: 40px;
}
.calendar-time-control__time {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	padding: 7px 0;
}
.calendar-time-control__input {
	font-size: 16px;
	width: 2rem;
	height: 24px;
	border-radius: 4px;
	border: 1px solid var(--design-border-color-primary);
	text-align: center;
	border: none;
	background-color: var(--design-background-color-primary);
}

.calendar-time-control__input:focus {
	outline: none;
}

.calendar-time-control__control__icon {
	--icon-color: var(--design-text-color-primary);
	--icon-size: 16px;
	cursor: pointer;
}
</style>

<template>
	<div class="calendar-time-control">
		<div class="calendar-time-control__time">
			<span>{{ DateLocalization.TimeFrom() }}</span>
			<span class="calendar-time-control__input" tabindex="0" @click="handleHoursClick">{{ hours }}</span>
			<span>:</span>
			<span class="calendar-time-control__input" tabindex="0" @click="handleMinutesClick">{{ minutes }}</span>
			<input
				type="number"
				class="visually-hidden"
				v-model="hours"
				ref="hoursRef"
				@input="handleHourChange"
				@focus="handleInputFocus"
			/>
			<input
				type="number"
				class="visually-hidden"
				v-model="minutes"
				ref="minutesRef"
				@input="handleMinuteChange"
				@focus="handleInputFocus"
			/>
		</div>
		<div class="calendar-time-control__controls">
			<span class="calendar-time-control__control">
				<Icon name="chevron_up" class="calendar-time-control__control__icon" />
			</span>
			<span class="calendar-time-control__control">
				<Icon name="chevron_down" class="calendar-time-control__control__icon" />
			</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, ref, toRefs } from 'vue'
import { Icon } from '../../../../main'
import { DateLocalizationRu } from '../../../../localization.ru'
const props = defineProps({
	modelValue: {
		type: String,
		default: ''
	}
})
const DateLocalization = new DateLocalizationRu()
const modelValue = toRefs(props).modelValue
const emit = defineEmits(['update:modelValue'])

const hours = ref(modelValue.value.split(':')[0] ? modelValue.value.split(':')[0] : '00')
const minutes = ref(modelValue.value.split(':')[1] ? modelValue.value.split(':')[1] : '00')

const hoursRef = ref()
const minutesRef = ref()

const handleHoursClick = () => hoursRef.value.focus()

const handleMinutesClick = () => minutesRef.value.focus()

const handleTimeChange = (event: any, maxValue: number, ref: any) => {
	const value = Number(event.target.value)
	if (value < 10) {
		ref.value = '0' + value
	} else if (value > maxValue) {
		ref.value = String(maxValue)
		event.target.nextElementSibling.focus()
	} else {
		ref.value = String(value)
		event.target.nextElementSibling.focus()
	}
}

const handleHourChange = (event: any) => handleTimeChange(event, 23, hours)

const handleMinuteChange = (event: any) => handleTimeChange(event, 59, minutes)

const handleInputFocus = (event: any) => event.target.select()
</script>
