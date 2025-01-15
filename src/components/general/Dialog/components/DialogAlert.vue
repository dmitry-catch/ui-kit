<script setup lang="ts">
import { Dialog } from '../index.js'
import Button from '../../Button/Button.vue'

defineProps<{
	header: string
	content: string
	closeBtnText: string
}>()

const { showAlert } = Dialog.useAlert()
</script>

<template>
	<Button class="functional" @click="showAlert({ header: header, content: content, closeBtnText: closeBtnText })"
		>Alert</Button
	>
</template>
