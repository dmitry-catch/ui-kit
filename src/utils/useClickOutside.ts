import { onMounted, onUnmounted, Ref } from 'vue'

export const useClickOutside = (elementRef: Ref<HTMLElement>, callback: (event: MouseEvent) => void) => {
	const clickOutside = (event: MouseEvent) => {
		// @ts-ignore event.path old chrome compatability
		const path = event.path || event.composedPath()
		if (!path.includes(elementRef.value)) callback(event)
	}
	onMounted(() => document.addEventListener('click', clickOutside))
	onUnmounted(() => document.removeEventListener('click', clickOutside))

	return clickOutside
}
