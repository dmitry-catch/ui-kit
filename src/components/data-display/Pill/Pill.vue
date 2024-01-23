<script setup lang="ts"></script>

<template>
	<div class="Pill">
		<slot name="before"></slot>
		<slot></slot>
		<slot name="after"></slot>
	</div>
</template>

<style>
.Pill {
	display: flex;
	gap: var(--design-gap-unit);
	border-radius: var(--design-border-radius-tag);
	background: var(--design-background-color-secondary);
	padding: var(--design-gap-unit) calc(2 * var(--design-gap-unit));
	align-items: center;
}

.Pill.danger {
	background: var(--design-background-color-danger-secondary);
}

.Pill.warning {
	background: var(--design-background-color-warning-secondary);
}

.Pill.control {
	border-radius: var(--design-border-radius-control);
	padding: calc(0.5 * var(--design-gap-unit)) calc(2 * var(--design-gap-unit));
}
</style>
