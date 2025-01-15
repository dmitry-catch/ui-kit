import DialogComponent from './Dialog.vue'
import { useDialogProvider, dialogContext } from '../../../utils/dialogContext'
import { useAlert } from '../../../utils/useAlert'
import { useConfirm } from '../../../utils/useConfirm'
import { DialogType } from './types'

DialogComponent.useProvider = useDialogProvider
DialogComponent.useAlert = useAlert
DialogComponent.useConfirm = useConfirm
DialogComponent.context = dialogContext

const Dialog = DialogComponent as unknown as DialogType

export { Dialog }
