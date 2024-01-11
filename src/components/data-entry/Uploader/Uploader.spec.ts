import { render, fireEvent, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { composeStory } from '../../../../storybook/utils/composeStory.js'

import Meta, { Default, ErrorSlot } from './Uploader.stories.js'
const file1 = new File(['file1'], 'file1.txt', { type: 'text/plain' })
const file2 = new File(['file2'], 'file2.jpg', { type: 'img/jpg' })
const header = 'Test Header'
const accept = 'pdf'
const Component = composeStory(Default, Meta)
const ErrorSlottedComponent = composeStory(ErrorSlot, Meta)

describe(`Component ${Component.name}`, () => {
	it('should render', () => render(Component))

	it('should renders correctly with non-default props', () => {
		const { container, getByText } = render(Component, {
			props: {
				header: header,
				invalid: true,
				draggable: true
			}
		})

		const headerElement = getByText(header)
		const buttonElement = getByText('Выбрать файл')
		const uploaderContent = container.querySelector('.Uploader__content')
		expect(headerElement.textContent).toBe(header)
		expect(uploaderContent?.classList?.contains('invalid')).toBeTruthy()
	})

	it('should adds files to when uploaded', async () => {
		const { getByTestId } = render(Meta.component, {
			props: {
				modelValue: [],
				draggable: true
			}
		})
		const fileInput: HTMLInputElement = getByTestId('main')
		await userEvent.upload(fileInput, file1)
		expect(fileInput?.files).not.toBeNull()
		expect(fileInput?.files[0]).toEqual(file1)
	})

	it("shouldn't adds files when disabled", async () => {
		const { getByTestId } = render(Meta.component, {
			props: {
				modelValue: [],
				disabled: true
			}
		})
		const fileInput: HTMLInputElement = getByTestId('main')
		await userEvent.upload(fileInput, file1)
		expect(fileInput?.files?.length).toEqual(0)
	})

	it("shouldn't accept files when file type not in accept", async () => {
		const { getByTestId, getByText } = render(Meta.component, {
			props: {
				modelValue: [],
				accept: accept,
				draggable: true
			}
		})
		const fileInput: HTMLInputElement = getByTestId('main')
		const uploadButton = getByText('Выбрать файл')
		await fireEvent.click(uploadButton)
		await userEvent.upload(fileInput, file2)
		expect(fileInput?.files?.length).toEqual(0)
		screen.debug()
		const errorMessage = screen.getByText('Загрузите файл одного из этих форматов: pdf')
		expect(errorMessage).not.toBeNull()
	})
})
