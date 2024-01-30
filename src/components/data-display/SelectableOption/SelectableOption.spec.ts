import { render } from '@testing-library/vue'
import { describe, it } from 'vitest'

import { composeStory } from '@storybook/testing-vue3'
import Meta, { Default } from './SelectableOption.stories.js'

const Component = composeStory(Default, Meta)

describe(`Component ${Component.name}`, () => {
	it('should render', () => render(Component))
})
