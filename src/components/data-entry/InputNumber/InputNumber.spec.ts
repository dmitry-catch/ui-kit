import { fireEvent, render } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import { composeStory } from '../../../../storybook/utils/composeStory.js'

import Meta, { Default } from './InputNumber.stories.js'

const Component = composeStory(Default, Meta)

describe(`Component ${Component.name}`, () => {
	it('should render', () => render(Component))

	it('should allow digits to be inputted', () => {
		const { container } = render(Component)
		const input = container.querySelector('input')
		if (input) {
			fireEvent.change(input, { target: { value: 'notNumber' } })
		}
		expect(input?.value).eq('')

		if (input) {
			fireEvent.change(input, { target: { value: '123' } })
		}
		expect(input?.value).eq('123')
	})

	it('should render arrows if arrowEnabled is true', () => {
		const { container } = render(Component, { props: { enabledArrows: true } })
		const arrowsContainer = container.querySelector('.InputNumber__arrows')
		expect(arrowsContainer).toBeTruthy()
	})

	it('should not render arrows if arrowEnabled is false', () => {
		const { container } = render(Component, { props: { enabledArrows: false } })
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
