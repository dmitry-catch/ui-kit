import { Meta, StoryObj } from '@storybook/vue3'
import Tooltip from './Tooltip.vue'
import Button from '../Button/Button.vue'

export default {
	component: Tooltip,
	args: {
		open: false,
		arrowed: true,
		placement: 'top',
		delay: 50,
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
      <div :style="{width: '400px', height: '500px', border: '1px solid gray', display: 'flex',
	   flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }">
		<Tooltip v-model="args.open" v-bind="args"> 
            <template #tooltip>Tooltip dasd as das dsa dsad asdssdds</template>
            <Button class="accent">Button</Button>
        </Tooltip>
      </div>
    `
	})
} satisfies Meta<typeof Tooltip>

type Story = StoryObj<typeof Tooltip>

export const Default: Story = {}
