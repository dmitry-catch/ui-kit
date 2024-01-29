import { DataListGroup, DataListItem } from './types.js'

export const isGroup = (itemOrGroup: DataListItem | DataListGroup): itemOrGroup is DataListGroup => {
	return 'items' in itemOrGroup
}