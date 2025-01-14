<script setup lang="ts" generic="TValue">
import { ref, toRefs, computed, watch, onMounted, reactive } from 'vue'
import Dropdown from '../../data-display/Dropdown/Dropdown.vue'
import Button from '../../general/Button/Button.vue'
import Icon from '../../general/Icon/Icon.vue'
import { DropdownItemType } from '../../data-display/Dropdown/types'
import SearchPopup from './components/SearchPopup.vue'
import { SelectLoadContext } from '../types'
import Spinner from '../../general/Spinner/Spinner.vue'
import type { MultiselectEmits, MultiselectProps, MultiselectSlots } from './types'

export interface SelectOptionType<TValue> {
	name: string
	value: TValue
}

const props = withDefaults(defineProps<MultiselectProps<TValue>>(), { searchType: false, size: 'medium' })

const {
	icon,
	searchType,
	invalid,
	required,
	label,
	hint,
	size,
	placeholder,
	loading,
	options,
	disabled,
	description,
	searchMinLength,
	searchMaxLength,
	popupPlaceholder,
	height,
	visibleItems
} = toRefs(props)

const emit = defineEmits<MultiselectEmits<TValue>>()

const modelValue = defineModel<Array<TValue>>({ required: true })

const slots = defineSlots<MultiselectSlots>()

const dropdownRef = ref<InstanceType<typeof Dropdown>>()
const searchInput = ref('')

const items = ref<DropdownItemType[]>([])
const dropdownOpen = ref(false)

const selectedItems = computed(() => items.value.filter((it) => modelValue.value.includes(it.value)))

const shownName = computed(() => {
	const selectedItemsCount = modelValue.value.length
	if (!selectedItemsCount) return ''
	if (selectedItemsCount === 1) {
		return options.value.find((it) => modelValue.value.includes(it.value))?.name || ''
	}
	return `${selectedItemsCount} ${selectedItemsCount > 4 ? 'значений' : 'значения'}`
})

const isSearchVisible = computed(
	() => searchType.value == 'popup' || (searchType.value == 'auto' && options.value?.length >= 10)
)

const clearInput = () => {
	searchInput.value = ''
	modelValue.value = []
}

const processItemClick = (item: DropdownItemType) => {
	const isPicked = modelValue.value.includes(item.value)
	if (!isPicked) modelValue.value = [...modelValue.value, item.value]
	else modelValue.value = modelValue.value.filter((it) => it !== item.value)
}

const optionsHandler = (initOptions: SelectOptionType<TValue>[] | null = null) => {
	initOptions = initOptions ?? options.value
	items.value = initOptions.map((option) => ({
		label: option.name,
		value: option.value,
		action: processItemClick
	}))
}

const onSearch = () => {
	emit('search', searchInput.value)
	if (!searchInput.value) optionsHandler()
	if (searchType.value && searchType.value != 'auto')
		optionsHandler(
			options.value.filter((option: SelectOptionType<TValue>) =>
				(option?.name?.toString() ?? '').toLowerCase().includes(searchInput.value?.toLowerCase())
			)
		)
}

const openList = () => {
	if (!loading.value) {
		dropdownOpen.value = true
		emit('open')
	}
}

const listContext: SelectLoadContext<TValue> = reactive({
	current: options,
	loading: false,
	completed: false
})

const loadList = () => {
	emit('load', listContext)
}

watch(searchInput, () => onSearch())

watch([loading, options.value], () => optionsHandler())

onMounted(() => optionsHandler())
const root = ref()
</script>
<template>
	<div ref="root" class="Multiselect" :size="size">
		<div v-if="label" class="Multiselect__Label">
			{{ label }}
			<span v-if="required" class="danger">&ast;</span>
		</div>
		<!-- legacy support -->
		<div v-if="$slots.label && !label" class="Multiselect__Label">
			<slot name="label"></slot>
			<span v-if="required" class="danger">&ast;</span>
		</div>
		<span v-if="description" class="secondary">
			{{ description }}
		</span>
		<span v-if="$slots.description && !description" class="secondary">
			<slot name="description"></slot>
		</span>

		<div class="Multiselect__content" :size="size" :class="{ disabled, invalid }">
			<Icon v-if="icon" :name="icon" />
			<div class="Multiselect__innerContent" @click=";[loadList(), openList()]">
				<span v-if="modelValue?.length == 0" class="secondary">
					{{ placeholder }}
				</span>
				<span v-if="shownName" class="Multiselect__name">
					<span class="Multiselect__nameInner">
						{{ shownName }}
					</span>
					<Button
						v-if="shownName"
						class="icon functional Multiselect__contentRemove"
						:disabled="disabled"
						@click="clearInput"
					>
						<Icon class="Multiselect__contentRemoveIcon" name="close" />
					</Button>
				</span>
			</div>

			<SearchPopup
				v-model="dropdownOpen"
				v-model:searchInput="searchInput"
				v-model:searchPopupRef="dropdownRef"
				:size="size"
				:disabled="disabled"
				:loading="loading"
				:items="items"
				:selected="selectedItems"
				:searchMinLength="searchMinLength"
				:searchMaxLength="searchMaxLength"
				:popupPlaceholder="popupPlaceholder"
				:searchVisible="isSearchVisible"
				:lazy="lazy"
				class="Multiselect__searchPopup"
				:height="height"
				:visibleItems="visibleItems"
				@clearInput="clearInput"
				@open="() => emit('open')"
			>
				<template v-if="$slots.listHeader" #listHeader><slot name="listHeader"></slot></template>
				<template v-if="$slots.listGroupLabel" #listGroupLabel><slot name="listGroupLabel"></slot></template>
				<template v-if="$slots.listItem" #listItem><slot name="listItem"></slot></template>
				<template #loadMore>
					<slot
						v-if="!listContext.completed && !listContext.loading"
						name="loadMore"
						:load="() => loadList()"
					>
						<Button class="functional" @click="loadList">Загрузить еще</Button>
					</slot>
					<Spinner v-if="listContext.loading" class="Multiselect__loading" />
				</template>
				<template v-if="$slots.listDefault" #listDefault><slot name="listDefault"></slot></template>
				<template v-if="$slots.listFooter" #listFooter><slot name="listFooter"></slot></template>
				<template v-if="$slots.menuFooter" #menuFooter><slot name="menuFooter"></slot></template>
				<template v-if="$slots.empty" #empty><slot name="empty"></slot></template>
			</SearchPopup>
		</div>

		<span v-if="hint && !(typeof invalid == 'string')" class="secondary">{{ hint }}</span>
		<span v-if="typeof invalid == 'string'" class="danger">{{ invalid }}</span>
	</div>
</template>
<style scoped>
/* Multiselect styles with sizes */
.Multiselect {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: var(--design-gap-unit);
}

.Multiselect[size='small']:deep(*) {
	font-size: var(--design-font-size-small);
	line-height: var(--design-line-height-small);
}

.Multiselect[size='extra-small']:deep(*) {
	font-size: var(--design-font-size-footnote);
	line-height: var(--design-line-height-footnote);
}
/* ------------------------------ */

.Multiselect__Label {
	display: flex;
	gap: var(--design-gap-unit);
}

/* Multiselect content styles with sizes */
.Multiselect__content {
	box-sizing: content-box;
	height: 32px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: var(--design-gap-unit);
	border-radius: var(--design-border-radius-control);
	border: 1px solid var(--design-border-color-baseline);
	background: var(--design-background-color-primary);
	padding: calc(0.5 * var(--design-gap-unit)) calc(2 * var(--design-gap-unit));
	position: relative;
	cursor: pointer;
}

.Multiselect__content[size='extra-small'] {
	height: calc(0.5 * 32px);
	padding: calc(0.5 * var(--design-gap-unit)) calc(1.5 * var(--design-gap-unit));
	gap: calc(0.5 * var(--design-gap-unit));
}

.Multiselect__content[size='small'] {
	height: calc(0.75 * 32px);
	padding: calc(0.75 * var(--design-gap-unit)) calc(1.75 * var(--design-gap-unit));
	gap: calc(0.75 * var(--design-gap-unit));
}

.Multiselect__content.disabled * {
	color: var(--design-text-color-secondary);
}
.Multiselect__content.invalid {
	border-color: var(--design-border-color-danger-primary);
}
.Multiselect__content.invalid:focus-within {
	box-shadow: 0px 0px 0px 3px rgba(210, 40, 53, 0.2);
}
/* -----------------------------------------  */

/* Multiselect content name styles with sizes */
.Multiselect__name {
	display: flex;
	width: fit-content;
	gap: calc(0.75 * var(--design-gap-unit));
	padding: calc(0.5 * var(--design-gap-unit)) calc(2 * var(--design-gap-unit));
	background-color: var(--design-background-color-on-accent-primary);
	border-radius: var(--design-border-radius-control);
	max-width: 100%;
	align-items: center;
}

.Multiselect__content[size='extra-small'] .Multiselect__name {
	padding: calc(0.05 * var(--design-gap-unit)) calc(1.5 * var(--design-gap-unit));
}

.Multiselect__content[size='small'] .Multiselect__name {
	padding: calc(0.25 * var(--design-gap-unit)) calc(2 * var(--design-gap-unit));
}
/* -----------------------------------------  */

.Multiselect__nameInner {
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.Multiselect__innerContent {
	display: block;
	width: 100%;
	text-align: start;
}

/* Multiselect content removeButton styles with sizes  */
.Multiselect__content .Multiselect__contentRemove {
	/* non standard icon sizes from dropdown - to match dropdown chevorn icon size */
	--icon-size: 24px;
	height: var(--icon-size);
	width: var(--icon-size);
}

.Multiselect__content[size='small'] .Multiselect__contentRemove {
	/* non standard icon sizes from dropdown - to match dropdown chevorn icon size */
	--icon-size: 20px;
	height: var(--icon-size);
	width: var(--icon-size);
}

.Multiselect__content[size='extra-small'] .Multiselect__contentRemove {
	/* non standard icon sizes from dropdown - to match dropdown chevorn icon size */
	--icon-size: 18px;
	height: var(--icon-size);
	width: var(--icon-size);
}
/* ------------------------------------------- */

/* Multiselect content removeButton Icon styles with sizes */
.Multiselect__content .Multiselect__contentRemoveIcon {
	--icon-size: 24px;
}

.Multiselect__content[size='small'] .Multiselect__contentRemoveIcon {
	--icon-size: 20px;
}

.Multiselect__content[size='extra-small'] .Multiselect__contentRemoveIcon {
	--icon-size: 18px;
}
/* ------------------------------------------- */

.Multiselect__searchPopup:deep(.SearchPopup__input) {
	padding-bottom: 0px;
}
</style>
