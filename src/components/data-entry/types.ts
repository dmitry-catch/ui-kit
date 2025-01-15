export interface SelectOptionType<T = any> {
	name: string
	value: T
}

export type SelectLoadContext<T = any> = {
	current: Array<SelectOptionType<T>>
	loading: boolean
	completed: boolean
}
