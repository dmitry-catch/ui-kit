<script setup lang="ts">
import { extractFileNameAndExtension } from '../../../utils/extractFileNameAndExtension'
import { byteConverter } from '../../../utils/byteConverter'
import { toRefs } from 'vue'
import { Button, Icon, Spinner } from '../../../main'

interface FileCardProps {
	file: File
	variant?: 'delete' | 'upload'
	loading?: boolean
}

const props = withDefaults(defineProps<FileCardProps>(), {
	variant: 'delete'
})

const emit = defineEmits<{
	(e: 'delete', file: File): void
	(e: 'upload', file: File): void
}>()

const { file, loading, variant } = toRefs(props)
const { extension, fileName } = extractFileNameAndExtension(file.value.name)
const { size, measurementUnit } = byteConverter(file.value.size)
</script>
<template>
	<div class="FileCard">
		<span class="FileCard__extension">{{ extension }}</span>
		<span class="FileCard__name">{{ fileName }}</span>
		<span class="FileCard__size">{{ size }} {{ measurementUnit }}</span>
		<div class="FileCard__controls">
			<Button v-if="!loading && variant == 'delete'" class="icon functional" @click="emit('delete', file)">
				<Icon name="trash" />
			</Button>
			<Button v-if="!loading && variant == 'upload'" class="icon functional" @click="emit('upload', file)">
				<Icon name="upload" />
			</Button>
			<Spinner v-if="loading" variant="dark" />
		</div>
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

.FileCard__extension {
	background-color: var(--design-background-color-pantone);
	color: var(--design-text-color-on-accent-primary);
	padding: calc(0.75 * var(--design-gap-unit)) calc(2 * var(--design-gap-unit));
	border-radius: var(--design-border-radius-tag);
}

.FileCard__size {
	color: var(--design-text-color-on-accent-secondary);
}

.FileCard__controls {
	margin-left: auto;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: var(--design-gap-unit);
}
</style>
