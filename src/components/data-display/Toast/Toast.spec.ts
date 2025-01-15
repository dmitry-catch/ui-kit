import { render } from '@testing-library/vue'
import { describe, expect, it, vi } from 'vitest'
import { composeStory } from '../../../../storybook/utils/composeStory.js'

import Meta, { Default } from './Toast.stories.js'
import { userEvent as user } from '@testing-library/user-event'

const Component = composeStory(Default, Meta)

describe(`Component ${Component.name}`, () => {
	it('should render', () => render(Component))

	it('should render with defaults', () => {
		const { container } = render(Component)
		const toast = container.querySelector('.Toast')
		expect(toast).toBeTruthy()
		expect(toast?.textContent).toBe('message success')
		expect(toast?.classList.contains('success')).toBeTruthy()
	})

	it('should change class when toast variant different', () => {
		const { container } = render(Component, {
			props: { type: 'warning', message: 'message' }
		})
		const toast = container.querySelector('.Toast')
		expect(toast).toBeTruthy()
		expect(toast?.classList.contains('warning')).toBeTruthy()
	})

	it('should call close action on close button click', async () => {
		const spy = vi.fn()
		const { getByRole } = render(Component, {
			props: { type: 'warning', message: 'message', onClose: spy }
		})

		const button = getByRole('button')
		if (button) {
			await user.click(button)
		}
		expect(spy).toBeCalled()
	})
})
