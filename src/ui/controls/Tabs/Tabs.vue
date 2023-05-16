<style>
.Tabs {
	display: flex;
	align-items: center;
	height: min-content;
	gap: calc(2 * var(--design-gap-unit));
}
</style>

<template>
	<div class="Tabs">
		<slot></slot>
	</div>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue'

provide()
</script>
