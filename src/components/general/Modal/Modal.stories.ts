import { Meta, StoryObj } from '@storybook/vue3'
import Modal from './Modal.vue'

export default {
	component: Modal,
	args: {
		default: 'Press "Esc" to exit',
		anchor: 'center',
		//@ts-expect-error argument for wrapper
		show: false
	},
	argTypes: {
		anchor: {
			control: 'select',
			options: ['center', 'left', 'right', 'top', 'bottom']
		}
	},
	render: (args) => ({
		components: { Modal },
		setup: () => ({ args }),
		template: `
      <div>
        Set the <u>show</u> prop to true
        <Modal v-if="args.show" v-bind="args"> {{ args.default }}</Modal>
      </div>
    `
	})
} satisfies Meta<typeof Modal>

type Story = StoryObj<typeof Modal>

export const Default: Story = {}
