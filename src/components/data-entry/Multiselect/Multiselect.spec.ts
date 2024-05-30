import { render } from '@testing-library/vue'
import { describe, expect, it, vi } from 'vitest'
import { composeStory } from '../../../../storybook/utils/composeStory.js'
import userEvent from '@testing-library/user-event'

import Meta, { Default, LazyMultiselect } from './Multiselect.stories.js'

const Component = composeStory(Default, Meta)

describe(`Component ${Component.name}`, () => {
	it('should render', () => render(Component))

	it('should trigger load then click on input', async () => {
		const spy = vi.fn()
		const { container } = render(Component, {
			props: {
				options: LazyMultiselect.args?.options,
				onLoad: spy
			}
		})
		const user = userEvent.setup()
		const input = container.querySelector('.Multiselect__innerContent')
		if (input) await user.click(input)
		expect(spy).toBeCalled()
	})

	it('should display spinner after click on input', async () => {
		const { container } = render(Component, {
			props: {
				options: LazyMultiselect.args?.options,
				onLoad: LazyMultiselect.args?.onLoad
			},
			slots: {
				loadMore: `I am slot`
			}
		})
		const user = userEvent.setup()
		const input = container.querySelector('.Multiselect__innerContent')
		if (input) await user.click(input)
		const spinner = container.querySelector('.Multiselect__loading')
		expect(spinner).toBeTruthy()
	})
})
