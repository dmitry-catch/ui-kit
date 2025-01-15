<script setup lang="ts">
import { Dialog } from '../index.js'
import Button from '../../Button/Button.vue'

defineProps<{
	header: string
	content: string
	submitBtnText: string
	cancelBtnText: string
}>()

const { showConfirm } = Dialog.useConfirm()
</script>

<template>
	<Button
		class="functional"
		@click="
			showConfirm({
				header: header,
				content: content,
				submitBtnText: submitBtnText,
				cancelBtnText: cancelBtnText
			})
		"
		>Confirm</Button
	>
</template>
