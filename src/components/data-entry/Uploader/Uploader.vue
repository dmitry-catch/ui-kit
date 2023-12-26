<script setup lang="ts">
import Button from '../../general/Button/Button.vue'
import FileDeck from '../../data-display/FileDeck/FileDeck.vue'
import { onMounted, ref, toRefs, watch } from 'vue'
import { byteConverter } from '../../../utils/byteConverter'
import { extractFileNameAndExtension } from '../../../utils/extractFileNameAndExtension'

// <!-- inject localization -->

interface UploaderProps {
	modelValue: Array<File>
	isInvalid?: boolean
	isLoading?: boolean
	multiple?: boolean
	disabled?: boolean
	fileSizeLimit?: number
	length?: number
	accept?: string
	header?: string
	hint?: string
	requirementsString?: string
}

const props = withDefaults(defineProps<UploaderProps>(), {
	header: 'Перетащите файл в эту область или загрузите с компьютера',
	fileSizeLimit: 10 * 1024 ** 2,
	isInvalid: false,
	multiple: true,
	disabled: false,
	accept: '.xls,.xlsx,.pdf,.doc,.docx,.zip',
	length: 10,
	isLoading: false
})
const { header, isInvalid, hint, multiple, disabled, fileSizeLimit, accept, length, isLoading } = toRefs(props)

const files = ref<Array<File>>([])
const emit = defineEmits(['update:modelValue'])
const isInnerInvalid = ref<boolean>(false)
const innerErrorMessage = ref<string | null>()

const preventDefaultDragBehavior = (event: DragEvent) => {
	event.stopPropagation()
	event.preventDefault()
}

const onFileSelect = (event: Event) => {
	event.stopPropagation()
	event.preventDefault()
	const droppedFiles: Array<File> = Object.entries(
		event.dataTransfer ? event.dataTransfer.files : event.target?.files
	).map(([key, value]) => value)

	const allowDrop = validateFiles(droppedFiles)
	if (allowDrop) {
		files.value = [...files.value, ...droppedFiles]
	} else {
		isInnerInvalid.value = true
	}
}

const validateFiles = (inputFiles: Array<File>) => {
	if (!disabled.value) {
		const lengthValidation: boolean =
			(multiple.value || (inputFiles && inputFiles.length == 1)) &&
			files.value.length + inputFiles.length <= length.value

		if (!lengthValidation) {
			innerErrorMessage.value = `Количество файлов должно быть меньше ${multiple.value ? length.value : 1}`
			return false
		}

		for (const file of inputFiles) {
			if (file.size > fileSizeLimit.value) {
				innerErrorMessage.value = `Размер файла не должен превышать ${
					byteConverter(fileSizeLimit.value).size
				} ${byteConverter(fileSizeLimit.value).measurementUnit}`
				return false
			}
			if (!isFileAcceptable(accept.value, file)) {
				innerErrorMessage.value = `Загрузите файл одного из этих форматов: ${accept.value
					.split(',')
					.map((it) => it.trim().slice(1))
					.join(', ')}`
				return false
			}
		}
		return true
	}
	return false
}

const isFileAcceptable = (accept: string, file: File): boolean => {
	const fileType = file.type
	const fileExtension = extractFileNameAndExtension(file.name).extension
	if (accept.includes(fileExtension) || accept.includes(fileType)) return true
	return false
}

const fileInputRef = ref()

const chooseFile = () => fileInputRef.value.click()
const deleteFile = (file: File) => (files.value = files.value.filter((fileIt: any) => fileIt.name != file.name))

watch(files, () => {
	innerErrorMessage.value = null
	isInnerInvalid.value = false
	emit('update:modelValue', files.value)
})

onMounted(() => (files.value = props.modelValue))

const root = ref()
</script>

<template>
	<div ref="root" class="Uploader">
		<div
			class="Uploader__content"
			@dragenter="preventDefaultDragBehavior"
			@dragover="preventDefaultDragBehavior"
			@drop="onFileSelect"
			:class="{ invalid: isInvalid || isInnerInvalid }"
		>
			<div class="header">
				<span class="">{{ header }}</span>
				<span class="text-small" v-if="requirementsString">{{ requirementsString }}</span>
			</div>

			<input
				type="file"
				ref="fileInputRef"
				:multiple="multiple"
				@change="onFileSelect"
				:disabled="disabled"
				:accept="accept"
				style="display: none"
			/>
			<Button @click="chooseFile" :isLoading="isLoading" :disabled="disabled">Выбрать файл</Button>
		</div>
		<span v-if="hint || innerErrorMessage" :class="{ danger: isInvalid || isInnerInvalid }" class="hint">
			{{ hint ? hint : innerErrorMessage }}
		</span>
		<FileDeck @delete="deleteFile" v-if="files.length > 0" v-model="files" />
	</div>
</template>

<style scoped>
.Uploader {
	display: flex;
	flex-direction: column;
	gap: var(--design-gap-unit);
}

.Uploader__content {
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

.Uploader__content.invalid {
	border-color: var(--design-border-color-danger-primary);
}

.header {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
</style>
