<script setup lang="ts">
import { extractFileNameAndExtension } from '../utils/extractFileNameAndExtension'
import { byteConverter } from '../utils/byteConverter'
import { toRefs } from 'vue'

interface FileCardProps {
	file: File | null
}

const props = defineProps<FileCardProps>()
const { file } = toRefs(props)
</script>
<template>
	<div class="FileCard">
		<div class="extension">{{ extractFileNameAndExtension(file.name).extension }}</div>
		<div class="name">{{ extractFileNameAndExtension(file.name).fileName }}</div>
		<div class="size">{{ byteConverter(file.size).size }} {{ byteConverter(file.size).measurementUnit }}</div>
	</div>
</template>
<style scoped>
.FileCard {
	display: flex;
	align-items: center;
	justify-content: start;
	gap: calc(2 * var(--design-gap-unit));
	padding: var(--design-gap-unit) 0;
	border-bottom: 1px solid var(--design-border-color-baseline);
	border-top: 1px solid var(--design-border-color-baseline);
}

.extension {
	background-color: var(--design-background-color-pantone);
	color: var(--design-text-color-on-accent-primary);
	padding: calc(0.75 * var(--design-gap-unit)) calc(2 * var(--design-gap-unit));
	border-radius: var(--design-border-radius-tag);
}

.size {
	color: var(--design-text-color-on-accent-secondary);
}
</style>
