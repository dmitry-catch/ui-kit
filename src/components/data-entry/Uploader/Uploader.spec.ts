import { render, fireEvent, screen, waitFor } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { composeStory } from '../../../../storybook/utils/composeStory.js'

import Meta, { Default } from './Uploader.stories.js'
const file1 = new File(['file1'], 'file1.txt', { type: 'text/plain' })
const file2 = new File(['file2'], 'file2.txt', { type: 'text/plain' })
const header = 'Test Header'
const accept = '.pdf, .docx'
const Component = composeStory(Default, Meta)

describe(`Component ${Component.name}`, () => {
	it('should render', () => render(Component))

	it('should renders correctly with props', () => {
		const { getByText } = render(Component, {
			props: {
				header: header,
				invalid: true,
				disabled: true,
				accept: accept,
				draggable: true
			}
		})

		const headerElement = getByText(header)
		expect(headerElement.textContent).toBe(header)
	})

	it('should adds files to modelValue array when uploaded', async () => {
		const { getByTestId } = render(Component, {
			props: {
				modelValue: [],
				header: header,
				draggable: true,
				invalid: true,
				loading: false,
				multiple: false,
				disabled: true,
				fileSizeLimit: 1024,
				length: 5,
				accept: accept
			}
		})
		const fileInput = getByTestId('main')
		await fireEvent.change(fileInput, { target: { files: [file1, file2] } })
		expect(fileInput.files.length).toBe(2)
	})
})
