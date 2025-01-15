import { inject } from 'vue'
import { dialogContext } from './dialogContext.js'

export function useAlert() {
	const dialog = inject(dialogContext)

	const showAlert = (options: { header: string; content: string; closeBtnText: string }) => {
		return new Promise<void>((resolve) => {
			if (dialog) {
				dialog.setState({
					header: options.header,
					content: options.content,
					buttons: [
						{
							content: options.closeBtnText,
							onClick: () => {
								hideAlert()
								resolve()
							}
						}
					],
					onClose: () => {
						hideAlert()
						resolve()
					}
				})
			} else {
				resolve()
			}
		})
	}

	const hideAlert = () => {
		if (dialog) {
			dialog.clear()
		}
	}

	return { showAlert }
}
