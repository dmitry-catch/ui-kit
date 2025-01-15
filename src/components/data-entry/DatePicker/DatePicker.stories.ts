import { Meta, StoryObj } from '@storybook/vue3'
import DatePicker from './DatePicker.vue'

export default {
	component: DatePicker,
	args: {
		label: '',
		disabled: false,
		required: false,
		hint: '',
		description: '',
		invalid: false,
		autofocus: false,
		modelValue: undefined
	}
} satisfies Meta<typeof DatePicker>

type Story = StoryObj<typeof DatePicker>

export const Default: Story = {}

export const Slotted: Story = {
	args: {
		before: 'Before',
		after: 'After'
	}
}
