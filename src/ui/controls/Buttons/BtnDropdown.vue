<style></style>

<template>
	<QBtnDropdown :label="label">
		<QList>
			<slot></slot>
		</QList>
	</QBtnDropdown>
</template>

<script setup lang="ts">
import { QBtnDropdown } from 'quasar'
defineProps({ label: {} })
</script>
