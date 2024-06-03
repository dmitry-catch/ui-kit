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
		maxlength: 1000,
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
		maxlength: 50,
		showCounter: true
	}
}

/** Размер `extra-small` */
export const ExtraSmallSize: Story = {
	args: {
		size: 'extra-small',
		maxlength: 10,
		showCounter: true
	}
}

/** Размер `small` */
export const SmallSize: Story = {
	args: {
		size: 'small',
		maxlength: 25,
		showCounter: true
	}
}

/** Кастомная настройка ширины и высоты поля `textarea`  */
export const CustomRowsCols: Story = {
	args: {
		rows: 5,
		cols: 10
	}
}
