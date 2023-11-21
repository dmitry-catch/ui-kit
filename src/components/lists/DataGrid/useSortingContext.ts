import { computed, inject, provide, reactive } from 'vue'
import { SortExpression } from '@forecsys/collections'

const contexts: { [key: string]: Array<SortExpression> } = reactive({})
export const useSortingContext = (options?: { forceId: boolean } | undefined) => {
	const injectedId = inject<string>('useSortingContext.Id')
	const newId = 'useSortingContext.Id-' + Math.random()
	const id = computed(() => (options?.forceId ? newId : injectedId || newId))
	provide('useSortingContext.Id', id.value)
	contexts[id.value] = reactive([])

	const setSorting = (sorting: Array<SortExpression>) => {
		contexts[id.value] = reactive(sorting)
	}
	const appendSorting = (sorting: Array<SortExpression>) => {
		contexts[id.value] = reactive(contexts[id.value].concat(sorting))
	}

	const sorting = computed(() => contexts[id.value] ?? [])

	return { setSorting, appendSorting, sorting }
}
