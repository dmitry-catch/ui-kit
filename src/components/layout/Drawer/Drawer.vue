<script setup lang="ts">
import { onMounted, toRefs } from 'vue'
import { Modal, Surface, Button, Icon } from '../../../main'

interface DrawerProps {
	open: boolean
	autoFocus?: boolean
	backdrop?: boolean
	/** Закртытие по нажатию на Esc */
	keyboard?: boolean
	placement?: 'top' | 'bottom' | 'right' | 'left'
	size?: 'extra-small' | 'small' | 'medium' | 'large' | 'full' | number | string
}
const props = withDefaults(defineProps<DrawerProps>(), {
	autoFocus: true,
	placement: 'right',
	size: 'md'
})
const emit = defineEmits<{
	(e: 'onClose', value: boolean): void
	(e: 'onOpen'): void
}>()
const { open, backdrop, keyboard, placement, size } = toRefs(props)

onMounted(() => {
	emit('onOpen')
	// document.addEventListener('click', () => {})
})
</script>
<template>
	<div class="Drawer">
		<Modal v-if="open" class="Drawer__modal" :class="{ backdrop }" :anchor="placement">
			<Surface class="Drawer__surface">
				<div class="Drawer_content">
					<div class="Drawer__head">
						<span></span>
						<Button class="icon functional" @click="emit('onClose', false)"><Icon name="close" /></Button>
					</div>
					<slot></slot>
				</div>
			</Surface>
		</Modal>
	</div>
</template>
<style scoped>
.Drawer__surface {
	height: 100vh;
	border-radius: 0;
	box-shadow: 0px 32px 64px 0px rgba(33, 44, 58, 0.16);
}
.Drawer__modal::backdrop {
	background: none;
}

.Drawer__modal.backdrop::backdrop {
	background: var(--design-background-color-modal-shadow);
}
</style>
