import { render } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import { composeStory } from '../../../../storybook/utils/composeStory.js'

import Meta, { Default } from './ContentContainer.stories.js'

const Component = composeStory(Default, Meta)

describe(`Component ${Component.name}`, () => {
	it('should render', () => render(Component))

	it('renders slot content', () => {
		const { container } = render(Meta.component, {
			slots: {
				default: Meta.args.default
			}
		})
		const contentContainer = container.querySelector('.ContentContainer')
		expect(contentContainer?.textContent).toBe(Meta.args.default)
	})
})
