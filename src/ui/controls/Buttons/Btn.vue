<style>
.Btn__actual {
	--button-background-color-primary: var(--design-background-color-primary);
	--button-background-color-secondary: var(--design-background-color-secondary);
	--button-text-color-primary: var(--design-text-color-primary);
	--button-text-color-secondary: var(--design-text-color-secondary);
	--button-border-color-primary: var(--design-border-color-primary);
	--button-border-color-secondary: var(--design-border-color-secondary);
	border: 1px solid var(--button-text-color-primary);
	border-radius: var(--design-border-radius-control);
	background: var(--button-background-color-primary);
	padding: var(--design-gap-unit) calc(3 * var(--design-gap-unit));
	color: var(--button-text-color-primary);
	display: flex;
	justify-content: center;
	align-items: center;
	gap: var(--design-gap-unit);
	min-width: 144px;
	box-sizing: border-box;
	height: min-content;
	white-space: nowrap;
}
.Btn__actual:focus-visible {
	outline: var(--design-border-color-focus) 3px solid;
}
.Btn__actual:hover,
.Btn__actual:active,
.Btn.pressed .Btn__actual {
	background: var(--button-background-color-secondary);
	color: var(--button-text-color-secondary);
	border-color: var(--button-border-color-secondary);
}

.Btn.accent .Btn__actual {
	--button-background-color-primary: var(--design-background-color-accent-primary);
	--button-background-color-secondary: var(--design-background-color-accent-secondary);
	--button-text-color-primary: var(--design-text-color-on-accent-primary);
	--button-text-color-secondary: var(--design-text-color-on-accent-secondary);
	--button-border-color-primary: var(--design-border-color-accent-primary);
	--button-border-color-secondary: var(--design-border-color-accent-secondary);
}

.Btn.minimal .Btn__actual {
	--button-background-color-primary: var(--design-background-color-primary);
	--button-background-color-secondary: var(--design-background-color-secondary);
	--button-text-color-primary: var(--design-text-color-accent);
	--button-text-color-secondary: var(--design-text-color-accent);
	border: none;
}

.Btn.warning .Btn__actual {
	--button-background-color-primary: var(--design-background-color-warning-primary);
	--button-background-color-secondary: var(--design-background-color-warning-secondary);
	--button-text-color-primary: var(--design-text-color-warning);
	--button-text-color-secondary: var(--design-text-color-warning);
	--button-border-color-primary: var(--design-border-color-warning-primary);
	--button-border-color-secondary: var(--design-border-color-warning-secondary);
}
.Btn.warning.accent .Btn__actual {
	--button-text-color-primary: var(--design-text-color-on-accent-primary);
	--button-text-color-secondary: var(--design-text-color-on-accent-secondary);
}

.Btn.danger .Btn__actual {
	--button-background-color-primary: var(--design-background-color-danger-primary);
	--button-background-color-secondary: var(--design-background-color-danger-secondary);
	--button-text-color-primary: var(--design-text-color-danger);
	--button-text-color-secondary: var(--design-text-color-danger);
	--button-border-color-primary: var(--design-border-color-danger-primary);
	--button-border-color-secondary: var(--design-border-color-danger-secondary);
}
.Btn.danger.accent .Btn__actual {
	--button-text-color-primary: var(--design-text-color-on-accent-primary);
	--button-text-color-secondary: var(--design-text-color-on-accent-secondary);
}

.Btn.functional .Btn__actual {
	border: none;
	padding: 0;
	justify-content: start;
}

.Btn .Btn__actual.icon .Btn__dropdownIcon {
	display: none;
}

.Btn__dropdownItem {
	padding: var(--design-gap-unit) calc(3 * var(--design-gap-unit));
}
.Btn__dropdownItem:hover {
	background: var(--design-background-color-secondary);
}
</style>

<template>
	<div class="Btn">
		<button class="Btn__actual" @click="toggleDropdown">
			<slot name="before"></slot>
			<slot></slot>
			<slot name="after"></slot>
			<Icon v-if="hasDropdown" class="Btn__dropdownIcon" name="chevron_down"></Icon>
		</button>
		<Dropdown v-if="hasDropdown && dropdownOpened">
			<slot name="dropdown">
				<div v-for="option in dropdown" class="Btn__dropdownItem" @click="dropdownOptionClick(option.action)">
					{{ option.name }}
				</div>
			</slot>
		</Dropdown>
	</div>
</template>
<script setup lang="ts">
import { computed, ref, toRefs } from 'vue'
import Icon from '../../icons/Icon.vue'
import Dropdown from '../../layout/Dropdown.vue'

const props = defineProps({
	accent: { default: () => false, type: Boolean },
	minimal: { default: () => false, type: Boolean },
	functional: { default: () => false, type: Boolean },
	danger: { default: () => false, type: Boolean },
	warning: { default: () => false, type: Boolean },
	disabled: { default: () => false, type: Boolean },
	pressed: { default: () => false, type: Boolean },
	dropdown: { default: () => [], type: Array }
})

const { accent, minimal, danger, warning, disabled, pressed, dropdown } = toRefs(props)

const booleanAttribute = (value: any) => (value ? true : undefined)

const hasDropdown = computed(() => !!dropdown?.value?.length)
const dropdownOpened = ref(false)

const toggleDropdown = () => (dropdownOpened.value = !dropdownOpened.value)
const dropdownOptionClick = async (action: Function) => {
	let close = true
	const preventDefault = () => (close = false)
	if (typeof action === 'function') await action({ preventDefault })
	if (close) toggleDropdown()
}
</script>
