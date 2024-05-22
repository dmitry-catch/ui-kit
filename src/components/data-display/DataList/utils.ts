import { DataListGroupType, DataListItemType } from './types.js'

export const isGroup = (
	itemOrGroup: DataListItemType<any> | DataListGroupType<any>
): itemOrGroup is DataListGroupType<any> => {
	return 'data' in itemOrGroup
}
