<style>
.Pill {
	display: flex;
	gap: var(--design-gap-unit);
	border-radius: var(--design-border-radius-tag);
	background: var(--design-background-color-secondary);
	padding: var(--design-gap-unit) calc(3 * var(--design-gap-unit));
}
.Pill.danger {
	background: var(--design-background-color-danger-secondary);
}
.Pill.warning {
	background: var(--design-background-color-warning-secondary);
}
</style>

<template>
	<div class="Pill">
		<slot name="before"></slot>
		<slot></slot>
		<slot name="after"></slot>
	</div>
</template>

<script setup lang="ts"></script>
