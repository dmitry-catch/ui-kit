<style>
.Dropdown {
	position: fixed;
	background: var(--design-background-color-primary);
	border: 1px solid var(--design-border-color-primary);
	border-radius: var(--design-border-radius-control);
}
</style>

<template>
	<div class="Dropdown">
		<slot></slot>
	</div>
</template>

<script setup lang="ts"></script>
