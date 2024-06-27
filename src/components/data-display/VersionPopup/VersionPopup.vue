<script setup lang="ts">
import { toRefs } from 'vue'
import Icon from '../../general/Icon/Icon.vue'
import { Tooltip } from '../../../main'

interface VersionPopupProps {
	serviceName?: string
	version?: string
	uiKitVersion?: string
}

const props = defineProps<VersionPopupProps>()
const { serviceName, version, uiKitVersion } = toRefs(props)
</script>
<template>
	<Tooltip>
		<template #tooltip>
			<div v-if="!$slots.default" class="VersionPopup">
				<h3 class="header">Версия сервиса</h3>
				<div class="content">
					<span>Версия "{{ serviceName }}": {{ version }}</span>
					<span>Версия Ui-kit: {{ uiKitVersion }}</span>
				</div>
			</div>
			<slot v-if="$slots.default" name="default"></slot>
		</template>
		<Icon name="info" />
	</Tooltip>
</template>
<style scoped>
.VersionPopup {
	padding: var(--design-gap-unit) calc(3 * var(--design-gap-unit));
	padding-left: var(--design-gap-unit);
	display: flex;
	flex-direction: column;
	gap: calc(2 * var(--design-gap-unit));
	.header {
		text-align: start;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: start;
		span {
			text-align: start;
		}
	}
}
</style>
