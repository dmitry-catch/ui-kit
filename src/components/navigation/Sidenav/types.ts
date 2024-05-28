import { ModelRef, Ref } from 'vue'

export interface InjectionTypes {
	collapsed: Ref<boolean>
	active: ModelRef<string | undefined>
	open: ModelRef<string | undefined>
}
