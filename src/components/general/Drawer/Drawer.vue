<script setup lang="ts">
import { computed, onMounted, onUnmounted, watch, ref, toRefs } from 'vue'
import { handleKeyboardEvent } from '../../../utils/keyboardEventHandler'
import { KEY } from '../../../consts/KEY'
import { Modal, Surface, Button, Icon } from '../../../main'

interface DrawerProps {
	open: boolean
	autofocus?: boolean
	backdrop?: boolean | 'static'
	/** Закртытие по нажатию на Esc */
	keyboard?: boolean
	/** Закртытие по нажатию вне drawer'a*/
	static?: boolean
	placement?: 'top' | 'bottom' | 'right' | 'left'
	size?: 'small' | 'medium' | 'large' | 'full'
}
const props = withDefaults(defineProps<DrawerProps>(), {
	autofocus: true,
	placement: 'right',
	size: 'medium'
})
const emit = defineEmits<{
	(e: 'onClose'): void
	(e: 'onOpen'): void
}>()

defineSlots<{
	header?: string
	default?: () => any
	footer?: () => any
}>()

const { open, backdrop, keyboard, placement, size, autofocus } = toRefs(props)

const root = ref()
const visibleContainerRef = ref()
const focus = () => root.value.focus()

const horizontal = computed(() => ['top', 'bottom'].includes(placement.value))
const handleEscape = () => emit('onClose')

const clickOutside = (event: MouseEvent) => {
	return !(visibleContainerRef.value === event.target || visibleContainerRef.value?.$el.contains(event.target))
}

const handleClickOutside = (event: MouseEvent) => {
	if (clickOutside(event)) emit('onClose')
}

const keyboardEvent = (e: KeyboardEvent) => handleKeyboardEvent({ event: e, key: KEY.ESC, callback: handleEscape })

onMounted(() => {
	emit('onOpen')
	if (backdrop.value != 'static') root.value.addEventListener('click', handleClickOutside)
	if (autofocus.value) focus()
	if (keyboard.value) root.value.addEventListener('keyup', keyboardEvent)
})
onUnmounted(() => {
	if (root.value?.hasEventListener('click')) root.value.removeEventListener('click', handleClickOutside)
	if (root.value?.hasEventListener('keyup')) root.value.removeEventListener('keyup', keyboardEvent)
})
</script>
<template>
	<div ref="root" class="Drawer">
		<Modal v-if="open" class="Drawer__modal" :class="{ backdrop, horizontal: horizontal }" :anchor="placement">
			<Surface ref="visibleContainerRef" class="Drawer__surface" :size="size">
				<div class="Drawer__head">
					<span class="Drawer__header accent text-large"><slot name="header"></slot></span>
					<Button class="icon functional" @click="emit('onClose')"><Icon name="close" /></Button>
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
.Drawer__modal {
	max-width: 100%;
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
.Drawer__modal.horizontal .Drawer__surface[size='medium'] {
	min-height: 15rem;
}

.Drawer__surface[size='large'] {
	min-width: 30rem;
}
.Drawer__modal.horizontal .Drawer__surface[size='large'] {
	min-height: 30rem;
}

.Drawer__surface[size='full'] {
	width: 100vw;
}
.Drawer__modal.horizontal .Drawer__surface[size='full'] {
	height: 100vw;
}
</style>
