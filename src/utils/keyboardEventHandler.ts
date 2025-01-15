import { Keyboard } from '../consts/Keyboard'

interface handleKeyboardEventProps {
	key: Keyboard
	event: KeyboardEvent
	callback: () => void
}
export const handleKeyboardEvent = ({ event, key, callback }: handleKeyboardEventProps) => {
	if (event.code == key) {
		event.preventDefault()
		callback()
	}
}
