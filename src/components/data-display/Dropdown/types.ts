export type Item = {
	label: string
	value?: any
	action?: (item: Item) => void
	extraAttrs?: Record<string, any>
	wrapperClass?: string
}

export type Group = {
	name?: string
	items: Array<Item>
	extraAttrs?: Record<string, any>
}

export type ItemsProp = Array<Item> | Array<Group>
