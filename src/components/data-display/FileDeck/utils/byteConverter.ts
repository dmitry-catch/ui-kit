interface ByteConverterResult {
	size: number
	measurementUnit: string
}

export const byteConverter = (bytes: number): ByteConverterResult => {
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
