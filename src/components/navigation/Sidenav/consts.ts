import { InjectionKey } from 'vue'
import { InjectionTypes } from './types.js'

export const injectionKey = Symbol() as InjectionKey<InjectionTypes>
