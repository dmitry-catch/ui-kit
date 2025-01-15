import { render, screen } from '@testing-library/vue'
import { describe, expect, it, vi } from 'vitest'

import user from '@testing-library/user-event'

import Meta, { Default } from './Dialog.stories.js'
import { composeStory } from '../../../../storybook/utils/composeStory.js'
import { dialogContext } from '../../../utils/dialogContext.js'

const Component = composeStory(Default, Meta)

describe(`Component ${Component.name}`, () => {
	it('should render', async () => {
		render(Component, {
			global: {
				provide: {
					[dialogContext]: {
						state: {
							header: 'Header',
							content: 'Content',
							buttons: [],
							onClose: () => {}
						}
					}
				}
			}
		})
	}),
		it('should trigger onClose callback', async () => {
			const spy = vi.fn()
			render(Component, {
				global: {
					provide: {
						[dialogContext]: {
							state: {
								header: 'Header',
								content: 'Content',
								buttons: [
									{
										content: 'Close',
										onClick: spy
									}
								]
							}
						}
					}
				}
			})
			const button = screen.getByText('Close')
			if (button) {
				await user.click(button)
			}
			expect(spy).toBeCalled()
		})
})
