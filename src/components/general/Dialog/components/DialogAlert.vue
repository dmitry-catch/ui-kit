<script setup lang="ts">
import { useAlert } from '../../../../utils/useAlert.js'
import Button from '../../Button/Button.vue'

defineProps<{
	header: string
	content: string
	closeBtnText: string
}>()

const { showAlert } = useAlert()
</script>

<template>
	<Button class="functional" @click="showAlert({ header: header, content: content, closeBtnText: closeBtnText })"
		>Alert</Button
	>
</template>
