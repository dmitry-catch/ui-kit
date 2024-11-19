export interface FileDataType {
	size?: number
	name: string
	uri?: string
}

export interface FileCardProps {
	file?: File
	variant?: 'delete' | 'upload'
	loading?: boolean
	/** При отсутсвии файла в карточку можно поместить данные файла для вывода, а именно size в байтах и fileName в формате строк */
	fileData?: FileDataType
	outline?: boolean
}

export interface FileCardEmits {
	(e: 'delete', file: File | FileDataType | undefined): void
	(e: 'upload', file: File | FileDataType | undefined): void
}
