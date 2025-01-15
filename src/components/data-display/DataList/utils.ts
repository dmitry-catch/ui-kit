import { DataListGroupType, DataListItemType } from './types.js'

export const isGroup = (
	itemOrGroup: DataListItemType<any> | DataListGroupType<any>
): itemOrGroup is DataListGroupType<any> => {
	return 'data' in itemOrGroup
}

export const isList = (
	itemOrGroup: DataListItemType<any> | DataListGroupType<any>
): itemOrGroup is DataListItemType<any> => {
	return 'label' in itemOrGroup
}

export const isArrayList = (
	itemOrGroup: DataListItemType<any>[] | DataListGroupType<any>[]
): itemOrGroup is DataListItemType<any>[] => {
	return Array.isArray(itemOrGroup) && 'label' in itemOrGroup[0]
}
