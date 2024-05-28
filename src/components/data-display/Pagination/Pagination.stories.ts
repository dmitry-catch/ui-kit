import { Meta, StoryObj } from '@storybook/vue3'
import Pagination from './Pagination.vue'

export default {
	component: Pagination,
	args: {
		modelValue: 1,
		totalElements: 100,
		pageSize: 10
	}
} satisfies Meta<typeof Pagination>

type Story = StoryObj<typeof Pagination>

export const Default: Story = {}

export const WithOnlyOnePage: Story = {
	args: {
		modelValue: 1,
		totalElements: 1,
		pageSize: 10
	}
}
