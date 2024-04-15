<script setup lang="ts">
import { computed, ref, toRefs } from 'vue'
import { useModalContext } from '../../../utils/useModalContext'

interface TooltipProps {
	placement?: 'left' | 'right' | 'top' | 'bottom'
	// Наличие\отсутсвие стрелки указывающей на объект
	arrowed?: boolean
	// Отсрочка появления подсказки в мс
	delay?: number
	// Имя класса подсказки
	className?: string
	disabled?: boolean
}

const slots = defineSlots<{
	//  Компонент относительного которого показывать тултип
	default?: () => unknown
	// Внутренний контент тултипа
	tooltip?: () => string | unknown
}>()

const props = withDefaults(defineProps<TooltipProps>(), { placement: 'top', arrowed: true, delay: 50 })

const { placement, arrowed, delay, className, disabled } = toRefs(props)

const open = defineModel<boolean>({ type: Boolean })
const topOffset = computed(() => (tippedContent.value.clientHeight - content.value.clientHeight) / 2 + 'px')

const tippedContent = ref<HTMLElement>()
const content = ref<HTMLElement>()
const root = ref<HTMLElement>()

useModalContext(root)
useModalContext(content)
</script>
<template>
	<div ref="root" class="Tooltip">
		<div
			v-if="!disabled"
			ref="content"
			class="content"
			data-testid="content"
			:class="className"
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
		<div ref="tippedContent" class="tippedContent" data-testid="trigger">
			<slot name="default"> </slot>
		</div>
	</div>
</template>
<style scoped>
.Tooltip {
	width: fit-content;
	height: fit-content;
	position: relative;

	.content {
		transition: ease-in-out;
		box-shadow: 0px 12px 24px 0px rgba(33, 44, 58, 0.16);
		border-radius: var(--design-border-radius-control);
		background-color: var(--design-background-color-primary);
		padding: calc(0.5 * var(--design-gap-unit)) calc(2 * var(--design-gap-unit));
		max-width: 100%;
		max-height: 100%;
		text-align: center;
		position: absolute;
		left: 0;
		right: 0;
		margin-left: auto;
		margin-right: auto;
		top: -42px;

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
	.content[placement='bottom'] {
		top: unset;
		bottom: -42px;
		box-shadow: 0px -12px 24px 0px rgba(33, 44, 58, 0.16);
		.arrow {
			transform: rotateY('angle');
			bottom: unset;
			top: -3px;
			transform: rotate(180deg);
		}
	}
	.content[placement='right'],
	.content[placement='left'] {
		top: v-bind(topOffset);
	}
	.content[placement='right'] {
		bottom: unset;
		right: unset;
		left: calc(100% + var(--design-gap-unit));
		box-shadow: -12px 12px 24px 0px rgba(33, 44, 58, 0.16);
		.arrow {
			bottom: unset;
			top: 50%;
			left: calc(-100% - 3px);
			transform: rotate(90deg);
		}
	}
	.content[placement='left'] {
		bottom: unset;
		left: unset;
		right: calc(100% + var(--design-gap-unit));
		box-shadow: 12px 12px 24px 0px rgba(33, 44, 58, 0.16);
		.arrow {
			bottom: unset;
			top: 50%;
			right: calc(-100% - 3px);
			transform: rotate(270deg);
		}
	}
	.content[open='true'] {
		visibility: visible;
		opacity: 1;
	}
	.content[open='false'] {
		visibility: hidden;
		opacity: 0;
	}
}

.Tooltip:hover > .content[open='false'] {
	visibility: visible;
	opacity: 1;
}
</style>
