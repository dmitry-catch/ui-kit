import { fireEvent, render, screen } from '@testing-library/vue'
import { describe, it, assert } from 'vitest'
import { composeStory } from 'storybook/utils/composeStory'

import Meta, { Default } from './TextField.stories.js'

const Component = composeStory(Default, Meta)

describe(`Component ${Component.name}`, () => {
	it('should render', () => render(Component))
})

import TextField from './TextField.vue'
import { h, nextTick, ref } from 'vue'

describe('TextField in order', () => {
	describe('to input text', () => {
		it('should have text input', () => {
			render(TextField, { props: { modelValue: '' } })

			screen.getByRole('textbox')
		})

		it('should emit update when user types', async () => {
			const component = render(TextField, { props: { modelValue: '' } })

			assert.deepEqual(component.emitted('update:modelValue'), undefined)

			const text = 'There is some text'
			const input = screen.getByRole('textbox')
			await fireEvent.update(input, text)

			assert.deepEqual(component.emitted('update:modelValue'), [[text]])
		})

		it('should update input value when text changed programmatically', async () => {
			const component = render(TextField, { props: { modelValue: '' } })

			const text = 'There is some text'
			const input = screen.getByRole('textbox') as HTMLInputElement
			assert.equal(input.value, '')

			await component.rerender({ modelValue: text })

			assert.equal(input.value, text)
		})
	})

	describe('to validate', () => {
		it('should display hint', () => {
			render(TextField, {
				props: { modelValue: '' },
				slots: {
					validationHint: 'hint'
				}
			})

			screen.getByText('hint')
		})

		/*
       As it is slot implementation there is no need to test update
       Though it should be tested by design and test should be updated when implementation change
       */
		it('should update hint', async () => {
			const text = ref('hint')
			render(TextField, {
				props: { modelValue: '' },
				slots: {
					validationHint: () => h('div', text.value)
				}
			})

			text.value = 'Error message'
			await nextTick()

			screen.getByText('Error message')
		})
		describe('should emit focus events', () => {
			it('focus', async () => {
				const component = render(TextField, { props: { modelValue: '' } })

				assert.deepEqual(component.emitted('focus'), undefined)

				const input = screen.getByRole('textbox')
				await fireEvent.focus(input)

				assert.deepEqual(component.emitted('focus')?.length, 1)
			})

			it('blur', async () => {
				const component = render(TextField, { props: { modelValue: '' } })

				assert.deepEqual(component.emitted('blur'), undefined)

				const input = screen.getByRole('textbox')
				await fireEvent.focus(input)
				await fireEvent.blur(input)

				assert.deepEqual(component.emitted('blur')?.length, 1)
			})

			describe('to act like drop-in replacement', () => {
				it('should not emit focus, when focus moves inside the component', async () => {
					const component = render(TextField, { props: { modelValue: '', label: 'label' } })

					assert.deepEqual(component.emitted('focus'), undefined)

					const input = screen.getByRole('textbox')

					assert.deepEqual(component.emitted('focus'), undefined)

					const label = component.getByText('label')
					await fireEvent.focus(label, { relatedTarget: input })
					await fireEvent.focus(input, { relatedTarget: label })
					await fireEvent.focus(label, { relatedTarget: input })
					await fireEvent.focus(input, { relatedTarget: label })

					assert.deepEqual(component.emitted('focus'), undefined)
				})

				it('should not emit blur, when focus moves inside the component', async () => {
					const component = render(TextField, { props: { modelValue: '', label: 'label' } })

					assert.deepEqual(component.emitted('blur'), undefined)

					const input = screen.getByRole('textbox')
					await fireEvent.focus(input)

					const label = component.getByText('label')
					await fireEvent.blur(input, { relatedTarget: label })
					await fireEvent.focus(label, { relatedTarget: input })
					await fireEvent.blur(label, { relatedTarget: input })
					await fireEvent.blur(input, { relatedTarget: label })

					assert.deepEqual(component.emitted('blur'), undefined)
				})
			})
		})

		describe('should display char limit', () => {
			it('when character limit is set', () => {
				render(TextField, { props: { modelValue: '', maxLength: 10 } })

				screen.getByText('0 / 10')
			})

			it('when character limit is updated', async () => {
				const component = render(TextField, { props: { modelValue: '', maxLength: 10 } })

				await component.rerender({ modelValue: '', maxLength: 23 })

				screen.getByText('0 / 23')
			})

			it('when value is updated', async () => {
				const text = 'test text'
				const component = render(TextField, { props: { modelValue: '', maxLength: 50 } })

				await component.rerender({ modelValue: text, maxLength: 50 })

				screen.getByText(`${text.length} / 50`)
			})
		})
	})
})
