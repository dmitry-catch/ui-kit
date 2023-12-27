import { render } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import { composeStory } from '../../../../storybook/utils/composeStory.js'

import Meta, { Default } from './Spinner.stories.js'

const Component = composeStory(Default, Meta)

describe(`Component ${Component.name}`, () => {
	it('it should be rendered', () => render(Component))

	it('it should render with default variant', () => {
		const { container } = render(Component)
		const spinner = container.querySelector('.Spinner')
		expect(spinner).toBeTruthy()
		expect(spinner?.getAttribute('variant')).toBe('light')
	})

	it('it should change style when variant value is dark', () => {
		const { container } = render(Component, { props: { variant: 'dark' } })
		const spinner = container.querySelector('.Spinner')
		expect(spinner).toBeTruthy()
		expect(spinner?.getAttribute('variant')).toBe('dark')
	})
})
