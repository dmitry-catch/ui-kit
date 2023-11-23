import { FilterExpression, value } from '@forecsys/collections'
import { computed, inject, provide, reactive } from 'vue'

const contexts: { [key: string]: { [key: string]: FilterExpression } } = reactive({})
export const useFilterContext = (options?: { forceId: boolean }) => {
	const injectedId = inject<string>('useFilterContext.Id')
	const newId = 'useFilterContext.Id-' + Math.random()
	const id = computed(() => (options?.forceId ? newId : injectedId || newId))
	provide('useFilterContext.Id', id.value)
	contexts[id.value] = reactive({})

	const filters = computed(() => contexts[id.value])
	const getFilter = (name: string): FilterExpression => {
		const filters = contexts[id.value]
		if (filters == null) return value(true)
		return filters[name] ? (filters[name] as FilterExpression) : value(true)
	}
	const setFilter = (name: string, filter: FilterExpression) => {
		if (!contexts[id.value]) contexts[id.value] = reactive({})
		const filters = contexts[id.value]

		filters[name] = filter ?? value(true)
	}

	const restoreFilterContext = (context: { [key: string]: FilterExpression }) => {
		contexts[id.value] = reactive(context)
	}

	return {
		getFilter,
		setFilter,
		restoreFilterContext,
		filters
	}
}
