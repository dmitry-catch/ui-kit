<script setup lang="ts">
import { ref, toRefs, watch, nextTick, onMounted, onUnmounted, computed } from 'vue'
import { useModalContext } from '../../../utils/useModalContext'
import Icon from '../../general/Icon/Icon.vue'
import DropdownItem from './DropdownItem/DropdownItem.vue'
import Button from '../../general/Button/Button.vue'
import { DropdownGroupType, DropdownItemType } from './types.js'
import { isGroup } from './utils.js'
import { Keyboard } from '../../../consts/Keyboard'
import Popover from '../../non-public/Popover/Popover.vue'

interface DropdownProps {
	modelValue?: boolean
	/** Выделенный галкой выбранный пункт контектстного меню */
	selected?: DropdownItemType[]
	/** Поддержка выбора нескольких пунктов меню */
	multiple?: boolean
	label?: string
	caret?: boolean
	disabled?: boolean
	icon?: string
	size?: 'extra-small' | 'small' | 'medium'
	autoClose?: boolean | ('keyboard' | 'outside' | 'item')[]
	/**
	 * Отступ от кнопки до контекстного меню (в пикселях)
	 * @default 2
	 */
	offset?: number
	loading?: boolean
	items?: Array<DropdownItemType> | Array<DropdownGroupType>
	/** Позволяет задать расположение выпадающего списка под родительским компонентом:
	 ** "start" - от начала родительского компонента
	 ** "end" - до конца родительского компонента
	 * @default "start"
	 */
	placement?: 'start' | 'end'
	variant?: 'icon' | 'functional' | 'accent'
	/** При положительном значении флага ширина выпадающего списка
	 * будет отталкиваться от ширины родительского компонента "Dropdown", если у этого "родителя"
	 * стоит position: relative */
	related?: boolean
	/** "Область просмотра"
	 * Контейнер, относительно которого будет производиться observe */
	viewport?: HTMLElement | null
	/**  Ограничение размера выпадающего списка по высоте в px*/
	height?: number | null
	/**  Ограничение размера выпадающего списка по колличеству элементов*/
	visibleItems?: number | null
}

const props = withDefaults(defineProps<DropdownProps>(), {
	caret: true,
	size: 'medium',
	autoClose: true,
	offset: 2,
	placement: 'start',
	viewport: null,
	visibleItems: 5
})

defineSlots<{
	/** "Контролирующий" элемент. (кнопка выпадающего списка)  */
	toggle?: () => unknown
	/** Заголовок контекстного меню  */
	menuHeader?: () => unknown
	/** Заголовок контента контекстного меню */
	contentHeader?: () => unknown
	/** Элементы контекстного меню  */
	item?: (props: { item: DropdownItemType }) => unknown
	/** Группа элементов контекстного меню  */
	groupLabel?: (props: { group: DropdownGroupType }) => unknown
	/** Нижний колонтитул контента контекстного меню  */
	contentFooter?: () => unknown
	/** Нижний колонтитул контекстного меню  */
	menuFooter?: () => unknown
	/** Передача произвольного контента в контекстное меню */
	default?: () => unknown
}>()

const isDropdownOpen = ref()
const root = ref()

const emit = defineEmits<{
	(e: 'update:modelValue', value: boolean): void
	(e: 'beforeClose'): void
	(e: 'afterClose'): void
}>()

const {
	label,
	caret,
	disabled,
	icon,
	autoClose,
	loading,
	items,
	variant,
	related,
	modelValue,
	selected,
	multiple,
	placement,
	viewport,
	height,
	offset,
	visibleItems
} = toRefs(props)

const menuWidthStyling = computed(() => (related.value ? 'initial' : 'relative'))

const toggleDropdown = () => {
	if (disabled.value || loading.value) return
	if (isDropdownOpen.value) {
		closeDropdown('item')
	} else {
		openDropdown()
	}
}

const closeDropdown = (closeType: 'keyboard' | 'outside' | 'item') => {
	if (autoClose.value === true || (Array.isArray(autoClose.value) && autoClose.value.includes(closeType))) {
		emit('beforeClose')
		isDropdownOpen.value = false
		focusedItemIdx.value = -1
		emit('afterClose')
	}
}

const openDropdown = () => {
	isDropdownOpen.value = true
}

const outsideClickHandler = (evt: MouseEvent) => {
	const target = evt.target as HTMLElement
	const popoverContent = document.querySelector('.Popover__content')
	if (!popoverContent?.contains(target) && isDropdownOpen.value) {
		closeDropdown('outside')
	}
}

const handleClick = (item: DropdownItemType) => {
	if (!item.extraAttrs?.disabled) item.action?.(item)
	{
		if (!selected.value || !multiple.value) closeDropdown('item')
	}
}

const escapeHandler = () => {
	if (isDropdownOpen.value) closeDropdown('keyboard')
}

const dropdownMenuRef = ref()
const dropdownFieldRef = ref()
const dropdownMenuWrapperRef = ref()
const dropdownContentRef = ref()
const totalPixelOffset = ref(`${offset.value}px`)
const below = ref(true)
const dropdownHeight = ref(height.value ?? 0)
const dropdownHeightPx = ref(`${dropdownHeight.value}px`)

const calculateDropdownPosition = (currentDropdownHeight: number) => {
	if (!(dropdownMenuRef.value && dropdownFieldRef.value))
		return {
			dropdownHeight: currentDropdownHeight,
			totalOffset: offset.value
		}

	const rootHeight = root.value.getBoundingClientRect().height

	const dropdownFieldRect = dropdownFieldRef.value.getBoundingClientRect()

	const spaceAbove = dropdownFieldRect.top
	const spaceBelow = window.innerHeight - dropdownFieldRect.bottom

	below.value = isPositionedBelow(dropdownFieldRef.value, currentDropdownHeight)

	const dropdownHeight = below.value
		? calculateDropdownHeight(spaceBelow, currentDropdownHeight, rootHeight)
		: calculateDropdownHeight(spaceAbove, currentDropdownHeight, rootHeight)

	const totalOffset = below.value ? offset.value : rootHeight + offset.value

	return { dropdownHeight, totalOffset }
}

const isPositionedBelow = (element: HTMLElement, height: number) => {
	const spaceBelow = getSpaceBelow(element)
	if (isEnoughSpace(spaceBelow, height)) return true

	const spaceAbove = getSpaceAbove(element)
	if (isEnoughSpace(spaceAbove, height)) {
		return false
	}

	return spaceBelow >= spaceAbove
}

const calculateDropdownHeight = (wrapperHeight: number, componentHeight: number, marginHeight: number): number => {
	return isEnoughSpace(wrapperHeight, componentHeight) ? componentHeight : wrapperHeight - marginHeight
}

const getSpaceAbove = (element: HTMLElement) => element.getBoundingClientRect().top

const getSpaceBelow = (element: HTMLElement) => window.innerHeight - element.getBoundingClientRect().bottom

const isEnoughSpace = (wrapperHeight: number, contentHeight: number) => wrapperHeight > contentHeight

const getContentHeight = () => {
	// DEFAULT_HEIGHT равен примерно пяти однострочным элементам по высоте
	const DEFAULT_HEIGHT = 160
	const DEFAULT_GROUPS_COUNT = 2

	if (!items.value || items.value.length == 0) {
		return DEFAULT_HEIGHT
	}

	const dropdownContent = dropdownContentRef.value as HTMLDivElement
	const contentClass = isGroup(items.value[0]) ? 'Dropdown__contentSubItems' : 'Dropdown__contentItem'
	const itemsCount = isGroup(items.value[0]) ? DEFAULT_GROUPS_COUNT : (visibleItems.value as number)

	const contentItems = Array.from(dropdownContent.children).filter((el) => el.classList.contains(contentClass))

	if (contentItems.length === 0) {
		return DEFAULT_HEIGHT
	}

	const firstElement = dropdownContent
	const lastVisibleIndex = contentItems.length > itemsCount ? itemsCount - 1 : contentItems.length - 1
	const lastElement = contentItems[lastVisibleIndex]

	const firstElementTopPosition = firstElement.getBoundingClientRect().top
	const lastElementBottomPosition = lastElement.getBoundingClientRect().bottom
	return lastElementBottomPosition - firstElementTopPosition
}

const getDropdownHeight = () => {
	if (height.value) {
		return height.value
	}
	const dropdownHeaderHeight = dropdownMenuRef.value.children[0].getBoundingClientRect().height
	const dropdownFooterHeight = dropdownMenuRef.value.children[2].getBoundingClientRect().height
	return dropdownHeaderHeight + dropdownFooterHeight + getContentHeight()
}

watch(isDropdownOpen, () => {
	emit('update:modelValue', isDropdownOpen.value)
	if (isDropdownOpen.value) {
		nextTick(() => {
			const { dropdownHeight, totalOffset } = calculateDropdownPosition(height.value ?? getDropdownHeight())

			dropdownHeightPx.value = `${dropdownHeight}px`
			totalPixelOffset.value = `${totalOffset}px`
		})
	}
})

watch(modelValue, () => {
	isDropdownOpen.value = modelValue.value
})

const focusedItemIdx = ref(-1) // no item is focused initially

const allItems = computed(() => {
	const items: DropdownItemType[] = []
	props.items?.forEach((item) => {
		if (isGroup(item)) {
			items.push(...item.items)
		} else {
			items.push(item)
		}
	})
	return items
})

const focusNextItem = () => {
	focusedItemIdx.value = (focusedItemIdx.value + 1) % allItems.value.length
	scrollIntoViewIfNeeded()
}

const focusPreviousItem = () => {
	focusedItemIdx.value = (focusedItemIdx.value - 1 + allItems.value.length) % allItems.value.length
	scrollIntoViewIfNeeded()
}

const selectFocusedItem = () => {
	if (focusedItemIdx.value >= 0) {
		handleClick(allItems.value[focusedItemIdx.value])
	}
}

const onKeyDown = (evt: KeyboardEvent) => {
	switch (evt.key) {
		case Keyboard.UP:
			if (focusedItemIdx.value == -1) focusedItemIdx.value = 0
			focusPreviousItem()
			evt.preventDefault()
			break
		case Keyboard.DOWN:
			focusNextItem()
			evt.preventDefault()
			break
		case Keyboard.ENTER:
			selectFocusedItem()
			evt.preventDefault()
			break
		case Keyboard.ESC:
			escapeHandler()
			break
	}
}

const scrollIntoViewIfNeeded = () => {
	nextTick(() => {
		const itemElements = dropdownMenuRef.value?.querySelectorAll(
			'.Dropdown__contentSubItem, .Dropdown__contentItem'
		)
		if (focusedItemIdx.value >= 0 && focusedItemIdx.value < itemElements?.length) {
			itemElements[focusedItemIdx.value].scrollIntoView({ block: 'nearest' })
		}
	})
}

let observer: IntersectionObserver | null = null

const createObserver = () => {
	if (dropdownMenuWrapperRef.value) {
		try {
			observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						isDropdownOpen.value = entry.isIntersecting
					})
				},
				{
					root: viewport.value ?? null
				}
			)
			observer.observe(dropdownMenuWrapperRef.value)
		} catch (error) {
			console.log(error)
		}
	}
}

watch(isDropdownOpen, (newValue) => {
	if (newValue) {
		nextTick().then(() => {
			createObserver()
		})
	} else {
		if (observer) {
			observer.disconnect()
			observer = null
		}
	}
})

onMounted(() => {
	isDropdownOpen.value = modelValue.value ?? false
	document.addEventListener('mousedown', outsideClickHandler)
})

onUnmounted(() => {
	observer?.disconnect()
	document.removeEventListener('mousedown', outsideClickHandler)
})

useModalContext(root)
</script>

<template>
	<div ref="root" class="Dropdown">
		<div
			ref="dropdownFieldRef"
			class="Dropdown__button"
			tabindex="0"
			:size="size"
			@click="toggleDropdown"
			@keydown="onKeyDown"
		>
			<slot name="toggle">
				<Button class="Dropdown__field" :class="variant" :disabled="disabled" :loading="loading" :size="size">
					<Icon
						v-if="icon"
						:name="icon"
						class="Dropdown__icon Dropdown__fieldLabelIcon"
						:class="[{ onAccent: variant == 'accent' }]"
						:size="size"
					/>
					<template v-if="!variant?.includes('icon')">{{ label }}</template>
					<Icon
						v-if="caret && !variant?.includes('icon')"
						:name="isDropdownOpen ? 'chevron_up' : 'chevron_down'"
						class="Dropdown__icon Dropdown__fieldIcon"
						:class="[{ onAccent: variant == 'accent' }]"
						:size="size"
					/>
				</Button>
			</slot>
		</div>
		<div ref="dropdownMenuWrapperRef">
			<Popover v-if="isDropdownOpen" :offset="offset" :parentNode="related ? root.parentNode : root">
				<div
					ref="dropdownMenuRef"
					class="Dropdown__menu"
					:related="related"
					:placement="placement"
					:class="[{ 'Dropdown__menu--up': !below }]"
					:size="size"
				>
					<div class="Dropdown__menuHeader" :size="size">
						<slot name="menuHeader"></slot>
					</div>
					<div class="Dropdown__contentWrapper">
						<div
							ref="dropdownContentRef"
							class="Dropdown__content"
							:class="[{ Dropdown__contentDefault: $slots.default }]"
							:size="size"
						>
							<div class="Dropdown__contentHeader" :size="size">
								<slot name="contentHeader"></slot>
							</div>
							<slot>
								<template v-if="items && items.length > 0">
									<template v-for="(item, idx) in items" :key="idx">
										<div
											v-if="isGroup(item)"
											v-bind="item.extraAttrs"
											class="Dropdown__contentSubItems"
										>
											<div class="Dropdown__contentSubItemsLabel" :size="size">
												<slot name="groupLabel" :group="item">{{ item.name }}</slot>
											</div>
											<div
												v-for="(subItem, idx) in item.items"
												:key="idx"
												class="Dropdown__contentSubItemField"
												:class="{
													'Dropdown__item--focused':
														focusedItemIdx === allItems.indexOf(subItem)
												}"
												@click="handleClick(subItem)"
											>
												<div
													v-if="$slots.item"
													v-bind="subItem.extraAttrs"
													class="Dropdown__contentSubItem"
													:class="[subItem.wrapperClass]"
													:size="size"
												>
													<slot
														name="item"
														:item="subItem"
														v-bind="subItem.extraAttrs"
													></slot>
												</div>
												<DropdownItem
													v-else
													v-bind="subItem.extraAttrs"
													:picked="selected?.includes(subItem)"
													class="Dropdown__contentSubItem"
													:class="[subItem.wrapperClass]"
													:size="size"
												>
													{{ subItem.label }}
												</DropdownItem>
											</div>
										</div>
										<template v-else>
											<div
												v-if="$slots.item"
												v-bind="item.extraAttrs"
												class="Dropdown__contentItem"
												:class="[
													item.wrapperClass,
													{
														'Dropdown__item--focused':
															focusedItemIdx === allItems.indexOf(item)
													}
												]"
												:size="size"
												@click="handleClick(item)"
											>
												<slot name="item" :item="item"></slot>
											</div>
											<DropdownItem
												v-else
												v-bind="item.extraAttrs"
												:picked="selected?.includes(item)"
												class="Dropdown__contentItem"
												:class="[
													item.wrapperClass,
													{
														'Dropdown__item--focused':
															focusedItemIdx === allItems.indexOf(item)
													}
												]"
												:size="size"
												@click="handleClick(item)"
											>
												{{ item.label }}
											</DropdownItem>
										</template>
									</template>
								</template>
							</slot>
							<div class="Dropdown__contentFooter" :size="size">
								<slot name="contentFooter"></slot>
							</div>
						</div>
					</div>
					<div class="Dropdown__menuFooter" :size="size">
						<slot name="menuFooter"></slot>
					</div>
				</div>
			</Popover>
		</div>
	</div>
</template>

<style scoped>
.Dropdown {
	width: max-content;
	box-sizing: border-box;
	position: v-bind(menuWidthStyling);
}

.Dropdown__button {
	display: flex;
	justify-content: space-between;
	cursor: pointer;
}

.Dropdown__fieldLabel {
	display: flex;
	justify-content: flex-start;
	gap: var(--design-gap-unit);
}

.Dropdown__menu {
	box-sizing: border-box;
	position: absolute;
	display: flex;
	flex-direction: column;
	top: 0;
	width: 100%;
	left: 0%;
	max-height: calc(v-bind(dropdownHeightPx) + calc(var(--design-gap-unit) * 2));
	border-radius: var(--design-border-radius-control);
	overflow: hidden;
	box-shadow: var(--dropdown-box-shadow);
	border: 1px solid var(--design-border-color-primary);
	z-index: var(--dropdown-z-index);
	min-width: max-content;
	background-color: var(--design-background-color-primary);
	padding: 2px 0;
}

.Dropdown__contentWrapper {
	overflow: auto;
	height: auto;
	padding: var(--design-gap-unit);
}

.Dropdown__menu[related='true'] {
	min-width: 0%;
}

.Dropdown__menu[placement='end'] {
	left: auto;
	right: 0%;
}
.Dropdown__item--focused {
	background: var(--design-background-color-on-accent-primary);
}

.Dropdown__menuHeader,
.Dropdown__contentItem,
.Dropdown__contentSubItemsLabel,
.Dropdown__contentSubItem,
.Dropdown__menuFooter,
.Dropdown__contentFooter .Dropdown__contentDefault {
	gap: calc(0.5 * var(--design-gap-unit)) 0;
	background-color: var(--design-background-color-primary);
}

.Dropdown__menuHeader {
	padding-bottom: calc(var(--design-gap-unit));
}

.Dropdown__contentSubItemField:hover,
.Dropdown__contentItem:hover {
	background-color: var(--design-background-color-on-accent-primary);
	cursor: pointer;
}

.Dropdown__contentSubItem:hover {
	background-color: var(--design-background-color-on-accent-primary);
}
.Dropdown__content .Dropdown__contentSubItems {
	border-top: 1px solid var(--design-border-color-primary);
	border-bottom: 1px solid var(--design-border-color-primary);
}

.Dropdown__content .Dropdown__contentSubItems ~ .Dropdown__contentSubItems,
.Dropdown__menuHeader:empty + .Dropdown__content .Dropdown__contentSubItems {
	border-top: none;
}

.Dropdown__content {
	overflow: hidden;
}

.Dropdown__contentSubItemsLabel :deep(*),
:deep(.Dropdown__contentSubItemsLabel) {
	font-weight: 600;
}

.Dropdown__menu:not(.Dropdown__menu--up) {
	margin-top: v-bind(totalPixelOffset);
}

.Dropdown__menu--up {
	position: relative;
	bottom: v-bind(totalPixelOffset);
}

.Dropdown__icon.onAccent :deep(path) {
	fill: var(--design-background-color-primary);
}

.Dropdown__contentItem[disabled],
.Dropdown__contentSubItem[disabled],
.Dropdown__contentSubItems[disabled] {
	background: var(--design-background-color-on-accent-primary);
	cursor: pointer;
}

.Dropdown__contentItem[disabled] :deep(*),
.Dropdown__contentSubItem[disabled] :deep(*),
.Dropdown__contentSubItems[disabled] :deep(*) {
	color: var(--design-background-color-disabled-primary);
}

.Dropdown__menuFooter {
	position: relative;
}

/* Size Styling */
/* Extra-Small Size Styling */
.Dropdown__menu[size='extra-small'] :deep(.DropdownItem > *) {
	--icon-size: 20px;
	font-size: var(--design-font-size-footnote);
	padding: calc(0.25 * var(--design-gap-unit));
	line-height: var(--design-line-height-footnote);
	gap: calc(0.5 * var(--design-gap-unit));
}

.Dropdown__menuHeader[size='extra-small'],
.Dropdown__contentItem[size='extra-small'],
.Dropdown__contentSubItemsLabel[size='extra-small'],
.Dropdown__contentSubItem[size='extra-small'],
.Dropdown_menuFooter[size='extra-small'] {
	padding: calc(0.5 * var(--design-gap-unit)) calc(3 * var(--design-gap-unit));
	font-size: var(--design-font-size-footnote);
	line-height: var(--design-line-height-footnote);
}

.Dropdown__button[size='extra-small'] :deep(*),
.Dropdown__menu[size='extra-small'] :deep(*) {
	font-size: var(--design-font-size-footnote);
	line-height: var(--design-line-height-footnote);
}

.Dropdown__icon[size='extra-small'] {
	--icon-size: 18px;
}

/* Small Size Styling */

.Dropdown__menu[size='small'] :deep(.DropdownItem > *) {
	font-size: var(--design-font-size-small);
	padding: calc(0.5 * var(--design-gap-unit)) calc(3 * var(--design-gap-unit));
	gap: calc(0.5 * var(--design-gap-unit));
}

.Dropdown__menuHeader[size='small'],
.Dropdown__contentItem[size='small'],
.Dropdown__contentSubItemsLabel[size='small'],
.Dropdown__contentSubItem[size='small'],
.Dropdown_menuFooter[size='small'] {
	font-size: var(--design-font-size-small);
	line-height: var(--design-line-height-small);
	padding: calc(0.5 * var(--design-gap-unit)) calc(3 * var(--design-gap-unit));
}

.Dropdown__button[size='small'] :deep(*),
.Dropdown__menu[size='small'] :deep(*) {
	font-size: var(--design-font-size-small);
	line-height: var(--design-line-height-small);
}

.Dropdown__icon[size='small'] {
	--icon-size: 20px;
}

.Dropdown__contentItem {
	padding: calc(0.5 * var(--design-gap-unit)) calc(3 * var(--design-gap-unit));
}

/*  */

.Dropdown__menuHeader:empty,
.Dropdown_menuFooter:empty {
	padding: 0;
}
</style>
