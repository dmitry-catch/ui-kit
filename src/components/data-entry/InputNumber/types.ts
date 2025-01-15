export interface InputNumberProps {
	modelValue: number
	step?: number
	min?: number
	max?: number
	disabled?: boolean
	readonly?: boolean
	arrowed?: boolean
	scrollable?: boolean
	invalid?: boolean | string
	placeholder?: string
	size?: 'extra-small' | 'small' | 'medium'
}
