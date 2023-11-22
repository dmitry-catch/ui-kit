import type { Ref } from 'vue'

export const handleInputFocus = (event: Event) => {
	const target = event.target as HTMLInputElement
	target.select()
}
export const handleNextInputFocus = (refs: Ref[], index: number) => {
	refs[index + 1].value.focus()
}
