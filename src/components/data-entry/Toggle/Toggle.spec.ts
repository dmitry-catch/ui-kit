import { render } from '@testing-library/vue'
import { describe, expect, it, vi } from 'vitest'
import { userEvent as user } from '@testing-library/user-event'

import Toggle from './Toggle.vue'

describe('Toggle Component', () => {
	it('it should render', () => {
		const { container } = render(Toggle)
		const toggleContainer = container.querySelector('.Toggle__wrapper')
		expect(toggleContainer).toBeTruthy()
	})

	it('it should render control with default aria-checked value', () => {
		const { container } = render(Toggle)
		const toggleControl = container.querySelector('input')
		expect(toggleControl).toBeTruthy()
		expect(toggleControl?.getAttribute('aria-checked')).toBe('false')
	})

	it('it should update modelValue on click', async () => {
		const { container } = render(Toggle, {
			props: {
				modelValue: false
			}
		})
		const toggleContainer = container.querySelector('.Toggle__wrapper')
		if (toggleContainer) {
			await user.click(toggleContainer)
		}
		const toggleControl = container.querySelector('input')
		expect(toggleControl?.checked).toBe(true)
	})

	it('it should not update modelValue when disabled', async () => {
		const { container } = render(Toggle, {
			props: {
				modelValue: false,
				disabled: true
			}
		})
		const toggleContainer = container.querySelector('.Toggle__wrapper')
		if (toggleContainer) {
			await user.click(toggleContainer)
		}
		const toggleControl = container.querySelector('input')
		expect(toggleControl?.checked).toBe(false)
	})

	it('it should emit click event on click', async () => {
		const clickSpy = vi.fn()
		const { container } = render(Toggle, {
			props: {
				modelValue: false,
				'onUpdate:modelValue': () => {}
			},
			attrs: {
				onClick: clickSpy
			}
		})
		const toggle = container.querySelector('.Toggle')
		if (toggle) {
			await user.click(toggle)
		}
		expect(clickSpy).toBeCalled()
	})
})
