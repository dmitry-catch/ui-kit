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
