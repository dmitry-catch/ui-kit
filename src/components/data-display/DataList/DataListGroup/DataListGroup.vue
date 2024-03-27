<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { DataListGroupType, DataListItemType } from '../types.js'
import Icon from '../../../general/Icon/Icon.vue'

const props = defineProps<{
	group: DataListGroupType
	expandable?: boolean
	size?: 'extra-small' | 'small' | 'medium'
}>()

defineSlots<{
	/** Заголовок группы */
	groupLabel?: (props: { group: DataListGroupType }) => any
	/** Элементы внутри группы */
	groupItems?: (props: { items: DataListItemType[] }) => any
}>()

const { group, size, expandable } = toRefs(props)

const isCollapsed = ref(group.value.isCollapsed)

const groupClickHandler = () => {
	if (expandable.value) {
		isCollapsed.value = !isCollapsed.value
	}
}
</script>

<template>
	<div class="DataList__group" v-bind="group.extraAttrs">
		<div class="DataList__groupLabel" :size="size" @click="groupClickHandler">
			<Icon v-if="expandable" :name="isCollapsed ? 'chevron_down' : 'chevron_up'" />
			<slot name="groupLabel" :group="group">{{ group.key }}</slot>
		</div>
		<div v-if="!isCollapsed" class="DataList__groupItems">
			<slot name="groupItems" :items="group.data"></slot>
		</div>
	</div>
</template>

<style scoped>
.DataList__groupLabel {
	display: flex;
	align-items: center;
	gap: var(--design-gap-unit);
	background-color: var(--design-background-color-on-accent-primary);
	padding: calc(var(--design-gap-unit) / 2) calc(3 * var(--design-gap-unit));
	font-size: var(--design-font-size-footnote);
	line-height: var(--design-line-height-footnote);
}

.DataList__group,
.DataList__groupItems {
	padding-top: calc(0.5 * var(--design-gap-unit));
}

.DataList__groupLabel :deep(*) {
	--icon-size: 20px;
	font-size: var(--design-font-size-footnote);
	line-height: var(--design-line-height-footnote);
}

.DataList__groupLabel,
.DataList__groupLabel :deep(*:not(.Icon path)) {
	font-weight: 600;
	color: var(--design-text-color-secondary);
}
</style>
