import { render, screen } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import { composeStory } from '@storybook/testing-vue3'

import Meta, { Default } from './Button.stories.js'

const Component = composeStory(Default, Meta)

describe(`Component ${Meta.component.__name}`, () => {
	describe(`Component ${Meta.component.__name}`, () => {
		it('should render', () => render(Component()))
	})

	it('should display default slot', () => {
		render(Meta.component, {
			slots: {
				default: Meta.args.default
			}
		})
		const buttonElement = screen.getByRole('button')
		expect(buttonElement.textContent).eq(Meta.args.default)
	})
})
