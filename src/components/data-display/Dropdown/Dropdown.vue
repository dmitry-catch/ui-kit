<script setup lang="ts">
import { ref, toRefs, watch, nextTick } from 'vue'
import Icon from '../../general/Icon/Icon.vue'

interface DropdownProps {
	title?: string | boolean
	chevroned?: boolean
	disabled?: boolean
	preIcon?: string
	size?: 'extra-small' | 'small' | 'medium'
}

const props = withDefaults(defineProps<DropdownProps>(), {
	chevroned: true,
	size: 'medium'
})

defineSlots<{
	default?: () => Node[]
}>()

const { title, chevroned, disabled, preIcon, size } = toRefs(props)

const isDropdownOpen = ref(false)

const toggleDropdown = () => {
	if (disabled.value) return
	isDropdownOpen.value = !isDropdownOpen.value
}

const dropdownMenuRef = ref()
const dropdownFieldRef = ref()

const isEnoughSpaceForMenu = ref(true)

const calculateDropdownPosition = () => {
	nextTick(() => {
		if (dropdownMenuRef.value && dropdownFieldRef.value) {
			const dropdownMenuRect = dropdownMenuRef.value.getBoundingClientRect()
			const dropdownFieldRect = dropdownFieldRef.value.getBoundingClientRect()
			const spaceBelow = window.innerHeight - dropdownFieldRect.bottom
			isEnoughSpaceForMenu.value = spaceBelow >= dropdownMenuRect.height
		}
	})
}

watch(isDropdownOpen, () => {
	if (isDropdownOpen.value) {
		calculateDropdownPosition()
	}
})
</script>

<template>
	<div ref="root" class="Dropdown">
		<div
			class="Dropdown__field"
			:class="{ 'Dropdown__field--disabled': disabled }"
			@click="toggleDropdown"
			ref="dropdownFieldRef"
		>
			<div class="Dropdown__fieldLabel" :class="size">
				<Icon v-if="preIcon" :name="preIcon" class="Dropdown__icon" />
				<span v-if="title" class="Dropdown__fieldTitle">
					{{ title }}
				</span>
			</div>
			<Icon v-if="chevroned" name="chevron_down" class="Dropdown__icon Dropdown__fieldIcon" :class="size" />
		</div>
		<div
			v-if="isDropdownOpen"
			class="Dropdown__content"
			:class="[{ 'Dropdown__content--up': !isEnoughSpaceForMenu }, size]"
			ref="dropdownMenuRef"
		>
			<slot></slot>
		</div>
	</div>
</template>

<style scoped>
.Dropdown {
	width: max-content;
}

.Dropdown__field {
	display: flex;
	justify-content: space-between;
	background-color: var(--design-background-color-on-accent-primary);
	border-radius: var(--design-border-radius-control);
	width: max-content;
	cursor: pointer;
}

.Dropdown__fieldLabel {
	display: flex;
	gap: var(--design-gap-unit);
	padding: var(--design-gap-unit);
	border-radius: var(--design-border-radius-control) 0 0 var(--design-border-radius-control);
}

.Dropdown__fieldIcon {
	padding: var(--design-gap-unit);
	border-radius: 0 var(--design-border-radius-control) var(--design-border-radius-control) 0;
}

.Dropdown__fieldLabel:hover,
.Dropdown__fieldIcon:hover {
	background-color: var(--design-background-color-tertiary);
}

.Dropdown__content {
	border-radius: var(--design-border-radius-control);
	max-height: 322px;
	overflow: auto;
	box-shadow: var(--dropdown-box-shadow);
}

.Dropdown__content > * {
	padding: calc(var(--design-gap-unit) / 2) var(--design-gap-unit);
	cursor: pointer;
}

.Dropdown__field.Dropdown__field--disabled {
	background: var(--design-background-color-tertiary);
	cursor: not-allowed;
}

.Dropdown__field--disabled .Dropdown__fieldTitle,
.Dropdown__field--disabled :deep(.Icon path) {
	color: var(--design-background-color-disabled-primary);
}

.Dropdown__content--up {
	position: relative;
	bottom: 100%;
}

/* Size Styling */

/* Extra-Small Size Styling */
.Dropdown__fieldLabel.extra-small,
.Dropdown__fieldIcon.extra-small {
	--icon-size: 20px;
	font-size: var(--design-font-size-footnote);
	padding: calc(var(--design-gap-unit) / 4);
	gap: var(--design-gap-unit);
}

.Dropdown__fieldLabel.extra-small .Dropdown__fieldTitle {
	font-size: var(--design-font-size-footnote);
	line-height: var(--design-line-height-footnote);
	padding: 0 calc(var(--design-gap-unit) / 4);
}

.Dropdown__content.extra-small :deep(.DropdownItem:not(.divider)),
.Dropdown__content.extra-small :deep(.DropdownItem > *) {
	--icon-size: 20px;
	font-size: var(--design-font-size-footnote);
	padding: calc(var(--design-gap-unit) / 4);
	line-height: var(--design-line-height-footnote);
	gap: calc(var(--design-gap-unit) / 2);
}

/* Small Size Styling */

.Dropdown__fieldLabel.small,
.Dropdown__fieldIcon.small {
	font-size: var(--design-font-size-small);
	padding: calc(var(--design-gap-unit) / 2);
}

.Dropdown__fieldLabel.small .Dropdown__fieldTitle {
	font-size: var(--design-font-size-small);
	padding: 0 calc(var(--design-gap-unit) / 2);
}

.Dropdown__content.small :deep(.DropdownItem:not(.divider)),
.Dropdown__content.small :deep(.DropdownItem > *) {
	font-size: var(--design-font-size-small);
	padding: calc(var(--design-gap-unit) / 4) calc(var(--design-gap-unit) / 2);
	gap: calc(var(--design-gap-unit) / 2);
}
</style>
