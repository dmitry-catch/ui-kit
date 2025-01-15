import { inject } from 'vue'
import { dialogContext } from './dialogContext.js'

export function useConfirm() {
	const dialog = inject(dialogContext)

	const showConfirm = (options: {
		header: string
		content: string
		submitBtnText: string
		cancelBtnText: string
	}) => {
		return new Promise<boolean>((resolve) => {
			if (dialog) {
				dialog.setState({
					header: options.header,
					content: options.content,
					buttons: [
						{
							content: options.submitBtnText,
							class: 'accent',
							onClick: () => {
								resolve(true)
								dialog.clear()
							}
						},
						{
							content: options.cancelBtnText,
							onClick: () => {
								resolve(false)
								dialog.clear()
							}
						}
					],
					onClose: () => {
						resolve(false)
						dialog.clear()
					}
				})
			} else {
				resolve(false)
			}
		})
	}

	return { showConfirm }
}
