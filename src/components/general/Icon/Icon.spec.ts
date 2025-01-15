import { render } from '@testing-library/vue'
import { describe, it } from 'vitest'

import Meta, { Default } from './Icon.stories.js'
import { composeStory } from '../../../../storybook/utils/composeStory.js'

const Component = composeStory(Default, Meta)

describe(`Component ${Component.name}`, () => {
	it('should render', () => render(Component))
})
