<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import Icon from '../../../general/Icon/Icon.vue'
import Button from '../../../general/Button/Button.vue'

interface Props {
	totalElements: number
	modelValue: number
	pageSize: number
}

const props = defineProps<Props>()

const emit = defineEmits(['update:modelValue'])

const totalPages = computed(() => Math.ceil(props.totalElements / props.pageSize))
const visibleButtons = computed(() => Array.from({ length: Math.min(totalPages.value, 5) }, (_, i) => i + 1))
const currentPage = ref(props.modelValue + 1)

const buttons = computed(() =>
	visibleButtons.value.map((_, index, arr) =>
		Math.max(
			currentPage.value + Math.ceil(arr.length / 2) <= totalPages.value
				? Math.max(index + 1, Math.min(currentPage.value - Math.ceil(arr.length / 2) + index + 1))
				: totalPages.value - arr.length + index,
			index + 1
		)
	)
)

watchEffect(() => {
	currentPage.value = Math.min(totalPages.value, Math.max(1, props.modelValue + 1))
})

const isLastButtonGroup = computed(() => buttons.value[buttons.value.length - 1] >= totalPages.value - 1)
const isLastTheTotalButton = computed(() => totalPages.value == visibleButtons.value[visibleButtons.value.length - 1])

const updatePage = (value: number) => {
	const clamped = Math.min(totalPages.value, Math.max(1, value))
	emit('update:modelValue', clamped - 1)
}

const buttonClick = (value: number) => {
	currentPage.value = value
	updatePage(value)
}

const incrementPage = () => updatePage(currentPage.value + 1)
const decrementPage = () => updatePage(currentPage.value - 1)
const toFirstPage = () => updatePage(0)
const toLastPage = () => updatePage(totalPages.value)
</script>

<template>
	<div class="DataGridPaginationPanel">
		<div class="DataGridPaginationPanel__statistics">
			<span> Всего записей: {{ totalElements }} </span>
		</div>
		<div class="DataGridPaginationPanel__buttons">
			<Button
				v-for="(button, index) of buttons"
				:key="index"
				class="DataGridPaginationPanel__button functional"
				:class="{ 'DataGridPaginationPanel__button--current': button === currentPage }"
				:disabled="totalPages < button"
				@click="buttonClick(button)"
			>
				<span
					:class="{ 'DataGridPaginationPanel__buttonText--current': button === currentPage }"
					class="accent"
				>
					{{ button }}
				</span>
			</Button>
			<span v-if="!isLastButtonGroup">...</span>
			<Button
				v-if="!isLastTheTotalButton"
				class="DataGridPaginationPanel__button functional"
				:class="{ 'DataGridPaginationPanel__button--current': totalPages === currentPage }"
				@click="toLastPage"
			>
				<span
					class="accent"
					:class="{ 'DataGridPaginationPanel__buttonText--current': totalPages === currentPage }"
				>
					{{ totalPages }}
				</span>
			</Button>
			<Button class="DataGridPaginationPanel__button icon functional" @click="toFirstPage">
				<Icon name="chevron_double_backward" class="DataGridPaginationPanel__buttonIcon" />
			</Button>
			<Button class="DataGridPaginationPanel__button icon functional" @click="decrementPage">
				<Icon name="chevron_backward" class="DataGridPaginationPanel__buttonIcon" />
			</Button>
			<Button class="DataGridPaginationPanel__button icon functional" @click="incrementPage">
				<Icon name="chevron_forward" class="DataGridPaginationPanel__buttonIcon" />
			</Button>
			<Button class="DataGridPaginationPanel__button icon functional" @click="toLastPage">
				<Icon name="chevron_double_forward" class="DataGridPaginationPanel__buttonIcon" />
			</Button>
		</div>
	</div>
</template>

<style>
.DataGridPaginationPanel {
	position: sticky;
	left: 0;
	bottom: 0;
	background-color: var(--design-background-color-primary);
	height: min-content;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: calc(2 * var(--design-gap-unit));
	z-index: 1000;
}

.DataGridPaginationPanel__buttons {
	display: flex;
	align-items: center;
}

.DataGridPaginationPanel__button {
	padding: var(--design-gap-unit) calc(2 * var(--design-gap-unit));
}

.DataGridPaginationPanel__button--current {
	border: 1px solid var(--design-border-color-accent-primary);
	border-radius: var(--design-border-radius-control);
}

.DataGridPaginationPanel__buttonText--current {
	color: var(--design-text-color-accent);
}
</style>
