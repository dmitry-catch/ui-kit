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

const createHeaderStory = (level: number, defaultText: string): Story => ({
	args: {
		level,
		default: defaultText
	}
})

export const Default_Header1 = createHeaderStory(1, 'I am header 1')

export const Header2 = createHeaderStory(2, 'I am header 2')
export const Header3 = createHeaderStory(3, 'I am header 3')
export const Header4 = createHeaderStory(4, 'I am header 4')
export const Header5 = createHeaderStory(5, 'I am header 5')
export const Header6 = createHeaderStory(6, 'I am header 6')
