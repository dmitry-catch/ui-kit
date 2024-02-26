<script setup lang="ts">
import { ref, toRefs, computed, watch, onMounted } from 'vue'
import { Dropdown, Button, Icon, TextField } from '../../../main'
import { DropdownItemType } from '../../data-display/Dropdown/types'
import { SelectOptionType } from '../types'

interface SelectProps {
	modelValue: Array<string | number>
	options: Array<SelectOptionType>
	/** Если параметр = true, компонент подсветиться красным. Если тип параметра - строка, то подсказка заменится на эту строку и текст станет красным */
	invalid?: boolean | string
	/** Появляется астерикс над лейблом. Лейбл обязателен */
	required?: boolean
	loading?: boolean
	disabled?: boolean
	label?: string
	/** Подсказка */
	hint?: string
	/** Описание */
	description?: string
	placeholder?: string
	icon?: string
	/**
	 * false - поиск недоступен
	 * input - поле ввода всегда видно
	 * auto - если предоставлено более 10 вариантов, появляется поиск в выпадающем меню
	 * popup - поиск в выпадающем меню
	 */
	searchType?: 'input' | false | 'auto' | 'popup'
	size?: 'extra-small' | 'small' | 'medium'
	/** Добавляет ограничение на минимальное колличество символов */
	searchMinLength?: number
	/** Добавляет счётчик символов и ограничение в попап поиск и просто ограничение в инпут поиск */
	searchMaxLength?: number
	/** Плейсхолдер для поиска во контекстном меню */
	popupPlaceholder?: string
}

const props = withDefaults(defineProps<SelectProps>(), { searchType: false, size: 'medium' })

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
	modelValue,
	disabled,
	description,
	searchMinLength,
	searchMaxLength,
	popupPlaceholder
} = toRefs(props)

const emit = defineEmits<{
	(e: 'update:modelValue', value: Array<string | number>): void
	/** Обработчик события выпадающего меню */
	(e: 'open'): void
	/** Обработчик события ввода в строке поиска */
	(e: 'search', value: string): void
}>()

const slots = defineSlots<{
	/**  Невыбираемый фиксированный первый элемент выпадающего списка */
	listHeader?: string | unknown
	/** Внутреннее наполнение выпадающего списка */
	listDefault?: unknown
	/**  Кастомный компонент для элемента выпадающего списка (передаётся параметр listItem типа DropdownItemType) */
	listItem?: (listItem: unknown) => unknown
	/**  Заголовок для группы элементов списка */
	listGroupLabel?: (listGroupLabel: unknown) => string | unknown
	/**   Невыбираемый фиксированный последний элемент выпадающего списка */
	listFooter?: string | unknown
	/** Подсказка при отсутсвии совпадения поискового запроса и эементов списка */
	empty?: string | unknown
}>()
const searchRef = ref()
const dropdownRef = ref<InstanceType<typeof Dropdown>>()
const searchInput = ref('')

const items = ref<DropdownItemType[]>([])
const dropdownOpen = ref(false)

const selectedItems = computed(() => items.value.filter((it) => modelValue.value.includes(it.value)))

const shownName = computed(() => {
	if (!modelValue.value.length) return ''
	if (modelValue.value.length === 1)
		return options.value.find((it: SelectOptionType) => modelValue.value.includes(it.value))?.name
	return `${modelValue.value.length} значения`
})

const isSearchVisible = computed(
	() => searchType.value == 'popup' || (searchType.value == 'auto' && options.value?.length >= 10)
)

const clearInput = () => {
	searchInput.value = ''
	emit('update:modelValue', [])
}
const setFocus = () => {
	searchRef.value?.focus()
	openList()
}

const processItemClick = (item: DropdownItemType) => {
	const isPicked = modelValue.value.includes(item.value)
	if (!isPicked) emit('update:modelValue', [...modelValue.value, item.value])
	else
		emit(
			'update:modelValue',
			modelValue.value.filter((it) => it !== item.value)
		)
}

const optionsHandler = (initOptions: SelectOptionType[] | null = null) => {
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
			options.value.filter((option: SelectOptionType) =>
				option.name.toLowerCase().includes(searchInput.value?.toLowerCase())
			)
		)
}

const openList = () => {
	if (!loading.value) {
		dropdownOpen.value = true
		emit('open')
	}
}

watch(searchInput, () => onSearch())

onMounted(() => optionsHandler())

const root = ref()
</script>
<template>
	<div ref="root" class="Multiselect" :size="size">
		<div v-if="label" class="Multiselect__Label">
			{{ label }}
			<span v-if="required" class="danger">&ast;</span>
		</div>
		<span v-if="description" class="secondary">
			{{ description }}
		</span>
		<div class="Multiselect__content" :class="{ disabled, invalid }">
			<Button v-if="searchType == 'input'" class="functional icon" :disabled="disabled" @click="setFocus">
				<Icon :name="icon ? icon : 'search'" />
			</Button>
			<Icon v-if="icon && searchType != 'input'" :name="icon" />
			<div class="Multiselect__innerContent" @click="openList">
				<span v-if="modelValue?.length == 0 && searchType != 'input'" class="secondary">
					{{ placeholder }}
				</span>
				<span v-if="searchType != 'input' && shownName" class="Multiselect_name">
					{{ shownName }}
					<Button v-if="shownName" class="icon functional" @click="clearInput"><Icon name="close" /></Button>
				</span>
				<input
					v-if="searchType == 'input'"
					ref="searchRef"
					v-model="searchInput"
					class="Multiselect__search"
					:placeholder="placeholder"
					:minlength="searchMinLength"
					:maxlength="searchMaxLength"
				/>
			</div>
			<Button v-if="shownName" class="icon functional" :size="size" @click="clearInput">
				<Icon name="close" />
			</Button>
			<Dropdown
				ref="dropdownRef"
				v-model="dropdownOpen"
				v-model:selected="selectedItems"
				variant="functional"
				:offset="2"
				:items="items"
				:size="size"
				related
				:disabled="disabled"
				title=""
				multiple
				:loading="loading"
				:caret="!loading"
				@click="() => emit('open')"
			>
				<template v-if="slots.listHeader || isSearchVisible" #header>
					<TextField
						v-if="isSearchVisible"
						v-model="searchInput"
						class="Multiselect__popupSearch"
						:minLength="searchMinLength"
						:maxLength="searchMaxLength"
						:placeholder="popupPlaceholder"
					>
						<template #before>
							<Icon name="search" class="Multiselect__popupSearchButton" />
						</template>

						<template #after>
							<Button v-if="searchInput" class="icon functional" :size="size" @click="clearInput">
								<Icon name="close" />
							</Button>
						</template>
					</TextField>
					<slot name="listHeader"></slot>
				</template>
				<slot name="listDefault"></slot>
				<template v-if="slots.listItem" #item="{ item }">
					<slot name="listItem" :listItem="item"></slot>
				</template>
				<template v-else #item="{ item }">
					<div class="Multiselect__Checkbox">
						<span class="checkbox__visible" :visible="selectedItems.includes(item)">
							<Icon class="checkbox__checked" name="check"></Icon>
						</span>
						{{ item.label }}
					</div>
				</template>
				<template v-if="slots.listGroupLabel" #groupLabel="groupProps"
					><slot name="listGroupLabel" :groupLabel="groupProps"></slot
				></template>
				<template v-if="slots.listFooter || items?.length == 0" #footer>
					<span v-if="items?.length == 0 && !searchInput" class="itemHint">Нет элементов</span>
					<span v-if="items?.length == 0 && searchInput" class="itemHint"
						>Нет совпадений «{{ searchInput }}»</span
					>
					<slot v-if="items?.length == 0 && slots.empty" name="empty"></slot>
					<slot name="listFooter"></slot>
				</template>
			</Dropdown>
		</div>

		<span v-if="hint && !(typeof invalid == 'string')" class="secondary">{{ hint }}</span>
		<span v-if="typeof invalid == 'string'" class="danger">{{ invalid }}</span>
	</div>
</template>
<style scoped>
.Multiselect {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: var(--design-gap-unit);
}
.Multiselect__Label {
	display: flex;
	gap: var(--design-gap-unit);
}
.Multiselect__content {
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: var(--design-gap-unit);
	max-width: auto;
	border-radius: var(--design-border-radius-control);
	border: 1px solid var(--design-border-color-baseline);
	background: var(--design-background-color-primary);
	padding: calc(0.5 * var(--design-gap-unit)) calc(2 * var(--design-gap-unit));
	padding-left: var(--design-gap-unit);
	position: relative;
	cursor: pointer;
}

.Multiselect_name {
	display: flex;
	width: fit-content;
	gap: calc(0.75 * var(--design-gap-unit));
	padding: calc(0.5 * var(--design-gap-unit)) calc(2 * var(--design-gap-unit));
	background-color: var(--design-background-color-on-accent-primary);
	border-radius: var(--design-border-radius-control);
}
.Multiselect__innerContent {
	width: 100%;
	text-align: start;
}

.Multiselect__Checkbox {
	display: flex;
	gap: calc(1.5 * var(--design-gap-unit));
	align-content: center;
}
.checkbox__visible {
	width: var(--design-current-line-height);
	height: var(--design-current-line-height);
	border-radius: var(--design-border-radius-control);
	border: var(--design-border-color-primary) solid 1px;
	display: inline-block;
	box-sizing: border-box;
}
.checkbox__checked {
	visibility: hidden;
	--icon-color: var(--design-background-color-on-accent-primary);
	--icon-size: var(--design-current-line-height);
}

.checkbox__visible[visible='true'] > .checkbox__checked {
	visibility: initial;
	background: var(--design-background-color-accent-primary);
}

.itemHint {
	display: block;
	padding: 0 calc(3 * var(--design-gap-unit));
	margin-bottom: var(--design-gap-unit);
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
.Multiselect[size='extra-small'] > .Multiselect__content {
	padding: calc(0.5 * var(--design-gap-unit)) calc(1.5 * var(--design-gap-unit));
	gap: calc(0.5 * var(--design-gap-unit));
}
.Multiselect[size='small'] > .Multiselect__content {
	padding: calc(0.75 * var(--design-gap-unit)) calc(1.75 * var(--design-gap-unit));
	gap: calc(0.75 * var(--design-gap-unit));
}
.Multiselect[size='small']:deep(*) {
	font-size: var(--design-font-size-small);
	line-height: var(--design-line-height-small);
	--icon-size: var(--design-line-height-hint);
}
.Multiselect[size='extra-small']:deep(*) {
	font-size: var(--design-font-size-footnote);
	line-height: var(--design-line-height-footnote);
	--icon-size: var(--design-font-size-large);
}

.Multiselect__search,
.Multiselect__search:focus,
.Multiselect__search:hover {
	border: none;
	outline: none;
	background: var(--design-background-color-primary);
	width: 100%;
}
.Multiselect__popupSearch {
	display: flex;
	padding: calc(1.5 * var(--design-gap-unit)) calc(3 * var(--design-gap-unit));
}

.Multiselect__popupSearchButton {
	margin-right: var(--design-gap-unit);
}
</style>
