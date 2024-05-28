import { Meta, StoryObj } from '@storybook/vue3'
import Textarea from './Textarea.vue'

const sizes = ['extra-small', 'small', 'medium']
const resizableOptions = ['none', 'horizontal', 'vertical', 'both']
const wrapOptions = ['soft', 'hard', 'off']

export default {
	component: Textarea,
	args: {
		bordered: true,
		wrap: 'soft',
		size: 'medium',
		resizable: 'none',
		placeholder: 'Enter text here...',
		readonly: false,
		disabled: false,
		required: false,
		autofocus: false,
		maxlength: 100,
		tabindex: 0,
		cols: 100,
		rows: 1,
		form: '',
		name: 'textarea',
		transparent: false,
		showCounter: false
	},
	argTypes: {
		size: {
			control: 'select',
			options: sizes
		},
		resizable: {
			control: 'select',
			options: resizableOptions
		},
		wrap: {
			control: 'select',
			options: wrapOptions
		}
	}
} satisfies Meta<typeof Textarea>

type Story = StoryObj<typeof Textarea>

export const Default: Story = {}

export const Transparent: Story = {
	args: {
		transparent: true
	}
}

export const Borderless: Story = {
	args: {
		bordered: true
	}
}

export const WithoutPlaceholder: Story = {
	args: {
		placeholder: ''
	}
}

export const Resizable: Story = {
	args: {
		resizable: 'both'
	}
}

export const Autofocus: Story = {
	args: {
		autofocus: true
	}
}

export const Disabled: Story = {
	args: {
		disabled: true
	}
}

export const Readonly: Story = {
	args: {
		readonly: true
	}
}

export const WithMaxlength: Story = {
	args: {
		maxlength: 50,
		showCounter: true
	}
}

export const SmallSize: Story = {
	args: {
		size: 'small',
		maxlength: 25,
		showCounter: true
	}
}

export const ExtraSmallSize: Story = {
	args: {
		size: 'extra-small',
		maxlength: 10,
		showCounter: true
	}
}

export const CustomRowsCols: Story = {
	args: {
		rows: 5,
		cols: 10
	}
}
