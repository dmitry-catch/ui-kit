import type { FileDataType } from '../../data-display/FileCard/types'

export interface UploaderEmits {
	(e: 'update:modelValue', files: Array<File | FileDataType>): void
	(e: 'delete', file: File | FileDataType): void
}

export interface UploaderProps {
	modelValue: Array<File | FileDataType>
	/** Отвечает за возможность перетаскивания файлов внутрь компонента */
	draggable?: boolean
	invalid?: boolean
	loading?: boolean
	multiple?: boolean
	disabled?: boolean
	/** Размер в байтах
	 *
	 * f.e - 1024*1024*25 - 25mb
	 */
	fileSizeLimit?: number
	length?: number
	/** Принимаемые расширения файлов. К примеру: '.xls,.xlsx,.pdf,.doc,.docx,.zip' */
	accept?: string
	header?: string
}

export interface UploaderSlots {
	hint?: string
	error?: string
	actionButton?: () => any
}
