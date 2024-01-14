import { render } from '@testing-library/vue'
import { describe, expect, it, vi } from 'vitest'
import { composeStory } from '../../../../storybook/utils/composeStory.js'
import Meta, { Default } from './FileCard.stories.js'
import { extractFileNameAndExtension } from '../../../utils/extractFileNameAndExtension'
import userEvent from '@testing-library/user-event'

const Component = composeStory(Default, Meta)

describe(`Component ${Component.name}`, () => {
	it('should render', () => render(Component))

	it('should render correctly with default variant', () => {
		const { container } = render(Component)
		const button = container.querySelector('.FileCard__deleteBtn')
		expect(button).not.toBeNull()
	})

	it('should render correctly with upload variant', () => {
		const { container } = render(Component, { props: { variant: 'upload' } })
		const button = container.querySelector('.FileCard__deleteBtn')
		expect(button).toBeNull()
	})

	it('should display extension and name of the file', () => {
		const { getByText } = render(Component, { props: { file: Meta.args.file } })
		const { extension, fileName } = extractFileNameAndExtension(Meta.args.file.name)
		const extensionElement = getByText(extension)
		const nameElement = getByText(fileName)
		expect(extensionElement).toBeTruthy()
		expect(nameElement).toBeTruthy()
	})

	it('should call delete action on delete button click', async () => {
		const spy = vi.fn()
		const { container } = render(Component, { props: { onDelete: spy } })

		const button = container.querySelector('.Btn__actual')
		if (button) {
			await userEvent.click(button)
		}
		expect(spy).toBeCalled()
	})

	it('should call upload action on upload button click', async () => {
		const spy = vi.fn()
		const { container } = render(Component, { props: { variant: 'upload', onUpload: spy } })

		const button = container.querySelector('.Btn__actual')
		if (button) {
			await userEvent.click(button)
		}
		expect(spy).toBeCalled()
	})
})
