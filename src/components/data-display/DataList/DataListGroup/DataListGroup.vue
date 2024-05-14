<script setup lang="ts" generic="T">
import { Ref, reactive, ref, toRefs } from 'vue'
import { DataListGroupType, DataListItemType, DataListLoadContext } from '../types.js'
import Icon from '../../../general/Icon/Icon.vue'
import Spinner from '../../../general/Spinner/Spinner.vue'
import Button from '../../../general/Button/Button.vue'

const props = defineProps<{
	group: DataListGroupType<T>
	expandable?: boolean
	size?: 'extra-small' | 'small' | 'medium'
	lazy?: boolean
}>()

const emit = defineEmits<{
	(event: 'load', groupContext: DataListLoadContext<T>): void
}>()

defineSlots<{
	/** Заголовок группы */
	groupLabel?: (props: { group: DataListGroupType<T> }) => any
	/** Элементы внутри группы */
	groupItems?: (props: { items: DataListItemType<T>[] }) => any
}>()

const { group, size, expandable, lazy } = toRefs(props)

const isCollapsed = ref(group.value.isCollapsed)

const groupContext: DataListLoadContext<T> = reactive({
	type: 'group',
	current: group,
	loading: false,
	completed: false
})

const groupClickHandler = () => {
	if (expandable.value) {
		isCollapsed.value = !isCollapsed.value
	}
}
const load = () => {
	if (!isCollapsed.value) {
		groupContext.current = group.value
		emit('load', groupContext)
	}
}
</script>

<template>
	<div class="DataList__group" v-bind="group.extraAttrs">
		<div class="DataList__groupLabel" :size="size" @click=";[groupClickHandler(), load()]">
			<Icon v-if="expandable" :name="isCollapsed ? 'chevron_down' : 'chevron_up'" />
			<slot name="groupLabel" :group="group">{{ group.key }}</slot>
		</div>
		<div v-if="!isCollapsed" class="DataList__groupItems">
			<slot name="groupItems" :items="group.data"></slot>
			<div class="DataList__loadingWrapper">
				<Spinner v-if="groupContext.loading" class="DataList__loading" />
				<div v-else-if="!groupContext.completed && lazy" class="DataList__loadMore">
					<Button @click.stop="load()" :size="'small'" class="functional">Загрузить еще</Button>
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
