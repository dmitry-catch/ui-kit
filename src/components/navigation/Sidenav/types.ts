import { ModelRef, Ref } from 'vue'
import Sidenav from './Sidenav.vue'
import Toggle from './components/SidenavToggle.vue'
import Menu from './components/SidenavMenu.vue'
import Item from './components/SidenavItem.vue'

export interface InjectionTypes {
	collapsed: Ref<boolean>
	active: ModelRef<string | undefined>
	open: ModelRef<Array<string> | undefined>
	hide: Ref<Array<string> | undefined>
}

type Sidenav = typeof Sidenav
type Toggle = typeof Toggle
type Menu = typeof Menu
type Item = typeof Item

export type SidenavType = Sidenav & { Toggle: Toggle; Menu: Menu; Item: Item }
