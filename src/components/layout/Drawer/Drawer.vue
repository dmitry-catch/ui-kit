<script setup lang="ts">
import { computed, onMounted, ref, toRefs } from 'vue'
import { Modal, Surface, Button, Icon } from '../../../main'
import { handleKeyboardInput } from '../../../utils/keyboardEventHandler'

interface DrawerProps {
	open: boolean
	autofocus?: boolean
	backdrop?: boolean
	/** Закртытие по нажатию на Esc */
	keyboard?: boolean
	placement?: 'top' | 'bottom' | 'right' | 'left'
	size?: 'small' | 'medium' | 'large' | 'full'
}
const props = withDefaults(defineProps<DrawerProps>(), {
	autofocus: true,
	placement: 'right',
	size: 'medium'
})
const emit = defineEmits<{
	(e: 'onClose', value: boolean): void
	(e: 'onOpen'): void
}>()

defineSlots<{
	header?: string
	default?: () => any
}>()

const { open, backdrop, keyboard, placement, size, autofocus } = toRefs(props)

const root = ref()
const focus = () => root.value.focus()

const horizontal = computed(() => ['top', 'bottom'].includes(placement.value))
const handleEscape = () => emit('onClose', false)

onMounted(() => {
	emit('onOpen')
	if (autofocus.value) focus()
	if (keyboard.value)
		document.addEventListener('keydown', (e) =>
			handleKeyboardInput({ event: e, key: 'escape', callback: handleEscape })
		)
})
</script>
<template>
	<div ref="root" class="Drawer">
		<Modal v-if="open" class="Drawer__modal" :class="{ backdrop, horizontal: horizontal }" :anchor="placement">
			<Surface class="Drawer__surface" :size="size">
				<div class="Drawer_content">
					<div class="Drawer__head">
						<span class="accent"><slot name="header"></slot></span>
						<Button class="icon functional" @click="emit('onClose', false)"><Icon name="close" /></Button>
					</div>
					<slot></slot>
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
}
.Drawer__head {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
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
