import { render } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import { composeStory } from '../../../../storybook/utils/composeStory.js'

import Meta, { Default } from './Surface.stories.js'

const Component = composeStory(Default, Meta)

describe(`Component ${Component.name}`, () => {
	it('it should be rendered', () => render(Component))

	it('it should display surface content by slot', () => {
		const { container } = render(Meta.component, {
			slots: {
				default: Meta.args.default
			}
		})
		const surface = container.querySelector('.Surface')
		expect(surface?.textContent).toBe(Meta.args.default)
	})
})
