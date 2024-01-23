import { Meta, StoryObj } from '@storybook/vue3'
import FileCard from './FileCard.vue'

const mockFile = (name: string, type: string, size: number): File => {
	const file = new File([''], name)
	Object.defineProperty(file, 'size', { value: size })
	return file
}

export default {
	component: FileCard,
	args: {
		/**1024 - байт в кб и кб в мб, а 10 - итоговое количество мегабайт */
		file: mockFile('qwerty12.12.1212.xlsx', 'xlsx', 1024 ** 2 * 10)
	}
} satisfies Meta<typeof FileCard>

type Story = StoryObj<typeof FileCard>

export const Default: Story = {}
