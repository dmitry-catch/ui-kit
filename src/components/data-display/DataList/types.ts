export type DataListItem = {
	label: string
	value?: any
	action?: (item: DataListItem) => void
	extraAttrs?: Record<string, any>
	wrapperClass?: string
}

export type DataListGroup = {
	name?: string
	items: Array<DataListItem>
	extraAttrs?: Record<string, any>
}
