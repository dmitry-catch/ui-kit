<script setup lang="ts">
import { toRefs, ref, computed } from 'vue'
import { extractFileNameAndExtension } from '../../../utils/extractFileNameAndExtension'
import { FileDataType as FileData } from './types'
import { byteConverter } from '../../../utils/byteConverter'
import Button from '../../general/Button/Button.vue'
import Icon from '../../general/Icon/Icon.vue'
import Spinner from '../../general/Spinner/Spinner.vue'

interface FileCardProps {
	file?: File
	variant?: 'delete' | 'upload'
	loading?: boolean
	/** При отсутсвии файла в карточку можно поместить данные файла для вывода, а именно size в байтах и fileName в формате строк */
	fileData?: FileData
	outline?: boolean
}

const props = withDefaults(defineProps<FileCardProps>(), {
	variant: 'delete',
	outline: true
})

const emit = defineEmits<{
	(e: 'delete', file: File | FileData | undefined): void
	(e: 'upload', file: File | FileData | undefined): void
}>()

const { file, loading, variant, fileData, outline } = toRefs(props)

const fileNameData = computed(() =>
	file.value ? extractFileNameAndExtension(file.value?.name) : extractFileNameAndExtension(fileData.value?.name)
)
const fileMetadata = computed(() =>
	file.value ? byteConverter(file.value?.size) : byteConverter(fileData.value?.size)
)
</script>
<template>
	<div class="FileCard" :outline="outline">
		<span class="FileCard__extension">{{ fileNameData.extension }}</span>
		<span class="FileCard__name">{{ fileNameData.fileName }}</span>
		<span class="FileCard__size">{{ fileMetadata.size }} {{ fileMetadata.measurementUnit }}</span>
		<div class="FileCard__controls">
			<Button
				v-if="!loading && variant == 'delete'"
				class="icon functional FileCard__deleteBtn"
				@click="emit('delete', file ? file : fileData)"
			>
				<Icon name="trash" />
			</Button>
			<Button
				v-if="!loading && variant == 'upload'"
				class="icon functional"
				@click="emit('upload', file ? file : fileData)"
			>
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
}
.FileCard[outline='true'] {
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
	min-width: fit-content;
}
.FileCard__controls {
	margin-left: auto;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: var(--design-gap-unit);
}
</style>
