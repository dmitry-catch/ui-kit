import { render } from '@testing-library/vue'
import { describe, it, expect, vi } from 'vitest'
import { composeStory } from '../../../../storybook/utils/composeStory.js'

import Meta, { Default, LazyItems, LazyGroups } from './DataList.stories.js'
import userEvent from '@testing-library/user-event'


const Component = composeStory(Default, Meta)

describe(`Component ${Component.name}`, () => {
	it('should render', () => render(Component))

	it('should have class if hover enable', () => {
		const { container } = render(Component, { props: { hover: true } })
		const item = container.querySelector('.DataList__item')
		expect(item?.classList.contains('DataList__item--hover')).toBeTruthy()
	})

	it('should displays spinner if loading state', () => {
		const { container } = render(Component, { props: { loading: true } })
		const spinner = container.querySelector('.DataList__loading')
		expect(spinner).toBeTruthy()
	})

	it('should display load more', () => {
		const { container } = render(Component)
		const loadMore = container.querySelector('.DataList__loadMore')
		expect(loadMore).toBeTruthy()
	})

	it('should display button slot', () => {
		const { getByText } = render(Meta.component, {
			props: {
				data: LazyItems.args?.data
			},
			slots: { loadMore: `I am slot` }
		})
		getByText('I am slot')
	})

	it('should display spinner after click on load button', async () => {
		const { getByRole, container } = render(Meta.component, {
			props: {
				data: LazyItems.args?.data,
				onLoad: LazyItems.args?.onLoad
			},
			slots: { loadMore: `<Button v-if="!context.completed && !context.loading" class="functional" @click="loadList(data)" >Загрузить еще</Button>
			<Spinner class="DataList__loading" v-else-if="context.loading" />` }
		})
		const user = userEvent.setup()
		await user.click(getByRole('button'))
		const spinner = container.querySelector('.DataList__loading')
		expect(spinner).toBeTruthy()
	})


	it('should trigger load then click on group', async () => {
		const spy = vi.fn()
		const { container } = render(Meta.component, {
			props: {
				data: LazyGroups.args?.data,
				onLoad: spy
			},
		})
		const user = userEvent.setup()
		const group = container.querySelector('.DataList__group')
		if (group) await user.click(group)
		expect(spy).toBeCalled()
	})

})
