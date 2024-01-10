import { render, fireEvent, screen } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import { composeStory } from '../../../../storybook/utils/composeStory.js'

import Meta, { Default, WithHeader, WithControls, WithContent } from './Drawer.stories.js'

const Component = composeStory(Default, Meta)
const ComponentWithHeader = composeStory(WithHeader, Meta)
const ComponentWithControls = composeStory(WithControls, Meta)
const ComponentWithDefaults = composeStory(WithContent, Meta)
describe('Drawer', () => {
	it('should be rendered', () => render(Component))

	it('should render with default size', () => {
		const { container } = render(Component, { props: { open: true } })

		const closeButtonIcon = container.querySelector('.Icon')
		expect(closeButtonIcon).toBeTruthy()
	})

	it('should render with button', () => {
		const { container } = render(Component, { props: { open: true } })

		const drawer = container.querySelector('.Drawer__surface')
		expect(drawer?.getAttribute('size')).toBe('medium')
	})

	it('should display header slot', () => {
		const { container } = render(ComponentWithHeader, {
			props: {
				header: WithHeader?.args?.header
			}
		})
		const drawer = container.querySelector('.Drawer__header')
		expect(drawer?.textContent).eq(WithHeader?.args?.header)
	})
	it('should display controls slot', () => {
		const { container } = render(ComponentWithControls, {
			props: {
				header: WithControls?.args?.header
			}
		})
		const drawer = container.querySelector('.Drawer__controls')
		expect(drawer?.textContent).eq(WithControls?.args?.header)
	})

	it('should display default slot', () => {
		const { container } = render(ComponentWithDefaults, {
			props: {
				header: WithContent?.args?.default
			}
		})
		const drawer = container.querySelector('.Drawer__content')
		expect(drawer?.textContent).eq(WithContent?.args?.default)
	})

	it('should renders correctly when closed', () => {
		const { container } = render(Component, {
			props: {
				open: true
			}
		})
		// const button = screen.getByRole('button')
		const drawerSurface = container.querySelector('.Drawer__Surface')
		expect(drawerSurface).not.toBeNull()
		// fireEvent.click(button)
		// expect(drawerSurface).toBeNull()
	})
})
