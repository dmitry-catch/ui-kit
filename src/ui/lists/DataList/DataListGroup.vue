<style></style>

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
		<DataGroupToggler v-model="opened" :group="group"></DataGroupToggler>
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
import { computed, ref, toRefs } from 'vue'
import DataListItem from './DataListItem.vue'
import { Group, isGroup } from '@forecsys/collections'
import DataGroupToggler from '../DataGroupToggler.vue'
const props = defineProps<{ data: any; contextMenu: Array<any> }>()
const emit = defineEmits(['itemClick'])
const { data, contextMenu } = toRefs(props)

const group = computed(() => data.value as Group<any>)
const isItem = computed(() => !isGroup(data.value))

const opened = ref(true)
const toggle = () => (opened.value = !opened.value)
const itemClick = (data: any) => emit('itemClick', data)
</script>
