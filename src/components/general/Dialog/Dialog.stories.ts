import { Meta, StoryObj } from '@storybook/vue3'
import Dialog from './Dialog.vue'
import { useDialogProvider } from './utils'

export default {
	component: Dialog,
	args: {},
	argTypes: {},
	render: (args) => ({
		components: { Dialog },
		setup: () => ({ args }),
		template: `
      <div>
        Set the <u>show</u> prop to true
        <Dialog v-if="args.show" v-bind="args"> {{ args.default }}</Dilaog>
      </div>
    `
	})
} satisfies Meta<typeof Dialog>

type Story = StoryObj<typeof Dialog>

export const Default: Story = {}
