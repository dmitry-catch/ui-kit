import { render } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import { composeStory } from '../../../../storybook/utils/composeStory.js'
import Meta, { Default } from './FileCard.stories.js'

const Component = composeStory(Default, Meta)

describe(`Component ${Component.name}`, () => {
	it('should render', () => render(Component))

	it('should render correctly with default variant', () => {
		const { container } = render(Component)
		const icon = container.querySelector('.Icon')
		expect(icon?.getAttribute('name')).toBe('upload')
	})

	it('should render correctly with delete variant', () => {
		const { container } = render(Component, { props: { variant: 'delete' } })
		const icon = container.querySelector('.Icon')
		expect(icon?.getAttribute('name')).toBe('delete')
	})
})
