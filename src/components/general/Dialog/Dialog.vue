<script setup lang="ts">
import { inject } from 'vue'
import { dialogContext } from './utils.js'
import Button from '../Button/Button.vue'
import ModalLayout from './ModalLayout/ModalLayout.vue'

const { state, clear, isEmpty } = inject(dialogContext)!

const handleClose = () => {
	state.value.onClose()
	clear()
}
</script>

<template>
	<ModalLayout v-if="!isEmpty" @close="handleClose">
		<template #header>{{ state?.header }}</template>
		<template #default>{{ state?.content }}</template>
		<template #controls>
			<Button
				v-for="(button, index) in state?.buttons"
				:key="index"
				:class="button?.class"
				@click="button?.onClick"
			>
				{{ button?.content }}
			</Button>
		</template>
	</ModalLayout>
</template>

<style scoped></style>
