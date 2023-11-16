import { Meta, StoryObj } from '@storybook/vue3'
import Modal from './Modal.vue'

export default {
	component: Modal,
	args: {
		default: 'I am content',
		anchor: 'center',
		show: false,
	},
	argTypes: {
		anchor: {
			control: 'select',
			options: ['center', 'left', 'right', 'top' , 'bottom']
		}
	},
	render: (args) => ({
		components: { Modal },
		setup: () => ({ args }),
		template: `<Modal v-if='args.show' v-bind="args"> {{args.default}} </Modal>`
	}),
} satisfies Meta<typeof Modal>

type Story = StoryObj<typeof Modal>;

export const Default: Story = {}