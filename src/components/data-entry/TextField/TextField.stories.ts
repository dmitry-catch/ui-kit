import { Meta, StoryObj } from '@storybook/vue3'
import TextField from './TextField.vue'

export default {
	args: {
		autofocus: false,
		required: false,
		invalid: false,
		readonly: false,
		label: '',
		description: '',
		modelValue: 'Hello'
	},
	argTypes: {
		tabindex: {
			options: ['0', '1', 0, 1, null]
		}
	},
	component: TextField
} satisfies Meta<typeof TextField>

type Story = StoryObj<typeof TextField>

export const Default: Story = {}

export const Min: Story = {
	args: {
		min: 4
	}
}

export const Max: Story = {
	args: {
		max: 5
	}
}

export const MinLength: Story = {
	args: {
		minLength: 5
	}
}

/**
 * При установке свойства `maxLength` появляется счетчик символов.
 */
export const MaxLength: Story = {
	args: {
		maxLength: 5
	}
}

export const TabIndex: Story = {
	args: {
		tabindex: 1
	}
}
