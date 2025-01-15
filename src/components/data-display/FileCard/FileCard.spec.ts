import { nextTick } from 'vue'
import { render, screen } from '@testing-library/vue'
import { describe, expect, it, vi } from 'vitest'
import { composeStory } from '../../../../storybook/utils/composeStory.js'
import Meta, { Default, FileData } from './FileCard.stories.js'
import { extractFileNameAndExtension } from '../../../utils/extractFileNameAndExtension'
import { userEvent as user } from '@testing-library/user-event'

const Component = composeStory(Default, Meta)
const FileDataComponent = composeStory(FileData, Meta)

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

	it('should display extension and name of the file', async () => {
		const { getByText } = render(Component, { props: { file: Meta.args.file } })
		await nextTick
		const { extension, fileName } = extractFileNameAndExtension(Meta.args.file.name)
		getByText(extension)
		getByText(fileName)
	})

	it('should call delete action on delete button click', async () => {
		const spy = vi.fn()
		const { getByRole } = render(Component, { props: { onDelete: spy } })

		const button = getByRole('button')
		if (button) {
			await user.click(button)
		}
		expect(spy).toBeCalled()
	})

	it('should call upload action on upload button click', async () => {
		const spy = vi.fn()
		const { getByRole } = render(Component, { props: { variant: 'upload', onUpload: spy } })

		const button = getByRole('button')
		if (button) {
			await user.click(button)
		}
		expect(spy).toBeCalled()
	})
})
