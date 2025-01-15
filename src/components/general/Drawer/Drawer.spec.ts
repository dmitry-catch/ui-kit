import { render } from '@testing-library/vue'
import { describe, it, expect, vi } from 'vitest'
import { composeStory } from '../../../../storybook/utils/composeStory.js'
import Meta, { Default, WithHeader, WithFooter, WithContent } from './Drawer.stories.js'
import { userEvent as user } from '@testing-library/user-event'

const Component = composeStory(Default, Meta)

describe('Drawer', () => {
	it('should be rendered', () => render(Component))

	it('should have a close button', () => {
		const { container } = render(Component, { props: { open: true } })

		const closeButtonIcon = container.querySelector('.Icon')
		expect(closeButtonIcon).toBeTruthy()

		const drawer = container.querySelector('.Drawer__surface')
		expect(drawer?.getAttribute('size')).toBe('medium')
	})

	it('should display header slot', () => {
		const { getByText } = render(Meta.component, {
			props: {
				open: true
			},
			slots: { header: WithHeader.args?.header }
		})
		getByText(String(WithHeader.args?.header))
	})
	it('should display footer slot', () => {
		const { getByText } = render(Meta.component, {
			props: {
				open: true
			},
			slots: {
				footer: WithFooter?.args?.footer
			}
		})
		getByText(WithFooter?.args?.footer)
	})

	it('should display default slot', () => {
		const { getByText } = render(Meta.component, {
			props: {
				open: true
			},
			slots: { default: WithContent.args?.default }
		})
		getByText(WithContent.args?.default)
	})

	it('should renders correctly when close action called', async () => {
		const spy = vi.fn()
		const { container } = render(Meta.component, {
			props: {
				open: true,
				onClose: spy
			}
		})

		const button = container.querySelector('.Btn__actual')
		const drawerSurface = container.querySelector('.Drawer__surface')
		expect(drawerSurface).not.toBeNull()
		if (button) {
			await user.click(button)
		}
		expect(spy).toBeCalled()
	})
})
