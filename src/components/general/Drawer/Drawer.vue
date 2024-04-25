<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, toRefs } from 'vue'
import { useModalContext } from '../../../utils/useModalContext.js'
import { handleKeyboardEvent } from '../../../utils/keyboardEventHandler.js'
import { Keyboard } from '../../../consts/Keyboard.js'
import { Modal, Surface, Button, Icon } from '../../../main.js'

interface DrawerProps {
	open: boolean
	autofocus?: boolean
	backdrop?: boolean | 'static'
	/** Закртытие по нажатию на Esc */
	keyboard?: boolean
	placement?: 'top' | 'bottom' | 'right' | 'left'
	/** Продвинутые параметры: number\string размер компонента */
	size?: 'small' | 'medium' | 'large' | 'full' | number | string
	/** Флаг отвечающий за расположение drawer'a. При дефолтном значении false относительно документа, при значении = true относительно родителя  */
	relative?: boolean
}
const props = withDefaults(defineProps<DrawerProps>(), {
	autofocus: true,
	placement: 'right',
	size: 'medium',
	keyboard: true,
	backdrop: true
})
const emit = defineEmits<{
	(e: 'close'): void
	(e: 'open'): void
}>()

defineSlots<{
	header?: string
	default?: () => unknown
	footer?: () => unknown
}>()

const { open, backdrop, keyboard, placement, size, autofocus, relative } = toRefs(props)

const root = ref()
const visibleContainerRef = ref()
const ModalRef = ref()
const focus = () => root.value.focus()
const horizontal = computed(() => ['top', 'bottom'].includes(placement.value))
const sizesContsts = ['small', 'medium', 'large', 'full']
const innerDefaultSize = computed(() => (sizesContsts.includes(String(size.value)) ? size.value : null))
const innerStyling = computed(() => {
	if (sizesContsts.includes(String(size.value))) return null
	if (isNaN(Number(size.value)))
		return {
			width: horizontal.value ? '100vw' : size.value,
			height: horizontal.value ? size.value : '100vh'
		}
	return {
		width: horizontal.value ? '100vw' : size.value + 'px',
		height: horizontal.value ? size.value + 'px' : '100vh'
	}
})

const handleEscape = () => {
	if (keyboard.value) emit('close')
}

const clickOutside = (event: MouseEvent) => {
	// @ts-expect-error event.path old chrome compatability
	const path = event.path || event.composedPath()
	return !(
		visibleContainerRef.value === event.target ||
		visibleContainerRef.value?.$el.contains(event.target) ||
		path.includes(visibleContainerRef.value?.$el)
	)
}

const handleClickOutside = (event: MouseEvent) => {
	if (clickOutside(event) && backdrop.value != 'static') emit('close')
}

const keyboardEvent = (e: KeyboardEvent) => {
	handleKeyboardEvent({ event: e, key: Keyboard.ESC, callback: handleEscape })
}

onMounted(() => {
	emit('open')
	if (backdrop.value != 'static') root.value.addEventListener('click', handleClickOutside)
	if (autofocus.value) focus()
	if (keyboard.value) root.value.addEventListener('keyup', keyboardEvent)
})
onUnmounted(() => {
	if (root.value?.hasEventListener('click')) root.value.removeEventListener('click', handleClickOutside)
	if (root.value?.hasEventListener('keyup')) root.value.removeEventListener('keyup', keyboardEvent)
})
useModalContext(root)
</script>
<template>
	<div ref="root" class="Drawer" :hidden="!open" :class="{ backdrop, relative }">
		<Modal
			v-if="open"
			ref="ModalRef"
			class="Drawer__modal"
			:class="{ backdrop, horizontal, relative }"
			:anchor="placement"
			:relative="relative"
			:keyboard="keyboard"
			@onDialogKeyDown="keyboardEvent"
		>
			<Surface ref="visibleContainerRef" class="Drawer__surface" :size="innerDefaultSize" :style="innerStyling">
				<div class="Drawer__head">
					<span class="Drawer__header accent text-large"><slot name="header"></slot></span>
					<Button class="icon functional" @click="emit('close')"><Icon name="close" /></Button>
				</div>
				<div class="Drawer_content">
					<slot></slot>
				</div>
				<div v-if="$slots.footer" class="Drawer__footer">
					<slot name="footer"></slot>
				</div>
			</Surface>
		</Modal>
	</div>
</template>
<style scoped>
.Drawer {
	height: 100%;
	width: 100%;
	position: absolute;
}
.Drawer__modal {
	max-width: 100%;
	height: 100%;
}
.Drawer__surface {
	height: 100vh;
	border-radius: 0;
	box-shadow: 0px 32px 64px 0px rgba(33, 44, 58, 0.16);
	display: flex;
	flex-direction: column;
}
.Drawer__head {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	margin-bottom: calc(3 * var(--design-gap-unit));
}
.Drawer__modal::backdrop {
	background: none;
}
.Drawer__modal.backdrop::backdrop {
	background: var(--design-background-color-modal-shadow);
}

.Drawer.backdrop.relative {
	background: var(--design-background-color-milk-modal-shadow);
}

.Drawer__modal.horizontal .Drawer__surface {
	height: fit-content;
	width: 100vw;
}

.Drawer__footer {
	margin-top: auto;
	display: flex;
	align-items: center;
	justify-content: end;
	gap: calc(2 * var(--design-gap-unit));
	padding-top: calc(3 * var(--design-gap-unit));
	border-top: 1px solid var(--design-border-color-baseline);
}

.Drawer__surface[size='small'] {
	width: min-content;
}
.Drawer__modal.horizontal .Drawer__surface[size='small'] {
	height: min-content;
}

.Drawer__surface[size='medium'] {
	min-width: 15rem;
}

.Drawer__modal.relative .Drawer__surface[size='medium'] {
	min-width: 15%;
}
.Drawer__modal.horizontal .Drawer__surface[size='medium'] {
	min-height: 15rem;
}
.Drawer__modal.horizontal.relative .Drawer__surface[size='medium'] {
	min-height: 15%;
}

.Drawer__surface[size='large'] {
	min-width: 30rem;
}
.Drawer__modal.relative .Drawer__surface[size='large'] {
	min-width: 30%;
}
.Drawer__modal.horizontal .Drawer__surface[size='large'] {
	min-height: 30rem;
}

.Drawer__modal.horizontal.relative .Drawer__surface[size='large'] {
	min-height: 30%;
}

.Drawer__surface[size='full'] {
	width: 100vw;
}
.Drawer__modal.horizontal .Drawer__surface[size='full'] {
	height: 100vw;
}

.Drawer__modal.horizontal.relative {
	max-height: min-content;
	height: min-content;
	width: 100%;
}
.Drawer__modal.horizontal.relative .Drawer__surface {
	width: 100%;
}
</style>
