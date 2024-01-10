import { Meta, StoryObj } from '@storybook/vue3'
import Drawer from './Drawer.vue'
import { Button } from '../../../main'

export default {
	component: Drawer,
	args: { open: false, autoFocus: false, backdrop: false, keyboard: false, placement: 'right', size: 'md' },
	argTypes: {
		placement: {
			control: 'select',
			options: ['right', 'center', 'left']
		},
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg']
		}
	},
	render: (args) => ({
		args: args,
		components: { Drawer, Button },
		setup: () => ({ args }),
		template: `
      <div>
        <Button @click="()=>args.open = !args.open">Click here to open the drawer!</Button>
        <Drawer v-bind='args' @onClose='()=>args.open = !args.open'></Drawer>
      </div>
    `
	})
} satisfies Meta<typeof Drawer>

type Story = StoryObj<typeof Drawer>

export const Default: Story = {}
