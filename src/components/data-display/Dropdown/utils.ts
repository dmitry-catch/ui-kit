import { DropdownItemType, DropdownGroupType } from './types.js'

export const isGroup = (itemOrGroup: DropdownItemType | DropdownGroupType): itemOrGroup is DropdownGroupType => {
	return 'items' in itemOrGroup
}
