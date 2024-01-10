import { Meta, StoryObj } from '@storybook/vue3'
import InputNumber from './InputNumber.vue'

export default {
	component: InputNumber,
	args: {
		modelValue: 0,
		step: 1,
		disabled: false,
		readonly: false,
		invalid: false,
		placeholder: '',
		size: 'medium',
		enabledArrows: false,
		scrollable: false
	},
	argTypes: {
		size: {
			control: 'select',
			options: ['small', 'medium', 'extra-small']
		}
	}
} satisfies Meta<typeof InputNumber>

type Story = StoryObj<typeof InputNumber>

export const Default: Story = {}

export const Prefix: Story = {
	args: {
		prefix: '$'
	}
}

export const Postfix: Story = {
	args: {
		postfix: '+'
	}
}

export const Invalid: Story = {
	args: {
		invalid: true
	}
}

export const InvalidWithDescription: Story = {
	args: {
		invalid: 'Wrong value!'
	}
}

/**
 * Появляется возможность изменять значение с помощью `scroll`'а
 */
export const Scrollable: Story = {
	args: {
		scrollable: true
	}
}

export const EnabledArrows: Story = {
	args: {
		enabledArrows: true
	}
}

export const Disabled: Story = {
	args: {
		disabled: true
	}
}

/**
 * При установке свойства `step` задается шаг.
 */
export const Step: Story = {
	args: {
		step: 5
	}
}

/**
 * Минимально возможное значение `-14`
 */
export const Min: Story = {
	args: {
		min: -14
	}
}

/**
 * Максимально возможное значение `88`
 */
export const Max: Story = {
	args: {
		max: 88
	}
}

export const SmallSize: Story = {
	args: {
		size: 'small'
	}
}

export const ExtraSmallSize: Story = {
	args: {
		size: 'extra-small'
	}
}
