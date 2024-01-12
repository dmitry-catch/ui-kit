interface KeyboardInputHandlerProps {
	key: string
	event: KeyboardEvent
	callback: () => void
}
export const handleKeyboardInput = ({ event, key, callback }: KeyboardInputHandlerProps) => {
	if (event.code.toLowerCase() == key) callback()
}
