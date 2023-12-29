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

	it('it should be centered when center prop is true', () => {
		const { container } = render(Component, { props: { center: true } })
		const spinner = container.querySelector('.Spinner')
		expect(spinner).toBeTruthy()
		expect(spinner?.classList.contains('center')).toBe(true)
	})

	it('it should be inverted when inverse prop is true', () => {
		const { container } = render(Component, { props: { inverse: true } })
		const spinner = container.querySelector('.Spinner')
		expect(spinner).toBeTruthy()
		expect(spinner?.classList.contains('inverse')).toBe(true)
	})

	it('it should show the backdrop when backdrop prop is true', () => {
		const { container } = render(Component, { props: { backdrop: true } })
		const spinner = container.querySelector('.Spinner')
		expect(spinner).toBeTruthy()
		expect(spinner?.classList.contains('backdrop')).toBe(true)
	})

	it('it should change size when size prop is set', () => {
		const { container } = render(Component, { props: { size: 'lg' } })
		const spinner = container.querySelector('.Spinner')
		expect(spinner).toBeTruthy()
		expect(spinner?.classList.contains('size-lg')).toBe(true)
	})

	it('it should change speed when speed prop is set', () => {
		const { container } = render(Component, { props: { speed: 'fast' } })
		const spinner = container.querySelector('.Spinner')
		expect(spinner).toBeTruthy()
		expect(spinner?.classList.contains('speed-fast')).toBe(true)
	})

	it('it should be vertical when vertical prop is true', () => {
		const { container } = render(Component, { props: { vertical: true } })
		const spinner = container.querySelector('.Spinner')
		expect(spinner).toBeTruthy()
		expect(spinner?.classList.contains('vertical')).toBe(true)
	})
})
