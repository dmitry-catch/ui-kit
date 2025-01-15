interface ByteConverterResult {
	size: number
	measurementUnit: string
}

export const byteConverter = (bytes: number | undefined): ByteConverterResult => {
	if (!bytes) return { size: 0, measurementUnit: 'B' }
	const fileSize = bytes
	const kiloByte = 1024
	const megaByte = kiloByte * 1024

	let size: number
	let measurementUnit: string

	if (fileSize < kiloByte) {
		size = fileSize
		measurementUnit = 'B'
	} else if (fileSize < megaByte) {
		size = fileSize / kiloByte
		measurementUnit = 'кб'
	} else {
		size = fileSize / megaByte
		measurementUnit = 'мб'
	}

	size = parseFloat(size.toFixed(1))

	return { size, measurementUnit }
}
