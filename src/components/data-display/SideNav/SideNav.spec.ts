import { render } from '@testing-library/vue'
import { describe, it } from 'vitest'
import { composeStory } from '../../../../storybook/utils/composeStory.js'

import Meta, { Default } from './SideNav.stories.js'

const Component = composeStory(Default, Meta)

describe(`Component ${Component.name}`, () => {
	it('should render', () => render(Component))
	it('should display items', () => {
		const { getByText } = render(Component, {
			props: { isCollapsed: true }
		})
		getByText('<span>Item 1</span> <span>Item 2</span>')
	})
})
