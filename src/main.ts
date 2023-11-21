import Icon from './components/general/Icon/Icon.vue'
import Btn from './components/general/Button/Button.vue'
import Button from './components/general/Button/Button.vue'
import Property from './components/text/Property/Property.vue'
import Paragraph from './components/text/Paragraph/Paragraph.vue'
import Header from './components/text/Header/Header.vue'
import Pill from './components/text/Pill/Pill.vue'
import Tag from './components/text/Tag/Tag.vue'
import ContentContainer from './components/layout/ContentContainer/ContentContainer.vue'
import ContentBlock from './components/layout/ContentBlock/ContentBlock.vue'
import Surface from './components/layout/Surface/Surface.vue'
import Tabs from './components/general/Tabs/Tabs.vue'
import Tab from './components/general/Tabs/Tab.vue'
import TextField from './components/data-entry/TextField/TextField.vue'
import Modal from './components/layout/Modal/Modal.vue'
import Multiselect from './components/data-entry/Multiselect/Multiselect.vue'
import Checkbox from './components/data-entry/Checkbox/Checkbox.vue'
import DropdownSelectableOption from './components/data-entry/DropdownSelectableOption/DropdownSelectableOption.vue'
import DataList from './components/data-display/DataList/DataList.vue'
import DataListGroup from './components/data-display/DataList/DataListGroup.vue'
import DataListItem from './components/data-display/DataList/DataListItem.vue'
import type { DateLocalization, FieldLocalization, Localization } from './localization.js'
import OrderableList from './components/data-display/OrderableList/OrderableList.vue'
import DataGrid from './components/data-display/DataGrid/DataGrid.vue'
import DatePicker from './components/data-entry/DatePicker/DatePicker.vue'
import DateRangePicker from './components/data-entry/DateRangePicker/DateRangePicker.vue'

export {
	/**
	 * @deprecated use Button instead
	 */
	Btn,
	Button,
	Icon,
	Property,
	Paragraph,
	Header,
	Tag,
	Pill,
	ContentContainer,
	ContentBlock,
	Surface,
	Tabs,
	Tab,
	TextField,
	Modal,
	Multiselect,
	Checkbox,
	Localization,
	FieldLocalization,
	DateLocalization,
	DropdownSelectableOption,
	DataList,
	DataListGroup,
	DataListItem,
	OrderableList,
	DatePicker,
	DateRangePicker,
	DataGrid
}
