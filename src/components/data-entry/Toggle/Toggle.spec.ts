import { render } from '@testing-library/vue'
import { describe, expect, it, vi } from 'vitest'
import { userEvent as user } from '@testing-library/user-event'

import Toggle from './Toggle.vue'

describe('Toggle Component', () => {
	it('it should render', () => {
		const { container } = render(Toggle)
		const toggle = container.querySelector('.Toggle')
		expect(toggle).toBeTruthy()
	})

	it('it should render with default aria-checked value', () => {
		const { container } = render(Toggle)
		const toggle = container.querySelector('.Toggle')
		expect(toggle).toBeTruthy()
		expect(toggle?.getAttribute('aria-checked')).toBe('false')
	})

	it('it should update modelValue on click', async () => {
		const spy = vi.fn()
		const { container } = render(Toggle, {
			props: {
				modelValue: false,
				'onUpdate:modelValue': spy
			}
		})
		const toggle = container.querySelector('.Toggle')
		if (toggle) {
			await user.click(toggle)
		}
		expect(spy).toBeCalledWith(true)
	})

	it('it should not update modelValue when disabled', async () => {
		const spy = vi.fn()
		const { container } = render(Toggle, {
			props: {
				modelValue: false,
				'onUpdate:modelValue': spy,
				disabled: true
			}
		})
		const toggle = container.querySelector('.Toggle')
		if (toggle) {
			await user.click(toggle)
		}
		expect(spy).not.toBeCalled()
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
