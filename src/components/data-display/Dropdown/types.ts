export type Item = {
	label: string
	value?: any
	action?: (item: Item) => void
	extraAttrs?: Object
	wrapperClass?: string
}

export type Group = {
	name?: string
	items: Array<Item>
	extraAttrs?: Object
}

export type ItemsProp = Array<Item> | Array<Group>