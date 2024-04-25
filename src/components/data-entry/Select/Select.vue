<script setup lang="ts">
import { ref, toRefs, computed, watch, onMounted } from 'vue'
import { Dropdown, Button, Icon, TextField } from '../../../main'
import { DropdownItemType } from '../../data-display/Dropdown/types'
import { SelectOptionType } from '../types'

interface SelectProps {
	modelValue: string | number | null
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

const props = withDefaults(defineProps<SelectProps>(), { searchType: 'input', size: 'medium' })
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
	(e: 'update:modelValue', value: string | number | null): void
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

const pickedItem = computed(() => options.value.find((it) => it.value == modelValue.value))
const selectedDropdownItem = computed(() => [items?.value.find((it: DropdownItemType) => it.value == modelValue.value)])
const shownName = computed(() => {
	if (String(pickedItem.value?.name).length >= 50) return String(pickedItem.value?.name.padEnd(50, '...'))
	return pickedItem.value?.name ? pickedItem.value?.name : ''
})

const isSearchVisible = computed(
	() => searchType.value == 'popup' || (searchType.value == 'auto' && options.value?.length >= 10)
)

const clearInput = () => {
	searchInput.value = ''
	emit('update:modelValue', null)
}
const setFocus = () => {
	searchRef.value?.focus()
	openList()
}

const optionsHandler = (initOptions: SelectOptionType[] | null = null) => {
	initOptions = initOptions ?? options.value
	items.value = initOptions.map((option) => ({
		label: option.name,
		value: option.value,
		action: (item: DropdownItemType) => {
			emit('update:modelValue', item.value)
		}
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

watch(pickedItem, () => {
	if (pickedItem.value && !isSearchVisible.value) {
		searchInput.value = shownName.value
	}
})

watch(searchInput, () => onSearch())

watch([options, loading], () => optionsHandler())

onMounted(() => optionsHandler())

const root = ref()
</script>
<template>
	<div ref="root" class="Select" :size="size">
		<div v-if="label" class="Select__Label">
			{{ label }}
			<span v-if="required" class="danger">&ast;</span>
		</div>
		<span v-if="description" class="secondary">
			{{ description }}
		</span>
		<div class="Select__content" :class="{ disabled, invalid }">
			<Button v-if="searchType == 'input'" class="functional icon" :disabled="disabled" @click="setFocus">
				<Icon :name="icon ? icon : 'search'" />
			</Button>
			<Icon v-if="icon && searchType != 'input'" :name="icon" />
			<div class="Select__innerContent" @click="openList">
				<span v-if="!pickedItem && searchType != 'input'" class="secondary">
					{{ placeholder }}
				</span>
				<span v-if="searchType != 'input'">
					{{ shownName }}
				</span>
				<input
					v-if="searchType == 'input'"
					ref="searchRef"
					v-model="searchInput"
					class="Select__search"
					:placeholder="placeholder"
					:minlength="searchMinLength"
					:maxlength="searchMaxLength"
				/>
			</div>
			<Button
				v-if="searchType == 'input' && searchInput"
				class="icon functional"
				:size="size"
				@click="clearInput"
			>
				<Icon name="close" />
			</Button>
			<Dropdown
				ref="dropdownRef"
				v-model="dropdownOpen"
				:selected="selectedDropdownItem"
				variant="functional"
				:items="items"
				:size="size"
				related
				:disabled="disabled"
				title=""
				:loading="loading"
				:caret="!loading"
				@click="() => emit('open')"
			>
				<template v-if="slots.listHeader || isSearchVisible" #header>
					<TextField
						v-if="isSearchVisible"
						v-model="searchInput"
						class="Select__popupSearch"
						:minLength="searchMinLength"
						:maxLength="searchMaxLength"
						:placeholder="popupPlaceholder"
					>
						<template #before>
							<Icon name="search" class="Select__popupSearchButton" />
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
				<template v-if="slots.listItem" #item="itemProps">
					<slot name="listItem" :listItem="itemProps"></slot>
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
.Select {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: var(--design-gap-unit);
}
.Select__Label {
	display: flex;
	gap: var(--design-gap-unit);
}
.Select__content {
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: var(--design-gap-unit);
	max-width: auto;
	border-radius: var(--design-border-radius-control);
	border: 1px solid var(--design-border-color-baseline);
	background: var(--design-background-color-primary);
	padding: var(--design-gap-unit) calc(2 * var(--design-gap-unit));
	position: relative;
	cursor: pointer;
}
.Select__innerContent {
	width: 100%;
	text-align: start;
}

.itemHint {
	display: block;
	padding: 0 calc(3 * var(--design-gap-unit));
	margin-bottom: var(--design-gap-unit);
}

.Select__content.disabled * {
	color: var(--design-text-color-secondary);
}
.Select__content.invalid {
	border-color: var(--design-border-color-danger-primary);
}
.Select__content.invalid:focus-within {
	box-shadow: 0px 0px 0px 3px rgba(210, 40, 53, 0.2);
}
.Select[size='extra-small'] > .Select__content {
	padding: calc(0.5 * var(--design-gap-unit)) calc(1.5 * var(--design-gap-unit));
	gap: calc(0.5 * var(--design-gap-unit));
}
.Select[size='small'] > .Select__content {
	padding: calc(0.75 * var(--design-gap-unit)) calc(1.75 * var(--design-gap-unit));
	gap: calc(0.75 * var(--design-gap-unit));
}
.Select[size='small']:deep(*) {
	font-size: var(--design-font-size-small);
	line-height: var(--design-line-height-small);
	--icon-size: var(--design-line-height-hint);
}
.Select[size='extra-small']:deep(*) {
	font-size: var(--design-font-size-footnote);
	line-height: var(--design-line-height-footnote);
	--icon-size: var(--design-font-size-large);
}

.Select__search,
.Select__search:focus,
.Select__search:hover {
	border: none;
	outline: none;
	background: var(--design-background-color-primary);
	width: 100%;
}
.Select__popupSearch {
	display: flex;
	padding: calc(1.5 * var(--design-gap-unit)) calc(3 * var(--design-gap-unit));
	padding-bottom: 0;
}

.Select__popupSearchButton {
	margin-right: var(--design-gap-unit);
}
</style>
