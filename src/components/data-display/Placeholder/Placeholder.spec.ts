import { render } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import { composeStory } from '../../../../storybook/utils/composeStory.js'

import Meta, { Default } from './Placeholder.stories.js'

const Component = composeStory(Default, Meta)

describe(`Component ${Component.name}`, () => {
	it('it should render', () => render(Component))

	it('it should render', () => {
		const { container } = render(Component)
		expect(container).toBeTruthy()
	})

	it('it should render with defaults', () => {
		const { container } = render(Component)
		const placeholder = container.querySelector('.Placeholder')
		expect(placeholder).toBeTruthy()
		expect(placeholder?.getAttribute('size')).toBe('medium')
	})

	it('it should render icon', () => {
		const { container } = render(Component)
		const icon = container.querySelector('.Icon')
		expect(icon).toBeTruthy()
	})

	it('it should render header and description if provided', () => {
		const { getByText } = render(Component, { props: { header: 'Test Header', description: 'Test Description' } })
		expect(getByText('Test Header')).toBeTruthy()
		expect(getByText('Test Description')).toBeTruthy()
	})

	it('it should render small size correctly', () => {
		const { container } = render(Component, { props: { size: 'small' } })
		const placeholder = container.querySelector('.Placeholder')
		expect(placeholder).toBeTruthy()
		expect(placeholder?.getAttribute('size')).toBe('small')
	})

	it('it should render empty state correctly', () => {
		const { container } = render(Component, { props: { empty: true } })
		const emptyDiv = container.querySelector('.empty')
		expect(emptyDiv).toBeTruthy()
	})
})
