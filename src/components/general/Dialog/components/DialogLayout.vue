<script setup lang="ts">
import { toRefs } from 'vue'
import Button from '../../Button/Button.vue'
import Surface from '../../../layout/Surface/Surface.vue'
import Modal from '../../Modal/Modal.vue'
import Icon from '../../Icon/Icon.vue'

interface DialogLayoutProps {
	/** Расположение модального окна по дефолту относительно документа, при значении true - относительно родителя */
	relative?: boolean
	/** Модальное окно занимает весь экран */
	full?: boolean
	/** Стейт показывающий, что относительное модальное окно открыто */
	relativeModalOpen?: boolean
	/** Стейт отвечающий за размер отступов внутри модального окна */
	size?: 'medium' | 'small'
}

const props = defineProps<DialogLayoutProps>()
const { full, relativeModalOpen, relative, size } = toRefs(props)

const emit = defineEmits<{
	(e: 'close'): void
}>()

const handleKeyDown = (event: KeyboardEvent) => {
	if (event.key == 'ESC') emit('close')
}

const slots = defineSlots<{
	default?: string | unknown
	header?: string
	controls?: unknown
	/**slot to inject modal relative to the main layout */
	relativeModal?: unknown
}>()
</script>

<template>
	<Modal anchor="center" class="DialogLayout" :class="{ full }" :relative="relative" @onDialogKeyDown="handleKeyDown">
		<Surface class="Content">
			<div class="header">
				<div class="text-large accent"><slot name="header"></slot></div>
				<Button class="icon functional" @click="emit('close')">
					<Icon name="close" />
				</Button>
			</div>
			<div class="content" :size="size">
				<slot></slot>
			</div>
			<div v-if="slots.controls" class="controls" :size="size">
				<slot name="controls"></slot>
			</div>
			<div v-if="relativeModalOpen" class="relative">
				<slot name="relativeModal"></slot>
			</div>
		</Surface>
	</Modal>
</template>

<style scoped>
.DialogLayout {
	max-width: 491px;
	box-sizing: border-box;
	.header {
		gap: calc(3 * var(--design-gap-unit));
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: calc(3 * var(--design-gap-unit));
		width: 100%;
	}
	.header > div:first-of-type {
		width: 100%;
	}
	.content {
		display: flex;
		align-items: center;
		justify-content: start;
		padding-bottom: calc(2 * var(--design-gap-unit));
	}
	.content[size='small'] {
		padding-bottom: var(--design-gap-unit);
	}
	.controls {
		margin-top: calc(4 * var(--design-gap-unit));
		display: flex;
		gap: calc(2 * var(--design-gap-unit));
	}
	.controls[size='small'] {
		margin-top: calc(3 * var(--design-gap-unit));
	}
}
.DialogLayout.full {
	max-width: none;
	width: 100%;
	height: 100%;
	padding: calc(3 * var(--design-gap-unit));
	.Content {
		position: relative;
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: start;
		justify-content: start;
		.header {
			width: 100%;
		}
		.content {
			width: 100%;
		}
		.controls {
			margin-top: auto;
		}
		.relative {
			position: absolute;
			left: 0;
			top: 0;
			height: 100%;
			width: 100%;
		}
	}
}
</style>
