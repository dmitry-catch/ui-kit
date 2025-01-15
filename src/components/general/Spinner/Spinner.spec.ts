import { render } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import { composeStory } from '../../../../storybook/utils/composeStory.js'

import Meta, { Default } from './Spinner.stories.js'

const Component = composeStory(Default, Meta)

describe(`Component ${Component.name}`, () => {
	it('should be rendered', () => render(Component))

	it('should render with default variant', () => {
		const { container } = render(Component)
		const spinner = container.querySelector('.Spinner')
		const spinnerWheel = container.querySelector('.Spinner__wheel')
		expect(spinner).toBeTruthy()
		expect(spinnerWheel?.getAttribute('variant')).toBe('light')
	})

	it('should change style when variant value is dark', () => {
		const { container } = render(Component, { props: { variant: 'dark' } })
		const spinner = container.querySelector('.Spinner')
		const spinnerWheel = container.querySelector('.Spinner__wheel')
		expect(spinner).toBeTruthy()
		expect(spinnerWheel?.getAttribute('variant')).toBe('dark')
	})

	it('should be centered when center prop is true', () => {
		const { container } = render(Component, { props: { center: true } })
		const spinner = container.querySelector('.Spinner')
		expect(spinner).toBeTruthy()
		expect(spinner?.classList.contains('center')).toBe(true)
	})

	it('should be inverted when inverse prop is true', () => {
		const { container } = render(Component, { props: { inverse: true } })
		const spinner = container.querySelector('.Spinner')
		const spinnerWheel = container.querySelector('.Spinner__wheel')
		expect(spinner).toBeTruthy()
		expect(spinnerWheel?.classList.contains('inverse')).toBe(true)
	})

	it('should show the backdrop when backdrop prop is true', () => {
		const { container } = render(Component, { props: { backdrop: true } })
		const spinner = container.querySelector('.Spinner')
		expect(spinner).toBeTruthy()
		expect(spinner?.classList.contains('backdrop')).toBe(true)
	})

	it('should change size when size prop is set', () => {
		const { container } = render(Component, { props: { size: 'large' } })
		const spinner = container.querySelector('.Spinner__wheel')
		expect(spinner).toBeTruthy()
		expect(spinner?.getAttribute('size')).toBe('large')
	})

	it('should change speed when speed prop is set', () => {
		const { container } = render(Component, { props: { speed: 'fast' } })
		const spinner = container.querySelector('.Spinner__wheel')
		expect(spinner).toBeTruthy()
		expect(spinner?.getAttribute('speed')).toBe('fast')
	})

	it('should be vertical when vertical prop is true', () => {
		const { container } = render(Component, { props: { vertical: true } })
		const spinner = container.querySelector('.Spinner')
		expect(spinner).toBeTruthy()
		expect(spinner?.classList.contains('vertical')).toBe(true)
	})
})
