import { render } from '@testing-library/vue'
import { describe, it, expect, vi } from 'vitest'
import { composeStory } from '../../../../storybook/utils/composeStory.js'
import { userEvent as user } from '@testing-library/user-event'

import Meta, { Default } from './Textarea.stories.js'

const Component = composeStory(Default, Meta)

describe(`Component ${Component.name}`, () => {
	it('it should render', () => {
		const { container } = render(Component)
		expect(container).toBeTruthy()
	})

	it('it should add current class if props is set', () => {
		const { container } = render(Component, {
			props: {
				transparent: true
			}
		})
		const textarea = container.querySelector('textarea')
		expect(textarea).toBeTruthy()
		expect(textarea?.classList).not.toContain('borderless')
		expect(textarea?.classList).toContain('transparent')
	})

	it('it should display CharCounter when showCounter is set', () => {
		const { container } = render(Component, {
			props: { showCounter: true }
		})
		const charCounter = container.querySelector('.CharCounter')
		expect(charCounter).toBeTruthy()
	})

	it('it should count char correct', async () => {
		const { container } = render(Component, {
			props: { showCounter: true, maxlength: 20 }
		})
		const charCounter = container.querySelector('.CharCounter')
		expect(charCounter).toBeTruthy()
		const textarea = container.querySelector('textarea')
		expect(textarea).toBeTruthy()
		if (textarea) {
			await user.type(textarea, 'Test')
			expect(charCounter?.textContent).toBe('4 / 20')
		}
	})

	it('it should remove input event listener on unmount', () => {
		const { container, unmount } = render(Component)
		const textarea = container.querySelector('textarea')

		const addEventListenerSpy = vi.spyOn(textarea as HTMLTextAreaElement, 'addEventListener')
		const removeEventListenerSpy = vi.spyOn(textarea as HTMLTextAreaElement, 'removeEventListener')

		unmount()

		expect(removeEventListenerSpy).toHaveBeenCalledWith('input', expect.any(Function))
		addEventListenerSpy.mockRestore()
		removeEventListenerSpy.mockRestore()
	})

	it('it should apply correct size classes', () => {
		const { container } = render(Component, { props: { size: 'small' } })
		const textarea = container.querySelector('textarea')
		expect(textarea).toBeTruthy()
		expect(textarea?.classList).toContain('text-small')
	})

	it('it should allow change value usually', async () => {
		const { container } = render(Component)
		const textarea = container.querySelector('textarea')
		expect(textarea).toBeTruthy()
		if (textarea) {
			await user.type(textarea, 'Test')
			expect(textarea.value).toBe('Test')
		}
	})

	it('it should not allow change value if disabled state', async () => {
		const { container } = render(Component, { props: { disabled: true } })
		const textarea = container.querySelector('textarea')
		expect(textarea).toBeTruthy()
		if (textarea) {
			await user.type(textarea, 'Test')
			expect(textarea.value).not.toBe('Test')
		}
	})

	it('it should not allow change value if readonly state', async () => {
		const { container } = render(Component, { props: { readonly: true } })
		const textarea = container.querySelector('textarea')
		expect(textarea).toBeTruthy()
		if (textarea) {
			await user.type(textarea, 'Test')
			expect(textarea.value).not.toBe('Test')
		}
	})
})
