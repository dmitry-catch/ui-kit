import { render } from '@testing-library/vue'
import { describe, it } from 'vitest'
import { composeStory } from '../../../../storybook/utils/composeStory.js'

import Meta, { Default_Header1 } from './Header.stories.js'

const Component = composeStory(Default_Header1, Meta)

describe(`Component ${Component.name}`, () => {
	it('should render', () => render(Component))
})
