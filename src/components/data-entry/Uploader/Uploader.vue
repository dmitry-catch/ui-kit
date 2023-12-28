<script setup lang="ts">
import Button from '../../general/Button/Button.vue'
import FileCard from '../../data-display/FileCard/FileCard.vue'
import { onMounted, ref, toRefs, watch } from 'vue'
import { byteConverter } from '../../../utils/byteConverter'
import { extractFileNameAndExtension } from '../../../utils/extractFileNameAndExtension'

// <!-- inject localization -->

interface UploaderProps {
	modelValue: Array<File>
	/** Отвечает за возможность перетаскивания файлов внутрь компонента */
	draggable?: boolean
	invalid?: boolean
	loading?: boolean
	multiple?: boolean
	disabled?: boolean
	/** Размер в байтах */
	fileSizeLimit?: number
	length?: number
	/** Принимаемые расширения файлов. К примеру: '.xls,.xlsx,.pdf,.doc,.docx,.zip' */
	accept?: string
	header?: string
	hint?: string
	requirementsString?: string
}

const props = withDefaults(defineProps<UploaderProps>(), {
	header: 'Перетащите файл в эту область или загрузите с компьютера',
	multiple: true,
	draggable: true
})
const { header, invalid, hint, multiple, disabled, fileSizeLimit, accept, length, loading, draggable } = toRefs(props)

const files = ref<Array<File>>([])
const emit = defineEmits(['update:modelValue'])
const isInnerInvalid = ref<boolean>(false)
const innerErrorMessage = ref<string | null>()

const preventDefaultDragBehavior = (event: DragEvent) => {
	event.stopPropagation()
	event.preventDefault()
}

const onFileSelect = (event: any) => {
	event.stopPropagation()
	event.preventDefault()
	const droppedFiles: Array<File> = Object.entries<File>(
		event.dataTransfer ? event.dataTransfer.files : event.target.files
	).map(([_, value]) => value)
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
	if (fileSizeLimit?.value || inputFile.size > Number(fileSizeLimit?.value)) {
		innerErrorMessage.value = fileSizeLimit?.value
			? `Размер файла не должен превышать ${byteConverter(fileSizeLimit.value).size} ${
					byteConverter(fileSizeLimit.value).measurementUnit
			  }`
			: ''
		return false
	}
	if (accept?.value || !isFileAcceptable(accept?.value, inputFile)) {
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

const isFileAcceptable = (accept: string | undefined, file: File): boolean => {
	if (!accept) return true
	const fileType = file.type
	const fileExtension = extractFileNameAndExtension(file.name).extension
	return accept?.includes(fileExtension) || accept?.includes(fileType)
}

const fileInputRef = ref()

const chooseFile = () => fileInputRef.value.click()
const deleteFile = (file: File) => (files.value = files.value.filter((fileIt: File) => fileIt.name != file.name))

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
			v-if="draggable"
			class="Uploader__content"
			:class="{ invalid: invalid || isInnerInvalid }"
			@dragenter="preventDefaultDragBehavior"
			@dragover="preventDefaultDragBehavior"
			@drop="onFileSelect"
		>
			<div class="Uploader__header">
				<span class="">{{ header }}</span>
				<span v-if="requirementsString" class="text-small">{{ requirementsString }}</span>
			</div>

			<input
				ref="fileInputRef"
				type="file"
				:multiple="multiple"
				:disabled="disabled"
				:accept="accept"
				style="display: none"
				@change="onFileSelect"
			/>
			<Button v-if="!$slots.actionButton" :isLoading="loading" :disabled="disabled" @click="chooseFile"
				>Выбрать файл</Button
			>
			<slot name="actionButton" :isLoading="loading" :disabled="disabled" @click="chooseFile"></slot>
		</div>
		<div v-else>
			<input
				ref="fileInputRef"
				type="file"
				:multiple="multiple"
				:disabled="disabled"
				:accept="accept"
				style="display: none"
				@change="onFileSelect"
			/>
			<Button v-if="!$slots.actionButton" :isLoading="loading" :disabled="disabled" @click="chooseFile"
				>Upload</Button
			>
			<slot name="actionButton" :isLoading="loading" :disabled="disabled" @click="chooseFile"></slot>
		</div>
		<span v-if="hint || innerErrorMessage" :class="{ danger: invalid || isInnerInvalid }" class="hint">
			{{ hint ? hint : innerErrorMessage }}
		</span>
		<div class="Uploader__fileDeck" v-if="files.length > 0 && draggable">
			<FileCard v-for="file in files" :file="file" @delete="deleteFile" />
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
