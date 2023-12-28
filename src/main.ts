import Icon from './components/general/Icon/Icon.vue'
import Btn from './components/general/Button/Button.vue'
import Button from './components/general/Button/Button.vue'
import Property from './components/data-display/Property/Property.vue'
import Paragraph from './components/data-display/Paragraph/Paragraph.vue'
import Header from './components/data-display/Header/Header.vue'
import Pill from './components/data-display/Pill/Pill.vue'
import Tag from './components/data-display/Tag/Tag.vue'
import ContentContainer from './components/layout/ContentContainer/ContentContainer.vue'
import ContentBlock from './components/layout/ContentBlock/ContentBlock.vue'
import Surface from './components/layout/Surface/Surface.vue'
import Tabs from './components/general/Tabs/Tabs.vue'
import Tab from './components/general/Tabs/Tab.vue'
import TextField from './components/data-entry/TextField/TextField.vue'
import Modal from './components/general/Modal/Modal.vue'
import Spinner from './components/general/Spinner/Spinner.vue'
import Multiselect from './components/data-entry/Multiselect/Multiselect.vue'
import Checkbox from './components/data-entry/Checkbox/Checkbox.vue'
import SelectableOption from './components/data-entry/Select/SelectableOption/SelectableOption.vue'
import Select from './components/data-entry/Select/Select.vue'
import DataList from './components/data-display/DataList/DataList.vue'
import DataListGroup from './components/data-display/DataList/DataListGroup/DataListGroup.vue'
import DataListItem from './components/data-display/DataList/DataListItem/DataListItem.vue'
import type { DateLocalization, FieldLocalization, Localization } from './types/localization.js'
import OrderableList from './components/data-display/OrderableList/OrderableList.vue'
import DataGrid from './components/data-display/DataGrid/DataGrid.vue'
import DatePicker from './components/data-entry/DatePicker/DatePicker.vue'
import Uploader from './components/data-entry/Uploader/Uploader.vue'
import DateRangePicker from './components/data-entry/DateRangePicker/DateRangePicker.vue'

export {
	//General category
	/** @deprecated use Button instead */
	Btn,
	Button,
	Icon,
	Modal,
	Tabs,
	Tab,
	Spinner,
	//Layout category
	ContentContainer,
	ContentBlock,
	Surface,
	//Data entry category
	Checkbox,
	DatePicker,
	DateRangePicker,
	Select,
	SelectableOption,
	Multiselect,
	TextField,
	Uploader,
	//Data display category
	DataGrid,
	DataList,
	DataListGroup,
	DataListItem,
	Header,
	OrderableList,
	Paragraph,
	Pill,
	Property,
	Tag,
	//Other
	Localization,
	FieldLocalization,
	DateLocalization
}
