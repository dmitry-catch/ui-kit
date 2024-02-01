import { Meta, StoryObj } from '@storybook/vue3'
import SelectableOption from './SelectableOption.vue'

export default {
	component: SelectableOption,
	args: {
		selected: false,
		option: { name: 'Option', value: 1 }
	}
} satisfies Meta<typeof SelectableOption>

type Story = StoryObj<typeof SelectableOption>

export const Default: Story = {}
