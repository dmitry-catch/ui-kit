import { render } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach } from 'vitest'
import { composeStory } from '../../../../storybook/utils/composeStory.js'

import Meta, { Default } from './Dropdown.stories.js'
import { DropdownItemType } from './types.js'

const Component = composeStory(Default, Meta)

describe(`Component ${Component.name}`, () => {
	it('should render', () => render(Component))

	it('should display menu after toggle click', async () => {
		const { getByRole, container } = render(Component)
		const user = userEvent.setup()
		const dropdownToggle = getByRole('button')

		await user.click(dropdownToggle)

		const dropdownMenu = container.querySelector('.Dropdown__menu')

		expect(dropdownMenu).toBeTruthy()
	})

	it('should close menu after pressing Escape', async () => {
		const { getByRole, container } = render(Component)
		const user = userEvent.setup()
		const dropdownToggle = getByRole('button')

		await user.click(dropdownToggle)

		let dropdownMenu = container.querySelector('.Dropdown__menu')
		expect(dropdownMenu).toBeTruthy()

		await userEvent.keyboard('[Escape]')

		dropdownMenu = container.querySelector('.Dropdown__menu')
		expect(dropdownMenu).toBeFalsy()
	})

	it('should close menu after pressing dropdown item', async () => {
		const { getByRole, container } = render(Component)
		const user = userEvent.setup()
		const dropdownToggle = getByRole('button')

		await user.click(dropdownToggle)

		let dropdownMenu = container.querySelector('.Dropdown__menu')
		const dropdownItem = container.querySelector('.Dropdown__contentItem')

		if (dropdownItem) await user.click(dropdownItem)

		dropdownMenu = container.querySelector('.Dropdown__menu')
		expect(dropdownMenu).toBeFalsy()
	})
})
