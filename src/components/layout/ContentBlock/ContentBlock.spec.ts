import { render } from '@testing-library/vue'
import { describe, it } from 'vitest'
import { composeStory } from '@storybook/testing-vue3'

import Meta, { Default } from './ContentBlock.stories.js'

const Component = composeStory(Default, Meta)

describe(`Component ${Meta.component.__name}`, () => {
	it('should render', () => render(Component()))
})

it('should display default slot', () => {
	const { debug } = render(Component())
	//const buttonElement1 = screen.getByText('Button')
	debug()
})
