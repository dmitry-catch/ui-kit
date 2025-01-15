import { render } from '@testing-library/vue'
import { describe, it } from 'vitest'
import { composeStory } from '../../../../storybook/utils/composeStory.js'

import Meta, { Default } from './Pagination.stories.js'

const Component = composeStory(Default, Meta)

describe(`Component ${Component.name}`, () => {
	it('should render', () => render(Component))

	it('should show no buttons if there is only one page', () => {
		const { container } = render(Meta.component, {
			props: {
				modelValue: 1,
				pageSize: 10,
				totalElements: 10
			}
		})
		const buttons = container.querySelectorAll('.Btn')
		expect(buttons.length).toBe(0)
	})

	it('should show buttons if there are more than one page', () => {
		const { container } = render(Meta.component, {
			props: {
				modelValue: 1,
				pageSize: 10,
				totalElements: 30
			}
		})
		const buttons = container.querySelectorAll('.Btn')
		// 3 button for the 1,2,3 pages and 4 buttons for the previous, next, start, end
		expect(buttons.length).toBe(3 + 4)
	})
})
