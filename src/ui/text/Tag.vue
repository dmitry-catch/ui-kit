<style>
.Tag {
	display: inline-flex;
	gap: var(--design-gap-unit);
	border-radius: var(--design-border-radius-tag);
	background: var(--design-background-color-secondary);
	padding: var(--design-gap-unit) calc(2 * var(--design-gap-unit));
}
</style>

<template>
	<div class="Tag">
		<slot name="before"></slot>
		<slot></slot>
		<slot name="after"></slot>
	</div>
</template>

<script setup lang="ts"></script>
