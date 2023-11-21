import { Component } from 'vue/dist/vue'
import { DataGridColumn } from './DataGridColumn'

export type CellComponent<T> = Component<{ item: T; column: DataGridColumn<T> }>
