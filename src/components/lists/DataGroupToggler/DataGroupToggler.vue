<style>
.DataListGroup {
	display: flex;
	flex-flow: row;
	align-items: center;
	background: var(--design-background-color-secondary);
	width: 100%;
	height: min-content;
	gap: var(--design-gap-unit);
}

.DataListGroup__button.icon.functional {
	--button-background-color-primary: var(--design-background-color-secondary);
}
</style>

<template>
	<div class="DataListGroup text-footnote" @click="toggle">
		<Btn class="DataListGroup__button icon functional">
			<Icon v-if="modelValue" name="chevron_down" style="--icon-size: 16px"></Icon>
			<Icon v-else name="chevron_up" style="--icon-size: 16px"></Icon>
		</Btn>
		<span>{{ group.key }}</span>
		<span>|</span>
		<span>{{ group.data.length }}</span>
	</div>
</template>

<script setup lang="ts">
import Icon from '../../general/Icon/Icon.vue'
import Btn from '../../general/Button/Button.vue'
import { Group } from '@forecsys/collections'
import { toRefs } from 'vue'

interface DataGroupTogglerProps {
	/**
	 * Выводит `key | data.length` переданные в group
	 */
	group: Group<any>
	/**
	 * Определяет направление шеврона
	 */
	modelValue?: boolean
}

const props = defineProps<DataGroupTogglerProps>()
const emit = defineEmits(['update:modelValue'])

const { group, modelValue } = toRefs(props)

const toggle = () => {
	emit('update:modelValue', !modelValue.value)
}
</script>