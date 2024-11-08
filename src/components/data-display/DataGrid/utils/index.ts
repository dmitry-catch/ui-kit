import {
	BaseGridColumn,
	CustomHeaderGridColumn,
	CustomizedGridColumn,
	DataGridColumn,
	EnumGridColumn,
	TypedGridColumn
} from '../types.js'

export const isColumn = (column: DataGridColumn): column is BaseGridColumn => {
	return isTypedColumn(column) && column.type === 'enum'
}

export const isTypedColumn = (column: DataGridColumn): column is TypedGridColumn => {
	return 'type' in column
}

export const isCustomizedColumn = (column: DataGridColumn): column is CustomizedGridColumn => {
	return 'cellComponent' in column
}

export const isCustomHeaderColumn = (column: DataGridColumn): column is CustomHeaderGridColumn => {
	return 'headerVariant' in column
}

export const isEnumColumn = (column: DataGridColumn): column is EnumGridColumn => {
	return isTypedColumn(column) && column.type === 'enum'
}

export const isDateColumn = (column: DataGridColumn): column is TypedGridColumn => {
	return isTypedColumn(column) && column.type === 'date'
}
