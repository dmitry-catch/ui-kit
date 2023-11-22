import { Meta, StoryObj } from '@storybook/vue3'
import Checkbox from './Checkbox.vue'

export default {
	component: Checkbox,
	args: {
		modelValue: false
	}
} satisfies Meta<typeof Checkbox>

type Story = StoryObj<typeof Checkbox>

export const Default: Story = {}

export const Labeled: Story = {
	args: {
		default: 'Label'
	}
}
