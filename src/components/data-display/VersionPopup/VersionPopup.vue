<script setup lang="ts">
import { toRefs, ref } from 'vue'
import Icon from '../../general/Icon/Icon.vue'
import { Tooltip } from '../../../main'

interface VersionPopupProps {
	serviceName?: string
	version?: string
	uiKitVersion?: string
}
const open = ref(true)
const props = defineProps<VersionPopupProps>()

const { serviceName, version, uiKitVersion } = toRefs(props)
</script>
<template>
	<Tooltip v-model="open">
		<template #tooltip>
			<div class="VersionPopup">
				<h3 class="header">Версия сервиса</h3>
				<div class="content">
					<span>Версия "{{ serviceName }}": {{ version }}</span>
					<span>Версия Ui-kit: {{ uiKitVersion }}</span>
				</div>
			</div>
		</template>
		<Icon name="info" />
	</Tooltip>
</template>
<style scoped>
.VersionPopup {
	padding: 8px 24px;
	padding-left: 8px;
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
