<script setup lang="ts">
import { computed, onMounted, ref, toRefs } from 'vue'
import { ModalAnchor } from './ModalAnchor.js'
import { useModalContext } from '../../../utils/useModalContext.js'
import { Keyboard } from '../../../consts/Keyboard'

const root = ref<HTMLDialogElement>()
onMounted(() => root.value?.showModal())
const props = withDefaults(defineProps<{ anchor: ModalAnchor; keyboard: boolean }>(), {
	/**Закрытие модального окна по клавише esc */
	keyboard: true
})
const emit = defineEmits<{
	(e: 'onDialogKeyDown', event: KeyboardEvent): void
}>()
const { anchor, keyboard } = toRefs(props)

const anchorClass = computed(() => `Modal--anchor-${anchor.value ?? 'center'}`)

const handleKeyDown = (event: KeyboardEvent) => {
	emit('onDialogKeyDown', event)
	if (event.code == Keyboard.ESC && keyboard.value) root.value?.close()
}

useModalContext(root)
</script>

<template>
	<dialog ref="root" class="Modal" :class="anchorClass" @keydown="handleKeyDown">
		<slot></slot>
	</dialog>
</template>

<style>
.Modal::backdrop {
	background: var(--design-background-color-modal-shadow);
}

.Modal {
	border: none;
	background: none;
	padding: 0;
	max-height: 100vh;
}

.Modal--anchor-center {
	margin: auto;
}

.Modal--anchor-left {
	margin-block: auto;
	margin-inline-start: 0;
	margin-inline-end: auto;
}

.Modal--anchor-right {
	margin-block: auto;
	margin-inline-start: auto;
	margin-inline-end: 0;
}

.Modal--anchor-top {
	margin-inline: auto;
	margin-block-start: 0;
	margin-block-end: auto;
}

.Modal--anchor-bottom {
	margin-inline: auto;
	margin-block-start: auto;
	margin-block-end: 0;
}
</style>
