export type DropdownItemType = {
	label: string
	value?: any
	action?: (item: DropdownItemType) => void
	extraAttrs?: Record<string, any>
	wrapperClass?: string
}

export type DropdownGroupType = {
	name?: string
	items: Array<DropdownItemType>
	extraAttrs?: Record<string, any>
}
