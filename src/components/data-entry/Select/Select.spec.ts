import { render, screen } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'

import { composeStory } from '../../../../storybook/utils/composeStory.js'

import Meta, { Default } from './Select.stories.js'
import user from '@testing-library/user-event'

const textProps = {
	label: 'Label',
	hint: 'hint',
	placeholder: 'placeholder',
	search: 'input'
}

const extendedOptions = [
	{ name: 'Option 1', value: 1 },
	{ name: 'Option 2', value: 2 },
	{ name: 'Option 3', value: 3 },
	{ name: 'Option 4', value: 4 },
	{ name: 'Option 5', value: 5 },
	{ name: 'Option 6', value: 6 },
	{ name: 'Option 7', value: 7 },
	{ name: 'Option 8', value: 8 },
	{ name: 'Option 9', value: 9 },
	{ name: 'Option 10', value: 10 },
	{ name: 'Option 111', value: 11 }
]

const defaultProps = {
	modelValue: null,
	search: 'input',
	size: 'medium',
	options: [
		{ name: 'Option 1', value: 1 },
		{ name: 'Option 2', value: 2 },
		{ name: 'Option 3', value: 3 }
	],
	disabled: false,
	invalid: false,
	required: false,
	loading: false,
	hint: '',
	label: '',
	icon: '',
	placeholder: ''
}

const invalidCase = { invalidString: 'invalid message', invalidTrue: true, invalidFalse: false }

const Component = composeStory(Default, Meta)

describe(`Component ${Component.name}`, () => {
	it('should render', () => render(Component))

	it('should render label, placeholder and hint', async () => {
		const { getByText, getByPlaceholderText } = render(Component, { props: textProps })
		getByText(textProps.label)
		getByText(textProps.hint)
		getByPlaceholderText(textProps.placeholder)
	})

	it('should hide hint and show invalid message when invalid type of string', async () => {
		const { getByText, queryByText } = render(Component, {
			props: { hint: textProps.hint, invalid: invalidCase.invalidString }
		})
		getByText(invalidCase.invalidString)
		expect(queryByText(textProps.hint)).toBeNull()
	})
	it('should have hint when invalid true', async () => {
		const { getByText } = render(Component, {
			props: { hint: textProps.hint, invalid: invalidCase.invalidTrue }
		})
		getByText(textProps.hint)
	})
	it('should have asterisk when required with label', async () => {
		const { getByText } = render(Component, {
			props: { required: true, label: textProps.label }
		})
		getByText('*')
	})
	it('should open menu after userClick', async () => {
		const { getByText, getByRole } = render(Component, {
			props: { ...defaultProps, search: 'auto' }
		})
		const button = getByRole('button')
		await user.click(button)
		getByText(defaultProps.options[0].name)
	})
	it('should not open menu when disabled', async () => {
		const { queryByText, getByRole } = render(Component, {
			props: { ...defaultProps, disabled: true, search: 'auto' }
		})
		const button = getByRole('button')
		await user.click(button)
		expect(queryByText(defaultProps.options[0].name)).toBeNull()
	})

	it('should have popup search with search auto, if length of options more then 10', async () => {
		const { container, getByRole } = render(Component, {
			props: { ...defaultProps, options: extendedOptions, search: 'auto' }
		})
		const button = getByRole('button')
		await user.click(button)
		expect(container.querySelector('input')).not.toBeNull()
	})

	it('should not have popup search with search auto, if length of options less then 10', async () => {
		const { container, getByRole } = render(Component, {
			props: { ...defaultProps, search: 'auto' }
		})
		const button = getByRole('button')
		await user.click(button)
		expect(container.querySelector('input')).toBeNull()
	})

	it('should not open menu while loading', async () => {
		const { container, queryByText, getByRole } = render(Component, {
			props: { ...defaultProps, loading: true, search: 'auto' }
		})
		const button = getByRole('button')
		await user.click(button)
		expect(queryByText(defaultProps.options[0].name)).toBeNull()

		const content = container.querySelector('.Select__content')
		await user.click(content)
		expect(queryByText(defaultProps.options[0].name)).toBeNull()
	})

	it('should change value on choosing', async () => {
		const { queryByText, getByRole, getByText } = render(Component, {
			props: { ...defaultProps, search: 'auto' }
		})
		const button = getByRole('button')
		await user.click(button)
		const option = getByText(defaultProps.options[0].name)
		await user.click(option)
		// expect menu to close
		expect(queryByText(defaultProps.options[1].name)).toBeNull()
		// expect choosen text still be on the screen
		expect(queryByText(defaultProps.options[0].name)).toBeNull()
	})

	it('should have working search', async () => {
		const { container, queryByText } = render(Component, {
			props: { ...defaultProps, options: extendedOptions }
		})
		const search = container.querySelector('input')
		await user.click(search)
		await user.keyboard('1')
		expect(queryByText(extendedOptions[0].name)).not.toBeNull()
		expect(queryByText(extendedOptions[9].name)).not.toBeNull()
		expect(queryByText(extendedOptions[10].name)).not.toBeNull()
	})
})
