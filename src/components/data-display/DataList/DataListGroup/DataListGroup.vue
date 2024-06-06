<script setup lang="ts" generic="T">
import { onMounted, reactive, ref, toRefs } from 'vue'
import { DataListGroupType, DataListItemType, DataListLoadContext } from '../types.js'
import Icon from '../../../general/Icon/Icon.vue'
import Button from '../../../general/Button/Button.vue'
import Spinner from '../../../general/Spinner/Spinner.vue'

const props = defineProps<{
	group: DataListGroupType<T>
	expandable?: boolean
	size?: 'extra-small' | 'small' | 'medium'
	lazy?: boolean
}>()

const emit = defineEmits<{
	(event: 'load', groupContext: DataListLoadContext<T>): void
}>()

const slots = defineSlots<{
	/** Заголовок группы */
	groupLabel?: (props: { group: DataListGroupType<T> }) => any
	/** Элементы внутри группы */
	groupItems?: (props: { items: DataListItemType<T>[] }) => any
	/** Загрузить еще */
	loadMore?: (props: { loadGroup: () => void }) => any
}>()

const { group, size, expandable } = toRefs(props)

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
const loadGroup = () => {
	if (!isCollapsed.value) {
		groupContext.current = group.value
		emit('load', groupContext)
	}
}

onMounted(() => {
	loadGroup()
})
</script>

<template>
	<div class="DataList__group" v-bind="group.extraAttrs">
		<div class="DataList__groupLabel" :size="size" @click=";[groupClickHandler(), loadGroup()]">
			<Icon v-if="expandable" :name="isCollapsed ? 'chevron_down' : 'chevron_up'" />
			<slot name="groupLabel" :group="group">{{ group.key }}</slot>
		</div>
		<div v-if="!isCollapsed" class="DataList__groupItems">
			<slot name="groupItems" :items="group.data"></slot>
			<div class="DataList__loadMore">
				<slot
					v-if="!groupContext.completed && !groupContext.loading && lazy"
					name="loadMore"
					:loadGroup="loadGroup"
					><Button class="functional" @click="loadGroup()">Загрузить еще</Button>
				</slot>
				<Spinner v-if="groupContext.loading" />
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
	padding: calc(var(--design-gap-unit) / 4) calc(2 * var(--design-gap-unit));
	font-size: var(--design-font-size-footnote);
	line-height: var(--design-line-height-footnote);
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
