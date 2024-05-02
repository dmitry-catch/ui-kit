export interface Notification {
	id: string | number
	message: string
	type: 'success' | 'warning' | 'error' | 'info'
}
