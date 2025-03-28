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

export type ContextGroupType = {
	type: 'group'
	current: Ref<DataListGroupType<any>> | Ref<null>
	loading: Ref<boolean>
	completed: Ref<boolean>
}

export type ContextListType = {
	type: 'list'
	current: Ref<DataListItemType<any>[]> | Ref<null>
	loading: Ref<boolean>
	completed: Ref<boolean>
}

export type ContextType = ContextGroupType | ContextListType
