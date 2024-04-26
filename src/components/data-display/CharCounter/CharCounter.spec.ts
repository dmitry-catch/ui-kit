import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import { composeStory } from '../../../../storybook/utils/composeStory.js'

import Meta, { Default } from './CharCounter.stories.js'

const DefaultComponent = composeStory(Default, Meta)

describe(`Component ${DefaultComponent.name}`, () => {
	it('should render', () => {
		const { container } = render(DefaultComponent)
		expect(container).toBeInTheDocument()
	})

	it('displays the current and max values correctly', () => {
		render(DefaultComponent, {
			props: {
				current: 1,
				max: 10
			}
		})
		expect(screen.getByText('1 / 10')).toBeInTheDocument()
	})

	it('does not show negative max values', () => {
		render(DefaultComponent, {
			props: {
				current: 1,
				max: -10
			}
		})
		expect(screen.getByText('1 / 0')).toBeInTheDocument()
	})

	it('handles zero max appropriately', () => {
		render(DefaultComponent, {
			props: {
				current: 0,
				max: 0
			}
		})
		expect(screen.getByText('0 / 0')).toBeInTheDocument()
	})

	it('applies the danger class when current exceeds max', () => {
		render(DefaultComponent, {
			props: {
				current: 10,
				max: 0
			}
		})
		const charCounter = screen.getByText('10 / 0')
		expect(charCounter).toBeInTheDocument()
		expect(charCounter).toHaveClass('danger')
	})

	it('does not apply the danger class when current does not exceed max', () => {
		render(DefaultComponent, {
			props: {
				current: 0,
				max: 10
			}
		})
		const charCounter = screen.getByText('0 / 10')
		expect(charCounter).toBeInTheDocument()
		expect(charCounter).not.toHaveClass('danger')
	})
})
