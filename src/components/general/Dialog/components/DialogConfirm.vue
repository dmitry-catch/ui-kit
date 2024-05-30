<script setup lang="ts">
import { useConfirm } from '../../../../utils/useConfirm.js'
import Button from '../../Button/Button.vue'

defineProps<{
	header: string
	content: string
	submitBtnText: string
	cancelBtnText: string
}>()

const { showConfirm } = useConfirm()
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
