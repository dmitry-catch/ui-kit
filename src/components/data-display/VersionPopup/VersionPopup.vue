<script setup lang="ts">
import { ref, toRefs } from 'vue'
import Icon from '../../general/Icon/Icon.vue'
import Button from '../../general/Button/Button.vue'
import DialogLayout from '../../general/Dialog/components/DialogLayout.vue'

interface VersionPopupProps {
	serviceName?: string
	version?: string
	uiKitVersion?: string
}

const props = defineProps<VersionPopupProps>()

const { serviceName, version, uiKitVersion } = toRefs(props)

const infoOpen = ref(false)

const handleInfoOpen = () => (infoOpen.value = true)
const handleInfoClose = () => (infoOpen.value = false)
</script>
<template>
	<div class="VersionPopup">
		<DialogLayout v-if="infoOpen" relative class="modal" size="small" @close="handleInfoClose">
			<template #header>Версия сервиса</template>
			<div v-if="!$slots.default" class="textContainer">
				<span class="text">Версия "{{ serviceName }}": {{ version }}</span>
				<span class="text">Версия UI-Kit: {{ uiKitVersion }}</span>
			</div>
			<slot v-if="$slots.default" name="default"></slot>
			<template #controls>
				<Button class="accent" @click="handleInfoClose">Закрыть</Button>
			</template>
		</DialogLayout>
		<Icon name="info" class="control" @click="handleInfoOpen" />
	</div>
</template>
<style scoped>
.VersionPopup {
	position: relative;
	.modal {
		border-radius: var(--design-border-radius-surface);
		box-shadow: 0px 32px 64px 0px rgba(33, 44, 58, 0.16);
		width: 492px;
		bottom: calc(4 * var(--design-gap-unit));
		.textContainer {
			text-align: start;
			display: flex;
			flex-direction: column;
			align-items: start;
		}
	}
	.control {
		cursor: pointer;
	}
}
</style>
