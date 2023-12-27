import { render } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import { composeStory } from '../../../../storybook/utils/composeStory.js'

import Meta, { Default } from './Modal.stories.js'

const Component = composeStory(Default, Meta)

describe(`Component ${Component.name}`, () => {
	it('should render', () => render(Component))

	describe.each(['center', 'left'])('Anchor class', (anchor: string): void => {
		it('applies correct anchor class', () => {
			const { container } = render(Component, { props: { anchor } })
			expect(container.querySelector(`.Modal--anchor-${anchor}`)).toBeTruthy()
		})
	})
})
