import { ref } from 'vue'

let counter = 0

export const useUniqueId = (prefix = 'randomId') => {
	const getRandomId = () => [prefix, counter++].join('-')
	return { getRandomId }
}
