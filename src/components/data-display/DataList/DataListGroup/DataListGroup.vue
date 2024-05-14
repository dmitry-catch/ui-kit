<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { DataListGroupType, DataListItemType } from '../types.js'
import Icon from '../../../general/Icon/Icon.vue'
import Spinner from '../../../general/Spinner/Spinner.vue';
import Button from '../../../general/Button/Button.vue';

const props = defineProps<{
	group: DataListGroupType
	expandable?: boolean
	size?: 'extra-small' | 'small' | 'medium'
	isLoading?: boolean
	isCompleted?: boolean
	lazy?: boolean
	current?: DataListGroupType | DataListItemType<any>[]
}>()

const emit = defineEmits<{
	(event: 'load', group: DataListGroupType): void
}>()

defineSlots<{
	/** Заголовок группы */
	groupLabel?: (props: { group: DataListGroupType }) => any
	/** Элементы внутри группы */
	groupItems?: (props: { items: DataListItemType<any>[] }) => any
}>()

const { group, size, expandable, isLoading, isCompleted, lazy, current } = toRefs(props)

const isCollapsed = ref(group.value.isCollapsed)


const groupClickHandler = () => {
	if (expandable.value) {
		isCollapsed.value = !isCollapsed.value
	}
}
const load = (group: DataListGroupType) => {
	if (!isCollapsed.value){
		emit('load', group)
	}
}
</script>

<template>
	<div class="DataList__group" v-bind="group.extraAttrs">
		<div class="DataList__groupLabel" :size="size" @click="[groupClickHandler(), load(group)]">
			<Icon v-if="expandable" :name="isCollapsed ? 'chevron_down' : 'chevron_up'" />
			<slot name="groupLabel" :group="group">{{ group.key }}</slot>
		</div>
		<div v-if="!isCollapsed" class="DataList__groupItems">
			<slot name="groupItems" :items="group.data"></slot>
			<div class="DataList__loadingWrapper">
				<Spinner v-if="isLoading && current === group" class="DataList__loading" />
				<div v-else-if="!isCompleted && lazy" class="DataList__loadMore">
					<Button @click.stop="load(group)" :size="'small'" class="functional">Загрузить еще</Button>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>

.DataList__loadMore {
	display: flex;
	justify-content: center;
}

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
