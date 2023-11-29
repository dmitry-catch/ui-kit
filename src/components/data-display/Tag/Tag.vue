<script setup lang="ts"></script>

<template>
	<div class="Tag text-medium">
		<slot name="before"></slot>
		<slot></slot>
		<slot name="after"></slot>
	</div>
</template>

<style>
.Tag {
	display: inline-flex;
	gap: var(--design-gap-unit);
	border-radius: var(--design-border-radius-tag);
	background: var(--design-background-color-secondary);
	padding: 0 10px;
}
</style>
