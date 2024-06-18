import { render } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import { composeStory } from '../../../../storybook/utils/composeStory.js'

import Meta, { Default } from './Sidenav.stories.js'
import userEvent from '@testing-library/user-event'

const Component = composeStory(Default, Meta)

describe(`Component ${Component.name}`, () => {
	it('should render', () => render(Component))
	it('should collapse', () => {
		const { container } = render(Component, { props: { collapsed: true } })
		const item = container.querySelector('.NavigationMenu__title__text')
		expect(item).toBeFalsy()
	})
	it('should change color', async () => {
		const { container } = render(Component, { props: { collapsed: false } })
		const item = container.querySelector('.Item')
		const user = userEvent.setup()
		if (item) {
			await user.click(item)
		}
		const activeItem = container.querySelectorAll('.Item.active')
		expect(activeItem).toBeTruthy()
	})
	it('should open menu', async () => {
		const { container } = render(Component, { props: { collapsed: false } })
		const item = container.querySelector('.NavigationMenu')
		const user = userEvent.setup()
		if (item) {
			await user.click(item)
		}
		const activeItem = container.querySelectorAll('.Menu__subitems')
		expect(activeItem).toBeTruthy()
	})
	it('should hide element', () => {
		const { container } = render(Component, {
			props: { collapsed: false, hide: ['1'] },
			slots: {
				default: `<SidenavItem id="1">Item 1</SidenavItem>`
			}
		})
		const item = container.querySelector('.Item')
		expect(item).toBeFalsy()
	})
})
