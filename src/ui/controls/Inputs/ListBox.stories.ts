import { Meta, StoryObj } from '@storybook/vue3'
import ListBox from './ListBox.vue'
import { action } from '@storybook/addon-actions'

export default {
	component: ListBox,
	args: {
		modelValue: [1],
		options: [{
			name: 'Option 1',
			value: 1,
			action(e: any) {
				action('On option click')(e)
				alert(`Clicked by ${e.data.name}`)
			}
		}, {
			name: 'Option 2',
			value: 2,
			action(e: any) {
				action('On option click')(e)
				alert(`Clicked by ${e.data.name}`)
			}
		}, {
			name: 'Option 3',
			value: 3,
			action(e: any) {
				action('On option click')(e)
				alert(`Clicked by ${e.data.name}`)
			}
		}]
	}
} satisfies Meta<typeof ListBox>

type Story = StoryObj<typeof ListBox>;

export const Default: Story = {}