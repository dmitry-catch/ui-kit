import { render, screen } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'

import Meta, { Default } from './Button.stories.js'
import { composeStory } from '../../../../storybook/utils/composeStory.js'

const Component = composeStory(Default, Meta)

describe(`Component ${Component.name}`, () => {
	it('should render', () => render(Component))

	it('should display default slot', () => {
		render(Meta.component, {
			props: {
				disabled: true
			},
			slots: {
				default: Meta.args.default
			}
		})
		const buttonElement = screen.getByRole('button')
		expect(buttonElement.textContent).eq(Meta.args.default)
	})

	it('should have class if block prop is true', async () => {
		const { rerender } = render(Meta.component, {
			props: {
				block: false
			}
		})

		const buttonElement = screen.getByRole('button')
		expect(buttonElement?.classList.contains('block')).toBeFalsy()

		await rerender({
			block: true
		})

		expect(buttonElement?.classList.contains('block')).toBeTruthy()
	})
})
