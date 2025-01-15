import { dialogContext, useDialogProvider } from '../../../utils/dialogContext'
import { useAlert } from '../../../utils/useAlert'
import { useConfirm } from '../../../utils/useConfirm'
import Dialog from './Dialog.vue'
export interface DialogProps {
	header: string
	content: string
	onClose: () => void
	buttons: ActionButton[]
}

type ActionButton = {
	content: string
	class?: string
	onClick: () => void
}

type Dialog = typeof Dialog
type useDialogProvider = typeof useDialogProvider
type dialogContext = typeof dialogContext
type useConfirm = typeof useConfirm
type useAlert = typeof useAlert

export type DialogType = Dialog & {
	useProvider: useDialogProvider
	useConfirm: useConfirm
	useAlert: useAlert
	context: dialogContext
}
