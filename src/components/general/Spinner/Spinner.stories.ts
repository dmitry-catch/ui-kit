import { Meta, StoryObj } from '@storybook/vue3'
import Spinner from './Spinner.vue'

export default {
	component: Spinner,
	render: (args) => ({
		args: {},
		components: { Spinner },
		setup: () => ({ args }),
		template: `
      <div>
        <Spinner /> 
      </div>
    `
	})
} satisfies Meta<typeof Spinner>

type Story = StoryObj<typeof Spinner>

export const Default: Story = {}
