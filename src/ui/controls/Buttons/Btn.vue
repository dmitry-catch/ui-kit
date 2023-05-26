<style>
.Btn {
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
	gap: var(--design-gap-unit);
	min-width: 144px;
	box-sizing: border-box;
	height: min-content;
	white-space: nowrap;
}
.Btn:focus-visible {
	outline: var(--design-border-color-focus) 3px solid;
}
.Btn:hover,
.Btn:active,
.Btn.pressed {
	background: var(--button-background-color-secondary);
	color: var(--button-text-color-secondary);
	border-color: var(--button-border-color-secondary);
}

.Btn.accent {
	--button-background-color-primary: var(--design-background-color-accent-primary);
	--button-background-color-secondary: var(--design-background-color-accent-secondary);
	--button-text-color-primary: var(--design-text-color-on-accent-primary);
	--button-text-color-secondary: var(--design-text-color-on-accent-secondary);
	--button-border-color-primary: var(--design-border-color-accent-primary);
	--button-border-color-secondary: var(--design-border-color-accent-secondary);
}

.Btn.minimal {
	--button-background-color-primary: var(--design-background-color-primary);
	--button-background-color-secondary: var(--design-background-color-secondary);
	--button-text-color-primary: var(--design-text-color-accent);
	--button-text-color-secondary: var(--design-text-color-accent);
	border: none;
}

.Btn.warning {
	--button-background-color-primary: var(--design-background-color-warning-primary);
	--button-background-color-secondary: var(--design-background-color-warning-secondary);
	--button-text-color-primary: var(--design-text-color-warning);
	--button-text-color-secondary: var(--design-text-color-warning);
	--button-border-color-primary: var(--design-border-color-warning-primary);
	--button-border-color-secondary: var(--design-border-color-warning-secondary);
}
.Btn.warning.accent {
	--button-text-color-primary: var(--design-text-color-on-accent-primary);
	--button-text-color-secondary: var(--design-text-color-on-accent-secondary);
}

.Btn.danger {
	--button-background-color-primary: var(--design-background-color-danger-primary);
	--button-background-color-secondary: var(--design-background-color-danger-secondary);
	--button-text-color-primary: var(--design-text-color-danger);
	--button-text-color-secondary: var(--design-text-color-danger);
	--button-border-color-primary: var(--design-border-color-danger-primary);
	--button-border-color-secondary: var(--design-border-color-danger-secondary);
}
.Btn.danger.accent {
	--button-text-color-primary: var(--design-text-color-on-accent-primary);
	--button-text-color-secondary: var(--design-text-color-on-accent-secondary);
}
</style>

<template>
	<button class="Btn">
		<slot name="before"></slot>
		<slot></slot>
		<slot name="after"></slot>
	</button>
</template>
<script setup lang="ts">
import { computed, toRefs } from 'vue'

const props = defineProps({
	accent: { default: () => false, type: Boolean },
	minimal: { default: () => false, type: Boolean },
	danger: { default: () => false, type: Boolean },
	warning: { default: () => false, type: Boolean },
	disabled: { default: () => false, type: Boolean },
	pressed: { default: () => false, type: Boolean },
})

const { accent, minimal, danger, warning, disabled, pressed } = toRefs(props)

const booleanAttribute = (value: any) => (value ? true : undefined)
</script>
