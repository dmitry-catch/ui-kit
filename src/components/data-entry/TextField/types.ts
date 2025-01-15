export interface TextFieldProps {
	autofocus?: boolean
	required?: boolean
	invalid?: boolean
	readonly?: boolean
	label?: string
	description?: string
	minLength?: number
	/** Добавляет счетчик символов. */
	maxLength?: number
	min?: number
	max?: number
	placeholder?: string
	tabindex?: '0' | '1' | 0 | 1
	modelValue: string
}
