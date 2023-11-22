import { Meta, StoryObj } from '@storybook/vue3'
import DateRangePicker from './DateRangePicker.vue'

export default {
	component: DateRangePicker,
	args: {
		disabled: false,
		required: false,
		invalid: false,
		hint: '',
		label: '',
		description: '',
		value: '',
		from: new Date().toDateString(),
		to: new Date(new Date().setMonth(new Date().getMonth() + 8)).toDateString()
	}
} satisfies Meta<typeof DateRangePicker>

type Story = StoryObj<typeof DateRangePicker>

export const Default: Story = {}
