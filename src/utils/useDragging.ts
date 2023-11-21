import { Ref, ref, watchEffect } from 'vue'
export type DragEvent = {
	shadow: HTMLElement
	element: HTMLElement
	x: number
	y: number
}
export const useDragging = ({
	componentRoot,
	onDrag,
	onStopDragging
}: {
	onDrag: (event: DragEvent) => void
	onStopDragging: (event: DragEvent) => void
	componentRoot: Ref<HTMLElement | undefined>
}) => {
	const dragged = ref<HTMLElement>()
	const shadow = ref<HTMLElement>()

	const drag = (x: number, y: number) => {
		const rect = dragged.value!.getBoundingClientRect()
		const offset = {
			x: x - shadow.value!.offsetLeft,
			y: y - shadow.value!.offsetTop
		}

		shadow.value!.style.transform = `translate(${offset.x}px, ${offset.y}px)`

		onDrag({ element: dragged.value!, shadow: shadow.value!, x, y })
	}
	const dragEvent = (event: PointerEvent) => {
		drag(event.clientX, event.clientY)
	}
	const stopDragging = (event: PointerEvent) => {
		dragged.value!.style.visibility = 'initial'
		shadow.value?.remove()
		document.removeEventListener('pointermove', dragEvent)

		onStopDragging({ element: dragged.value!, shadow: shadow.value!, x: event.clientX, y: event.clientY })
	}
	const startDragging = (element: HTMLElement) => {
		dragged.value = element
		shadow.value = element.cloneNode(true) as HTMLElement
		const draggedRect = element.getBoundingClientRect()
		dragged.value!.style.visibility = 'hidden'
		shadow.value!.style.position = 'fixed'
		shadow.value!.style.display = ['table', 'table-row', 'table-cell'].includes(element.style.display)
			? 'block'
			: element.style.display
		shadow.value!.style.top = draggedRect.top + 'px'
		shadow.value!.style.left = draggedRect.left + 'px'
		shadow.value!.style.right = draggedRect.right + 'px'
		shadow.value!.style.bottom = draggedRect.bottom + 'px'
		shadow.value!.style.width = draggedRect.width + 'px'
		shadow.value!.style.height = draggedRect.height + 'px'
		componentRoot.value!.append(shadow.value)

		document.addEventListener('pointermove', dragEvent)
		document.addEventListener('pointerup', stopDragging)
	}
	const cancelDragging = ref<boolean>(true)
	const tryDragging = async (target: HTMLElement) => {
		cancelDragging.value = false
		await new Promise((resolve) => setTimeout(resolve, 200))
		if (cancelDragging.value) {
			return
		}

		startDragging(target)
	}
	const dragHandleMousedown = (event: PointerEvent) => {
		tryDragging(event.currentTarget as unknown as HTMLElement)
	}

	const cancel = () => (cancelDragging.value = true)

	return {
		dragHandleMousedown,
		clickHandler: cancel
	}
}
