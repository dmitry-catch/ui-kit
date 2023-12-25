import { Meta, StoryObj } from '@storybook/vue3'
import Uploader from './Uploader.vue'

export default {
	component: Uploader,
	args: {
		files: [],
		isInvalid: false,
		disabled: false,
		requirementsString: 'Прикрепите файлы форматов doc, docx, zip, xls, xlsx, pdf'
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
