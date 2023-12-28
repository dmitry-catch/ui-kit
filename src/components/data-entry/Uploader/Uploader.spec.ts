import { render } from '@testing-library/vue'
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { composeStory } from '../../../../storybook/utils/composeStory.js'

import Meta, { Default } from './Uploader.stories.js'

const Component = composeStory(Default, Meta)

describe(`Component ${Component.name}`, () => {
	it('should render', () => render(Component))
})
it('renders correctly with props', () => {
	const wrapper = mount(Default, {
		props: {
			modelValue: [],
			header: 'Test Header',
			hint: 'Test Hint',
			requirementsString: 'Test Requirements',
			draggable: false,
			invalid: true,
			loading: false,
			multiple: false,
			disabled: true,
			fileSizeLimit: 1024,
			length: 5,
			accept: '.pdf,.docx'
		}
	})
	expect(wrapper.find('.Uploader__header').text()).toBe('Test Header')
	expect(wrapper.find('.Uploader__hint').text()).toBe('Test Hint')
	expect(wrapper.find('.Uploader__requirements').text()).toBe('Test Requirements')
})

it('adds files to modelValue array when uploaded', async () => {
	const file1 = new File([''], 'file1.txt', { type: 'text/plain' })
	const file2 = new File([''], 'file2.txt', { type: 'text/plain' })
	const wrapper = mount(Default, {
		props: {
			modelValue: [],
			header: 'Test Header',
			hint: 'Test Hint',
			requirementsString: 'Test Requirements',
			draggable: false,
			invalid: true,
			loading: false,
			multiple: false,
			disabled: true,
			fileSizeLimit: 1024,
			length: 5,
			accept: '.pdf,.docx'
		}
	})
	await wrapper.trigger('update:modelValue', [file1])
	await wrapper.vm.$nextTick()
	expect(wrapper.vm.modelValue).toEqual([file1])
	await wrapper.trigger('update:modelValue', [file2])
	await wrapper.vm.$nextTick()
	expect(wrapper.vm.modelValue).toEqual([file1, file2])
})

it('removes correct file from modelValue array when deleteFile method is called', async () => {
	const file1 = new File([''], 'file1.txt', { type: 'text/plain' })
	const file2 = new File([''], 'file2.txt', { type: 'text/plain' })
	const wrapper = mount(Default, {
		props: {
			modelValue: [file1, file2],
			header: 'Test Header',
			hint: 'Test Hint',
			requirementsString: 'Test Requirements',
			draggable: false,
			invalid: true,
			loading: false,
			multiple: false,
			disabled: true,
			fileSizeLimit: 1024,
			length: 5,
			accept: '.pdf,.docx'
		}
	})
	await wrapper.vm.deleteFile(file1)
	await wrapper.vm.$nextTick()
	expect(wrapper.vm.modelValue).toEqual([file2])
})

it('adds files to modelValue array when dropped', async () => {
	const file1 = new File([''], 'file1.txt', { type: 'text/plain' })
	const file2 = new File([''], 'file2.txt', { type: 'text/plain' })
	const dropEvent = new DragEvent('drop', { dataTransfer: { files: [file1, file2] } })
	const wrapper = mount(Default, {
		props: {
			modelValue: [],
			header: 'Test Header',
			hint: 'Test Hint',
			requirementsString: 'Test Requirements',
			draggable: false,
			invalid: true,
			loading: false,
			multiple: false,
			disabled: true,
			fileSizeLimit: 1024,
			length: 5,
			accept: '.pdf,.docx'
		}
	})
	await wrapper.find('.Uploader__dropzone').trigger('drop', dropEvent)
	await wrapper.vm.$nextTick()
	expect(wrapper.vm.modelValue).toEqual([file1, file2])
})
