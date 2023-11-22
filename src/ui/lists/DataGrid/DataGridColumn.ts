import { CellComponent } from './CellComponent'

export type BaseGridColumn = object & {
	name: string
	field: string
}
export const isColumn = (column: DataGridColumn): column is BaseGridColumn => {
	return isTypedColumn(column) && column.type === 'enum'
}

export type TypedGridColumn = BaseGridColumn & {
	type: string
}
export const isTypedColumn = (column: DataGridColumn): column is TypedGridColumn => {
	return 'type' in column
}

export type CustomizedGridColumn<T = any> = BaseGridColumn & {
	cellComponent: CellComponent<T>
}
export const isCustomizedColumn = (column: DataGridColumn): column is CustomizedGridColumn => {
	return 'cellComponent' in column
}
export type EnumGridColumn<T = any> = TypedGridColumn & {
	type: 'enum'
	template: (value: T) => string
	filterEnum: { [key: string | number | symbol]: T }
}
export const isEnumColumn = (column: DataGridColumn): column is EnumGridColumn => {
	return isTypedColumn(column) && column.type === 'enum'
}
export const isDateColumn = (column: DataGridColumn): column is TypedGridColumn => {
	return isTypedColumn(column) && column.type === 'date'
}
export type DataGridColumn<T = any> = BaseGridColumn | TypedGridColumn | EnumGridColumn<T> | CustomizedGridColumn<T>
