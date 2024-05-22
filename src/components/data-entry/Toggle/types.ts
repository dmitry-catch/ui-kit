import { Size } from './sizeParameters.js'

export interface ToggleProps {
	modelValue?: boolean
	disabled?: boolean
	fullWidth?: boolean
	checkedChildren?: string
	unCheckedChildren?: string
	iconChildren?: boolean
	size?: Size
}
