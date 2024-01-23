import { render } from '@testing-library/vue'
import { describe, expect, it, vi } from 'vitest'
import { composeStory } from '../../../../storybook/utils/composeStory.js'

import Meta, { Default } from './Tag.stories.js'
import { userEvent as user } from '@testing-library/user-event'

const Component = composeStory(Default, Meta)

describe(`Component ${Component.name}`, () => {
	it('should render', () => render(Component))

	it('should render with defaults', () => {
		const { container } = render(Component)
		const tag = container.querySelector('.Tag')
		expect(tag).toBeTruthy()
		expect(tag?.textContent).toBe('I am Tag')
		expect(tag?.getAttribute('size')).toBe('medium')
		expect(tag?.getAttribute('clossable')).toBe(null)
		expect(tag?.getAttribute('color')).toBe('gray')
	})

	it('should change style when color value is accent', () => {
		const { container } = render(Component, { props: { color: 'accent' } })
		const tag = container.querySelector('.Tag')
		expect(tag).toBeTruthy()
		expect(tag?.getAttribute('color')).toBe('accent')
	})

	it('should have large size when size is set to large', () => {
		const { container } = render(Component, { props: { size: 'large' } })
		const tag = container.querySelector('.Tag')
		expect(tag).toBeTruthy()
		expect(tag?.getAttribute('size')).toBe('large')
	})

	it('should call close action on close button click', async () => {
		const spy = vi.fn()
		const { getByRole } = render(Component, { props: { clossable: true, onOnClose: spy } })

		const button = getByRole('button')
		if (button) {
			await user.click(button)
		}
		expect(spy).toBeCalled()
	})
})
