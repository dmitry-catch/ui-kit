import { Size } from './sizeParameters.js'

export interface ToggleProps {
	modelValue?: boolean
	/** Не доступен для изменения */
	disabled?: boolean
	/** Занимает всю доступную ширину */
	block?: boolean
	/** Контент, если тоггл включен */
	checkedChildren?: string
	/** Контент, если тоггл выключен */
	unCheckedChildren?: string
	/** Иконки в качестве контента */
	iconChildren?: boolean
	/** Размер */
	size?: Size
}
