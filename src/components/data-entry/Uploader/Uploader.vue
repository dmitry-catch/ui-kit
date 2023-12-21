<script setup lang="ts">
import Button from '../../general/Button/Button.vue'
import { computed, ref, toRefs } from 'vue'
// <!-- inject localization -->

interface UploaderProps {
	isInvalid: boolean
	header?: string
	hint?: string
}

const props = withDefaults(defineProps<UploaderProps>(), {
	header: 'Перетащите файл в эту область или загрузите с компьютера',
	isInvalid: false
})

const { header, isInvalid, hint } = toRefs(props)

const root = ref()
</script>

<template>
	<div :ref="root" class="Uploader" :class="{ invalid: isInvalid }">
		<span class="header">{{ header }}</span>
		<Button>Выбрать файл</Button>
	</div>
	<span v-if="hint">{{ hint }}</span>
</template>

<style scoped>
.Uploader {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: calc(2 * var(--design-gap-unit));
	width: auto;
	padding: calc(2 * var(--design-gap-unit)) calc(3 * var(--design-gap-unit));
	min-width: calc(678px - 3 * var(--design-gap-unit));
	border-radius: calc(2 * var(--design-border-radius-control));
	border: 1px dashed var(--design-border-color-baseline);
	background-color: var(--design-background-color-primary);
}

.invalid {
	border-color: var(--design-border-color-danger-primary);
}
</style>
