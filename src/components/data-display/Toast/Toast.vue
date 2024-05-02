<script setup lang="ts">
import { defineProps, toRefs, computed } from 'vue'
import { Icon, Button } from '../../../main'
import { Notification } from '../types'

interface ToastProps {
	notification: Notification
}

const emit = defineEmits<{ (e: 'close', value: Notification): void }>()

const props = defineProps<ToastProps>()

const { notification } = toRefs(props)

const icon = computed(() => {
	if (notification.value.type == 'error' || notification.value.type == 'warning') return 'warning'
	return 'check_circled'
})
</script>
<template>
	<div class="Toast" :class="notification.type">
		<Icon :name="icon" />
		<span class="message">{{ notification.message }}</span>
		<Button class="icon functional control" @click="() => emit('close', notification)">
			<Icon name="close" />
		</Button>
	</div>
</template>
<style scoped>
.Toast {
	--notification-message-border-color: var(--design-border-color-baseline);
	--icon-size: 24px;
	display: grid;
	grid-template-columns: 24px 1fr calc(24px + var(--design-gap-unit));
	align-items: start;
	z-index: 999;
	position: relative;
	text-align: left;
	gap: var(--design-gap-unit);
	width: 352px;
	min-height: 34px;
	margin-top: calc(2 * var(--design-gap-unit));
	padding: calc(3 * var(--design-gap-unit)) calc(2 * var(--design-gap-unit));
	background-color: var(--design-background-color-primary);
	border: var(--notification-message-border-color) 1px solid;
	border-radius: var(--design-border-radius-control);
	box-shadow: 0px 32px 64px 0px rgba(33, 44, 58, 0.16);

	.control {
		align-self: start;
		justify-self: end;
	}
	.message {
		text-wrap: wrap;
		word-break: break-all;
	}
}
.success {
	--notification-message-border-color: var(--design-border-color-success);
}
.info {
	--notification-message-border-color: var(--design-border-color-info);
}
.warning {
	--notification-message-border-color: var(--design-border-color-warning-primary);
}
.error {
	--notification-message-border-color: var(--design-border-color-danger-primary);
}
</style>
