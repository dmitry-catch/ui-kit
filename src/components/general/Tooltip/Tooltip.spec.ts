import { render, fireEvent } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import { composeStory } from '../../../../storybook/utils/composeStory.js'

import Meta, { Default } from './Tooltip.stories.js'

const Component = composeStory(Default, Meta)

//TODO починить тесты
describe.todo(`Component ${Component.name}`, () => {
	it('it should be rendered', () => render(Component))

	describe.each(['bottom', 'top', 'right', 'left'])('Placement', (placement: string): void => {
		it('it should apply position correctly', () => {
			const { container } = render(Component, { props: { placement } })
			expect(container.querySelector(`.content`).getAttribute('placement')).toBe(placement)
		})

		it('it should display tooltip content on hover', async () => {
			const { getByTestId } = render(Component, { props: { placement } })
			fireEvent(getByTestId('trigger'), new MouseEvent('mouseover'))
			expect(getByTestId('content')).toBeTruthy()
		})

		it('it should hide tooltip content on mouseout', async () => {
			const { getByTestId } = render(Component, { props: { placement } })
			fireEvent(getByTestId('trigger'), new MouseEvent('mouseover'))
			fireEvent(getByTestId('trigger'), new MouseEvent('mouseout'))
			expect(getByTestId('content')).not.toBe()
		})

		it('it should not display tooltip content when disabled', async () => {
			const { queryByTestId } = render(Component, { props: { placement, disabled: true } })
			fireEvent(queryByTestId('trigger'), new MouseEvent('mouseover'))
			expect(queryByTestId('content')).toBeNull()
		})
	})
})
