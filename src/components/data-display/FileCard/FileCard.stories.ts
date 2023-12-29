import { Meta, StoryObj } from '@storybook/vue3'
import FileCard from './FileCard.vue'

export default {
	component: FileCard,
	args: {
		file: {
			name: 'qwerty.1.xlsx',
			size: 1000000,
			lastModified: 1703494824575,
			type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
		}
	}
} satisfies Meta<typeof FileCard>

type Story = StoryObj<typeof FileCard>

export const Default: Story = {}
