export const sizeParameters = {
	medium: {
		TOGGLE_LINE_HEIGHT: 30,
		TOGGLE_WIDTH: 55,
		INDENT_VALUE: 4
	},
	small: {
		TOGGLE_LINE_HEIGHT: 24,
		TOGGLE_WIDTH: 44,
		INDENT_VALUE: 3
	},
	'extra-small': {
		TOGGLE_LINE_HEIGHT: 14,
		TOGGLE_WIDTH: 26,
		INDENT_VALUE: 2
	}
}

export type Size = keyof typeof sizeParameters
