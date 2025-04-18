import { Component } from 'vue'

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

export type EnumGridColumn<T = any> = TypedGridColumn & {
	type: 'enum'
	template: (value: T) => string
	filterEnum: { [key: string | number | symbol]: T }
}

export type DataGridColumn<T = any> = BaseGridColumn | TypedGridColumn | EnumGridColumn<T> | CustomizedGridColumn<T>

export type DataGridCellContentProps = { column: DataGridColumn; item: any }
