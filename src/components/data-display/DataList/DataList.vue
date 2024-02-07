<script setup lang="ts">
import { toRefs } from 'vue'
import { DataListItem, DataListGroup } from './types.js'
import { isGroup } from './utils.js'
import Spinner from '../../general/Spinner/Spinner.vue'
import Icon from '../../general//Icon/Icon.vue'

export interface DataListProps {
	loading?: boolean
	/** Подсвечивание элементов при наведении. */
	hover?: boolean
	size?: 'extra-small' | 'small' | 'medium'
	items?: Array<DataListItem> | Array<DataListGroup>
	/** Возможность сворачивания групп. */
	expandable?: boolean
}

const props = withDefaults(defineProps<DataListProps>(), {
	size: 'medium'
})

const emit = defineEmits<{
	(event: 'click', item: DataListItem, e: MouseEvent): void
}>()

const { items, loading, hover, expandable } = toRefs(props)

const handleClick = (e: MouseEvent, item: DataListItem) => {
	item.action?.(item)
	emit('click', item, e)
}

const groupClickHandler = (item: DataListGroup) => {
	if (expandable.value) item.isCollapsed = !item.isCollapsed
}

defineSlots<{
	/** Заголовок списка с элементами  */
	header?: () => any
	/** Элементы списка  */
	item?: (props: { item: DataListItem }) => any
	/** Группа элементов списка  */
	groupLabel?: (props: { group: DataListGroup }) => any
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
			<div v-if="items && items.length > 0" class="DataList__content" :size="size">
				<template v-for="(item, idx) in items" :key="idx">
					<div v-if="isGroup(item)" class="DataList__group" v-bind="item.extraAttrs">
						<div class="DataList__groupLabel" :size="size" @click="groupClickHandler(item)">
							<Icon v-if="expandable" :name="item.isCollapsed ? 'chevron_down' : 'chevron_up'" />
							<slot name="groupLabel" :group="item">{{ item.name }}</slot>
						</div>
						<div v-if="!item.isCollapsed" class="DataList__groupItems">
							<div
								v-for="(groupItem, groupIdx) in item.items"
								:key="groupIdx"
								v-bind="groupItem.extraAttrs"
								class="DataList__item"
								:class="[groupItem.wrapperClass, { 'DataList__item--hover': hover }]"
								:size="size"
								@click="handleClick($event, groupItem)"
							>
								<slot name="item" :item="groupItem">{{ groupItem.label }}</slot>
							</div>
						</div>
					</div>
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

.DataList__groupLabel {
	display: flex;
	align-items: center;
	gap: var(--design-gap-unit);
	background-color: var(--design-background-color-on-accent-primary);
	padding: calc(var(--design-gap-unit) / 2) calc(3 * var(--design-gap-unit));
}

.DataList__menuHeader,
.DataList__menuFooter,
.DataList__empty {
	padding: calc(var(--design-gap-unit) / 2) var(--design-gap-unit);
}

.DataList__item {
	padding: calc(var(--design-gap-unit) / 2) calc(var(--design-gap-unit) * 1.5);
}

.DataList__group {
	border-top: 1px solid var(--design-border-color-primary);
	border-bottom: 1px solid var(--design-border-color-primary);
}

.DataList__content .DataList__group ~ .DataList__group,
.DataList__menuHeader:empty + .DataList__content .DataList__group {
	border-top: none;
}

.DataList__groupLabel,
.DataList__groupLabel :deep(*:not(.Icon path)) {
	font-weight: 600;
	color: var(--design-text-color-secondary);
}

.DataList__item--hover:hover {
	background-color: var(--design-background-color-on-accent-primary);
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
</style>
