import { render } from '@testing-library/vue'
import { describe, it } from 'vitest'

import { composeStory } from '../../../../storybook/utils/composeStory.js'
import Meta, { Default } from './VersionPopup.stories'

const Component = composeStory(Default, Meta)

describe(`Component ${Component.name}`, () => {
	it('should render', () => render(Component))
})
