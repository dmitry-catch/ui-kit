import { Meta, StoryObj } from '@storybook/vue3'
import Uploader from './Uploader.vue'

export default {
	component: Uploader,
	args: {
		modelValue: [],
		isInvalid: false,
		disabled: false,
		multiple: true,
		isLoading: false,
		requirementsString: 'Прикрепите файлы форматов doc, docx, zip, xls, xlsx, pdf',
		length: 3
	},
	argTypes: {},
	render: (args) => ({
		components: { Uploader },
		setup: () => ({ args }),
		template: `
      <div>
        <Uploader v-model="args.files" v-bind='args'/>
      </div>
    `
	})
} satisfies Meta<typeof Uploader>

type Story = StoryObj<typeof Uploader>

export const Default: Story = {}
