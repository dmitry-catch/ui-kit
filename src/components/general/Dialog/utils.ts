import { InjectionKey, App, ref, readonly, computed, Ref, ComputedRef } from 'vue'
import { DialogProps } from './types.js'

export const dialogContext = Symbol('dialogContext') as InjectionKey<{
	state: Readonly<Ref<DialogProps>>
	clear: () => void
	isEmpty: ComputedRef<boolean>
	setState: (newState: Partial<DialogProps>) => void
}>

export function useDialogProvider(app: App) {
	const dialogState = ref<DialogProps>({
		header: '',
		content: '',
		buttons: [],
		onClose: () => {}
	})

	const clear = () => {
		dialogState.value = { header: '', content: '', buttons: [], onClose: () => {} }
	}

	const isEmpty = computed(() => !dialogState.value.header && !dialogState.value.content)

	const setState = (newState: Partial<DialogProps>) => {
		dialogState.value = { ...dialogState.value, ...newState }
	}

	const providedState = {
		state: readonly(dialogState),
		clear,
		isEmpty,
		setState
	}

	app.provide(dialogContext, providedState)
}
