interface FileNameAndExtension {
	fileName: string
	extension: string
}

export const extractFileNameAndExtension = (str: string): FileNameAndExtension => {
	const lastDotIndex = str.lastIndexOf('.')
	if (lastDotIndex === -1) {
		return { fileName: str, extension: '' }
	}
	const fileName = str.slice(0, lastDotIndex)
	const extension = str.slice(lastDotIndex + 1)
	return { fileName, extension }
}
