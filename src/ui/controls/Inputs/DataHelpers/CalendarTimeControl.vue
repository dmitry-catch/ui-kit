<style>
.calendar-time-control {
	display: flex;
	align-items: center;
	height: 25px;
	max-width: 130px;
	justify-content: center;
	border: 1px solid var(--design-border-color-primary);
	border-radius: 4px;
	padding: 7px 14px;
}
.calendar-time-control__controls {
	display: flex;
	flex-direction: column;
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

/* remove arrows */
.calendar-time-control__input::-webkit-outer-spin-button,
.calendar-time-control__input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}

/* Firefox */
.calendar-time-control__input[type='number'] {
	-moz-appearance: textfield;
}
</style>

<template>
	<div class="calendar-time-control">
		<span>{{ DateLocalization.TimeFrom() }}</span>
		<input
			class="calendar-time-control__input"
			type="number"
			v-model="hours"
			:maxlength="2"
			@input="handleHourChange"
		/>
		:
		<input
			class="calendar-time-control__input"
			type="number"
			v-model="minutes"
			:maxlength="2"
			@input="handleMinuteChange"
		/>
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

const handleHourChange = (event: any) => {
	const value = event.target.value
	if (value.length >= 2) {
		if (Number(value) > 23) {
			event.target.value = '23'
		}
		emit('update:modelValue', `${value}:${minutes.value}`)
		event.target.nextElementSibling.focus()
	} else if (value.length === 0) {
		emit('update:modelValue', `00:${minutes.value}`)
	}
}

const handleMinuteChange = (event: any) => {
	if (event.target.value.length >= 2) {
		if (Number(event.target.value) > 59) {
			event.target.value = '59'
		}
		emit('update:modelValue', `${hours.value}:${event.target.value}`)
		event.target.blur()
	} else if (event.target.value.length === 0) {
		emit('update:modelValue', `${hours.value}:00`)
	}
}

const hours = ref(modelValue.value.split(':')[0] ? modelValue.value.split(':')[0] : '00')
const minutes = ref(modelValue.value.split(':')[1] ? modelValue.value.split(':')[1] : '00')
</script>
