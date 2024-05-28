import { Size } from './sizeParameters.js'

export interface ToggleProps {
	modelValue?: boolean
	/** Не доступен для изменения */
	disabled?: boolean
	/** Занимает всю доступную ширину */
	block?: boolean
	/** Размер */
	size?: Size
}
