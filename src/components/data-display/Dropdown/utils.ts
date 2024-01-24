import { Item, Group } from './types.js'

export const isGroup = (itemOrGroup: Item | Group): itemOrGroup is Group => {
	return 'items' in itemOrGroup
}