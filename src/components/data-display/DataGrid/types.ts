import { Component } from 'vue'
import { BinaryFilterExpression } from '@forecsys/collections'

export type BaseGridColumn = object & {
	name: string
	field: string
}

export type TypedGridColumn = BaseGridColumn & {
	type: string
}

export type CellComponent<T> = Component<{ item: T; column: DataGridColumn<T> }>

export type CustomizedGridColumn<T = any> = BaseGridColumn & {
	cellComponent: CellComponent<T>
}

export type CustomHeaderGridColumn = BaseGridColumn & {
	headerVariant: 'highlighted'
}

export type FilterableGridColumn = BaseGridColumn & {
	filterable: boolean
}

export type SortableGridColumn = BaseGridColumn & {
	sortable: boolean
}

export type EnumGridColumn<T = any> = TypedGridColumn & {
	type: 'enum'
	template: (value: T) => string
	filterEnum: { [key: string | number | symbol]: T }
}

export type DataGridColumn<T = any> = BaseGridColumn | TypedGridColumn | EnumGridColumn<T> | CustomizedGridColumn<T>

export type DataGridCellContentProps = { column: DataGridColumn; item: any }

export interface ItemCheckboxClickEmit {
	id: unknown
	value: boolean
	groupFilters?: BinaryFilterExpression[]
}

export interface GroupCheckboxClickEmit {
	value: boolean
	filters?: BinaryFilterExpression[]
}
