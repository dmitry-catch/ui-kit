<script setup lang="ts" generic="T extends string">
import { toRefs, reactive } from 'vue'
import { DataListItemType, DataListGroupType, DataListLoadContext } from './types.js'
import { isGroup } from './utils.js'
import Spinner from '../../general/Spinner/Spinner.vue'
import DataListGroup from './DataListGroup/DataListGroup.vue'

export interface DataListProps {
	loading?: boolean
	/** Подсвечивание элементов при наведении. */
	hover?: boolean
	size?: 'extra-small' | 'small' | 'medium'
	/** Возможность сворачивания групп. */
	expandable?: boolean
	/** Возможность ленивой загрузки данных. */
}

const props = withDefaults(defineProps<DataListProps>(), {
	size: 'medium'
})

const emit = defineEmits<{
	(event: 'click', item: DataListItemType<T>, e: MouseEvent): void
	(event: 'load', context: DataListLoadContext<T>): void
}>()

const { loading, hover, expandable } = toRefs(props)

const data = defineModel<DataListItemType<T>[] | DataListGroupType<T>[]>('data', { default: [] })

const listContext: DataListLoadContext<T> = reactive({
	type: 'list',
	current: [],
	loading: false,
	completed: false
})

const loadGroup = (groupContext: DataListLoadContext<T>) => {
	emit('load', groupContext)
}

const loadList = (list: DataListItemType<T>[]) => {
	listContext.current = list
	emit('load', listContext)
}

const handleClick = (e: MouseEvent, item: DataListItemType<T>) => {
	item.action?.(item)
	emit('click', item, e)
}

const groupClickHandler = (item: DataListGroupType<T>) => {
	if (expandable.value) item.isCollapsed = !item.isCollapsed
}

const handleMouseDown = (evt: MouseEvent) => {
	const target = evt.target as HTMLElement
	if (target.classList.contains('DataList__groupLabel')) {
		evt.preventDefault()
	}
}

defineSlots<{
	/** Заголовок списка с элементами  */
	header?: () => any
	/** Элементы списка  */
	item?: (props: { item: DataListItemType<T> }) => any
	/** Группа элементов списка  */
	groupLabel?: (props: { group: DataListGroupType<T> }) => any
	/** Загрузить еще список */
	loadMore?: (props: { loadList: (list: DataListItemType<T>[]) => void; context: DataListLoadContext<T> }) => any
	/** Загрузить еще группу */
	loadMoreGroup?: (props: { loadGroup: () => void; groupContext: DataListLoadContext<T> }) => any
	/** Нижний колонтитул списка элементов  */
	footer?: () => any
	/** Placeholder при пустом списке элементов */
	empty?: () => any
}>()
</script>

<template>
	<div ref="root" class="DataList" :size="size">
		<Spinner v-if="loading" class="DataList__loading" />
		<template v-else>
			<div class="DataList__menuHeader" :size="size">
				<slot name="header"></slot>
			</div>
			<div v-if="data && data.length > 0" class="DataList__content" :size="size">
				<template v-for="(item, idx) in data" :key="idx">
					<DataListGroup
						v-if="isGroup(item)"
						:group="item"
						:expandable="expandable"
						:hover="hover"
						:size="size"
						@load="loadGroup($event)"
						@click="groupClickHandler(item), loadGroup($event)"
						@mousedown="handleMouseDown"
					>
						<template #groupLabel="{ group }">
							<slot name="groupLabel" :group="group">{{ group.key }}</slot>
						</template>
						<template #groupItems="{ items }">
							<div
								v-for="(groupItem, groupIdx) in items"
								:key="groupIdx"
								v-bind="groupItem.extraAttrs"
								class="DataList__item"
								:class="[groupItem.wrapperClass, { 'DataList__item--hover': hover }]"
								:size="size"
								@click="handleClick($event, groupItem)"
							>
								<slot name="item" :item="groupItem">{{ groupItem.label }}</slot>
							</div>
						</template>
						<template #loadMoreGroup="{ loadGroup, groupContext }">
							<slot name="loadMoreGroup" :loadGroup="loadGroup" :groupContext="groupContext"> </slot>
						</template>
					</DataListGroup>
					<template v-else>
						<div
							v-bind="item.extraAttrs"
							class="DataList__item"
							:class="[item.wrapperClass, { 'DataList__item--hover': hover }]"
							:size="size"
							@click="handleClick($event, item)"
						>
							<slot name="item" :item="item">{{ item.label }}</slot>
						</div>
						<div class="DataList__loadMore">
							<slot
								v-if="idx === data.length - 1"
								name="loadMore"
								:loadList="loadList"
								:context="listContext"
							>
							</slot>
						</div>
					</template>
				</template>
			</div>
			<div v-else class="DataList__empty" :size="size">
				<slot name="empty">Записей нет</slot>
			</div>
			<div class="DataList__menuFooter" :size="size">
				<slot name="footer"></slot>
			</div>
		</template>
	</div>
</template>

<style scoped>
.DataList {
	width: 100%;
	box-sizing: border-box;
}

.DataList__menuHeader,
.DataList__menuFooter,
.DataList__empty {
	padding: calc(var(--design-gap-unit) / 2) var(--design-gap-unit);
}

.DataList__item {
	padding: calc(var(--design-gap-unit) / 2) 0 calc(var(--design-gap-unit) / 2) calc(var(--design-gap-unit) * 1.5);
}

.DataList__content :deep(.DataList__group ~ .DataList__group),
.DataList__menuHeader:empty + .DataList__content :deep(.DataList__group) {
	border-top: none;
}

.DataList__item--hover:hover {
	background-color: var(--design-background-color-on-accent-primary);
}

.DataList__loadMore {
	display: flex;
	justify-content: center;
}
/* Size Styling */

/* Extra-Small Size Styling */

.DataList__menuHeader[size='extra-small'],
.DataList__item[size='extra-small'],
.DataList__menuFooter[size='extra-small'],
.DataList__empty[size='extra-small'] {
	padding: calc(var(--design-gap-unit) / 4);
	font-size: var(--design-font-size-footnote);
	line-height: var(--design-line-height-footnote);
	--icon-size: 16px;
	gap: calc(var(--design-gap-unit) / 4);
}

.DataList__item[size='extra-small'] {
	padding: calc(var(--design-gap-unit) / 2) calc(var(--design-gap-unit) * 1.5);
}

.DataList[size='extra-small'] :deep(*) {
	font-size: var(--design-font-size-footnote);
	line-height: var(--design-line-height-footnote);
	--icon-size: 16px;
}

/* Small Size Styling */

.DataList__menuHeader[size='small'],
.DataList__item[size='small'],
.DataList__menuFooter[size='small'],
.DataList__empty[size='small'] {
	font-size: var(--design-font-size-small);
	line-height: var(--design-line-height-small);
	padding: calc(var(--design-gap-unit) / 4) calc(var(--design-gap-unit) / 2);
	--icon-size: 20px;
	gap: calc(var(--design-gap-unit) / 2);
}

.DataList__item[size='small'] {
	padding: calc(var(--design-gap-unit) / 2) calc(var(--design-gap-unit) * 1.5);
}

.DataList[size='small'] :deep(*) {
	font-size: var(--design-font-size-small);
	line-height: var(--design-line-height-small);
	--icon-size: 20px;
}

/*  */

.DataList__menuHeader:empty,
.DataList__menuFooter:empty {
	padding: 0;
}
.DataList__content :deep(.DataList__groupLabel *) {
	--icon-size: 20px;
	font-size: var(--design-font-size-footnote);
	line-height: var(--design-line-height-footnote);
}

.DataList__loading {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}

::-webkit-scrollbar {
	width: 12px;
}
::-webkit-scrollbar-thumb {
	border: 4px solid white;
}
</style>
