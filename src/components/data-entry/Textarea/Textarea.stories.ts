import { Meta, StoryObj } from '@storybook/vue3'
import Textarea from './Textarea.vue'

const sizes = ['extra-small', 'small', 'medium']
const resizableOptions = ['horizontal', 'vertical', 'both']

export default {
	component: Textarea,
	args: {
		bordered: true,
		size: 'medium',
		placeholder: 'Enter text here...',
		readonly: false,
		disabled: false,
		required: false,
		autofocus: false,
		maxLength: 1000,
		minLength: 0,
		minRows: 1,
		maxRows: 7,
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
		}
	}
} satisfies Meta<typeof Textarea>

type Story = StoryObj<typeof Textarea>

export const Default: Story = {}

/** Прозрачный фон */
export const Transparent: Story = {
	args: {
		transparent: true
	}
}

/** Без рамки */
export const Borderless: Story = {
	args: {
		bordered: false
	}
}

/** Без `placeholder`'а */
export const WithoutPlaceholder: Story = {
	args: {
		placeholder: ''
	}
}

/** С возможностью растягивания поля */
export const Resizable: Story = {
	args: {
		resizable: 'both'
	}
}

/** Фокус в textarea по умолчанию */
export const Autofocus: Story = {
	args: {
		autofocus: true
	}
}

/** Блокирует доступ и изменение `textarea` */
export const Disabled: Story = {
	args: {
		disabled: true
	}
}

/** Только просмотр */
export const Readonly: Story = {
	args: {
		readonly: true
	}
}

/** Добавляет счетчик символов и задает ограничение `max` символов */
export const WithMaxlength: Story = {
	args: {
		maxLength: 50,
		showCounter: true
	}
}

/** Размер `extra-small` */
export const ExtraSmallSize: Story = {
	args: {
		size: 'extra-small',
		maxLength: 10,
		showCounter: true
	}
}

/** Размер `small` */
export const SmallSize: Story = {
	args: {
		size: 'small',
		maxLength: 25,
		showCounter: true
	}
}

/** Кастомная настройка высоты поля `textarea`  */
export const CustomRows: Story = {
	args: {
		minRows: 2,
		maxRows: 3
	}
}
