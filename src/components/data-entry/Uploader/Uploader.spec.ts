import { render } from '@testing-library/vue'
import { userEvent as user } from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { composeStory } from '../../../../storybook/utils/composeStory.js'

import Meta, { Default } from './Uploader.stories.js'

const filePDF = new File([new ArrayBuffer(4 * 1024 ** 2)], 'file1.pdf', { type: 'PDF/A' })
const fileJPG = new File([new ArrayBuffer(10 * 1024 ** 2)], 'file2.jpg', { type: 'img/jpg' })
const header = 'Test Header'
const pdfAccepted = 'pdf'
const Component = composeStory(Default, Meta)

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
		const fileInput: HTMLInputElement = getByTestId('fileInput')
		await user.upload(fileInput, filePDF, { applyAccept: false })
		expect(fileInput.files).not.toBeNull()
		expect(fileInput.files[0]).toEqual(filePDF)
	})

	it("shouldn't adds files when disabled", async () => {
		const { getByTestId } = render(Meta.component, {
			props: {
				modelValue: [],
				disabled: true
			}
		})
		const fileInput: HTMLInputElement = getByTestId('fileInput')
		await user.upload(fileInput, filePDF)
		expect(fileInput?.files?.length).toEqual(0)
	})

	it("shouldn't accept files when file type not in accept", async () => {
		const { container, getByTestId, getByText } = render(Component, {
			props: {
				modelValue: [],
				accept: pdfAccepted,
				draggable: true
			}
		})
		const fileInput: HTMLInputElement = getByTestId('fileInput')
		const uploadButton = getByText('Выбрать файл')
		await user.click(uploadButton)
		await user.upload(fileInput, [fileJPG])
		const errorMessage = container.querySelector('.hint')
		expect(errorMessage).not.toBeNull()
	})

	it("shouldn't accept files when file type not in file limit size range", async () => {
		const { container, getByTestId, getByText } = render(Component, {
			props: {
				modelValue: [],
				fileSizeLimit: 1024 ** 2 * 5,
				draggable: true
			}
		})
		const fileInput: HTMLInputElement = getByTestId('fileInput')
		const uploadButton = getByText('Выбрать файл')
		await user.click(uploadButton)
		await user.upload(fileInput, fileJPG)
		const errorMessage = container.querySelector('.hint')
		expect(errorMessage).not.toBeNull()
	})
})
