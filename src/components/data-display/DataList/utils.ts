import { DataListGroupType, DataListItemType } from './types.js'

export const isGroup = (itemOrGroup: DataListItemType | DataListGroupType): itemOrGroup is DataListGroupType => {
	return 'data' in itemOrGroup
}
