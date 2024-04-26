<script setup lang="ts">
import { computed, ref, toRefs } from 'vue'
import { useModalContext } from '../../../utils/useModalContext'

interface TooltipProps {
	placement?: 'left' | 'right' | 'top' | 'bottom'
	// Наличие\отсутсвие стрелки указывающей на объект
	arrowed?: boolean
	// Отсрочка появления подсказки в мс
	delay?: number
	disabled?: boolean
	// отступ подсказки от элемента в px
	offset?: number
}

const slots = defineSlots<{
	//  Компонент относительного которого показывать тултип
	default?: () => unknown
	// Внутренний контент тултипа
	tooltip?: () => string | unknown
}>()

const props = withDefaults(defineProps<TooltipProps>(), { placement: 'top', arrowed: true, delay: 50, offset: 0 })

const { placement, arrowed, delay, disabled, offset } = toRefs(props)

const open = defineModel<boolean>({ type: Boolean })

const tippedContent = ref<HTMLElement>()
const content = ref<HTMLElement>()
const contentWidth = ref<number>()
const contentHeight = ref<number>()

const tippedContentRect = computed(() => tippedContent.value?.getBoundingClientRect() ?? {})
const topOffset = computed(() => {
	const tipHeight = contentHeight.value ?? Number(content.value?.getBoundingClientRect().height)
	const sizeDifference = Math.abs(Number(tippedContentRect.value?.height) - tipHeight)
	switch (placement.value) {
		case 'top':
			return Math.abs(Number(tippedContentRect.value?.top)) - Math.abs(tipHeight) - 4 - offset.value + 'px'
		case 'bottom':
			return Math.abs(Number(tippedContentRect.value?.bottom)) + 4 + offset.value + 'px'
		default:
			return tippedContentRect.value?.top + sizeDifference / 2 + 'px'
	}
})

const leftOffset = computed(() => {
	const elementWidth = contentWidth.value ?? Number(content.value?.scrollWidth)
	const initialLeft = elementWidth / 2
	const tippedX = Math.abs(Number(tippedContentRect.value?.x))
	switch (placement.value) {
		case 'left':
			return tippedX - Math.abs(elementWidth) - offset.value - 4 + 'px'
		case 'right':
			return tippedX + Math.abs(Number(tippedContentRect.value?.width)) + offset.value + 4 + 'px'
		default:
			return tippedX - initialLeft + Number(tippedContentRect.value?.width) / 2 + 'px'
	}
})
const onHover = () => {
	contentWidth.value = Number(content.value?.offsetWidth)
	contentHeight.value = Number(content.value?.clientHeight)
}

useModalContext(content)
</script>
<template>
	<div ref="tippedContent" class="tippedContent" data-testid="trigger" @mouseover="onHover">
		<slot name="default"> </slot>
	</div>
	<div
		v-if="!disabled"
		ref="content"
		class="Tooltip"
		data-testid="content"
		:class="$attrs.class"
		:style="{ transitionDuration: delay + 'ms' }"
		:placement
		:open
	>
		<div><slot name="tooltip"></slot></div>
		<svg
			v-if="arrowed"
			class="arrow"
			xmlns="http://www.w3.org/2000/svg"
			width="132"
			height="4"
			viewBox="0 0 132 4"
			fill="none"
		>
			<path d="M72 0L60 0L66 4L72 0Z" />
		</svg>
	</div>
</template>
<style scoped>
.Tooltip {
	transition: ease-in-out;
	box-shadow: 0px 12px 24px 0px rgba(33, 44, 58, 0.16);
	border-radius: var(--design-border-radius-control);
	background-color: var(--design-background-color-primary);
	padding: calc(0.5 * var(--design-gap-unit)) calc(2 * var(--design-gap-unit));
	max-width: 100%;
	max-height: 100%;
	width: fit-content;
	text-align: center;
	position: fixed;
	left: v-bind(leftOffset);
	top: v-bind(topOffset);

	.arrow {
		max-width: 100%;
		position: absolute;
		left: 0;
		right: 0;
		margin-left: auto;
		margin-right: auto;
		bottom: -3px;
	}
	.arrow > path {
		fill: var(--design-background-color-primary);
	}
}
.Tooltip[placement='bottom'] {
	box-shadow: 0px -12px 24px 0px rgba(33, 44, 58, 0.16);
	.arrow {
		transform: rotateY('angle');
		bottom: unset;
		top: -3px;
		transform: rotate(180deg);
	}
}

.Tooltip[placement='right'] {
	box-shadow: -12px 12px 24px 0px rgba(33, 44, 58, 0.16);
	.arrow {
		top: 50%;
		left: calc(-100% - 3px);
		transform: rotate(90deg);
	}
}
.Tooltip[placement='left'] {
	box-shadow: 12px 12px 24px 0px rgba(33, 44, 58, 0.16);
	.arrow {
		top: 50%;
		right: calc(-100% - 3px);
		transform: rotate(270deg);
	}
}
.Tooltip[open='true'] {
	visibility: visible;
	opacity: 1;
}
.Tooltip[open='false'] {
	visibility: hidden;
	opacity: 0;
}

.tippedContent:hover + .Tooltip[open='false'] {
	visibility: visible;
	opacity: 1;
}
</style>
