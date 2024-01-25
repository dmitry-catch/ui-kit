import { Meta, StoryObj } from '@storybook/vue3'
import Tag from './Tag.vue'

const colors = [
	'accent',
	'warning',
	'danger',
	'info',
	'aspid-blue',
	'cornflower',
	'honeysuckle',
	'orange',
	'ohra',
	'tiffany',
	'secondary',
	'dark',
	'borderless',
	'gray'
]

const sizes = ['extra-small', 'small', 'medium', 'large', 'extra-large']
export default {
	component: Tag,
	args: {
		onOnClose: () => {},
		default: 'I am Tag',
		clossable: false,
		color: 'gray',
		size: 'medium',
		icon: ''
	},
	argTypes: {
		size: {
			controls: 'select',
			options: sizes
		},
		color: {
			control: 'select',
			options: colors
		}
	}
} satisfies Meta<typeof Tag>

type Story = StoryObj<typeof Tag>

export const Default: Story = {}

export const Clossable: Story = {
	args: {
		clossable: true
	}
}
export const WithIcon: Story = {
	args: {
		icon: 'fire'
	}
}
export const SizeVariants: Story = {
	render: (args) => ({
		components: { Tag },
		setup: () => ({ ...args, sizes }),
		template: `
			<div v-bind:style="{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }">
				<div
					v-bind:style="{ padding: '10px'}"
					v-for='size in sizes'
					:title='size'
				>
					<Tag color='dark' :size='size' >{{size}}</Tag>
				</div>
			</div>`
	})
}
export const ColorVariants: Story = {
	render: (args) => ({
		components: { Tag },
		setup: () => ({ ...args, colors }),
		template: `
			<div v-bind:style="{ display: 'flex', flexWrap: 'wrap' }">
				<div
					v-bind:style="{ padding: '10px'}"
					v-for='color in colors'
					:title='color'
				>
					<Tag clossable :color='color' icon='fire'>{{color}}</Tag>
				</div>
			</div>`
	})
}
