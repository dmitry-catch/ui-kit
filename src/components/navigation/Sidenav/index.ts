import Nav from './Sidenav.vue'
import Toggle from './components/Toggle.vue'
import Menu from './components/Menu.vue'
import Item from './components/Item.vue'
import type { SidenavType } from './types.js'

Nav.Toggle = Toggle
Nav.Menu = Menu
Nav.Item = Item

const Sidenav = Nav as unknown as SidenavType
export { Sidenav }
