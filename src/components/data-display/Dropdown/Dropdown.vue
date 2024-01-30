<script setup lang="ts">
import { ref, toRefs, watch, nextTick, onMounted, onUnmounted, computed } from 'vue'
import Icon from '../../general/Icon/Icon.vue'
import DropdownItem from './DropdownItem/DropdownItem.vue'
import Button from '../../general/Button/Button.vue'
import { DropdownGroupType, DropdownItemType } from './types.js'
import { isGroup } from './utils.js'
import { Keyboard } from '../../../consts/Keyboard'

interface DropdownProps {
	title?: string | boolean
	caret?: boolean
	disabled?: boolean
	icon?: string
	size?: 'extra-small' | 'small' | 'medium'
	autoClose?: boolean | ('keyboard' | 'outside' | 'item')[]
	offset?: number
	loading?: boolean
	items?: Array<DropdownItemType> | Array<DropdownGroupType>
	variant?: 'icon' | 'functional' | 'accent'
	related?: boolean
}

const props = withDefaults(defineProps<DropdownProps>(), {
	caret: true,
	size: 'medium',
	autoClose: true,
	offset: 2
})

defineSlots<{
	toggle?: () => unknown
	header?: () => unknown
	item?: () => unknown
	groupLabel?: () => unknown
	footer?: () => unknown
	default?: () => unknown
}>()

defineExpose({
	close: () => closeDropdown(),
	open: () => openDropdown()
})

const emit = defineEmits(['beforeClose', 'afterClose'])

const { title, caret, disabled, icon, size, autoClose, offset, loading, items, variant, related } = toRefs(props)

const isDropdownOpen = ref(false)
const root = ref()
const menuWidthStyling = computed(() => (related.value ? 'initial' : 'relative'))

const toggleDropdown = () => {
	if (disabled.value || loading.value) return
	if (isDropdownOpen.value) {
		closeDropdown()
	} else {
		openDropdown()
	}
}

const closeDropdown = () => {
	emit('beforeClose')
	isDropdownOpen.value = false
	emit('afterClose')
}

const openDropdown = () => {
	isDropdownOpen.value = true
}

const escapeHandler = (evt: KeyboardEvent) => {
	if (
		evt.key === Keyboard.ESC &&
		isDropdownOpen.value &&
		(autoClose.value === true || (Array.isArray(autoClose.value) && autoClose.value.includes('keyboard')))
	) {
		closeDropdown()
	}
}

const outsideClickHandler = (evt: MouseEvent) => {
	if (
		!root.value.contains(evt.target) &&
		isDropdownOpen.value &&
		(autoClose.value === true || (Array.isArray(autoClose.value) && autoClose.value.includes('outside')))
	) {
		closeDropdown()
	}
}

const itemClickHandler = (item: DropdownItemType) => {
	if (!item.extraAttrs?.disabled) item.action?.(item)
	if (autoClose.value === true || (Array.isArray(autoClose.value) && autoClose.value.includes('item'))) {
		closeDropdown()
	}
}

const dropdownMenuRef = ref()
const dropdownFieldRef = ref()

const isEnoughSpaceForMenu = ref(true)
const dropdownHeigth = ref(0)
const totalOffset = ref('')

const calculateDropdownPosition = () => {
	nextTick(() => {
		if (dropdownMenuRef.value && dropdownFieldRef.value) {
			const dropdownMenuRect = dropdownMenuRef.value.getBoundingClientRect()
			const dropdownFieldRect = dropdownFieldRef.value.getBoundingClientRect()
			const spaceBelow = window.innerHeight - dropdownFieldRect.bottom
			isEnoughSpaceForMenu.value = spaceBelow >= dropdownMenuRect.height + offset.value
			dropdownHeigth.value = root.value.getBoundingClientRect().height
			totalOffset.value = isEnoughSpaceForMenu.value
				? `${offset.value}px`
				: `${dropdownHeigth.value + offset.value}px`
		}
	})
}

watch(isDropdownOpen, () => {
	if (isDropdownOpen.value) {
		calculateDropdownPosition()
	}
})

onMounted(() => {
	document.addEventListener('mousedown', outsideClickHandler)
	document.addEventListener('keydown', escapeHandler)
})

onUnmounted(() => {
	document.removeEventListener('mousedown', outsideClickHandler)
	document.removeEventListener('keydown', escapeHandler)
})
</script>

<template>
	<div ref="root" class="Dropdown">
		<div ref="dropdownFieldRef" class="Dropdown__button" @click="toggleDropdown" :class="size">
			<slot name="toggle">
				<Button class="Dropdown__field" :class="variant" :disabled="disabled" :loading="loading" :size="size">
					<Icon
						v-if="icon"
						:name="icon"
						class="Dropdown__icon Dropdown__fieldLabelIcon"
						:class="[{ onAccent: variant == 'accent' }, size]"
					/>
					<template v-if="!variant?.includes('icon')">{{ title }}</template>
					<Icon
						v-if="caret && !variant?.includes('icon')"
						name="chevron_down"
						class="Dropdown__icon Dropdown__fieldIcon"
						:class="[{ onAccent: variant == 'accent' }, size]"
					/>
				</Button>
			</slot>
		</div>
		<div
			v-if="isDropdownOpen"
			class="Dropdown__menu"
			:class="[{ 'Dropdown__menu--up': !isEnoughSpaceForMenu }, size]"
			ref="dropdownMenuRef"
		>
			<div class="Dropdown__menuHeader" :class="size">
				<slot name="header"></slot>
			</div>
			<div class="Dropdown__content" :class="[{ Dropdown__contentDefault: $slots.default }, size]">
				<slot>
					<template v-if="items && items.length > 0">
						<template v-for="(item, idx) in items" :key="idx">
							<div v-if="isGroup(item)" v-bind="item.extraAttrs" class="Dropdown__contentSubItems">
								<div class="Dropdown__contentSubItemsLabel" :class="size">
									<slot name="groupLabel" :group="item">{{ item.name }}</slot>
								</div>
								<div
									v-for="(subItem, idx) in item.items"
									:key="idx"
									@click="itemClickHandler(subItem)"
									class="Dropdown__contentSubItemField"
								>
									<div
										v-if="$slots.item"
										v-bind="subItem.extraAttrs"
										:class="[size, subItem.wrapperClass]"
										class="Dropdown__contentSubItem"
									>
										<slot name="item" :item="subItem" v-bind="subItem.extraAttrs"></slot>
									</div>
									<DropdownItem
										v-else
										v-bind="subItem.extraAttrs"
										:class="[subItem.wrapperClass, size]"
										class="Dropdown__contentSubItem"
									>
										{{ subItem.label }}
									</DropdownItem>
								</div>
							</div>
							<template v-else>
								<div
									v-if="$slots.item"
									v-bind="item.extraAttrs"
									:class="[size, item.wrapperClass]"
									class="Dropdown__contentItem"
									@click="itemClickHandler(item)"
								>
									<slot name="item" :item="item"></slot>
								</div>
								<DropdownItem
									v-else
									v-bind="item.extraAttrs"
									:class="[item.wrapperClass, size]"
									class="Dropdown__contentItem"
									@click="itemClickHandler(item)"
								>
									{{ item.label }}
								</DropdownItem>
							</template>
						</template>
					</template>
				</slot>
			</div>
			<div>
				<div class="Dropdown_menuFooter" :class="size">
					<slot name="footer"></slot>
				</div>
			</div>
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
}

.Dropdown__fieldLabel {
	display: flex;
	justify-content: flex-start;
	gap: var(--design-gap-unit);
}

.Dropdown__menu {
	position: absolute;
	width: 100%;
	left: 0%;
	border-radius: var(--design-border-radius-control);
	max-height: 322px;
	overflow: auto;
	box-shadow: var(--dropdown-box-shadow);
	border: 1px solid var(--design-border-color-primary);
}

.Dropdown__menuHeader,
.Dropdown__contentItem,
.Dropdown__contentSubItemsLabel,
.Dropdown__contentSubItem,
.Dropdown_menuFooter,
.Dropdown__contentDefault {
	padding: calc(var(--design-gap-unit) / 2) var(--design-gap-unit);
}

.Dropdown__contentSubItemField:hover,
.Dropdown__contentItem:hover {
	background-color: var(--design-background-color-tertiary);
	cursor: pointer;
}

.Dropdown__content .Dropdown__contentSubItems {
	border-top: 1px solid var(--design-border-color-primary);
	border-bottom: 1px solid var(--design-border-color-primary);
}

.Dropdown__content .Dropdown__contentSubItems ~ .Dropdown__contentSubItems,
.Dropdown__menuHeader:empty + .Dropdown__content .Dropdown__contentSubItems {
	border-top: none;
}

.Dropdown__contentSubItemsLabel :deep(*),
:deep(.Dropdown__contentSubItemsLabel) {
	font-weight: 600;
}

.Dropdown__menu:not(.Dropdown__menu--up) {
	margin-top: v-bind(totalOffset);
}

.Dropdown__menu--up {
	position: relative;
	bottom: v-bind(totalOffset);
}

.Dropdown__icon.onAccent :deep(path) {
	fill: var(--design-background-color-primary);
}

.Dropdown__contentItem[disabled],
.Dropdown__contentSubItem[disabled],
.Dropdown__contentSubItems[disabled] {
	background: var(--design-background-color-tertiary);
	cursor: pointer;
}

.Dropdown__contentItem[disabled] :deep(*),
.Dropdown__contentSubItem[disabled] :deep(*),
.Dropdown__contentSubItems[disabled] :deep(*) {
	color: var(--design-background-color-disabled-primary);
}

/* Size Styling */

/* Extra-Small Size Styling */

.Dropdown__menu.extra-small :deep(.DropdownItem > *) {
	--icon-size: 20px;
	font-size: var(--design-font-size-footnote);
	padding: calc(var(--design-gap-unit) / 4);
	line-height: var(--design-line-height-footnote);
	gap: calc(var(--design-gap-unit) / 2);
}

.Dropdown__menuHeader.extra-small,
.Dropdown__contentItem.extra-small,
.Dropdown__contentSubItemsLabel.extra-small,
.Dropdown__contentSubItem.extra-small,
.Dropdown_menuFooter.extra-small,
.Dropdown__contentDefault.extra-small {
	padding: calc(var(--design-gap-unit) / 4);
	font-size: var(--design-font-size-footnote);
	line-height: var(--design-line-height-footnote);
}

.Dropdown__button.extra-small {
	font-size: var(--design-font-size-footnote);
	line-height: var(--design-line-height-footnote);
}

.Dropdown__button.extra-small :deep(*),
.Dropdown__menuHeader.extra-small :deep(*),
.Dropdown__contentItem.extra-small :deep(*),
.Dropdown__contentSubItemsLabel.extra-small :deep(*),
.Dropdown__contentSubItem.extra-small :deep(*),
.Dropdown_menuFooter.extra-small :deep(*),
.Dropdown__contentDefault.extra-small :deep(*) {
	font-size: var(--design-font-size-footnote);
	line-height: var(--design-line-height-footnote);
}

.Dropdown__icon.extra-small {
	--icon-size: 18px;
}

/* Small Size Styling */

.Dropdown__menu.small :deep(.DropdownItem > *) {
	font-size: var(--design-font-size-small);
	padding: calc(var(--design-gap-unit) / 4) calc(var(--design-gap-unit) / 2);
	gap: calc(var(--design-gap-unit) / 2);
}

.Dropdown__menuHeader.small,
.Dropdown__contentItem.small,
.Dropdown__contentSubItemsLabel.small,
.Dropdown__contentSubItem.small,
.Dropdown_menuFooter.small,
.Dropdown__contentDefault.small {
	font-size: var(--design-font-size-small);
	line-height: var(--design-line-height-small);
	padding: calc(var(--design-gap-unit) / 4) calc(var(--design-gap-unit) / 2);
}

.Dropdown__button.small {
	font-size: var(--design-font-size-small);
	line-height: var(--design-line-height-small);
}

.Dropdown__button.small :deep(*),
.Dropdown__menuHeader.small :deep(*),
.Dropdown__contentItem.small :deep(*),
.Dropdown__contentSubItemsLabel.small :deep(*),
.Dropdown__contentSubItem.small :deep(*),
.Dropdown_menuFooter.small :deep(*),
.Dropdown__contentDefault.small :deep(*) {
	font-size: var(--design-font-size-small);
	line-height: var(--design-line-height-small);
}

.Dropdown__icon.small {
	--icon-size: 20px;
}

/*  */

.Dropdown__menuHeader:empty,
.Dropdown_menuFooter:empty {
	padding: 0;
}
</style>
