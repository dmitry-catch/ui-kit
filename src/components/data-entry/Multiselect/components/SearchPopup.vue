<script setup lang="ts">
import { toRefs } from 'vue'
import { DropdownItemType } from '../../../data-display/Dropdown/types'
import { Dropdown, Button, Icon, TextField } from '../../../../main'

interface SearchPopupProps {
	items?: DropdownItemType[]
	selectedItems?: DropdownItemType[]
	size?: 'extra-small' | 'small' | 'medium'
	disabled?: boolean
	loading?: boolean
	/** Добавляет ограничение на минимальное колличество символов */
	searchMinLength?: number
	/** Добавляет счётчик символов и ограничение в попап поиск и просто ограничение в инпут поиск */
	searchMaxLength?: number
	/** Плейсхолдер для поиска во контекстном меню */
	popupPlaceholder?: string
	isSearchVisible?: boolean
}

const props = defineProps<SearchPopupProps>()
const {
	items,
	size,
	disabled,
	loading,
	searchMinLength,
	searchMaxLength,
	popupPlaceholder,
	isSearchVisible,
	selectedItems
} = toRefs(props)

const emit = defineEmits<{
	(e: 'clearInput'): void
	(e: 'open'): void
}>()

const dropdownOpen = defineModel<boolean>({ required: true })
const searchInput = defineModel<string>('searchInput', { required: true })
const searchPopupRef = defineModel<InstanceType<typeof Dropdown>>('searchPopupRef')

const slots = defineSlots<{
	/**  Невыбираемый фиксированный первый элемент выпадающего списка */
	listHeader?: string | unknown
	/**  Внутреннее наполнение выпадающего списка */
	listDefault?: unknown
	/**  Кастомный компонент для элемента выпадающего списка (передаётся параметр listItem типа DropdownItemType) */
	listItem?: (listItem: unknown) => unknown
	/**  Заголовок для группы элементов списка */
	listGroupLabel?: (listGroupLabel: unknown) => string | unknown
	/**  Невыбираемый фиксированный последний элемент выпадающего списка */
	listFooter?: string | unknown
	/**  Подсказка при отсутсвии совпадения поискового запроса и эементов списка */
	empty?: string | unknown
}>()
</script>
<template>
	<Dropdown
		ref="searchPopupRef"
		v-model="dropdownOpen"
		v-model:selected="selectedItems"
		class="SearchPopup"
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
				class="SearchPopup__input"
				:minLength="searchMinLength"
				:maxLength="searchMaxLength"
				:placeholder="popupPlaceholder"
			>
				<template #before>
					<Icon name="search" class="SearchPopup__inputButton" />
				</template>

				<template #after>
					<Button v-if="searchInput" class="icon functional" :size="size" @click="() => emit('clearInput')">
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
			<div class="SearchPopup__checkbox">
				<span class="SearchPopup__checkboxVisible" :visible="selectedItems.includes(item)">
					<Icon class="SearchPopup__checkboxChecked" name="check"></Icon>
				</span>
				{{ item.label }}
			</div>
		</template>
		<template v-if="slots.listGroupLabel" #groupLabel="groupProps"
			><slot name="listGroupLabel" :groupLabel="groupProps"></slot
		></template>
		<template v-if="slots.listFooter || items?.length == 0" #footer>
			<span v-if="items?.length == 0 && !searchInput" class="SearchPopup__itemHint">Нет элементов</span>
			<span v-if="items?.length == 0 && searchInput" class="SearchPopup__itemHint"
				>Нет совпадений «{{ searchInput }}»</span
			>
			<slot v-if="items?.length == 0 && slots.empty" name="empty"></slot>
			<slot name="listFooter"></slot>
		</template>
	</Dropdown>
</template>
<style scoped>
.SearchPopup__input {
	display: flex;
	padding: calc(1.5 * var(--design-gap-unit)) calc(3 * var(--design-gap-unit));
}

.SearchPopup__inputButton {
	margin-right: var(--design-gap-unit);
}

.SearchPopup__checkbox {
	display: flex;
	gap: calc(1.5 * var(--design-gap-unit));
	align-content: center;
}
.SearchPopup__checkboxVisible {
	width: var(--design-current-line-height);
	height: var(--design-current-line-height);
	border-radius: var(--design-border-radius-control);
	border: var(--design-border-color-primary) solid 1px;
	display: inline-block;
	box-sizing: border-box;
}
.SearchPopup__checkboxChecked {
	visibility: hidden;
	--icon-color: var(--design-background-color-on-accent-primary);
	--icon-size: var(--design-current-line-height);
}

.SearchPopup__checkboxVisible[visible='true'] > .SearchPopup__checkboxChecked {
	visibility: initial;
	background: var(--design-background-color-accent-primary);
}

.SearchPopup__itemHint {
	display: block;
	padding: 0 calc(3 * var(--design-gap-unit));
	margin-bottom: var(--design-gap-unit);
}
</style>
