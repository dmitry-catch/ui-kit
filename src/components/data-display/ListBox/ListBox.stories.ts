import { Meta, StoryObj } from '@storybook/vue3'
import ListBox from './ListBox.vue'
import { OptionList } from 'storybook/consts.js'

export default {
	component: ListBox,
	args: {
		modelValue: [1],
		options: OptionList
	}
} satisfies Meta<typeof ListBox>

type Story = StoryObj<typeof ListBox>

export const Default: Story = {}
