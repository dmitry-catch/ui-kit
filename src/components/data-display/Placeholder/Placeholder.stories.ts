import { Meta, StoryObj } from '@storybook/vue3'
import Placeholder from './Placeholder.vue'
import Surface from '../../layout/Surface/Surface.vue'

export default {
	component: Placeholder,
	args: {
		header: 'Header',
		description: 'Some description text...',
		icon: 'bulb',
		empty: false
	},
	argTypes: {
		size: {
			control: 'select',
			options: ['small', 'medium']
		}
	}
} satisfies Meta<typeof Placeholder>

type Story = StoryObj<typeof Placeholder>

export const Default: Story = {
	render: (args) => ({
		components: { Placeholder, Surface },
		setup() {
			return { args }
		},
		template: `
		<Surface :style="{height: '400px', width: '300px', position: 'relative'}">
			<Placeholder v-bind="args" />
		</Surface>
	  `
	})
}

export const SmallSize: Story = {
	args: {
		size: 'small'
	},
	render: (args) => ({
		components: { Placeholder, Surface },
		setup() {
			return { args }
		},
		template: `
		<Surface :style="{height: '400px', width: '300px', position: 'relative'}">
			<Placeholder v-bind="args" />
		</Surface>
	  `
	})
}

export const Empty: Story = {
	args: {
		empty: true
	},
	render: (args) => ({
		components: { Placeholder, Surface },
		setup() {
			return { args }
		},
		template: `
		<Surface :style="{height: '400px', width: '300px', position: 'relative'}">
			<Placeholder v-bind="args" />
		</Surface>
	  `
	})
}
