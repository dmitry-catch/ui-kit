<style>
.DataListItem {
	display: flex;
	flex-flow: row;
	justify-content: space-between;
	gap: var(--design-gap-unit);
	align-items: center;
	height: min-content;
	width: 100%;
	background: var(--design-background-color-primary);
}

.DataListItem:hover {
	background: var(--design-background-color-secondary);
}

.DataListItem__content {
	height: min-content;
}

.DataListItem__contextMenu {
	height: min-content;
}

.DataListItem__button {
	--button-background-color-primary: var(--design-background-color-primary);
}

.DataListItem:hover .DataListItem__button {
	--button-background-color-primary: var(--design-background-color-secondary);
}
</style>

<template>
	<div class="DataListItem">
		<div class="DataListItem__content">
			<slot name="content" :data="data"></slot>
		</div>
		<div class="DataListItem__contextMenu">
			<Btn class="DataListItem__button icon functional" :dropdown="wrappedContextMenu">
				<Icon name="more_vertical"></Icon>
				<template #dropdownItem="{ data }">
					<slot name="contextMenuItem" :data="data"></slot>
				</template>
			</Btn>
		</div>
	</div>
</template>

<script setup lang="ts">
import Icon from '../../general/Icon/Icon.vue'
import Btn from '../../general/Button/Button.vue'
import { computed, toRefs } from 'vue'

interface DataListItemProps {
	data: any
	contextMenu: Array<any>
}

const props = defineProps<DataListItemProps>()
const { data, contextMenu } = toRefs(props)

const wrappedContextMenu = computed(() =>
	contextMenu.value.map((it: any) => ({ ...it, action: () => it.action(data) }))
)
</script>