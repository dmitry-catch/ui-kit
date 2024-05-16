const isoDatePattern = new RegExp(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{0,})?Z/) 

const isISOString = (value: any): boolean =>
	typeof value === 'string' && !Number.isNaN(Date.parse(value)) && isoDatePattern.test(value)

export { isISOString }
