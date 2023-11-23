import { Ref } from 'vue'

export const focusNextInput = (refs: Ref[], index: number) => {
	refs[index + 1].value.focus()
}