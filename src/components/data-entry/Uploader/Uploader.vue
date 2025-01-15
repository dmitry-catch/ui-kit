<script setup lang="ts">
import { onMounted, ref, toRefs, watch, Ref } from 'vue'
import { byteConverter } from '../../../utils/byteConverter'
import { extractFileNameAndExtension } from '../../../utils/extractFileNameAndExtension'
import Button from '../../general/Button/Button.vue'
import FileCard from '../../data-display/FileCard/FileCard.vue'
import type { FileDataType } from '../../data-display/FileCard/types'
import type { UploaderEmits, UploaderProps, UploaderSlots } from './types'

// <!-- inject localization -->

const props = withDefaults(defineProps<UploaderProps>(), {
	header: 'Перетащите файл в эту область или загрузите с компьютера'
})
const emit = defineEmits<UploaderEmits>()

const slots = defineSlots<UploaderSlots>()

const { header, invalid, multiple, disabled, fileSizeLimit, accept, length, loading, draggable } = toRefs(props)

const files = defineModel<File[] | FileDataType[]>({ default: [] })
const loadingStates = ref()
const isInnerInvalid = ref<boolean>(false)
const innerErrorMessage = ref<string | null>()

const preventDefaultDragBehavior = (event: DragEvent) => {
	if (!draggable.value) return
	event.stopPropagation()
	event.preventDefault()
}

const onDrop = (event: DragEvent) => {
	if (!draggable.value) return
	event.stopPropagation()
	event.preventDefault()
	if (event.dataTransfer?.files) handleUploadedFiles(event.dataTransfer?.files)
	else isInnerInvalid.value = true
}

const onFileSelect = (event: Event) => {
	event.stopPropagation()
	event.preventDefault()
	const target = event.target as HTMLInputElement
	if (target.files) handleUploadedFiles(target.files)
	else isInnerInvalid.value = true
}

const handleUploadedFiles = (uploadedFiles: FileList) => {
	const processedFiles: Array<File> = Object.entries<File>(uploadedFiles).map(([_, value]) => value)
	processedFiles.forEach((file: File) => {
		const reader = new FileReader()
		loadingStates.value = { ...loadingStates.value, [file.name]: true }
		reader.addEventListener('loadend', () => (loadingStates.value = { ...loadingStates.value, [file.name]: false }))
		reader.readAsDataURL(file)
	})
	const allowDrop = validateFiles(processedFiles)
	if (allowDrop) {
		files.value = [...files.value, ...processedFiles]
	} else {
		isInnerInvalid.value = true
	}
}

const validateFiles = (inputFiles: Array<File>) => {
	if (!disabled.value) {
		const lengthValidation: boolean =
			(multiple.value || (inputFiles && files.value.length + inputFiles.length == 1)) &&
			(!length?.value || files.value.length + inputFiles.length <= length?.value)
		if (!lengthValidation) {
			innerErrorMessage.value = `Количество файлов должно быть меньше ${multiple.value ? length?.value : 1}`
			return false
		}

		for (const file of inputFiles) {
			const fileValidity = validateFile(file)
			if (fileValidity === false) {
				return fileValidity
			}
		}
		return true
	}
	return false
}

const validateFile = (inputFile: File) => {
	if (fileSizeLimit?.value && Number(inputFile.size) > Number(fileSizeLimit?.value)) {
		innerErrorMessage.value = fileSizeLimit?.value
			? `Размер файла не должен превышать ${byteConverter(fileSizeLimit.value).size} ${
					byteConverter(fileSizeLimit.value).measurementUnit
			  }`
			: ''
		return false
	}
	if (accept?.value && !isFileAcceptable(accept?.value, inputFile)) {
		innerErrorMessage.value = `Загрузите файл одного из этих форматов: ${
			accept?.value ??
			''
				.split(',')
				.map((it) => it.trim().slice(1))
				.join(', ')
		}`
		return false
	}
}

const isFileAcceptable = (acceptString: string | undefined, file: File): boolean => {
	if (!acceptString) return true
	const fileType = file.type
	const fileExtension = extractFileNameAndExtension(file.name).extension
	return acceptString?.includes(fileExtension) || acceptString?.includes(fileType)
}

const fileInputRef: Ref = ref()

const chooseFile = () => fileInputRef.value.click()
const deleteFile = (file: File | FileDataType | undefined) => {
	if (!file) return
	files.value = files.value.filter((fileIt: File | FileDataType) => fileIt.name != file.name)
	const newStates = { ...loadingStates.value }
	delete newStates[file.name]
	loadingStates.value = newStates
	fileInputRef.value.value = ''
	emit('delete', file)
}

watch(files, () => {
	innerErrorMessage.value = null
	isInnerInvalid.value = false
})

onMounted(() => {
	files.value = props.modelValue
	loadingStates.value = files.value.reduce((object, file: File | FileDataType) => {
		return { ...object, [file.name]: false }
	}, {})
})

const root = ref()
</script>

<template>
	<div ref="root" class="Uploader">
		<div
			:class="{ Uploader__content: draggable, invalid: draggable && (invalid || isInnerInvalid) }"
			@dragenter="preventDefaultDragBehavior"
			@dragover="preventDefaultDragBehavior"
			@drop="onDrop"
		>
			<div v-if="draggable" class="Uploader__header">
				<span class="">{{ header }}</span>
				<span v-if="$slots.hint" class="text-small"><slot name="hint"></slot></span>
			</div>

			<input
				ref="fileInputRef"
				data-testid="fileInput"
				type="file"
				:multiple="multiple"
				:disabled="disabled"
				style="display: none"
				@change="onFileSelect"
			/>
			<Button v-if="!$slots.actionButton" :loading="loading" :disabled="disabled" @click="chooseFile">
				{{ draggable ? 'Выбрать файл' : 'Upload' }}
			</Button>
			<div class="Uploader__actionButoon">
				<Button v-if="$slots.actionButton" :loading="loading" :disabled="disabled" @click="chooseFile">
					<slot name="actionButton"></slot>
				</Button>
			</div>
		</div>
		<span v-if="invalid || isInnerInvalid" class="danger hint">
			<slot name="error" :message="innerErrorMessage!">{{ innerErrorMessage }}</slot>
		</span>
		<div v-if="files.length > 0 && draggable" class="Uploader__fileDeck">
			<FileCard
				v-for="file in files"
				:key="file.size"
				:file="file"
				:fileData="file"
				:loading="loadingStates[file.name]"
				@delete="deleteFile"
			/>
		</div>
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

.Uploader__header {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.Uploader__fileDeck {
	display: flex;
	flex-direction: column;
}
</style>
