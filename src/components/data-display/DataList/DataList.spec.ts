import { render } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import { composeStory } from '../../../../storybook/utils/composeStory.js'

import Meta, { Default } from './DataList.stories.js'

const Component = composeStory(Default, Meta)

describe(`Component ${Component.name}`, () => {
	it('should render', () => render(Component))

	it('should have class if hover enable', () => {
		const { container } = render(Component, { props: { hover: true } })
		const item = container.querySelector('.DataList__item')
		expect(item?.classList.contains('DataList__item--hover')).toBeTruthy()
	})

	it('should displays spinner if loading state', () => {
		const { container } = render(Component, { props: { loading: true } })
		const spinner = container.querySelector('.DataList__loading')
		expect(spinner).toBeTruthy()
	})
})
