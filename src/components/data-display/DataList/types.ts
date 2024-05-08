export type DataListItemType = {
	label: string
	value?: any
	action?: (item: DataListItemType) => void
	extraAttrs?: Record<string, any>
	wrapperClass?: string
}

export type DataListGroupType = {
	key?: string
	data: Array<DataListItemType>
	extraAttrs?: Record<string, any>
	isCollapsed?: boolean
}
