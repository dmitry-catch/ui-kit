import { Meta, StoryObj } from '@storybook/vue3'
import Uploader from './Uploader.vue'

export default {
	component: Uploader,
	args: {
		isInvalid: false,
		hint: ''
	},
	argTypes: {},
	render: (args) => ({
		components: { Uploader },
		setup: () => ({ args }),
		template: `
      <div>
        <Uploader v-bind='args'/>
      </div>
    `
	})
} satisfies Meta<typeof Uploader>

type Story = StoryObj<typeof Uploader>

export const Default: Story = {}
