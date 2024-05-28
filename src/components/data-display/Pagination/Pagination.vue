<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { Icon, Button } from '../../../main'

interface Props {
	totalElements: number
	pageSize: number
}

const page = defineModel<number>({ required: true })
const props = defineProps<Props>()

const totalPages = computed(() => Math.ceil(props.totalElements / props.pageSize))
const visibleButtons = computed(() => Array.from({ length: Math.min(totalPages.value, 5) }, (_, i) => i + 1))
const currentPage = ref(page.value + 1)
const entryAmount = computed(() =>
	currentPage.value * props.pageSize > props.totalElements ? props.totalElements : currentPage.value * props.pageSize
)

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
	currentPage.value = Math.min(totalPages.value, Math.max(1, page.value + 1))
})

const isLastButtonGroup = computed(() => buttons.value[buttons.value.length - 1] >= totalPages.value - 1)
const isLastTheTotalButton = computed(() => totalPages.value == visibleButtons.value[visibleButtons.value.length - 1])

const updatePage = (value: number) => {
	const clamped = Math.min(totalPages.value, Math.max(1, value))
	page.value = clamped - 1
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
	<div class="Pagination">
		<div>
			<span> Записей: {{ entryAmount }} из {{ totalElements }} </span>
		</div>
		<div v-if="totalPages > 1" class="Pagination__buttons">
			<Button
				v-for="(button, index) of buttons"
				:key="index"
				class="Pagination__button functional"
				:class="{ 'Pagination__button--current': button === currentPage }"
				:disabled="totalPages < button"
				@click="buttonClick(button)"
			>
				<span :class="{ 'Pagination__buttonText--current': button === currentPage }" class="accent">
					{{ button }}
				</span>
			</Button>
			<span v-if="!isLastButtonGroup">...</span>
			<Button
				v-if="!isLastTheTotalButton"
				class="Pagination__button functional"
				:class="{ 'Pagination__button--current': totalPages === currentPage }"
				@click="toLastPage"
			>
				<span class="accent" :class="{ 'Pagination__buttonText--current': totalPages === currentPage }">
					{{ totalPages }}
				</span>
			</Button>
			<Button class="Pagination__button icon functional" @click="toFirstPage">
				<Icon name="chevron_double_backward" class="Pagination__buttonIcon" />
			</Button>
			<Button class="Pagination__button icon functional" @click="decrementPage">
				<Icon name="chevron_backward" class="Pagination__buttonIcon" />
			</Button>
			<Button class="Pagination__button icon functional" @click="incrementPage">
				<Icon name="chevron_forward" class="Pagination__buttonIcon" />
			</Button>
			<Button class="Pagination__button icon functional" @click="toLastPage">
				<Icon name="chevron_double_forward" class="Pagination__buttonIcon" />
			</Button>
		</div>
	</div>
</template>

<style scoped>
.Pagination {
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

.Pagination__buttons {
	display: flex;
	align-items: center;
}

.Pagination__button {
	padding: var(--design-gap-unit) calc(2 * var(--design-gap-unit));
}

.Pagination__button--current {
	border: 1px solid var(--design-border-color-accent-primary);
	border-radius: var(--design-border-radius-control);
}

.Pagination__buttonText--current {
	color: var(--design-text-color-accent);
}
</style>
