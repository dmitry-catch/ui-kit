import Nav from './Sidenav.vue'
import Toggle from './components/SidenavToggle.vue'
import Menu from './components/SidenavMenu.vue'
import Item from './components/SidenavItem.vue'
import type { SidenavType } from './types.js'

Nav.Toggle = Toggle
Nav.Menu = Menu
Nav.Item = Item

const Sidenav = Nav as unknown as SidenavType
export { Sidenav }
