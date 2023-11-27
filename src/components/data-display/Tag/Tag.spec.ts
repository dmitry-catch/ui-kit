import { render } from '@testing-library/vue'
import { describe, it } from 'vitest'
import { composeStory } from '@storybook/testing-vue3'

import Meta, { Default } from './Tag.stories.js'

const Component = composeStory(Default, Meta)

describe(`Component ${Meta.component.__name}`, () => {
	it('should render', () => render(Component()))
})
