import { computed, inject, provide, Ref } from 'vue'

export type ModalContext = { element: HTMLElement }
export const useModalContext = (elementRef?: Ref<HTMLElement | undefined>): ModalContext => {
	const injected = inject('modalContext.element') as Ref<HTMLElement>
	const element = computed(() => elementRef?.value || injected?.value || document.body)

	provide('modalContext.element', element)

	return { element: element.value }
}
