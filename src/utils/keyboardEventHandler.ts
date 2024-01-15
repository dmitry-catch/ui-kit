import { KEY } from '../consts/KEY'

interface handleKeyboardEventProps {
	key: KEY
	event: KeyboardEvent
	callback: () => void
}
export const handleKeyboardEvent = ({ event, key, callback }: handleKeyboardEventProps) => {
	if (event.code == key) callback()
}
