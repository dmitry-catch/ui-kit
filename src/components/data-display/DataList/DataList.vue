<script setup lang="ts" generic="T ">
import { toRefs, ref } from 'vue'
import { DataListItemType, DataListGroupType, DataListLoadContext } from './types.js'
import { isGroup } from './utils.js'
import Spinner from '../../general/Spinner/Spinner.vue'
import Button from '../../general/Button/Button.vue'
import DataListGroup from './DataListGroup/DataListGroup.vue'

export interface DataListProps {
	loading?: boolean
	/** Подсвечивание элементов при наведении. */
	hover?: boolean
	size?: 'extra-small' | 'small' | 'medium'
	/** Возможность сворачивания групп. */
	expandable?: boolean
	/** Возможность ленивой загрузки данных. */
	lazy?: boolean
}

const props = withDefaults(defineProps<DataListProps>(), {
	size: 'medium'
})

const emit = defineEmits<{
	(event: 'click', item: DataListItemType<T>, e: MouseEvent): void
	(event: 'load', context: DataListLoadContext): void
}>()

const { loading, hover, expandable, lazy } = toRefs(props)

const data = defineModel<Array<DataListItemType<T> | DataListGroupType>>('data')

const groupContext: DataListLoadContext = {
	type: 'group',
	current: ref(null),
	loading: ref(false),
	completed: ref(false)
}

const listContext: DataListLoadContext = {
	type: 'list',
	current: ref(null),
	loading: ref(false),
	completed: ref(false)
}

const loadGroup = (item: DataListGroupType) => {
	if (!item.isCollapsed) {
		groupContext.current.value = item
		emit('load', groupContext)
	}
}

const loadList = (list: DataListItemType<T>[]) => {
	listContext.current.value = list
	emit('load', listContext)
}

const handleClick = (e: MouseEvent, item: DataListItemType<T>) => {
	item.action?.(item)
	emit('click', item, e)
}

const groupClickHandler = (item: DataListGroupType) => {
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
	groupLabel?: (props: { group: DataListGroupType }) => any
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
						:current="groupContext.current.value || undefined"
						:isLoading="groupContext.loading.value"
						:isCompleted="groupContext.completed.value"
						:lazy="lazy"
						@load="loadGroup(item)"
						@click=";[groupClickHandler(item), loadGroup(item)]"
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
						<div v-if="idx === data.length - 1 && lazy" class="DataList__loadMore">
							<Button
								v-if="!listContext.completed.value && !listContext.loading.value"
								@click.stop="loadList(data)"
								:size="'small'"
								class="functional"
								>Загрузить еще</Button
							>
							<Spinner v-if="listContext.loading.value" class="DataList__loading" />
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
