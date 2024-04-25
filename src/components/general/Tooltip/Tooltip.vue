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

const tippedContentRect = computed(() => tippedContent.value?.getBoundingClientRect() ?? {})
const topOffset = computed(() => {
	const contentHeight = Number(content.value?.getBoundingClientRect().height) ?? 0
	const sizeDifference = Number(tippedContentRect.value?.height) - contentHeight
	switch (placement.value) {
		case 'top':
			return Number(tippedContentRect.value?.top) - contentHeight - 4 - offset.value + 'px'
		case 'bottom':
			return Number(tippedContentRect.value?.bottom) + 4 + offset.value + 'px'
		default:
			return tippedContentRect.value?.top + sizeDifference / 2 + 'px'
	}
})
const leftOffset = computed(() => {
	const sizeDifference = Number(tippedContentRect.value?.width) - Number(content.value?.getBoundingClientRect().width)
	const contentWidth = Number(content.value?.getBoundingClientRect().width) ?? 0
	switch (placement.value) {
		case 'left':
			return Number(tippedContentRect.value?.x) - Number(contentWidth) - offset.value - 4 + 'px'
		case 'right':
			return Number(tippedContentRect.value?.x) + Number(tippedContentRect.value?.width) + offset.value + 4 + 'px'
		default:
			return Number(tippedContentRect.value?.x) + sizeDifference / 2 + 'px'
	}
})

useModalContext(content)
</script>
<template>
	<div ref="tippedContent" class="tippedContent" data-testid="trigger">
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
