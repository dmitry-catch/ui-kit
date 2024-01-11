import { render } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import { composeStory } from '../../../../storybook/utils/composeStory.js'
import Spinner from '../../general/Spinner/Spinner.stories.js'
import Meta, { Default } from './FileCard.stories.js'

const Component = composeStory(Default, Meta)

describe(`Component ${Component.name}`, () => {
	it('it should render', () => render(Component))
})
