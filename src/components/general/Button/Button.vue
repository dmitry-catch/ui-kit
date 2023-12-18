<script setup lang="ts">
import { computed, ref, toRefs } from 'vue'
import Icon from '../Icon/Icon.vue'
import ListBox from '../../data-display/ListBox/ListBox.vue'
import Spinner from './components/Spinner.vue'
import type { ListBoxOption } from '../../data-display/ListBox/types.js'

//TODO move from the 'class' prop predefined classes
interface BtnProps {
	/** Массив значений для выпадающего списка. */
	dropdown?: ListBoxOption[]
	disabled?: boolean
	isLoading?: boolean
	size?: 'medium' | 'small'
}

const props = withDefaults(defineProps<BtnProps>(), {
	dropdown: () => [],
	disabled: false,
	size: 'medium'
})

const root = ref()

const { dropdown, disabled, isLoading } = toRefs(props)

const hasDropdown = computed(() => !!dropdown?.value?.length)
const dropdownOpened = ref(false)

const toggleDropdown = () => (dropdownOpened.value = !dropdownOpened.value)
const clickOutside = (event: Event) => {
	if (!event.composedPath().includes(root.value)) dropdownOpened.value = false
}
</script>

<template>
	<div ref="root" class="Btn" :class="{ disabled: disabled }">
		<button class="Btn__actual accent" :class="[props.size]" :disabled="disabled" @click="toggleDropdown">
			<Spinner :variant="'dark'" v-if="isLoading" />
			<slot name="before"></slot>
			<slot></slot>
			<slot name="after"></slot>
			<Icon v-if="hasDropdown" class="Btn__dropdownIcon" name="chevron_down"></Icon>
		</button>
		<ListBox v-if="hasDropdown && dropdownOpened" :options="dropdown" @closeRequest="clickOutside">
			<template #item="{ data }">
				<slot name="dropdownItem" :data="data">{{ data.name }}</slot>
			</template>
		</ListBox>
	</div>
</template>

<style>
.Btn {
	--button-background-color-primary: var(--design-background-color-primary);
	--button-background-color-secondary: var(--design-background-color-secondary);
	--button-text-color-primary: var(--design-text-color-primary);
	--button-text-color-secondary: var(--design-text-color-primary);
	--button-border-color-primary: var(--design-border-color-primary);
	--button-border-color-secondary: var(--design-border-color-secondary);
}

.Btn.noBackground {
	--button-background-color-primary: transparent;
}

.Btn__actual {
	border: 1px solid var(--button-border-color-primary);
	border-radius: var(--design-border-radius-control);
	background: var(--button-background-color-primary);
	padding: var(--design-gap-unit) calc(3 * var(--design-gap-unit));
	color: var(--button-text-color-primary);
	display: flex;
	justify-content: center;
	align-items: center;
	gap: var(--design-gap-unit);
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
	color: var(--button-text-color-secondary);
	background-color: var(--button-background-color-secondary);
	border-color: var(--button-border-color-secondary);
}

.Btn.disabled .Btn__actual,
.Btn.accent.disabled .Btn__actual,
.Btn.minimal.disabled .Btn__actual,
.Btn.Icon.disabled .Btn__actual {
	--button-text-color-primary: var(--design-text-color-on-accent-secondary);
	--button-text-color-secondary: var(--design-text-color-on-accent-secondary);

	--button-background-color-primary: var(--design-background-color-disabled-primary);
	--button-background-color-secondary: var(--design-background-color-disabled-primary);

	--button-border-color-primary: var(--design-border-color-primary);
	--button-border-color-secondary: var(--design-border-color-primary);

	--icon-color: var(--design-text-color-secondary);
	cursor: not-allowed;
}

.Btn.accent .Btn__actual {
	--button-border-color-primary: var(--design-border-color-accent-primary);
	--button-border-color-secondary: var(--design-border-color-accent-secondary);

	--button-background-color-primary: var(--design-background-color-accent-primary);
	--button-background-color-secondary: var(--design-background-color-accent-secondary);

	--button-text-color-primary: var(--design-text-color-on-accent-primary);
	--button-text-color-secondary: var(--design-text-color-on-accent-primary);
}

.Btn.minimal .Btn__actual {
	--button-background-color-primary: var(--design-background-color-primary);
	--button-background-color-secondary: var(--design-background-color-secondary);

	--button-text-color-primary: var(--design-text-color-accent);
	--button-text-color-secondary: var(--design-text-color-accent-secondary);
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
	--button-text-color-secondary: var(--design-text-color-on-accent-primary);
}

.Btn.warning:not(.minimal, .functional),
.Btn.danger:not(.minimal, .functional),
.Btn.info:not(.minimal, .functional) {
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
	--button-text-color-secondary: var(--design-text-color-on-accent-primary);
}

.Btn.functional .Btn__actual {
	--button-background-color-primary: transparent;
	--button-background-color-secondary: transparent;
	--button-text-color-secondary: var(--design-text-color-hover-secondary);
	border: none;
	padding: 0;
	justify-content: start;
}

.Btn.functional.disabled .Btn__actual {
	--button-text-color-secondary: var(--design-text-color-secondary);
	--button-text-color-primary: var(--design-text-color-secondary);
}

.Btn.icon .Btn__dropdownIcon {
	display: none;
}

.Btn.icon .Btn__actual {
	min-width: min-content;
	padding: var(--design-gap-unit);
}

.Btn.icon.functional .Btn__actual {
	padding: 0;
}

.Btn__actual.small {
	padding: calc(var(--design-gap-unit) / 2) calc(var(--design-gap-unit) * 2);
	font-size: var(--design-font-size-small);
}
</style>
