<script setup lang="ts">
import { toRefs } from 'vue'
import { DataListItem, DataListGroup } from './types.js'
import { isGroup } from './utils.js'
import Spinner from '../../general/Spinner/Spinner.vue'

export interface DataListProps {
	loading?: boolean
	hover?: boolean
	size?: 'extra-small' | 'small' | 'medium'
	items?: Array<DataListItem> | Array<DataListGroup>
}

const props = withDefaults(defineProps<DataListProps>(), {
	size: 'medium'
})

const emit = defineEmits(['itemClick'])

const { items, loading, hover, size } = toRefs(props)

const itemClickHandler = (item: DataListItem) => {
	if (!item.extraAttrs?.disabled) {
		item.action?.(item)
		emit('itemClick', item)
	}
}

defineSlots<{
	header?: () => any
	item?: (props: { item: DataListItem }) => any
	groupLabel?: (props: { group: DataListGroup }) => any
	footer?: () => any
	empty?: () => any
}>()
</script>

<template>
	<div ref="root" class="DataList" :class="size">
		<Spinner v-if="loading" class="DataList__loading" />
		<template v-else>
			<div class="DataList__menuHeader" :class="size">
				<slot name="header"></slot>
			</div>
			<div v-if="items && items.length > 0" class="DataList__content" :class="size">
				<template v-for="(item, idx) in items" :key="idx">
					<div v-if="isGroup(item)" class="DataList__group" v-bind="item.extraAttrs">
						<div class="DataList__groupLabel" :class="size">
							<slot name="groupLabel" :group="item">{{ item.name }}</slot>
						</div>
						<div class="DataList__groupItems">
							<div
								v-for="(groupItem, groupIdx) in item.items"
								:key="groupIdx"
								v-bind="groupItem.extraAttrs"
								:class="[groupItem.wrapperClass, size, { 'DataList__item--hover': hover }]"
								class="DataList__item"
								@click="itemClickHandler(groupItem)"
							>
								<slot name="item" :item="groupItem">{{ groupItem.label }}</slot>
							</div>
						</div>
					</div>
					<template v-else>
						<div
							v-bind="item.extraAttrs"
							:class="[item.wrapperClass, size, { 'DataList__item--hover': hover }]"
							class="DataList__item"
							@click="itemClickHandler(item)"
						>
							<slot name="item" :item="item">{{ item.label }}</slot>
						</div>
					</template>
				</template>
			</div>
			<div v-else class="DataList__empty" :class="size">
				<slot name="empty">Записей нет</slot>
			</div>
			<div class="DataList__menuFooter" :class="size">
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
.DataList__item,
.DataList__groupLabel,
.DataList__menuFooter,
.DataList__empty {
	padding: calc(var(--design-gap-unit) / 2) var(--design-gap-unit);
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
.DataList__groupLabel :deep(*) {
	font-weight: 600;
}

.DataList__item--hover:hover {
	background-color: var(--design-background-color-on-accent-primary);
}

.DataList__item {
	cursor: pointer;
}

/* Size Styling */

/* Extra-Small Size Styling */

.DataList__menuHeader.extra-small,
.DataList__item.extra-small,
.DataList__groupLabel.extra-small,
.DataList__menuFooter.extra-small,
.DataList__empty.extra-small {
	padding: calc(var(--design-gap-unit) / 4);
	font-size: var(--design-font-size-footnote);
	line-height: var(--design-line-height-footnote);
}

.DataList__menuHeader.extra-small :deep(*),
.DataList__item.extra-small :deep(*),
.DataList__groupLabel.extra-small :deep(*),
.DataList__menuFooter.extra-small :deep(*),
.DataList__empty.extra-small :deep(*) {
	font-size: var(--design-font-size-footnote);
	line-height: var(--design-line-height-footnote);
}

/* Small Size Styling */

.DataList__menuHeader.small,
.DataList__item.small,
.DataList__groupLabel.small,
.DataList__menuFooter.small,
.DataList__empty.small {
	font-size: var(--design-font-size-small);
	line-height: var(--design-line-height-small);
	padding: calc(var(--design-gap-unit) / 4) calc(var(--design-gap-unit) / 2);
}

.DataList__menuHeader.small :deep(*),
.DataList__item.small :deep(*),
.DataList__groupLabel.small :deep(*),
.DataList__menuFooter.small :deep(*),
.DataList__empty.small :deep(*) {
	font-size: var(--design-font-size-small);
	line-height: var(--design-line-height-small);
}

/*  */

.DataList__menuHeader:empty,
.DataList__menuFooter:empty {
	padding: 0;
}
</style>
