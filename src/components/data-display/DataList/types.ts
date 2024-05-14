import { Ref } from 'vue'

export type DataListItemType<T> = {
	label?: string
	value?: T
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
	current: Ref<DataListGroupType<T>> | Ref<null>
	loading: Ref<boolean>
	completed: Ref<boolean>
}

export type DataListTypeContext<T = any> = {
	type: 'list'
	current: Ref<DataListItemType<T>[]> | Ref<null>
	loading: Ref<boolean>
	completed: Ref<boolean>
}

export type DataListLoadContext<T = any> = DataGroupTypeContext<T> | DataListTypeContext<T>
