<style scoped>
.root {
	display: flex;
	flex-flow: row;
	gap: var(--design-gap-unit);
	align-items: center;
	justify-content: space-between;
}

.selected.hidden {
	visibility: hidden;
}
</style>

<template>
	<div class="root text-medium">
		<div>{{ option.name }}</div>
		<Icon name="check" class="selected accent" :class="{ hidden: !selected }"></Icon>
	</div>
</template>

<script setup lang="ts">
import Icon from '../../../general/Icon/Icon.vue'
import { toRefs } from 'vue'

interface DropdownSelectableOptionProps {
	option: { name: string; value: any }
	selected?: boolean
}

const props = withDefaults(defineProps<DropdownSelectableOptionProps>(), {
	selected: false
})

const { option, selected } = toRefs(props)
</script>
