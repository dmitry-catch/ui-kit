<style>
.calendar-time-control {
	display: flex;
	align-items: center;
	justify-content: center;
	border: 1px solid var(--design-border-color-primary);
	border-radius: 4px;
	min-width: 128px;
}
.calendar-time-control__controls {
	display: flex;
	flex-direction: column;
	gap: 3px;
	justify-content: center;
	padding: 0px 10px;
	border-left: 1px solid var(--design-border-color-primary);
	height: 38px;
}
.calendar-time-control__time {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	padding: 7px 0;
}
.calendar-time-control__span {
	font-size: 16px;
}

.calendar-time-control__span-text {
	margin-right: 5px;
}

.calendar-time-control__span:focus {
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
			<span class="calendar-time-control__span-text">{{ DateLocalization.TimeFrom() }}</span>
			<span
				class="calendar-time-control__span"
				tabindex="0"
				ref="hoursPlaceholderRef"
				@click="handleHoursClick"
				>{{ hours }}</span
			>
			<span>:</span>
			<span
				class="calendar-time-control__span"
				tabindex="0"
				ref="minutesPlaceholderRef"
				@click="handleMinutesClick"
				>{{ minutes }}</span
			>
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
			<span class="calendar-time-control__control" @click="handleChevronClick(1)">
				<Icon name="chevron_up" class="calendar-time-control__control__icon" />
			</span>
			<span class="calendar-time-control__control" @click="handleChevronClick(-1)">
				<Icon name="chevron_down" class="calendar-time-control__control__icon" />
			</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, toRefs, watch } from 'vue'
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

const currentInput = ref()

const handleHoursClick = () => {
	currentInput.value = 'hours'
	hoursRef.value.focus()
}
const handleMinutesClick = () => {
	currentInput.value = 'minutes'
	minutesRef.value.focus()
}

const convertNumberToTwoDigits = (value: number) => {
	if (value < 10) {
		return '0' + value
	} else {
		return String(value)
	}
}

const handleChevronClick = (value: number) => {
	if (currentInput.value === 'hours') {
		if (Number(hours.value) >= 23 || Number(hours.value) + value < 0) {
			hours.value = '00'
		} else {
			hours.value = convertNumberToTwoDigits(Number(hours.value) + value)
		}
	} else {
		if (Number(minutes.value) >= 59 || Number(minutes.value) + value < 0) {
			minutes.value = '00'
		} else {
			minutes.value = convertNumberToTwoDigits(Number(minutes.value) + value)
		}
	}
}

const handleTimeChange = (event: any, maxValue: number, ref: any) => {
	const value = Number(event.target.value)
	if (value < 10) {
		ref.value = '0' + value
	} else if (value > maxValue) {
		ref.value = String(maxValue)
		currentInput.value = 'minutes'
		event.target.nextElementSibling.focus()
	} else {
		ref.value = String(value)
		currentInput.value = 'minutes'
		event.target.nextElementSibling.focus()
	}
}

const handleHourChange = (event: any) => handleTimeChange(event, 23, hours)

const handleMinuteChange = (event: any) => handleTimeChange(event, 59, minutes)

const handleInputFocus = (event: any) => event.target.select()

const minutesPlaceholderRef = ref()
const hoursPlaceholderRef = ref()

watch([hoursRef, minutesRef], () => {
	const refs = [hoursPlaceholderRef, minutesPlaceholderRef]
	const inputs = [hoursRef, minutesRef]
	refs.forEach((ref, index) => {
		inputs[index].value.addEventListener('focus', () => {
			ref.value.classList.add('highlight-text')
		})
		inputs[index].value.addEventListener('blur', () => {
			ref.value.classList.remove('highlight-text')
		})
	})
})
</script>
