export type DataListItemType<T = any> = {
	label: string
	value: T
	action?: (item: DataListItemType<T>) => void
	extraAttrs?: Record<string, any>
	wrapperClass?: string
}

export type DataListGroupType<T = any> = {
	key?: string
	data: Array<DataListItemType<T>>
	extraAttrs?: Record<string, any>
	isCollapsed?: boolean
}

export type DataGroupTypeContext<T = any> = {
	type: 'group'
	current: DataListGroupType<T>
	loading: boolean
	completed: boolean
}

export type DataListTypeContext<T = any> = {
	type: 'list'
	current: DataListItemType<T>[]
	loading: boolean
	completed: boolean
}

export type DataListLoadContext<T = any> = DataGroupTypeContext<T> | DataListTypeContext<T>
