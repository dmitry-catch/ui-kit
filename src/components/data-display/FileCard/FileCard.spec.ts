import { render } from '@testing-library/vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { composeStory } from '../../../../storybook/utils/composeStory.js'
import Spinner from '../../general/Spinner/Spinner.stories.js'
import Meta, { Default } from './FileCard.stories.js'

const Component = composeStory(Default, Meta)

describe(`Component ${Component.name}`, () => {
	it('should render', () => render(Component))
})

it('renders correctly with props', () => {
	const file = new File([''], 'file.txt', { type: 'text/plain' })
	const wrapper = mount(Default, {
		props: {
			file,
			variant: 'delete',
			loading: false
		}
	})
	expect(wrapper.find('.FileCard__extension').text()).toBe('txt')
	expect(wrapper.find('.FileCard__name').text()).toBe('file')
	expect(wrapper.find('.FileCard__size').text()).toBe('0.00 B')
})

it('emits "delete" event when delete button is clicked', () => {
	const file = new File([''], 'file.txt', { type: 'text/plain' })
	const wrapper = mount(Default, {
		props: {
			file,
			variant: 'delete',
			loading: false
		}
	})
	wrapper.find('.icon.functional').trigger('click')
	expect(wrapper.emitted('delete')).toBeTruthy()
})

it('emits "delete" event when delete button is clicked', () => {
	const file = new File([''], 'file.txt', { type: 'text/plain' })
	const wrapper = mount(Default, {
		props: {
			file,
			variant: 'delete',
			loading: false
		}
	})
	wrapper.find('.icon.functional').trigger('click')
	expect(wrapper.emitted('delete')).toBeTruthy()
})

it('emits "upload" event when upload button is clicked', () => {
	const file = new File([''], 'file.txt', { type: 'text/plain' })
	const wrapper = mount(Default, {
		props: {
			file,
			variant: 'upload',
			loading: false
		}
	})
	wrapper.find('.icon.functional').trigger('click')
	expect(wrapper.emitted('upload')).toBeTruthy()
})

it('displays spinner when loading is true', () => {
	const file = new File([''], 'file.txt', { type: 'text/plain' })
	const wrapper = mount(Default, {
		props: {
			file,
			variant: 'delete',
			loading: true
		}
	})
	expect(wrapper.findComponent(Spinner).exists()).toBeTruthy()
})
