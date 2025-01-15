import { fireEvent, render } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { composeStory } from '../../../../storybook/utils/composeStory.js'

import Meta, { Default } from './InputNumber.stories.js'

const Component = composeStory(Default, Meta)

describe(`Component ${Component.name}`, () => {
	it('should render', () => render(Component))

	it('should allow digits to be inputted', async () => {
		const { getByRole } = render(Component)
		const user = userEvent.setup()
		const input = getByRole('spinbutton')

		await user.type(input, '123')
		expect(input.value).eq('123')

		await user.type(input, 'notNumber')
		expect(input.value).not.eq('notNumber')
	})

	it('should render arrows if arrowEnabled is true', () => {
		const { container } = render(Component, { props: { arrowed: true } })
		const arrowsContainer = container.querySelector('.InputNumber__arrows')
		expect(arrowsContainer).toBeTruthy()
	})

	it('should not render arrows if arrowEnabled is false', () => {
		const { container } = render(Component, { props: { arrowed: false } })
		const arrowsContainer = container.querySelector('.InputNumber__arrows')
		expect(arrowsContainer).toBeFalsy()
	})

	it('should have class if invalid true', () => {
		const { container } = render(Component, { props: { invalid: true } })
		const inputNumber = container.querySelector('.InputNumber')
		expect(inputNumber).toBeTruthy()
		expect(inputNumber?.classList.contains('InputNumber--invalid')).toBe(true)
	})

	it('should not have class if invalid false', () => {
		const { container } = render(Component, { props: { invalid: false } })
		const inputNumber = container.querySelector('.InputNumber')
		expect(inputNumber).toBeTruthy()
		expect(inputNumber?.classList.contains('InputNumber--invalid')).toBe(false)
	})
})
