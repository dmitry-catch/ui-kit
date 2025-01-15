import { Meta, StoryObj } from '@storybook/vue3'
import Header from './Header.vue'

export default {
	component: Header,
	args: {
		level: 1,
		default: 'I am header 1'
	}
} satisfies Meta<typeof Header>

type Story = StoryObj<typeof Header>

export const Default_Header1: Story = {}

export const Header2: Story = {
	args: {
		level: 2,
		default: 'I am header 2'
	}
}
export const Header3: Story = {
	args: {
		level: 3,
		default: 'I am header 3'
	}
}
export const Header4: Story = {
	args: {
		level: 4,
		default: 'I am header 4'
	}
}
export const Header5: Story = {
	args: {
		level: 5,
		default: 'I am header 5'
	}
}
export const Header6: Story = {
	args: {
		level: 6,
		default: 'I am header 6'
	}
}
