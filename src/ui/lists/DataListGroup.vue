<style>
.DataListGroup {
	display: flex;
	flex-flow: row;
	align-items: center;
	background: var(--design-background-color-secondary);
	width: 100%;
	height: min-content;
	gap: var(--design-gap-unit);
}

.DataListGroup__button.icon.functional {
	--button-background-color-primary: var(--design-background-color-secondary);
}
</style>

<template>
	<DataListItem v-if="isItem" :data="data" :context-menu="contextMenu" @click="itemClick(data)">
		<template #content="{ data }">
			<slot name="content" :data="data"></slot>
		</template>
		<template #contextMenuItem="{ data }">
			<slot name="contextMenuItem" :data="data"></slot>
		</template>
	</DataListItem>
	<template v-else>
		<div class="DataListGroup text-footnote" @click="toggle">
			<Btn class="DataListGroup__button icon functional">
				<Icon v-if="opened" name="chevron_down" style="--icon-size: 16px"></Icon>
				<Icon v-else name="chevron_up" style="--icon-size: 16px"></Icon>
			</Btn>
			<span>{{ group.key }}</span>
			<span>|</span>
			<span>{{ group.data.length }}</span>
		</div>
		<template v-if="opened">
			<DataListGroup v-for="item of group.data" :data="item" :context-menu="contextMenu" @itemClick="itemClick">
				<template #content="{ data }">
					<slot name="content" :data="data"></slot>
				</template>
				<template #contextMenuItem="{ data }">
					<slot name="contextMenuItem" :data="data"></slot>
				</template>
			</DataListGroup>
		</template>
	</template>
</template>

<script setup lang="ts">
import Icon from '../icons/Icon.vue'
import Btn from '../controls/Buttons/Btn.vue'
import { computed, ref, toRefs } from 'vue'
import DataListItem from './DataListItem.vue'
import { Group, isGroup } from '@forecsys/collections'
const props = defineProps<{ data: any; contextMenu: Array<any> }>()
const emit = defineEmits(['itemClick'])
const { data, contextMenu } = toRefs(props)

const group = computed(() => data.value as Group<any>)
const isItem = computed(() => !isGroup(data.value))

const opened = ref(true)
const toggle = () => (opened.value = !opened.value)
const itemClick = (data: any) => emit('itemClick', data)
</script>
