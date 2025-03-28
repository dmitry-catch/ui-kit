import { Meta, StoryObj } from '@storybook/vue3'
import Tooltip from './Tooltip.vue'
import Button from '../Button/Button.vue'

export default {
	component: Tooltip,
	args: {
		open: true,
		arrowed: true,
		placement: 'top',
		delay: 50,
		className: null,
		disabled: false
	},
	argTypes: {
		placement: {
			control: 'select',
			options: ['left', 'right', 'top', 'bottom']
		}
	},
	render: (args) => ({
		components: { Tooltip, Button },
		setup: () => ({ args }),
		template: `
      <div :style="{width: '400px', height: '100px', border: '1px solid gray', display: 'flex',
	   flexDirection: 'row', justifyContent: 'space-between', position: 'relative',
	    alignItems: 'center', overflow: 'hidden'}">
        <Tooltip v-model="args.open" v-bind="args" > 
            <template #tooltip>Tooltip</template>
            <Button class="accent">Button</Button>
        </Tooltip>
		        <Tooltip v-model="args.open" v-bind="args" > 
            <template #tooltip>Tooltip</template>
            <Button class="accent">Button</Button>
        </Tooltip>
      </div>
    `
	})
} satisfies Meta<typeof Tooltip>

type Story = StoryObj<typeof Tooltip>

export const Default: Story = {}
