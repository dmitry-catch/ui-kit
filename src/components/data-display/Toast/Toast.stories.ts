import { Meta, StoryObj } from '@storybook/vue3'
import Toast from './Toast.vue'

const toastVariants = [
	{ type: 'success', message: 'message success', id: 1 },
	{ type: 'warning', message: 'message warning', id: 2 },
	{ type: 'error', message: 'message error', id: 3 },
	{ type: 'info', message: 'message info', id: 4 }
]

export default {
	component: Toast,
	args: {
		onClose: (notification) => console.log('Close action ' + notification.id),
		id: toastVariants[0].id,
		message: toastVariants[0].message,
		type: toastVariants[0].type
	}
} satisfies Meta<typeof Tag>

type Story = StoryObj<typeof Tag>

export const Default: Story = {}

export const Variants: Story = {
	render: (args) => ({
		components: { Toast },
		setup: () => ({ ...args, toastVariants }),
		template: `
			<div v-bind:style="{ display: 'flex', flexWrap: 'wrap' }">
				<div
					:style="{ padding: '10px'}"
					v-for='toast in toastVariants'
					:title='toast'
				>
					<Toast v-bind="toast" @close="(id) => console.log('Close action ' + id)"/>
				</div>
			</div>`
	})
}
