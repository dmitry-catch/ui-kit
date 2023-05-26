<style>
.Surface {
	background: var(--design-background-color-primary);
	border-radius: var(--design-border-radius-surface);
	border-color: var(--design-border-color-primary);
	border-width: 1px;
	border-style: solid;
	box-sizing: border-box;
	padding: calc(3 * var(--design-gap-unit));
	max-height: 100%;
	max-width: 100%;
	overflow: auto;
}
</style>

<template>
	<div class="Surface">
		<slot></slot>
	</div>
</template>

<script setup lang="ts"></script>
